import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hello World - Starter Template',
  description: 'A simple starter template built with Next.js, React, and Shadcn UI',
};

export default function Home() {
  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Hello World</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Welcome to your Next.js starter template
          </p>
        </div>
        
        <div className="text-center">
          <p className="mb-4">
            This template includes TypeScript, Next.js App Router, React, 
            and Tailwind CSS.
          </p>
          
          <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
            <div className="flex flex-col items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <span className="font-medium">Server Components</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Next.js 14</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <span className="font-medium">Styling</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Tailwind CSS</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Get Started
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
