'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { BookmarkIcon, ShareIcon, ArrowLeftIcon, BriefcaseIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
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
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedAt: string;
  skills: string[];
  applicationUrl?: string;
  department?: string;
  experience?: string;
}

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
  });

  useEffect(() => {
    // Simulating API call to fetch job details
    setTimeout(() => {
      // This would be replaced with an actual API call in a real app
      const dummyJob: Job = {
        id: params.id as string,
        title: 'Full Stack Developer',
        company: 'TechCorp',
        companyId: '1',
        logo: '/images/TechCorp.jpeg',
        location: 'New York, NY',
        jobType: 'FULL_TIME' as JobType,
        salary: '$80,000 - $120,000',
        department: 'Engineering',
        experience: '3-5 years',
        postedAt: '2 days ago',
        description: `
          We are looking for a skilled Full Stack Developer to join our growing team at TechCorp.
          
          As a Full Stack Developer, you'll be responsible for developing and maintaining web applications,
          working with both front-end and back-end technologies. You'll collaborate with cross-functional
          teams to build high-quality products.

          Key responsibilities:
          - Develop and maintain web applications using modern frameworks and technologies
          - Write clean, maintainable, and efficient code
          - Optimize applications for maximum speed and scalability
          - Implement security and data protection
          - Collaborate with cross-functional teams to define, design, and ship new features
        `,
        responsibilities: [
          'Design, develop, and maintain scalable web applications using modern technologies',
          'Collaborate with product managers, designers, and other engineers to deliver high-quality features',
          'Write clean, maintainable, and efficient code following best practices',
          'Perform code reviews and provide constructive feedback to team members',
          'Mentor junior developers and contribute to technical discussions',
          'Troubleshoot and debug applications to optimize performance',
          'Stay up-to-date with emerging trends and technologies in web development',
        ],
        requirements: [
          '5+ years of experience in full-stack web development',
          'Proficiency in JavaScript/TypeScript, React, and Node.js',
          'Strong understanding of RESTful APIs and microservices architecture',
          'Experience with SQL and NoSQL databases (MongoDB, PostgreSQL)',
          'Knowledge of modern frontend frameworks and responsive design',
          'Familiarity with version control systems (Git) and CI/CD pipelines',
          'Strong problem-solving skills and attention to detail',
          'Excellent communication and teamwork abilities',
          'Bachelor\'s degree in Computer Science or related field (or equivalent experience)',
        ],
        benefits: [
          'Competitive salary and equity package',
          'Comprehensive health, dental, and vision insurance',
          'Flexible work arrangements with remote options',
          'Unlimited PTO policy',
          'Professional development budget',
          '401(k) matching',
          'Company-sponsored team events and activities',
          'Modern office with free snacks and beverages',
        ],
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'REST APIs', 'Git', 'Docker'],
        applicationUrl: '/api/jobs/apply/1',
      };
      
      setJob(dummyJob);
      setLoading(false);
    }, 800);
  }, [params.id]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // In a real app, you would save this preference to the user's profile
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog or copy link to clipboard
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);
    
    // Simulate API call for application submission
    setTimeout(() => {
      setApplying(false);
      setApplicationSubmitted(true);
      
      // In a real app, this would be an actual API call to submit the application
      console.log('Application submitted:', formData);
    }, 1500);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The job you are looking for doesn't exist or has been removed.</p>
          <Link 
            href="/jobs" 
            className="inline-flex items-center py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Jobs
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
            Back to Jobs
          </button>
        </div>
        
        {/* Job Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:mr-6 mb-4 md:mb-0">
              <img 
                src={job.logo} 
                alt={job.company} 
                className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover" 
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Link 
                  href={`/companies/${job.companyId}`}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <BuildingOfficeIcon className="h-5 w-5 mr-1" />
                  {job.company}
                </Link>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <ClockIcon className="h-5 w-5 mr-1" />
                  Posted {job.postedAt}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {job.jobType.replace('_', ' ')}
                </span>
                {job.skills.slice(0, 4).map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
                {job.skills.length > 4 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    +{job.skills.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const applicationSection = document.getElementById('application-section');
                    if (applicationSection) {
                      applicationSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Apply Now
                </button>
                <button
                  onClick={handleBookmark}
                  className="py-2 px-4 flex items-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {bookmarked ? (
                    <BookmarkSolidIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <BookmarkIcon className="h-5 w-5 mr-2" />
                  )}
                  {bookmarked ? 'Saved' : 'Save Job'}
                </button>
                <button
                  onClick={handleShare}
                  className="py-2 px-4 flex items-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <ShareIcon className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{job.description}</p>
              </div>
            </section>
            
            {/* Responsibilities */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="pl-2">{item}</li>
                ))}
              </ul>
            </section>
            
            {/* Requirements */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {job.requirements.map((item, index) => (
                  <li key={index} className="pl-2">{item}</li>
                ))}
              </ul>
            </section>
            
            {/* Benefits */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {job.benefits.map((item, index) => (
                  <li key={index} className="pl-2">{item}</li>
                ))}
              </ul>
            </section>
          </div>
          
          {/* Application Form */}
          <div className="lg:col-span-1">
            <div id="application-section" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4">
              {applicationSubmitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for applying to this position. The company will review your application and contact you soon.
                  </p>
                  <Link 
                    href="/jobs" 
                    className="inline-flex items-center py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Browse More Jobs
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Apply for this Job</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Resume/CV (PDF)
                      </label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
                      />
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cover Letter (optional)
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={4}
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400 sm:text-sm"
                        placeholder="Tell us why you're a good fit for this position..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={applying}
                      className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {applying ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 