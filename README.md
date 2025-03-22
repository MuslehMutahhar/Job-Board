# NextJS Job Board Application

![Job Board Banner](https://github.com/yourusername/job-board/raw/main/public/images/banner.png)

A modern, full-stack job board platform built with Next.js 15, TypeScript, Tailwind CSS, and Prisma ORM. This application allows job seekers to search and apply for jobs, companies to post job listings, and provides a comprehensive authentication system.

## 🚀 Features

### For Job Seekers
- **Job Search & Filter**: Search jobs by title, company, or keyword, with advanced filtering options for job type, location, and salary range
- **Company Profiles**: View detailed company information, including mission, culture, benefits, and open positions
- **User Profiles**: Create and manage personal profiles with experience, skills, and education
- **Job Applications**: Apply for positions and track application status
- **Saved Jobs**: Bookmark interesting positions for later review

### For Companies
- **Company Dashboard**: Manage company profile, job listings, and applicant tracking
- **Job Posting**: Create and edit job listings with detailed information
- **Applicant Management**: Review applications, manage candidate pipeline
- **Analytics**: Access insights about job posting performance

### Core Features
- **Authentication System**: Secure login, registration, password reset, and session management
- **Responsive Design**: Fully responsive UI optimized for all device sizes
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Get notifications for application status changes

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router for server-side rendering and API routes
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Heroicons**: SVG icon collection for beautiful UI elements
- **Next-themes**: Dark/light theme support

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **Prisma ORM**: Type-safe database access
- **PostgreSQL**: Relational database for data storage
- **NextAuth.js**: Authentication framework with JWT strategy
- **Zod**: Schema validation for API requests

### DevOps & Tooling
- **ESLint & Prettier**: Code quality and formatting
- **Turbopack**: Enhanced development experience with fast refresh

## 📋 Getting Started

### Prerequisites
- Node.js 20.x or later
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/job-board.git
cd job-board
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# Copy the example env file and make the required changes
cp .env.example .env.local
```

4. Set up the database:
```bash
# Run Prisma migrations
npx prisma migrate dev
# Seed the database with initial data (optional)
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 🚢 Deployment

This application can be deployed on Vercel, Netlify, or any other platform that supports Next.js:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel or Netlify
3. Configure your environment variables
4. Deploy!

## 🔒 Authentication

The application uses a custom JWT authentication system with the following features:
- Email and password authentication
- Remember me functionality
- Password reset via email
- Role-based authorization (Job Seeker, Company, Admin)
- Protected routes on both client and server

## 📱 Responsive Design

The application is fully responsive with optimized views for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)

## 🌙 Dark Mode

Toggle between light and dark themes based on user preference or system settings.

## 📂 Project Structure

```
job-board/
├── prisma/                # Database schema and migrations
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── auth/          # Authentication pages
│   │   ├── companies/     # Company pages
│   │   ├── dashboard/     # User dashboard
│   │   ├── jobs/          # Job listing pages
│   │   └── admin/         # Admin dashboard
│   ├── components/        # Reusable React components
│   ├── context/           # React context providers
│   ├── lib/               # Utility functions and shared code
│   ├── providers/         # App providers (auth, theme)
│   ├── store/             # State management
│   └── types/             # TypeScript type definitions
├── .env.example           # Example environment variables
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

## 📷 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Home Page
![Home Page](https://github.com/yourusername/job-board/raw/main/public/images/screenshots/home.png)

### Job Listings
![Job Listings](https://github.com/yourusername/job-board/raw/main/public/images/screenshots/jobs.png)

### Company Profile
![Company Profile](https://github.com/yourusername/job-board/raw/main/public/images/screenshots/company.png)

</details>

## 🔮 Future Enhancements

- **Resume Parsing**: Automated resume analysis and job matching
- **Messaging System**: In-app communication between employers and candidates
- **Advanced Analytics**: Enhanced insights for companies and job seekers
- **Social Sign-in**: Login with Google, LinkedIn, etc.
- **Mobile Applications**: Native mobile apps for iOS and Android

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All open-source contributors whose libraries made this project possible
