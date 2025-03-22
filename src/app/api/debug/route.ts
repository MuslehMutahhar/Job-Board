import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';

// Debug headers to diagnose fetch issues
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

// Simple debug endpoint that returns basic info to test API functionality
export async function GET(request: NextRequest) {
  try {
    // Get request headers
    const headersList = headers();
    const allHeaders = Array.from(headersList.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    // Get cookies
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    const cookieInfo = allCookies.map(c => ({
      name: c.name,
      hasValue: !!c.value,
      value: c.value,
    }));
    
    // Return various diagnostic information
    return NextResponse.json({
      headers: allHeaders,
      cookies: cookieInfo,
      url: request.url,
      method: request.method,
      nextUrl: {
        pathname: request.nextUrl.pathname,
        search: request.nextUrl.search,
        searchParams: Object.fromEntries(request.nextUrl.searchParams),
      },
    });
  } catch (error) {
    console.error("Debug endpoint error:", error);
    return NextResponse.json(
      { error: "Failed to get debug information" },
      { status: 500 }
    );
  }
}

// CORS preflight handler
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      'Access-Control-Max-Age': '86400',
    },
  });
} 