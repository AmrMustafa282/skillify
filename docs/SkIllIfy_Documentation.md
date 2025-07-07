# SkIllIfy.io Documentation

## Project Overview

SkIllIfy.io is a comprehensive assessment management and analytics platform designed to help organizations evaluate, select, and develop talent through innovative technology and data-driven insights. Similar to TestGorilla, the platform provides tools for creating customized assessments, analyzing candidate performance, and making informed hiring decisions.

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Pages and Components](#pages-and-components)
6. [Installation and Setup](#installation-and-setup)
7. [Usage Guide](#usage-guide)
8. [Development Guidelines](#development-guidelines)

## Project Architecture

SkIllIfy.io follows a modern web application architecture:

- **Frontend**: Next.js 15 with React 19, using the App Router for routing
- **Backend**: Java Spring Boot API (running on port 8080)
- **Authentication**: NextAuth.js with support for credentials and Google authentication
- **State Management**: Zustand for global state management
- **Styling**: Tailwind CSS with Shadcn UI components
- **Animations**: Framer Motion for smooth, interactive animations

The application is structured using a component-based architecture, with reusable UI components and page-specific components organized in separate directories.

## Key Features

### Assessment Creation and Management

- **Customizable Assessment Templates**: Create tailored assessments for specific roles and skills
- **Question Library**: Access a comprehensive library of pre-built questions
- **Custom Question Creation**: Build your own questions to assess specific competencies
- **Anti-Cheating Measures**: Ensure the integrity of assessment results

### Analytics and Insights

- **Candidate Performance Analysis**: Detailed insights into candidate skills and abilities
- **Team Competency Mapping**: Identify strengths and gaps in your team's skills
- **Benchmarking**: Compare candidates against industry standards
- **Predictive Analytics**: AI-powered insights to predict candidate success

### User Experience

- **Responsive Design**: Optimized for all device sizes
- **Intuitive Interface**: Clean, user-friendly design
- **Animated Interactions**: Smooth animations enhance the user experience
- **Theme Support**: Light and dark mode with system preference detection

### Integration Capabilities

- **API Access**: Connect with other HR systems and tools
- **Third-Party Integrations**: Seamless integration with popular platforms like Slack, Microsoft Teams, etc.
- **Data Import/Export**: Flexible data management options

## Tech Stack

### Frontend

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Components**: Radix UI / Shadcn UI
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion

### Backend

- **Framework**: Java Spring Boot
- **Database**: Not specified in the provided information
- **API**: RESTful API endpoints

## Project Structure

```
g-client/
├── app/                    # App Router components and pages
│   ├── (pages)/            # Public pages (Solutions, Pricing, Industries, About)
│   ├── (protected)/        # Protected routes requiring authentication
│   ├── _components/        # Shared components across pages
│   ├── api/                # API routes including authentication
│   ├── login/              # Login page
│   └── signup/             # Signup page
├── components/             # Reusable UI components
│   ├── assessment/         # Assessment-related components
│   ├── auth/               # Authentication components
│   ├── home-page/          # Home page specific components
│   ├── payment/            # Payment-related components
│   └── ui/                 # UI components (buttons, inputs, etc.)
├── lib/                    # Utility functions and shared code
├── providers/              # Context providers (Auth, Theme)
├── public/                 # Static assets
│   ├── avatars/            # User avatar images
│   ├── logos/              # Integration and partner logos
│   └── team/               # Team member images
└── types/                  # TypeScript type definitions
```

## Pages and Components

### Main Pages

1. **Home Page**: Landing page showcasing the platform's features and benefits

   - Hero section with animated elements
   - Features section highlighting key capabilities
   - How It Works section explaining the assessment process
   - Testimonials from satisfied customers
   - Integrations showcase
   - Pricing comparison
   - FAQ section
   - Call-to-action

2. **Solutions Page**: Detailed information about the platform's solutions

   - Candidate Assessment
   - Team Analytics
   - AI-Powered Insights
   - Talent Matching
   - Assessment Creation
   - Workflow Automation

3. **Pricing Page**: Transparent pricing information

   - Starter, Professional, and Enterprise plans
   - Monthly/Annual billing toggle
   - Feature comparison
   - FAQ section

4. **Industries Page**: Industry-specific solutions

   - Technology
   - Finance
   - Healthcare
   - Education
   - Retail
   - Consulting
   - Manufacturing
   - Non-Profit

5. **About Us Page**: Company information
   - Company story and mission
   - Core values
   - Leadership team
   - Company timeline
   - Career opportunities

### Component Structure

Each page is organized into modular components for better maintainability:

```
(pages)/about/
├── page.tsx              # Main page component
└── _components/          # Page-specific components
    ├── hero.tsx          # Hero section
    ├── our-story.tsx     # Company story section
    ├── our-values.tsx    # Values section
    ├── team.tsx          # Team section
    ├── timeline.tsx      # Timeline section
    └── cta.tsx           # Call-to-action section
```

## Installation and Setup

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation Steps

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd g-project
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage Guide

### Creating an Assessment

1. Navigate to the Assessment Creation page
2. Select a template or start from scratch
3. Add questions from the library or create custom questions
4. Configure assessment settings (time limits, anti-cheating measures, etc.)
5. Save and publish the assessment

### Inviting Candidates

1. Go to the Candidates section
2. Click "Invite Candidates"
3. Enter candidate email addresses or upload a CSV file
4. Customize the invitation message
5. Send invitations

### Analyzing Results

1. Access the Analytics Dashboard
2. View individual candidate results
3. Compare candidates using the comparison tool
4. Generate reports for sharing with stakeholders

## Development Guidelines

### Code Style

- Follow the ESLint and Prettier configurations
- Use TypeScript for type safety
- Follow component-based architecture
- Keep components small and focused on a single responsibility

### Creating New Pages

1. Create a new directory in the appropriate location (e.g., `app/(pages)/new-page/`)
2. Create a `page.tsx` file as the main component
3. Create a `_components` directory for page-specific components
4. Import and use the components in the main page file

### Adding Animations

- Use Framer Motion for animations
- Keep animations subtle and purposeful
- Ensure animations work well on all device sizes
- Consider performance implications

### Testing

- Write unit tests for components and utilities
- Test on different devices and browsers
- Ensure accessibility compliance

## Conclusion

SkIllIfy.io is a powerful platform for assessment management and analytics, designed to help organizations make data-driven hiring decisions and develop their talent effectively. This documentation provides an overview of the project architecture, features, and development guidelines to help you understand and contribute to the platform.

For more information or assistance, please contact the development team.
