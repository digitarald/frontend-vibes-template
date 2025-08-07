import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { QuizProgress as QuizProgressType } from './types';
import { CheckCircle, Circle, Target } from 'lucide-react';

interface QuizProgressProps {
  progress: QuizProgressType;
}

export function QuizProgress({ progress }: QuizProgressProps) {
  const progressPercentage = (progress.answeredQuestions / progress.totalQuestions) * 100;
  const accuracyPercentage = progress.answeredQuestions > 0 
    ? (progress.correctAnswers / progress.answeredQuestions) * 100 
    : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quiz Progress</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Scenario {progress.completedScenarios} of {progress.totalScenarios}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Progress</span>
              <span>{progress.answeredQuestions} / {progress.totalQuestions} questions</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-lg font-bold">{progress.answeredQuestions}</div>
              <div className="text-xs text-muted-foreground">Questions Answered</div>
            </div>
            
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-lg font-bold text-green-600">{progress.correctAnswers}</div>
              <div className="text-xs text-muted-foreground">Correct Answers</div>
            </div>
            
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center">
                <Circle className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-lg font-bold text-orange-600">{progress.incorrectAnswers}</div>
              <div className="text-xs text-muted-foreground">Incorrect Answers</div>
            </div>
          </div>

          {progress.answeredQuestions > 0 && (
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-sm">
                <span>Current Accuracy</span>
                <span className={`font-medium ${
                  accuracyPercentage >= 80 ? 'text-green-600' : 
                  accuracyPercentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {accuracyPercentage.toFixed(0)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}