import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'COMPANY' | 'JOB_SEEKER';
  image?: string;
}

// Auth store interface
interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

// Create auth store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Actions
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        error: null,
      }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        error: null,
      }),
    }),
    {
      name: 'job-board-auth',
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 