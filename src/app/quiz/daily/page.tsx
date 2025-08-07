import React from 'react';
import { Metadata } from 'next';
import QuizContainer from '@/components/quiz/quiz-container';

export const metadata: Metadata = {
  title: 'Daily PADI Quiz | Frontend Vibes',
  description: 'Test your PADI Open Water knowledge with our daily gamified quiz. Build streaks, earn points, and master diving skills.',
};

export default function DailyQuizPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            🤿 Daily PADI Dive Quiz
          </h1>
          <p className="text-lg text-blue-700">
            Sharpen your Open Water diving skills with our daily challenge. 
            Build streaks, earn achievements, and become a diving expert!
          </p>
        </div>
        <QuizContainer />
      </div>
    </div>
  );
}