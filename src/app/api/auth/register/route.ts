import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define schema for request validation
const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  userType: z.enum(["JOB_SEEKER", "COMPANY"], {
    errorMap: () => ({ message: "User type must be either JOB_SEEKER or COMPANY." }),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = registerSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password, userType } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Map userType to role
    const role = userType === 'COMPANY' ? 'COMPANY' : 'USER';

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // If user type is company, create a company profile
    if (userType === 'COMPANY') {
      await prisma.company.create({
        data: {
          name,
          userId: user.id,
        },
      });
    } else {
      // Create job seeker profile
      await prisma.jobSeeker.create({
        data: {
          userId: user.id,
        },
      });
    }

    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 