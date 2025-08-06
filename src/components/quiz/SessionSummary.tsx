import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Flame, BookOpen, RotateCcw } from 'lucide-react';

interface SessionResult {
  questionId: string;
  correct: boolean;
  question: string;
  tags: string[];
}

interface SessionSummaryProps {
  results: SessionResult[];
  streak: number;
  onReviewMissed: () => void;
  onNewSession: () => void;
  dueItemsCount: number;
}

export function SessionSummary({ 
  results, 
  streak, 
  onReviewMissed, 
  onNewSession,
  dueItemsCount 
}: SessionSummaryProps) {
  const correctCount = results.filter(r => r.correct).length;
  const totalCount = results.length;
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const missedQuestions = results.filter(r => !r.correct);

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Excellent work! 🌟";
    if (accuracy >= 80) return "Great job! 👍";
    if (accuracy >= 70) return "Good effort! 👌";
    if (accuracy >= 60) return "Keep practicing! 📚";
    return "More study needed 💪";
  };

  const getPerformanceColor = () => {
    if (accuracy >= 80) return "text-green-600";
    if (accuracy >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Session Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Performance Overview */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className={`text-2xl font-bold ${getPerformanceColor()}`}>
                {correctCount}/{totalCount} Correct
              </div>
              <div className="text-4xl font-bold text-primary">
                {accuracy}%
              </div>
              <p className="text-muted-foreground">{getPerformanceMessage()}</p>
            </div>
            
            <Progress value={accuracy} className="w-full h-3" />
          </div>

          {/* Streak Information */}
          <div className="flex items-center justify-center gap-2 p-4 bg-accent/50 rounded-lg">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="font-semibold">Current Streak: {streak} days</span>
          </div>

          {/* Missed Topics */}
          {missedQuestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4" />
                Areas to Review
              </h3>
              <div className="space-y-2">
                {missedQuestions.map((result, index) => (
                  <div key={index} className="p-3 border rounded-md bg-red-50">
                    <p className="text-sm font-medium mb-1">{result.question}</p>
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              What&apos;s Next?
            </h3>
            
            <div className="grid gap-2">
              {dueItemsCount > 0 && (
                <div className="p-3 border rounded-md bg-blue-50">
                  <p className="text-sm">
                    You have <strong>{dueItemsCount}</strong> more questions ready for review today.
                  </p>
                </div>
              )}
              
              {missedQuestions.length > 0 && (
                <div className="p-3 border rounded-md bg-yellow-50">
                  <p className="text-sm">
                    Consider reviewing the <strong>{missedQuestions.length}</strong> questions you missed.
                  </p>
                </div>
              )}
              
              {dueItemsCount === 0 && (
                <div className="p-3 border rounded-md bg-green-50">
                  <p className="text-sm">
                    All caught up! Come back tomorrow for more questions, or practice with random questions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {missedQuestions.length > 0 && (
          <Button 
            onClick={onReviewMissed}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Review Missed Questions
          </Button>
        )}
        
        <Button 
          onClick={onNewSession}
          className="flex-1"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          {dueItemsCount > 0 ? 'Continue Learning' : 'Practice Random Questions'}
        </Button>
      </div>
    </div>
  );
}