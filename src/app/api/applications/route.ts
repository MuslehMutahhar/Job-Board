import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

// Schema for application creation
const applicationSchema = z.object({
  jobId: z.string(),
  resumeUrl: z.string().url(),
  coverLetter: z.string().optional(),
});

// GET - Fetch all applications for the authenticated user
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    let where = {};

    // If user is a job seeker, show only their applications
    if (session.user.role === "JOB_SEEKER") {
      where = {
        applicantId: session.user.id,
        ...(jobId && { jobId }),
      };
    }
    // If user is a company, show applications for their jobs
    else if (session.user.role === "COMPANY") {
      const company = await prisma.company.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (!company) {
        return NextResponse.json(
          { error: "Company profile not found" },
          { status: 404 }
        );
      }

      where = {
        job: {
          companyId: company.id,
        },
        ...(jobId && { jobId }),
      };
    }
    // If user is an admin, they can see all applications or filter by jobId
    else if (session.user.role === "ADMIN") {
      where = {
        ...(jobId && { jobId }),
      };
    } else {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Count total applications
    const totalApplications = await prisma.application.count({ where });

    // Fetch applications with pagination
    const applications = await prisma.application.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: {
              select: {
                name: true,
                logo: true,
              },
            },
          },
        },
        applicant: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({
      applications,
      pagination: {
        total: totalApplications,
        pages: Math.ceil(totalApplications / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// POST - Create a new application
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Only job seekers can apply for jobs
    if (session.user.role !== "JOB_SEEKER") {
      return NextResponse.json(
        { error: "Only job seekers can apply for jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const result = applicationSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { jobId, resumeUrl, coverLetter } = result.data;

    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Check if user has already applied for this job
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        applicantId: session.user.id,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied for this job" },
        { status: 409 }
      );
    }

    // Create the application
    const application = await prisma.application.create({
      data: {
        jobId,
        resumeUrl,
        coverLetter,
        applicantId: session.user.id,
      },
      include: {
        job: {
          select: {
            title: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error applying for job:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
} 