# Deployment Guide

This document provides detailed instructions for deploying the Job Board application to various environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Deployment Options](#deployment-options)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [AWS Amplify](#aws-amplify)
  - [Self-hosted](#self-hosted)
- [Database Setup](#database-setup)
- [Post-Deployment Steps](#post-deployment-steps)
- [Monitoring and Logging](#monitoring-and-logging)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have the following:

- A GitHub account with the project repository
- Access to a PostgreSQL database service (e.g., Supabase, Railway, AWS RDS, or Heroku PostgreSQL)
- Environment variables from your local development setup
- (Optional) A domain name for your application

## Environment Configuration

The application requires the following environment variables:

```
# Essential
DATABASE_URL=your-postgresql-connection-string
NEXTAUTH_URL=https://your-production-url.com
NEXTAUTH_SECRET=your-secure-nextauth-secret
JWT_SECRET=your-secure-jwt-secret

# Optional but recommended
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-email-password
EMAIL_FROM=no-reply@your-domain.com
```

## Deployment Options

### Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

1. Sign up for a [Vercel](https://vercel.com) account
2. Connect your GitHub repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy with the following settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

#### Custom Domain Setup on Vercel

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Domains" section
3. Add your custom domain and follow the verification process

### Netlify

1. Sign up for a [Netlify](https://netlify.com) account
2. Connect your GitHub repository
3. Configure the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
4. Add environment variables in the Netlify dashboard
5. Deploy the site

### AWS Amplify

1. Sign up for an [AWS](https://aws.amazon.com) account
2. Navigate to the AWS Amplify console
3. Choose "Host a web app"
4. Connect your GitHub repository
5. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```
6. Add environment variables in the Amplify console
7. Deploy the application

### Self-hosted

For self-hosted deployments on a VPS or dedicated server:

1. Set up a server with Node.js (v20+)
2. Clone the repository to your server
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with your production environment variables
5. Build the application:
   ```bash
   npm run build
   ```
6. Set up a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "job-board" -- start
   ```
7. Configure Nginx as a reverse proxy:
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```
8. Set up SSL with Certbot

## Database Setup

### PostgreSQL Database Setup

1. Create a PostgreSQL database on your preferred provider
2. Update the `DATABASE_URL` environment variable with your connection string
3. Run the database migrations:
   ```bash
   npx prisma migrate deploy
   ```
4. (Optional) Seed the database:
   ```bash
   npx prisma db seed
   ```

## Post-Deployment Steps

After successful deployment:

1. Verify all environment variables are properly set
2. Test the authentication flow
3. Check the responsiveness on different devices
4. Ensure dark mode is working correctly
5. Test job search and filtering functionality
6. Verify database connections and API routes

## Monitoring and Logging

### Setting Up Monitoring

For production deployments, consider setting up:

1. **Error tracking** with Sentry:
   - Sign up for [Sentry](https://sentry.io)
   - Add the Sentry SDK to your project
   - Configure error reporting

2. **Performance monitoring** with Vercel Analytics or Google Analytics:
   - Add the tracking ID to your environment variables
   - Implement the analytics script

3. **Uptime monitoring** with UptimeRobot or Pingdom:
   - Set up regular checks for your main URL
   - Configure alerts for downtime

## Troubleshooting

Common deployment issues and solutions:

### Environment Variables

**Issue**: Application fails due to missing environment variables.

**Solution**: Double-check all required variables are set in your deployment platform's dashboard.

### Database Connection

**Issue**: Cannot connect to the database.

**Solution**: Verify your `DATABASE_URL` is correct and that your database server accepts connections from your deployment environment.

### Build Errors

**Issue**: Build fails during deployment.

**Solution**: Check build logs for specific errors. Common issues include:
- Missing dependencies
- TypeScript errors
- Incompatible package versions

### Authentication Issues

**Issue**: Users cannot log in or receive authentication errors.

**Solution**: Verify that `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, and `JWT_SECRET` are properly set for your production environment.

---

For additional help, please open an issue in the GitHub repository. 