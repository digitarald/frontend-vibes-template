import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontend Vibes',
  description: 'A modern web application built with Next.js, React, and Shadcn UI',
};

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome to Frontend Vibes</h1>
        <p className="text-muted-foreground">
          A modern web application built with Next.js, React, and Shadcn UI
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <h3 className="font-semibold">Next.js App Router</h3>
            <p className="text-sm text-muted-foreground">
              Built with the latest Next.js features for optimal performance
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <h3 className="font-semibold">Shadcn UI</h3>
            <p className="text-sm text-muted-foreground">
              Beautifully crafted UI components for modern applications
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <h3 className="font-semibold">Tailwind CSS</h3>
            <p className="text-sm text-muted-foreground">
              Utility-first CSS framework for rapid development
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <h3 className="font-semibold">TypeScript</h3>
            <p className="text-sm text-muted-foreground">
              Type-safe JavaScript for better developer experience
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <h3 className="font-semibold">Sentry</h3>
            <p className="text-sm text-muted-foreground">
              Integrated error tracking and performance monitoring
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-2">
            <h3 className="font-semibold">React</h3>
            <p className="text-sm text-muted-foreground">
              Powered by React 19 for modern UI development
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
