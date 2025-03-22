import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for company update
const updateCompanySchema = z.object({
  name: z.string().min(2).optional(),
  logo: z.string().url().optional().nullable(),
  website: z.string().url().optional().nullable(),
  description: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
});

// GET - Fetch a single company by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        jobs: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            location: true,
            jobType: true,
            createdAt: true,
            salary: true,
            _count: {
              select: {
                applications: true,
              },
            },
          },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Failed to fetch company" },
      { status: 500 }
    );
  }
}

// PATCH - Update a company profile
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

    // Find the company to check ownership
    const company = await prisma.company.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    // Check authorization (admin or owner of the company)
    const isAuthorized = 
      session.user.role === "ADMIN" || 
      company.userId === session.user.id;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Not authorized to update this company" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const result = updateCompanySchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { name, logo, website, description, industry, location } = result.data;

    // Update the company profile
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(logo !== undefined && { logo }),
        ...(website !== undefined && { website }),
        ...(description !== undefined && { description }),
        ...(industry !== undefined && { industry }),
        ...(location !== undefined && { location }),
      },
    });

    return NextResponse.json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Failed to update company" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a company profile (admin only)
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

    // Only admin can delete company profiles
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only administrators can delete company profiles" },
        { status: 403 }
      );
    }

    // Delete the company (all related jobs and applications will be cascade deleted due to our schema)
    await prisma.company.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
} 