import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for application update
const updateApplicationSchema = z.object({
  status: z.enum(["PENDING", "REVIEWED", "INTERVIEWING", "REJECTED", "ACCEPTED"]).optional(),
  coverLetter: z.string().optional(),
});

// GET - Fetch a single application by ID
export async function GET(
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

    // Find the application
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
                userId: true,
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

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Check authorization
    const isApplicant = application.applicantId === session.user.id;
    const isCompany = application.job.company.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (!isApplicant && !isCompany && !isAdmin) {
      return NextResponse.json(
        { error: "Not authorized to view this application" },
        { status: 403 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 }
    );
  }
}

// PATCH - Update application status (for companies or admin)
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

    // Find the application to check permissions
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            company: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const result = updateApplicationSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { status, coverLetter } = result.data;

    // For status updates, only company or admin can update
    if (status) {
      const isCompany = application.job.company.userId === session.user.id;
      const isAdmin = session.user.role === "ADMIN";

      if (!isCompany && !isAdmin) {
        return NextResponse.json(
          { error: "Not authorized to update application status" },
          { status: 403 }
        );
      }
    }

    // For cover letter updates, only the applicant can update
    if (coverLetter !== undefined) {
      const isApplicant = application.applicantId === session.user.id;
      
      if (!isApplicant) {
        return NextResponse.json(
          { error: "Only the applicant can update the cover letter" },
          { status: 403 }
        );
      }
    }

    // Update the application
    const updatedApplication = await prisma.application.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(coverLetter !== undefined && { coverLetter }),
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
        applicant: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

// DELETE - Delete an application
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

    // Find the application to check permissions
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            company: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Check authorization (applicant, company, or admin can delete)
    const isApplicant = application.applicantId === session.user.id;
    const isCompany = application.job.company.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (!isApplicant && !isCompany && !isAdmin) {
      return NextResponse.json(
        { error: "Not authorized to delete this application" },
        { status: 403 }
      );
    }

    // Delete the application
    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
} 