import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Vibes',
  description: 'A modern web application built with Next.js, React, and Shadcn UI',
};

export default function Home() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Here Be Vibes</h1>
        <p className="text-muted-foreground text-lg">Your template is ready</p>
        <div className="w-24 h-1 bg-primary mx-auto rounded"></div>
        <p className="text-sm text-muted-foreground max-w-md">
          Start building your next great project. This is your clean slate.
        </p>
      </div>
    </div>
  );
}
