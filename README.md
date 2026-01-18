# Sports Events Manager

A full-stack web application for managing sports events built with Next.js 15+, TypeScript, Supabase, and Tailwind CSS.

## Features

- **Authentication**: Email/password and Google OAuth sign-in via Supabase Auth
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Dashboard**: View all your sports events with search and filter capabilities
- **Event Management**: Create, edit, and delete sports events
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Authentication**: Supabase Auth
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Install Dependencies

```bash
cd sports-events
npm install
```

### 2. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from Settings > API

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up the Database

Run the SQL commands from `supabase-schema.sql` in your Supabase SQL editor:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the query

### 5. Configure Google OAuth (Optional)

To enable Google sign-in:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application type)
5. Add your Supabase callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
6. In Supabase dashboard, go to Authentication > Providers > Google
7. Enable Google provider and add your Client ID and Client Secret

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sports-events/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── callback/       # OAuth callback handler
│   │   │   ├── login/          # Login page
│   │   │   └── signup/         # Sign up page
│   │   ├── dashboard/          # Main dashboard page
│   │   ├── events/
│   │   │   ├── new/            # Create event page
│   │   │   └── [id]/edit/      # Edit event page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── not-found.tsx       # 404 page
│   │   └── page.tsx            # Home page (redirects)
│   ├── components/
│   │   ├── dashboard/          # Dashboard components
│   │   ├── events/             # Event form components
│   │   └── ui/                 # Shadcn UI components
│   ├── lib/
│   │   ├── actions/            # Server actions
│   │   ├── supabase/           # Supabase clients
│   │   └── utils.ts            # Utility functions
│   ├── types/                  # TypeScript type definitions
│   └── middleware.ts           # Auth middleware
├── supabase-schema.sql         # Database schema
└── package.json
```

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Event Fields

Each event includes:
- **Name**: The event name
- **Sport Type**: Soccer, Basketball, Tennis, Baseball, Football, Hockey, Golf, Swimming, Running, Volleyball, or Other
- **Date & Time**: When the event takes place
- **Description**: Optional details about the event
- **Venues**: One or more venue locations

## Database Schema

The `events` table includes:
- `id` (UUID, primary key)
- `name` (VARCHAR)
- `sport_type` (VARCHAR)
- `date_time` (TIMESTAMPTZ)
- `description` (TEXT, nullable)
- `venues` (TEXT array)
- `user_id` (UUID, foreign key to auth.users)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

Row Level Security (RLS) policies ensure users can only access their own events.
