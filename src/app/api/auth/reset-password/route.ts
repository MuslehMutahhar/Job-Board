import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define schema for request validation
const resetPasswordSchema = z.object({
  token: z.string().min(1, { message: "Token is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = resetPasswordSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.errors },
        { status: 400 }
      );
    }

    const { token, password } = result.data;

    // In a real application, you would:
    // 1. Verify the token from a password_reset_tokens table
    // 2. Check if the token is valid and not expired
    // 3. Find the user associated with the token
    
    // For this demo, assume we have a valid token that corresponds to a user
    // In a real app, you would look up the token in your database
    const user = await prisma.user.findFirst({
      where: {
        // This is just an example - in a real app you'd lookup the token in a separate table
        // and get the associated user ID
        id: "example-user-id-associated-with-token"
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // In a real app, you would also invalidate the token after use
    // await prisma.passwordResetToken.delete({
    //   where: { token },
    // });

    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 