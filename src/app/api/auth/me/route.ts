import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

// Add CORS headers to all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

// Handler for GET /api/auth/me
export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Verify the token
    const secret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production';
    
    try {
      // Attempt to verify token with userId field
      const decoded = verify(token, secret) as { userId: string; role: string };
      
      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          // Don't include the password in the response
        }
      });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404, headers: corsHeaders }
        );
      }
      
      // Return user data
      return NextResponse.json({ user }, { headers: corsHeaders });
    } catch (tokenError) {
      // If it fails with userId, try with id field
      try {
        const decoded = verify(token, secret) as { id: string; role: string };
        
        // Get user from database
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            // Don't include the password in the response
          }
        });
        
        if (!user) {
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404, headers: corsHeaders }
          );
        }
        
        // Return user data
        return NextResponse.json({ user }, { headers: corsHeaders });
      } catch (secondTokenError) {
        console.error('Token verification failed:', secondTokenError);
        return NextResponse.json(
          { error: 'Authentication failed' },
          { status: 401, headers: corsHeaders }
        );
      }
    }
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401, headers: corsHeaders }
    );
  }
}

// Handler for OPTIONS requests (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      'Access-Control-Max-Age': '86400',
    },
  });
} 