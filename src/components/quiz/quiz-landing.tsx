'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressDashboard from '@/components/quiz/progress-dashboard';
import { storage } from '@/lib/quiz-storage';
import { UserProgress } from '@/types/quiz';

export default function QuizLandingPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userProgress = storage.getUserProgress();
    setProgress(userProgress);
    setIsLoading(false);
  }, []);

  const handleStartQuiz = () => {
    router.push('/quiz/daily');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Unable to load progress. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4">
              🤿 PADI Quiz Hub
            </h1>
            <p className="text-lg text-blue-700 max-w-2xl mx-auto">
              Master your Open Water diving skills through daily practice. 
              Track your progress, build streaks, and compete with fellow divers!
            </p>
          </div>

          {/* Dashboard */}
          <ProgressDashboard progress={progress} onStartQuiz={handleStartQuiz} />
        </div>
      </div>
    </div>
  );
}