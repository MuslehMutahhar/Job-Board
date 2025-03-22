import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for job creation
const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  requirements: z.array(z.string()),
  responsibilities: z.array(z.string()),
  location: z.string(),
  salary: z.string().optional(),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]),
  experienceLevel: z.string(),
  skills: z.array(z.string()),
  deadline: z.string().optional(),
  companyId: z.string(),
});

// GET - Fetch all jobs with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    // Build the where condition for search
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Count total jobs matching the search criteria
    const totalJobs = await prisma.job.count({ where });

    // Fetch jobs with pagination
    const jobs = await prisma.job.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
            industry: true,
            location: true,
          },
        },
      },
    });

    return NextResponse.json({
      jobs,
      pagination: {
        total: totalJobs,
        pages: Math.ceil(totalJobs / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

// POST - Create a new job
export async function POST(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (session.user.role !== "ADMIN" && session.user.role !== "COMPANY") {
      return NextResponse.json(
        { error: "Not authorized to create jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const result = jobSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { 
      title, 
      description, 
      requirements, 
      responsibilities, 
      location, 
      salary, 
      jobType, 
      experienceLevel, 
      skills, 
      deadline, 
      companyId 
    } = result.data;

    // Create the job
    const job = await prisma.job.create({
      data: {
        title,
        description,
        requirements,
        responsibilities,
        location,
        salary,
        jobType,
        experienceLevel,
        skills,
        deadline: deadline ? new Date(deadline) : undefined,
        companyId,
        postedById: session.user.id,
      },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Job created successfully", job },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
} 