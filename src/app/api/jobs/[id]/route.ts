import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "zod";

// Schema for job update
const updateJobSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  requirements: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
  location: z.string().optional(),
  salary: z.string().optional().nullable(),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"]).optional(),
  experienceLevel: z.string().optional(),
  skills: z.array(z.string()).optional(),
  deadline: z.string().optional().nullable(),
});

// GET - Fetch a single job by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            name: true,
            logo: true,
            industry: true,
            location: true,
            website: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
            createdAt: true,
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

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { error: "Failed to fetch job" },
      { status: 500 }
    );
  }
}

// PATCH - Update a job
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find the job to check ownership
    const job = await prisma.job.findUnique({
      where: { id },
      select: { postedById: true, companyId: true },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Check authorization (admin, owner of the job, or company that posted the job)
    const isAuthorized = 
      session.user.role === "ADMIN" || 
      job.postedById === session.user.id;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Not authorized to update this job" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const result = updateJobSchema.safeParse(body);
    
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
      deadline
    } = result.data;

    // Update the job
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(requirements && { requirements }),
        ...(responsibilities && { responsibilities }),
        ...(location && { location }),
        ...(salary !== undefined && { salary }),
        ...(jobType && { jobType }),
        ...(experienceLevel && { experienceLevel }),
        ...(skills && { skills }),
        ...(deadline !== undefined && { 
          deadline: deadline ? new Date(deadline) : null 
        }),
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

    return NextResponse.json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a job
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find the job to check ownership
    const job = await prisma.job.findUnique({
      where: { id },
      select: { postedById: true, companyId: true },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Check authorization (admin, owner of the job, or company that posted the job)
    const isAuthorized = 
      session.user.role === "ADMIN" || 
      job.postedById === session.user.id;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Not authorized to delete this job" },
        { status: 403 }
      );
    }

    // Delete the job (all related applications will be cascade deleted due to our schema)
    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
} 