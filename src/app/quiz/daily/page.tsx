import { Suspense } from 'react';
import Link from 'next/link';
import { DailyQuiz } from '@/components/quiz/DailyQuiz';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function DailyQuizFallback() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your daily quiz...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DailyQuizPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/quiz" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Quiz Hub
            </Link>
          </Button>
        </div>

        {/* Daily Quiz Component */}
        <Suspense fallback={<DailyQuizFallback />}>
          <DailyQuiz />
        </Suspense>
      </div>
    </div>
  );
}