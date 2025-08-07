import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuizProgress, DivingScenario } from './types';
import { Trophy, Target, RotateCcw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface QuizResultsProps {
  progress: QuizProgress;
  scenarios: DivingScenario[];
  answers: Record<string, string>;
  startTime: Date;
  endTime: Date;
  onRestart: () => void;
}

export function QuizResults({
  progress,
  scenarios,
  answers,
  startTime,
  endTime,
  onRestart,
}: QuizResultsProps) {
  const accuracyPercentage = (progress.correctAnswers / progress.totalQuestions) * 100;
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60);
  
  const getGrade = () => {
    if (accuracyPercentage >= 90) return { grade: 'Excellent', color: 'text-green-600', icon: Trophy };
    if (accuracyPercentage >= 80) return { grade: 'Good', color: 'text-blue-600', icon: Target };
    if (accuracyPercentage >= 70) return { grade: 'Fair', color: 'text-yellow-600', icon: AlertTriangle };
    return { grade: 'Needs Improvement', color: 'text-red-600', icon: XCircle };
  };

  const { grade, color, icon: GradeIcon } = getGrade();

  const getDetailedResults = () => {
    return scenarios.map(scenario => {
      const scenarioAnswers = scenario.questions.map(question => {
        const userAnswer = answers[question.id];
        const isCorrect = userAnswer === question.correctAnswer;
        return {
          question,
          userAnswer,
          isCorrect,
        };
      });
      
      const correctCount = scenarioAnswers.filter(a => a.isCorrect).length;
      
      return {
        scenario,
        answers: scenarioAnswers,
        score: correctCount,
        total: scenario.questions.length,
        percentage: (correctCount / scenario.questions.length) * 100,
      };
    });
  };

  const detailedResults = getDetailedResults();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overall Results */}
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`${color} p-3 rounded-full bg-muted`}>
              <GradeIcon className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
          <p className="text-muted-foreground">You&apos;ve completed the PADI Open Water scenario quiz</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className={`text-3xl font-bold ${color}`}>{accuracyPercentage.toFixed(0)}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
              <Badge className={color}>{grade}</Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">{progress.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
              <div className="text-xs text-muted-foreground">out of {progress.totalQuestions}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">{duration}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">{scenarios.length}</div>
              <div className="text-sm text-muted-foreground">Scenarios</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {detailedResults.map((result) => (
            <div key={result.scenario.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{result.scenario.title}</h3>
                  <p className="text-sm text-muted-foreground">{result.scenario.type} • {result.scenario.environment.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {result.score}/{result.total}
                  </div>
                  <div className={`text-sm ${
                    result.percentage >= 80 ? 'text-green-600' : 
                    result.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {result.percentage.toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {result.answers.map((answer, qIndex) => (
                  <div key={answer.question.id} className="flex items-start gap-2 text-sm">
                    {answer.isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">Q{qIndex + 1}: {answer.question.question}</p>
                      {!answer.isCorrect && (
                        <p className="text-muted-foreground text-xs mt-1">
                          Correct answer: {answer.question.options.find(opt => opt.id === answer.question.correctAnswer)?.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accuracyPercentage >= 90 && (
              <p className="text-green-700 dark:text-green-300">
                🎉 Excellent work! You demonstrate strong understanding of diving safety and procedures. You&apos;re well-prepared for real-world diving scenarios.
              </p>
            )}
            {accuracyPercentage >= 80 && accuracyPercentage < 90 && (
              <p className="text-blue-700 dark:text-blue-300">
                👍 Good job! You have a solid foundation. Review the scenarios where you missed questions to strengthen your understanding.
              </p>
            )}
            {accuracyPercentage >= 70 && accuracyPercentage < 80 && (
              <p className="text-yellow-700 dark:text-yellow-300">
                ⚠️ Fair performance. Consider reviewing dive theory and practicing more scenarios. Focus on emergency procedures and equipment handling.
              </p>
            )}
            {accuracyPercentage < 70 && (
              <p className="text-red-700 dark:text-red-300">
                📚 Additional study recommended. Review your PADI Open Water materials and consider discussing challenging scenarios with your instructor.
              </p>
            )}
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Review scenarios where you scored below 80%</p>
              <p>• Practice emergency response procedures</p>
              <p>• Study equipment troubleshooting techniques</p>
              <p>• Discuss real-world applications with experienced divers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="text-center space-y-4">
        <Button 
          size="lg" 
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <p className="text-sm text-muted-foreground">
          Practice makes perfect! Take the quiz again to improve your score.
        </p>
      </div>
    </div>
  );
}