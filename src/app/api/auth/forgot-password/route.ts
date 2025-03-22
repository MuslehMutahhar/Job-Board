import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
// import { sendEmail } from "@/lib/email"; // You would implement this in a real app

// Define schema for request validation
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = forgotPasswordSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Important security note: Don't reveal whether a user exists or not
    // Always return success even if the user doesn't exist
    if (!user) {
      return NextResponse.json(
        { message: "If your email is in our system, you will receive a password reset link shortly." },
        { status: 200 }
      );
    }

    // Generate a random token
    const token = crypto.randomUUID();
    const expiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    // In a real app, you would store this token in your database
    // Example:
    // await prisma.passwordResetToken.create({
    //   data: {
    //     token,
    //     expires: expiry,
    //     userId: user.id
    //   }
    // });

    // Build the reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    // In a real app, you would send an email with the reset link
    // Example:
    // await sendEmail({
    //   to: email,
    //   subject: 'Reset your password',
    //   text: `Please use the following link to reset your password: ${resetUrl}`,
    //   html: `<p>Please use the following link to reset your password:</p><p><a href="${resetUrl}">Reset Password</a></p>`
    // });

    // For the demo, just log the reset URL
    console.log(`Password reset URL for ${email}: ${resetUrl}`);

    return NextResponse.json(
      { message: "If your email is in our system, you will receive a password reset link shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 