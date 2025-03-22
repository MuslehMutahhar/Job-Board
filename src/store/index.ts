import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Job type definition
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  salary?: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP' | 'REMOTE';
  experienceLevel: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  company: {
    name: string;
    logo?: string;
    industry?: string;
    location?: string;
  };
}

// Application type definition
export interface Application {
  id: string;
  resumeUrl: string;
  coverLetter?: string;
  status: 'PENDING' | 'REVIEWED' | 'INTERVIEWING' | 'REJECTED' | 'ACCEPTED';
  createdAt: string;
  job: {
    id: string;
    title: string;
    company: {
      name: string;
      logo?: string;
    };
  };
}

// Company type definition
export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  industry?: string;
  location?: string;
  jobs?: Job[];
}

// Store interface
interface JobStore {
  // Jobs
  jobs: Job[];
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  
  // Selected job
  selectedJob: Job | null;
  
  // My applications
  myApplications: Application[];
  
  // Company
  companies: Company[];
  selectedCompany: Company | null;

  // Actions
  setJobs: (jobs: Job[], total: number, page: number, pages: number) => void;
  setSearchTerm: (term: string) => void;
  setSelectedJob: (job: Job | null) => void;
  setMyApplications: (applications: Application[]) => void;
  setCompanies: (companies: Company[]) => void;
  setSelectedCompany: (company: Company | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
}

// Create the store
export const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
      // Initial state
      jobs: [],
      totalJobs: 0,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      error: null,
      searchTerm: '',
      selectedJob: null,
      myApplications: [],
      companies: [],
      selectedCompany: null,

      // Actions
      setJobs: (jobs, total, page, pages) => set({
        jobs,
        totalJobs: total,
        currentPage: page,
        totalPages: pages,
        isLoading: false,
      }),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedJob: (job) => set({ selectedJob: job }),
      setMyApplications: (applications) => set({ myApplications: applications }),
      setCompanies: (companies) => set({ companies }),
      setSelectedCompany: (company) => set({ selectedCompany: company }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearStore: () => set({
        jobs: [],
        totalJobs: 0,
        currentPage: 1,
        totalPages: 1,
        selectedJob: null,
        myApplications: [],
        companies: [],
        selectedCompany: null,
        searchTerm: '',
        error: null,
      }),
    }),
    {
      name: 'job-board-store',
      partialize: (state) => ({
        searchTerm: state.searchTerm,
      }),
    }
  )
); 