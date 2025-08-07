import { Metadata } from 'next';
import QuizLandingPage from '@/components/quiz/quiz-landing';

export const metadata: Metadata = {
  title: 'PADI Quiz Hub | Frontend Vibes',
  description: 'Master your PADI Open Water diving skills with daily quizzes, progress tracking, and achievements.',
};

export default function QuizPage() {
  return <QuizLandingPage />;
}