import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for application creation
const applicationSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string(),
});

// GET - Fetch all applications for a user or company
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
    const companyId = searchParams.get("companyId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build where conditions based on query parameters and user role
    let where: any = {};

    // If jobId is provided, filter by job
    if (jobId) {
      where.jobId = jobId;
    }

    // If companyId is provided and user has permission, filter by company
    if (companyId) {
      where.job = {
        companyId,
      };
    }

    // If status is provided, filter by status
    if (status) {
      where.status = status;
    }

    // For regular users, only show their own applications
    if (session.user.role === "USER") {
      where.userId = session.user.id;
    }
    // For company users, only show applications for their jobs
    else if (session.user.role === "COMPANY") {
      where.job = {
        ...where.job,
        company: {
          userId: session.user.id,
        },
      };
    }
    // Admin can see all applications

    // Count total applications matching the criteria
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
                id: true,
                name: true,
                logo: true,
              },
            },
          },
        },
        user: {
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

    // Only regular users can create applications
    if (session.user.role !== "USER") {
      return NextResponse.json(
        { error: "Only users can create applications" },
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

    const { jobId, coverLetter } = result.data;

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        company: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Check if user has already applied to this job
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: session.user.id,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this job" },
        { status: 400 }
      );
    }

    // Create the application
    const application = await prisma.application.create({
      data: {
        jobId,
        userId: session.user.id,
        coverLetter,
        status: "PENDING",
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
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Application submitted successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
} 