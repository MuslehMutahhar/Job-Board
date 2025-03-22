import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

// Create axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for auth cookies
});

// Jobs API
export const jobsApi = {
  // Get all jobs
  getJobs: async (page = 1, limit = 10, search = '') => {
    const response = await api.get(`/api/jobs?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
  },
  
  // Get single job
  getJob: async (id: string) => {
    const response = await api.get(`/api/jobs/${id}`);
    return response.data;
  },
  
  // Create job
  createJob: async (jobData: any) => {
    const response = await api.post('/api/jobs', jobData);
    return response.data;
  },
  
  // Update job
  updateJob: async (id: string, jobData: any) => {
    const response = await api.patch(`/api/jobs/${id}`, jobData);
    return response.data;
  },
  
  // Delete job
  deleteJob: async (id: string) => {
    const response = await api.delete(`/api/jobs/${id}`);
    return response.data;
  },
};

// Applications API
export const applicationsApi = {
  // Get my applications
  getMyApplications: async (page = 1, limit = 10) => {
    const response = await api.get(`/api/applications?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  // Get applications for a job
  getJobApplications: async (jobId: string, page = 1, limit = 10) => {
    const response = await api.get(`/api/applications?jobId=${jobId}&page=${page}&limit=${limit}`);
    return response.data;
  },
  
  // Get single application
  getApplication: async (id: string) => {
    const response = await api.get(`/api/applications/${id}`);
    return response.data;
  },
  
  // Apply for a job
  applyForJob: async (applicationData: any) => {
    const response = await api.post('/api/applications', applicationData);
    return response.data;
  },
  
  // Update application status
  updateApplicationStatus: async (id: string, status: string) => {
    const response = await api.patch(`/api/applications/${id}`, { status });
    return response.data;
  },
  
  // Delete application
  deleteApplication: async (id: string) => {
    const response = await api.delete(`/api/applications/${id}`);
    return response.data;
  },
};

// Companies API
export const companiesApi = {
  // Get all companies
  getCompanies: async (page = 1, limit = 10, search = '') => {
    const response = await api.get(`/api/companies?page=${page}&limit=${limit}&search=${search}`);
    return response.data;
  },
  
  // Get my company profile
  getMyCompany: async () => {
    const response = await api.get('/api/companies?my=true');
    return response.data;
  },
  
  // Get single company
  getCompany: async (id: string) => {
    const response = await api.get(`/api/companies/${id}`);
    return response.data;
  },
  
  // Create/update company profile
  saveCompany: async (companyData: any) => {
    const response = await api.post('/api/companies', companyData);
    return response.data;
  },
  
  // Update company
  updateCompany: async (id: string, companyData: any) => {
    const response = await api.patch(`/api/companies/${id}`, companyData);
    return response.data;
  },
  
  // Delete company
  deleteCompany: async (id: string) => {
    const response = await api.delete(`/api/companies/${id}`);
    return response.data;
  },
};

// Auth API
export const authApi = {
  // Register user
  register: async (userData: any) => {
    const response = await api.post('/api/users/register', userData);
    return response.data;
  },
  
  // Get current user
  getUser: async () => {
    try {
      const response = await api.get('/api/users/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },
  
  // Update user profile
  updateProfile: async (userData: any) => {
    const response = await api.patch('/api/users/me', userData);
    return response.data;
  },
};

export default api; 