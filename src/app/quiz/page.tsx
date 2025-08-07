import { Metadata } from 'next';
import { QuizContainer } from '@/components/quiz/quiz-container';

export const metadata: Metadata = {
  title: 'PADI Open Water Quiz - Frontend Vibes',
  description: 'Interactive scenario-based quiz for PADI Open Water certification training',
};

export default function QuizPage() {
  return (
    <div className="container mx-auto">
      <QuizContainer />
    </div>
  );
}