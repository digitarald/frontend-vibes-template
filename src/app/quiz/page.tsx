import { Metadata } from 'next';
import { ConfidenceQuizApp } from '@/components/quiz/confidence-quiz-app';

export const metadata: Metadata = {
  title: 'PADI Open Water Confidence Builder - Frontend Vibes',
  description: 'Build confidence and manage anxiety with our supportive PADI Open Water certification quiz focused on psychological wellness and diving readiness.',
};

export default function QuizPage() {
  return <ConfidenceQuizApp />;
}