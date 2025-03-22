'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import MainLayout from '@/components/layout/MainLayout';

// Job types for TypeScript
type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP';

interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  logo: string;
  location: string;
  jobType: JobType;
  salary: string;
  description: string;
  postedAt: string;
  skills: string[];
}

export default function Jobs() {
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: [] as JobType[],
    location: '',
    minSalary: '',
    maxSalary: '',
  });

  // Dummy data for jobs
  const dummyJobs: Job[] = [
    {
      id: '1',
      title: 'Full Stack Developer',
      company: 'TechCorp',
      companyId: '1',
      logo: '/images/TechCorp.jpeg',
      location: 'New York, NY',
      jobType: 'FULL_TIME',
      salary: '$80,000 - $120,000',
      description: 'We are looking for a Full Stack Developer to join our team...',
      postedAt: '2 days ago',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'WebSolutions',
      companyId: '2',
      logo: '/images/WebSolutions.png',
      location: 'Remote',
      jobType: 'CONTRACT',
      salary: '$70,000 - $90,000',
      description: 'WebSolutions is seeking a Frontend Developer...',
      postedAt: '1 week ago',
      skills: ['React', 'CSS', 'JavaScript', 'HTML'],
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'DesignHub',
      companyId: '3',
      logo: '/images/DesignHub.jpeg',
      location: 'San Francisco, CA',
      jobType: 'FULL_TIME',
      salary: '$90,000 - $110,000',
      description: 'Join our design team to create beautiful user experiences...',
      postedAt: '3 days ago',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'DataInsights',
      companyId: '4',
      logo: '/images/DataInsights.png',
      location: 'Boston, MA',
      jobType: 'FULL_TIME',
      salary: '$100,000 - $130,000',
      description: 'Work on cutting-edge data projects and machine learning models...',
      postedAt: '5 days ago',
      skills: ['Python', 'TensorFlow', 'Data Analysis', 'Machine Learning'],
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      companyId: '5',
      logo: '/images/CloudTech.jpg',
      location: 'Chicago, IL',
      jobType: 'FULL_TIME',
      salary: '$95,000 - $125,000',
      description: 'Join our infrastructure team to build and maintain cloud solutions...',
      postedAt: '1 week ago',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    },
    {
      id: '6',
      title: 'Mobile Developer',
      company: 'AppWorks',
      companyId: '6',
      logo: '/images/AppsWork.jpeg',
      location: 'Austin, TX',
      jobType: 'FULL_TIME',
      salary: '$85,000 - $115,000',
      description: 'Build native mobile applications for iOS and Android...',
      postedAt: '2 weeks ago',
      skills: ['React Native', 'Swift', 'Kotlin', 'Mobile Development'],
    },
    {
      id: '7',
      title: 'Backend Developer',
      company: 'ServerSide',
      companyId: '7',
      logo: '/images/ServerSide.png',
      location: 'Seattle, WA',
      jobType: 'FULL_TIME',
      salary: '$90,000 - $120,000',
      description: 'Develop robust backend services and APIs...',
      postedAt: '3 days ago',
      skills: ['Node.js', 'Python', 'Java', 'Databases'],
    },
    {
      id: '8',
      title: 'Frontend Intern',
      company: 'WebSolutions',
      companyId: '2',
      logo: '/images/WebSolutions.png',
      location: 'Remote',
      jobType: 'INTERNSHIP',
      salary: '$25/hour',
      description: 'Learn and grow as a frontend developer in our internship program...',
      postedAt: '2 days ago',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
  ];

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setJobs(dummyJobs);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a fetch to the backend
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'jobType') {
      const jobType = value as JobType;
      setFilters(prev => {
        const jobTypes = [...prev.jobType];
        if ((e.target as HTMLInputElement).checked) {
          jobTypes.push(jobType);
        } else {
          const index = jobTypes.indexOf(jobType);
          if (index > -1) {
            jobTypes.splice(index, 1);
          }
        }
        return { ...prev, jobType: jobTypes };
      });
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  const filteredJobs = jobs.filter(job => {
    // Filter by search term
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Filter by job type
    if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
      return false;
    }
    
    // Filter by location
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <MainLayout>
      <div className="px-4 py-8">
        <div className="relative mb-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 opacity-90 rounded-3xl"></div>
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100 to-transparent dark:from-blue-900/20"></div>
          </div>

          <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Find Your Perfect <span className="text-blue-600 dark:text-blue-400">Career</span> Match
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Browse through thousands of opportunities and discover your next career move.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-3 mb-4">
                <form onSubmit={handleSearch} className="flex-grow flex gap-3">
                  <div className="relative flex-grow">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Job title, keyword, or company"
                      className="block w-full rounded-lg border-0 py-4 pl-12 pr-4 text-gray-900 bg-white dark:bg-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-4 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                  >
                    Search
                  </button>
                </form>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="py-4 px-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center shadow-sm transition-colors duration-200"
                >
                  <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        {isFilterOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8 p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Refine Your Search</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Job Type Filter */}
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Job Type</h4>
                <div className="space-y-2">
                  {['FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP'].map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        id={`job-type-${type}`}
                        name="jobType"
                        value={type}
                        type="checkbox"
                        checked={filters.jobType.includes(type as JobType)}
                        onChange={handleFilterChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-400"
                      />
                      <label
                        htmlFor={`job-type-${type}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {type.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location Filter */}
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Location</h4>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City, state, or remote"
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                />
              </div>
              
              {/* Salary Range Filter */}
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Salary Range</h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="minSalary"
                    value={filters.minSalary}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                  />
                  <input
                    type="number"
                    name="maxSalary"
                    value={filters.maxSalary}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({
                    jobType: [],
                    location: '',
                    minSalary: '',
                    maxSalary: '',
                  })}
                  className="w-full py-3 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Job Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {loading ? 'Loading jobs...' : `${filteredJobs.length} Jobs Found`}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Finding amazing opportunities...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Link 
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-900"
                >
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-lg p-1 mr-4">
                        <img 
                          src={job.logo} 
                          alt={job.company} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{job.company}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {job.jobType.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {job.salary}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{job.postedAt}</span>
                      <span className="inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        Apply Now
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="mb-4">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">No jobs found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      jobType: [],
                      location: '',
                      minSalary: '',
                      maxSalary: '',
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                >
                  Clear Search & Filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                1
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                2
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                3
              </button>
              <span className="px-4 py-2 text-gray-500 dark:text-gray-400">...</span>
              <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 