import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for company update
const updateCompanySchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
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
          select: {
            id: true,
            title: true,
            location: true,
            type: true,
            createdAt: true,
            salary: true,
            _count: {
              select: {
                applications: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            jobs: true,
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

// PATCH - Update a company
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

    // Check authorization (admin or company owner)
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

    const { 
      name, 
      description, 
      industry, 
      location, 
      website, 
      logo 
    } = result.data;

    // Update the company
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(industry && { industry }),
        ...(location && { location }),
        ...(website && { website }),
        ...(logo && { logo }),
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

// DELETE - Delete a company
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

    // Check authorization (admin or company owner)
    const isAuthorized = 
      session.user.role === "ADMIN" || 
      company.userId === session.user.id;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Not authorized to delete this company" },
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