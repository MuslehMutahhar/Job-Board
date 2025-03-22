'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, MapPinIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import MainLayout from '@/components/layout/MainLayout';

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  employeeCount: string;
  description: string;
  jobCount: number;
  website: string;
  founded: string;
}

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    size: '',
  });

  // Dummy data for companies
  const dummyCompanies: Company[] = [
    {
      id: '1',
      name: 'TechCorp',
      logo: '/images/TechCorp.jpeg',
      industry: 'Technology',
      location: 'New York, NY',
      employeeCount: '1000-5000',
      description: 'A leading technology company focused on cloud computing and AI solutions.',
      jobCount: 15,
      website: 'https://techcorp.example.com',
      founded: '2005',
    },
    {
      id: '2',
      name: 'WebSolutions',
      logo: '/images/WebSolutions.png',
      industry: 'Web Development',
      location: 'San Francisco, CA',
      employeeCount: '50-200',
      description: 'Specialized web development agency creating custom solutions for businesses.',
      jobCount: 8,
      website: 'https://websolutions.example.com',
      founded: '2012',
    },
    {
      id: '3',
      name: 'DesignHub',
      logo: '/images/DesignHub.jpeg',
      industry: 'Design',
      location: 'Los Angeles, CA',
      employeeCount: '10-50',
      description: 'Creative design studio specializing in UI/UX and brand identity.',
      jobCount: 5,
      website: 'https://designhub.example.com',
      founded: '2015',
    },
    {
      id: '4',
      name: 'DataInsights',
      logo: '/images/DataInsights.png',
      industry: 'Data Analytics',
      location: 'Boston, MA',
      employeeCount: '200-1000',
      description: 'Data analytics firm providing insights and solutions for businesses.',
      jobCount: 10,
      website: 'https://datainsights.example.com',
      founded: '2010',
    },
    {
      id: '5',
      name: 'CloudTech',
      logo: '/images/CloudTech.jpg',
      industry: 'Cloud Services',
      location: 'Seattle, WA',
      employeeCount: '500-1000',
      description: 'Cloud infrastructure and services provider for enterprises.',
      jobCount: 12,
      website: 'https://cloudtech.example.com',
      founded: '2008',
    },
    {
      id: '6',
      name: 'AppWorks',
      logo: '/images/AppsWork.jpeg',
      industry: 'Mobile Development',
      location: 'Austin, TX',
      employeeCount: '20-100',
      description: 'Mobile app development studio creating innovative applications.',
      jobCount: 7,
      website: 'https://appworks.example.com',
      founded: '2013',
    },
    {
      id: '7',
      name: 'ServerSide',
      logo: '/images/ServerSide.png',
      industry: 'Backend Development',
      location: 'Chicago, IL',
      employeeCount: '50-200',
      description: 'Backend infrastructure and services development company.',
      jobCount: 9,
      website: 'https://serverside.example.com',
      founded: '2011',
    },
    {
      id: '8',
      name: 'AISolutions',
      logo: '/images/Ai Solutions.png',
      industry: 'Artificial Intelligence',
      location: 'San Jose, CA',
      employeeCount: '100-500',
      description: 'AI research and development company creating innovative solutions.',
      jobCount: 14,
      website: 'https://aisolutions.example.com',
      founded: '2014',
    },
  ];

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setCompanies(dummyCompanies);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a fetch to the backend
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredCompanies = companies.filter(company => {
    // Filter by search term
    if (searchTerm && !company.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !company.description.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !company.industry.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by industry
    if (filters.industry && company.industry !== filters.industry) {
      return false;
    }
    
    // Filter by location
    if (filters.location && !company.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by size
    if (filters.size && company.employeeCount !== filters.size) {
      return false;
    }
    
    return true;
  });

  // Get unique industries for the filter
  const industries = [...new Set(companies.map(company => company.industry))];
  
  // Get unique employee count ranges for the filter
  const employeeCounts = [...new Set(companies.map(company => company.employeeCount))];

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
                Discover Great Places to <span className="text-blue-600 dark:text-blue-400">Work</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Find your next opportunity at one of our carefully vetted companies.
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
                      placeholder="Company name or industry"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Industry Filter */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={filters.industry}
                  onChange={handleFilterChange}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 sm:text-sm"
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              {/* Location Filter */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City or state"
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                />
              </div>
              
              {/* Company Size Filter */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={filters.size}
                  onChange={handleFilterChange}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 sm:text-sm"
                >
                  <option value="">All Sizes</option>
                  {employeeCounts.map(size => (
                    <option key={size} value={size}>{size} employees</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Clear Filters */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setFilters({
                  industry: '',
                  location: '',
                  size: '',
                })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Companies Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {loading ? 'Loading companies...' : `${filteredCompanies.length} Companies Found`}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredCompanies.length} of {companies.length} companies
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading amazing companies...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <Link 
                  key={company.id}
                  href={`/companies/${company.id}`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-900"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 mr-4">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {company.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{company.industry}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{company.description}</p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        <span>{company.employeeCount} employees</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {company.jobCount} open positions
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Founded {company.founded}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <GlobeAltIcon className="h-4 w-4 mr-1" />
                        <span>{new URL(company.website).hostname}</span>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        View Details
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
                <p className="text-gray-600 dark:text-gray-300 mb-4">No companies found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({
                      industry: '',
                      location: '',
                      size: '',
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
        {filteredCompanies.length > 0 && (
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