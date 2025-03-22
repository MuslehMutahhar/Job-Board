import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

// Simple in-memory store for rate limiting
// In production, use Redis or another distributed cache
const rateLimit = new Map<string, { count: number; lastReset: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 100; // Maximum requests per minute

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/jobs',
  '/companies',
];

// Routes that are API endpoints and don't require authentication
const publicApiRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/jobs',
  '/api/companies',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public route or API route
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`));
  const isPublicApiRoute = publicApiRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`));
  
  // If it's a public route, no need to verify authentication
  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next();
  }
  
  // Get the token from cookies
  const token = request.cookies.get('auth_token')?.value;
  
  // If there's no token and the route requires auth, redirect to login
  if (!token) {
    // For API routes, return unauthorized response
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // For normal routes, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }
  
  try {
    // Verify the token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_production'
    );
    
    await jwtVerify(token, secret);
    
    // Token is valid, allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    
    // Clear the invalid token
    const response = NextResponse.redirect(
      new URL('/auth/login', request.url)
    );
    
    response.cookies.set({
      name: 'auth_token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });
    
    return response;
  }
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all routes except for:
     * 1. /api/auth/* (authentication API routes)
     * 2. /favicon.ico, /site.webmanifest (static files)
     * 3. /_next/* (Next.js internals)
     * 4. /images/* (public images)
     */
    '/((?!_next|images|favicon.ico|site.webmanifest).*)',
  ],
}; 