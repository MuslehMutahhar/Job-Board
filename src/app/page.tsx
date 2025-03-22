'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ArrowRightIcon, MapPinIcon } from '@heroicons/react/24/outline';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Dummy featured jobs for demonstration
  const featuredJobs = [
    {
      id: '1',
      title: 'Full Stack Developer',
      company: 'TechCorp',
      logo: '/images/TechCorp.jpeg',
      location: 'New York, NY',
      jobType: 'FULL_TIME',
      salary: '$80,000 - $120,000',
      postedAt: '2 days ago',
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'WebSolutions',
      logo: '/images/WebSolutions.png',
      location: 'Remote',
      jobType: 'CONTRACT',
      salary: '$70,000 - $90,000',
      postedAt: '1 week ago',
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'DesignHub',
      logo: '/images/DesignHub.jpeg',
      location: 'San Francisco, CA',
      jobType: 'FULL_TIME',
      salary: '$90,000 - $110,000',
      postedAt: '3 days ago',
    },
    {
      id: '4',
      title: 'Data Scientist',
      company: 'DataInsights',
      logo: '/images/DataInsights.png',
      location: 'Boston, MA',
      jobType: 'FULL_TIME',
      salary: '$100,000 - $130,000',
      postedAt: '5 days ago',
    },
  ];

  // Dummy featured companies for demonstration
  const featuredCompanies = [
    {
      id: '1',
      name: 'TechCorp',
      logo: '/images/TechCorp.jpeg',
      industry: 'Technology',
      jobCount: 15,
    },
    {
      id: '2',
      name: 'WebSolutions',
      logo: '/images/WebSolutions.png',
      industry: 'Web Development',
      jobCount: 8,
    },
    {
      id: '5',
      name: 'CloudTech',
      logo: '/images/CloudTech.jpg',
      industry: 'Cloud Services',
      jobCount: 12,
    },
    {
      id: '6',
      name: 'AppWorks',
      logo: '/images/AppsWork.jpeg',
      industry: 'Mobile Development',
      jobCount: 7,
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 opacity-90"></div>
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-100 to-transparent dark:from-blue-900/20"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-indigo-100 to-transparent dark:from-indigo-900/20"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your <span className="text-blue-600 dark:text-blue-400">Dream Job</span> Today
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Join thousands of professionals who've found their perfect career match. 
            Your next opportunity is just a click away.
          </p>
          
          {/* Search Form with enhanced styling */}
          <form 
            onSubmit={handleSearch}
            className="max-w-3xl mx-auto flex gap-3 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
          >
            <div className="relative flex-grow">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, keyword, or company"
                className="block w-full rounded-lg border-0 py-4 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="py-4 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Search Jobs
            </button>
          </form>

          {/* Quick Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10k+</div>
              <div className="text-gray-600 dark:text-gray-400">Job Seekers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 rounded-3xl mb-16">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Jobs</h2>
            <p className="text-gray-600 dark:text-gray-300">Handpicked opportunities from top companies</p>
          </div>
          <Link 
            href="/jobs" 
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            View all jobs
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredJobs.map((job) => (
            <Link 
              key={job.id} 
              href={`/jobs/${job.id}`} 
              className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-900"
            >
              <div className="flex items-start mb-4">
                <img 
                  src={job.logo} 
                  alt={job.company} 
                  className="w-12 h-12 rounded-lg mr-4 object-cover border border-gray-100 dark:border-gray-700" 
                />
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
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {job.jobType.replace('_', ' ')}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{job.postedAt}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Apply Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Companies Section */}
      <section className="py-16">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Companies</h2>
            <p className="text-gray-600 dark:text-gray-300">Leading employers actively hiring</p>
          </div>
          <Link 
            href="/companies" 
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            View all companies
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featuredCompanies.map((company) => (
            <Link 
              key={company.id} 
              href={`/companies/${company.id}`} 
              className="group flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-8 border border-gray-100 dark:border-gray-700 hover:border-blue-100 dark:hover:border-blue-900"
            >
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-700 rounded-xl p-2 mb-6">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-full h-full object-contain" 
                />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 text-center">
                {company.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 text-center">{company.industry}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {company.jobCount} jobs
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800 rounded-3xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-16 max-w-2xl mx-auto">
          Your journey to the perfect job in three simple steps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create an Account</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xs">
              Sign up as a job seeker or company to unlock all features and start your journey.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Find or Post Jobs</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xs">
              Browse through curated job listings or post your openings to reach qualified candidates.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Apply or Hire</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-xs">
              Submit applications with your profile or review candidates to build your dream team.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link
            href="/auth/register"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200 text-lg"
          >
            Get Started Now
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
