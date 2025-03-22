import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | null = null;

// Helper function to get the Socket.IO instance
export function getIO() {
  if (!io) {
    io = (global as any).io;
  }
  return io;
}

// Helper function to emit events to specific rooms
export function emitToRoom(room: string, event: string, data: any) {
  const socketIO = getIO();
  if (socketIO) {
    socketIO.to(room).emit(event, data);
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
  const socketIO = getIO();
  if (socketIO) {
    socketIO.emit('newJob', data);
  }
} 