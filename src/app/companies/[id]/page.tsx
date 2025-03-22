'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, GlobeAltIcon, MapPinIcon, UserGroupIcon, CalendarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import MainLayout from '@/components/layout/MainLayout';

// Job type for TypeScript
type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP';

interface Job {
  id: string;
  title: string;
  location: string;
  jobType: JobType;
  salary: string;
  department: string;
  postedAt: string;
}

interface CompanySocialMedia {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

interface CompanyDetail {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  industry: string;
  location: string;
  employeeCount: string;
  website: string;
  founded: string;
  description: string;
  mission: string;
  culture: string;
  benefits: string[];
  socialMedia: CompanySocialMedia;
  jobs: Job[];
}

export default function CompanyDetail() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulating API call to fetch company details
    setTimeout(() => {
      // Determine which company data to use based on the ID
      let companyData: CompanyDetail;
      
      switch(params.id) {
        case '1':
          companyData = {
            id: '1',
            name: 'TechCorp',
            logo: '/images/TechCorp.jpeg',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Technology',
            location: 'New York, NY',
            employeeCount: '1000-5000',
            website: 'https://techcorp.example.com',
            founded: '2005',
            description: `
              TechCorp is a leading technology company focused on cloud computing, artificial intelligence, 
              and software development. With a global presence and a team of top-tier engineers, we're 
              building solutions that shape the future of technology.
              
              Our innovative products are used by millions of people worldwide, and we continue to 
              expand our offerings to meet the evolving needs of our customers.
            `,
            mission: `
              Our mission is to create cutting-edge technology solutions that empower businesses and 
              individuals to achieve more. We believe in harnessing the power of innovation to solve 
              complex problems and make a positive impact on the world.
            `,
            culture: `
              At TechCorp, we foster a culture of innovation, collaboration, and continuous learning. 
              We believe in empowering our employees to take risks, think outside the box, and pursue 
              their passions. We value diversity and inclusion, recognizing that different perspectives 
              lead to better solutions.
              
              We offer a flexible work environment that prioritizes work-life balance, and we encourage 
              our team members to grow both personally and professionally.
            `,
            benefits: [
              'Competitive salary and equity packages',
              'Comprehensive health, dental, and vision insurance',
              'Flexible work arrangements with remote options',
              'Unlimited PTO policy',
              'Professional development budget',
              '401(k) matching',
              'Company-sponsored team events and activities',
              'Modern office with free snacks and beverages',
              'Wellness programs and gym membership reimbursement',
              'Parental leave and childcare assistance',
            ],
            socialMedia: {
              linkedin: 'https://linkedin.com/company/techcorp',
              twitter: 'https://twitter.com/techcorp',
              facebook: 'https://facebook.com/techcorp',
              instagram: 'https://instagram.com/techcorp',
            },
            jobs: [
              {
                id: '1',
                title: 'Senior Full Stack Developer',
                location: 'New York, NY (Hybrid)',
                jobType: 'FULL_TIME',
                salary: '$110,000 - $140,000',
                department: 'Engineering',
                postedAt: '2 weeks ago',
              },
              {
                id: '2',
                title: 'UX/UI Designer',
                location: 'Remote',
                jobType: 'FULL_TIME',
                salary: '$90,000 - $120,000',
                department: 'Design',
                postedAt: '1 week ago',
              },
              {
                id: '3',
                title: 'Product Manager',
                location: 'New York, NY',
                jobType: 'FULL_TIME',
                salary: '$120,000 - $150,000',
                department: 'Product',
                postedAt: '3 days ago',
              },
              {
                id: '4',
                title: 'DevOps Engineer',
                location: 'San Francisco, CA',
                jobType: 'FULL_TIME',
                salary: '$100,000 - $130,000',
                department: 'Engineering',
                postedAt: '1 month ago',
              },
            ],
          };
          break;
        case '2':
          companyData = {
            id: '2',
            name: 'WebSolutions',
            logo: '/images/WebSolutions.png',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Web Development',
            location: 'San Francisco, CA',
            employeeCount: '50-200',
            website: 'https://websolutions.example.com',
            founded: '2012',
            description: 'Specialized web development agency creating custom solutions for businesses.',
            mission: 'To deliver exceptional web experiences that drive business growth.',
            culture: 'Collaborative, innovative, and focused on continuous improvement.',
            benefits: [
              'Competitive salary',
              'Health insurance',
              'Flexible work hours',
              'Remote work options',
              'Professional development',
            ],
            socialMedia: {
              linkedin: 'https://linkedin.com/company/websolutions',
              twitter: 'https://twitter.com/websolutions',
            },
            jobs: [
              {
                id: '5',
                title: 'Frontend Developer',
                location: 'Remote',
                jobType: 'CONTRACT',
                salary: '$70,000 - $90,000',
                department: 'Engineering',
                postedAt: '1 week ago',
              },
              {
                id: '8',
                title: 'Frontend Intern',
                location: 'Remote',
                jobType: 'INTERNSHIP',
                salary: '$25/hour',
                department: 'Engineering',
                postedAt: '2 days ago',
              },
            ],
          };
          break;
        case '3':
          companyData = {
            id: '3',
            name: 'DesignHub',
            logo: '/images/DesignHub.jpeg',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Design',
            location: 'Los Angeles, CA',
            employeeCount: '10-50',
            website: 'https://designhub.example.com',
            founded: '2015',
            description: 'Creative design studio specializing in UI/UX and brand identity.',
            mission: 'To create beautiful, functional designs that enhance user experience.',
            culture: 'Creative, collaborative, and user-focused.',
            benefits: [
              'Competitive salary',
              'Health insurance',
              'Flexible work hours',
              'Creative workspace',
            ],
            socialMedia: {
              instagram: 'https://instagram.com/designhub',
              linkedin: 'https://linkedin.com/company/designhub',
            },
            jobs: [
              {
                id: '6',
                title: 'UX/UI Designer',
                location: 'Los Angeles, CA',
                jobType: 'FULL_TIME',
                salary: '$90,000 - $110,000',
                department: 'Design',
                postedAt: '3 days ago',
              },
            ],
          };
          break;
        case '4':
          companyData = {
            id: '4',
            name: 'DataInsights',
            logo: '/images/DataInsights.png',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Data Analytics',
            location: 'Boston, MA',
            employeeCount: '200-1000',
            website: 'https://datainsights.example.com',
            founded: '2010',
            description: 'Data analytics firm providing insights and solutions for businesses.',
            mission: 'To transform data into actionable insights that drive business success.',
            culture: 'Data-driven, collaborative, and innovative.',
            benefits: [
              'Competitive salary',
              'Health insurance',
              'Flexible work hours',
              'Remote work options',
              'Continuous learning',
            ],
            socialMedia: {
              linkedin: 'https://linkedin.com/company/datainsights',
              twitter: 'https://twitter.com/datainsights',
            },
            jobs: [
              {
                id: '7',
                title: 'Data Scientist',
                location: 'Boston, MA',
                jobType: 'FULL_TIME',
                salary: '$100,000 - $130,000',
                department: 'Data Science',
                postedAt: '5 days ago',
              },
            ],
          };
          break;
        case '5':
          companyData = {
            id: '5',
            name: 'CloudTech',
            logo: '/images/CloudTech.jpg',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Cloud Services',
            location: 'Seattle, WA',
            employeeCount: '500-1000',
            website: 'https://cloudtech.example.com',
            founded: '2008',
            description: 'Cloud infrastructure and services provider for enterprises.',
            mission: 'To deliver reliable and scalable cloud solutions that power business growth.',
            culture: 'Innovative, collaborative, and driven by technical excellence.',
            benefits: [
              'Competitive salary',
              'Health insurance',
              'Remote work options',
              'Professional development budget',
              'Stock options',
            ],
            socialMedia: {
              linkedin: 'https://linkedin.com/company/cloudtech',
              twitter: 'https://twitter.com/cloudtech',
            },
            jobs: [
              {
                id: '5',
                title: 'DevOps Engineer',
                location: 'Chicago, IL',
                jobType: 'FULL_TIME',
                salary: '$95,000 - $125,000',
                department: 'Engineering',
                postedAt: '1 week ago',
              },
            ],
          };
          break;
        case '6':
          companyData = {
            id: '6',
            name: 'AppWorks',
            logo: '/images/AppsWork.jpeg',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Mobile Development',
            location: 'Austin, TX',
            employeeCount: '20-100',
            website: 'https://appworks.example.com',
            founded: '2013',
            description: 'Mobile app development studio creating innovative applications.',
            mission: 'To create mobile experiences that delight users and solve real problems.',
            culture: 'Creative, user-focused, and passionate about mobile technology.',
            benefits: [
              'Competitive salary',
              'Health insurance',
              'Flexible work hours',
              'Remote work options',
              'Latest mobile devices for testing',
            ],
            socialMedia: {
              linkedin: 'https://linkedin.com/company/appworks',
              twitter: 'https://twitter.com/appworks',
              instagram: 'https://instagram.com/appworks',
            },
            jobs: [
              {
                id: '6',
                title: 'Mobile Developer',
                location: 'Austin, TX',
                jobType: 'FULL_TIME',
                salary: '$85,000 - $115,000',
                department: 'Development',
                postedAt: '2 weeks ago',
              },
            ],
          };
          break;
        case '8':
          companyData = {
            id: '8',
            name: 'AISolutions',
            logo: '/images/Ai Solutions.png',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Artificial Intelligence',
            location: 'San Jose, CA',
            employeeCount: '100-500',
            website: 'https://aisolutions.example.com',
            founded: '2014',
            description: 'AI research and development company creating innovative solutions.',
            mission: 'To advance artificial intelligence technology that improves human life and work.',
            culture: 'Data-driven, innovative, and focused on ethical AI development.',
            benefits: [
              'Competitive salary',
              'Health insurance',
              'Flexible work hours',
              'Remote work options',
              'Advanced computing resources',
              'Research stipends',
            ],
            socialMedia: {
              linkedin: 'https://linkedin.com/company/aisolutions',
              twitter: 'https://twitter.com/aisolutions',
            },
            jobs: [
              {
                id: '9',
                title: 'AI Research Scientist',
                location: 'San Jose, CA',
                jobType: 'FULL_TIME',
                salary: '$120,000 - $160,000',
                department: 'Research',
                postedAt: '1 week ago',
              },
              {
                id: '10',
                title: 'Machine Learning Engineer',
                location: 'Remote',
                jobType: 'FULL_TIME',
                salary: '$110,000 - $140,000',
                department: 'Engineering',
                postedAt: '3 days ago',
              },
            ],
          };
          break;
        default:
          // If we don't have data for this company ID, use the TechCorp data as a fallback
          companyData = {
            id: params.id as string,
            name: 'TechCorp',
            logo: '/images/TechCorp.jpeg',
            coverImage: '/images/placeholders/cover.jpg',
            industry: 'Technology',
            location: 'New York, NY',
            employeeCount: '1000-5000',
            website: 'https://techcorp.example.com',
            founded: '2005',
            description: 'A leading technology company focused on cloud computing and AI solutions.',
            mission: 'To create cutting-edge technology solutions that empower businesses.',
            culture: 'Innovative, collaborative, and focused on excellence.',
            benefits: [
              'Competitive salary and benefits',
              'Flexible work arrangements',
              'Professional development',
            ],
            socialMedia: {
              linkedin: 'https://linkedin.com/company/techcorp',
            },
            jobs: [],
          };
      }
      
      setCompany(companyData);
      setLoading(false);
    }, 500);
  }, [params.id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!company) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Company Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The company you are looking for doesn't exist or has been removed.</p>
          <Link 
            href="/companies" 
            className="inline-flex items-center py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Companies
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Companies
          </button>
        </div>
        
        {/* Company Header */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="w-full h-48 md:h-64 lg:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img 
              src={company.coverImage} 
              alt={`${company.name} cover`} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Company Logo and Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20 relative z-10 px-4">
            <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 mb-4 md:mb-0 md:mr-6">
              <img 
                src={company.logo} 
                alt={company.name} 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {company.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 dark:text-gray-300">
                <span className="flex items-center">
                  <GlobeAltIcon className="h-5 w-5 mr-1" />
                  {company.industry}
                </span>
                <span className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  {company.location}
                </span>
                <span className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-1" />
                  {company.employeeCount} employees
                </span>
                <span className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-1" />
                  Founded in {company.founded}
                </span>
              </div>
            </div>
            
            {/* Website and Social Media */}
            <div className="mt-4 md:mt-0 md:ml-auto">
              <a 
                href={company.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                Visit Website
              </a>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Jobs ({company.jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'benefits'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Benefits & Culture
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About {company.name}</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{company.description}</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mission</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{company.mission}</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Social Media</h2>
                <div className="flex space-x-4">
                  {company.socialMedia.linkedin && (
                    <a 
                      href={company.socialMedia.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {company.socialMedia.twitter && (
                    <a 
                      href={company.socialMedia.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  )}
                  {company.socialMedia.facebook && (
                    <a 
                      href={company.socialMedia.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </a>
                  )}
                  {company.socialMedia.instagram && (
                    <a 
                      href={company.socialMedia.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Featured Job Openings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.jobs.slice(0, 4).map(job => (
                    <Link 
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{job.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <BriefcaseIcon className="h-4 w-4 mr-1" />
                          <span>{job.department}</span>
                          <span className="mx-2">•</span>
                          <span>{job.jobType.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{job.postedAt}</span>
                          <span className="text-blue-600 dark:text-blue-400 text-sm">Apply</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {company.jobs.length > 4 && (
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => setActiveTab('jobs')}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      View all {company.jobs.length} jobs
                    </button>
                  </div>
                )}
              </section>
            </div>
          )}
          
          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Job Openings</h2>
              {company.jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {company.jobs.map(job => (
                    <Link 
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="block bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{job.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">
                            {job.jobType.replace('_', ' ')}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 dark:text-gray-400 text-sm">{job.postedAt}</span>
                          <span className="text-blue-600 dark:text-blue-400 text-sm">Apply Now</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <p className="text-gray-600 dark:text-gray-300">No current job openings at {company.name}.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Benefits Tab */}
          {activeTab === 'benefits' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Company Culture</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{company.culture}</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Employee Benefits</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {company.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 