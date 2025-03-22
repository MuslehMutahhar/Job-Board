import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/types/next';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

let io: SocketIOServer | null = null;

export async function GET() {
  // This endpoint is just to initialize the Socket.IO server
  if (!io) {
    // NextResponse object has access to the raw res object via _netServer
    const res = NextResponse.next();
    const httpServer = res._netServer as NetServer;

    io = new SocketIOServer(httpServer, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Join job-specific rooms
      socket.on('subscribe', (jobId: string) => {
        socket.join(`job-${jobId}`);
        console.log(`Client ${socket.id} subscribed to job-${jobId}`);
      });

      // Leave job-specific rooms
      socket.on('unsubscribe', (jobId: string) => {
        socket.leave(`job-${jobId}`);
        console.log(`Client ${socket.id} unsubscribed from job-${jobId}`);
      });

      // Join company-specific rooms
      socket.on('subscribeCompany', (companyId: string) => {
        socket.join(`company-${companyId}`);
        console.log(`Client ${socket.id} subscribed to company-${companyId}`);
      });

      // Disconnect handling
      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    // Store the IO server globally
    (global as any).io = io;
  } else {
    // If io is already initialized, use the existing instance
    io = (global as any).io;
  }

  return new Response('Socket.IO server running', { status: 200 });
}

// Helper function to emit events to specific rooms
export function emitToRoom(room: string, event: string, data: any) {
  if (!io) {
    io = (global as any).io;
  }
  if (io) {
    io.to(room).emit(event, data);
  }
}

// Helper function to emit job updates
export function emitJobUpdate(jobId: string, data: any) {
  emitToRoom(`job-${jobId}`, 'jobUpdate', data);
}

// Helper function to emit company updates
export function emitCompanyUpdate(companyId: string, data: any) {
  emitToRoom(`company-${companyId}`, 'companyUpdate', data);
}

// Helper function to emit new job notifications
export function emitNewJob(data: any) {
  if (!io) {
    io = (global as any).io;
  }
  if (io) {
    io.emit('newJob', data);
  }
} 