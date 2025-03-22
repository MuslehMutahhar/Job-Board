import { NextRequest, NextResponse } from 'next/server';

// Debug headers to diagnose fetch issues
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

// Simple debug endpoint that returns basic info to test API functionality
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const echo = searchParams.get('echo') || 'Hello World';
  
  // Get basic environment info
  const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasJwtSecret: !!process.env.JWT_SECRET,
    authUrl: process.env.NEXTAUTH_URL || 'not-set',
  };
  
  // Check if cookies are working
  const cookieStore = request.cookies;
  const cookies = Array.from(cookieStore.getAll()).map(c => ({
    name: c.name,
    hasValue: !!c.value,
    path: c.path || '/',
  }));
  
  // Return various diagnostic information
  return NextResponse.json({
    message: 'Debug endpoint is working',
    timestamp: new Date().toISOString(),
    echo,
    env,
    cookies,
    headers: Object.fromEntries(request.headers),
  }, { headers });
}

// CORS preflight handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...headers,
      'Access-Control-Max-Age': '86400',
    },
  });
} 