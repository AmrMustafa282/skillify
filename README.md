# SkIllIfy.io

A modern web application built with Next.js 15 and React 19 that serves as the client interface for the SkIllIfy platform.

## About SkIllIfy

SkIllIfy.io is a comprehensive platform designed to help businesses manage job offers, skills assessment, and team collaboration. The platform offers:

- **Job Management**: Create, track, and manage job offers with an intuitive interface
- **Organization Management**: Manage teams and organizational structures
- **AI-Powered Analytics**: Gain insights from data using advanced machine learning
- **Real-time Collaboration**: Work together seamlessly with team members
- **Enterprise-Grade Security**: Protect sensitive data with state-of-the-art security measures

This frontend application connects to a Java Spring Boot backend API running on port 8080.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Modern UI**: Clean, responsive interface built with Shadcn UI components
- **Authentication**: Support for credential and Google authentication
- **Organization Management**: Create and manage organizations with different plans
- **Dashboard**: Comprehensive dashboard for monitoring and analytics
- **Team Collaboration**: Built-in tools for team communication and project management
- **Theme Support**: Light and dark mode with system preference detection

## Scripts

- `dev`: Starts the development server with Turbopack
- `inspect`: Runs the app with Node.js inspector
- `build`: Builds the application for production
- `start`: Starts the production server
- `lint`: Runs ESLint with auto-fixing
- `format`: Formats code with Prettier

## Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI / Shadcn UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Authentication**: NextAuth.js

## Project Structure

- `app/`: App Router components and pages
  - `_components/`: Page-specific components
  - `api/`: API routes including authentication
  - `dashboard/`: Dashboard and authenticated routes
- `components/`: Reusable UI components
- `lib/`: Utility functions and shared code
- `public/`: Static assets
- `providers/`: Context providers (Auth, Theme)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
