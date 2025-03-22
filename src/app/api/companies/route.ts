import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

// Schema for company creation/update
const companySchema = z.object({
  name: z.string().min(2),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  description: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
});

// GET - Fetch all companies or the current user's company
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const my = searchParams.get("my");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    // For "my" company, require authentication
    if (my === "true") {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      const company = await prisma.company.findUnique({
        where: { userId: session.user.id },
        include: {
          jobs: {
            select: {
              id: true,
              title: true,
              location: true,
              type: true,
              createdAt: true,
              _count: {
                select: {
                  applications: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 5,
          },
        },
      });

      if (!company) {
        return NextResponse.json(
          { error: "Company profile not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(company);
    }

    // Build the where condition for search
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { industry: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Count total companies matching the search criteria
    const totalCompanies = await prisma.company.count({ where });

    // Fetch companies with pagination
    const companies = await prisma.company.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            jobs: true,
          },
        },
      },
    });

    return NextResponse.json({
      companies,
      pagination: {
        total: totalCompanies,
        pages: Math.ceil(totalCompanies / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 }
    );
  }
}

// POST - Create or update company profile
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

    // Check if user has appropriate role
    if (session.user.role !== "COMPANY" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Only company accounts can create a company profile" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const result = companySchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { name, logo, website, description, industry, location } = result.data;

    // Check if user already has a company profile
    const existingCompany = await prisma.company.findUnique({
      where: { userId: session.user.id },
    });

    let company;

    if (existingCompany) {
      // Update existing company profile
      company = await prisma.company.update({
        where: { id: existingCompany.id },
        data: {
          name,
          logo,
          website,
          description,
          industry,
          location,
        },
      });

      return NextResponse.json({
        message: "Company profile updated successfully",
        company,
      });
    } else {
      // Create new company profile
      company = await prisma.company.create({
        data: {
          name,
          logo,
          website,
          description,
          industry,
          location,
          userId: session.user.id,
        },
      });

      return NextResponse.json(
        { message: "Company profile created successfully", company },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating/updating company profile:", error);
    return NextResponse.json(
      { error: "Failed to create/update company profile" },
      { status: 500 }
    );
  }
} 