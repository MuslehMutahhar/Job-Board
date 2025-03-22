import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin, {
      path: '/api/socket',
      withCredentials: true,
    });
  }
  return socket;
};

export const useSocket = (): Socket | null => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = initSocket();
    setSocketInstance(socket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socketInstance;
};

// Subscribe to job updates
export const subscribeToJob = (socket: Socket, jobId: string) => {
  if (socket && jobId) {
    socket.emit('subscribe', jobId);
  }
};

// Unsubscribe from job updates
export const unsubscribeFromJob = (socket: Socket, jobId: string) => {
  if (socket && jobId) {
    socket.emit('unsubscribe', jobId);
  }
};

// Subscribe to company updates
export const subscribeToCompany = (socket: Socket, companyId: string) => {
  if (socket && companyId) {
    socket.emit('subscribeCompany', companyId);
  }
};

// Unsubscribe from company updates
export const unsubscribeFromCompany = (socket: Socket, companyId: string) => {
  if (socket && companyId) {
    socket.emit('unsubscribeCompany', companyId);
  }
}; 