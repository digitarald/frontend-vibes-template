import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, ThumbsUp, ThumbsDown, Users, Gauge } from 'lucide-react';
import { QuizItem, McqItem, TrueFalseItem, SignalItem } from '@/data/owd-questions';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  item: QuizItem;
  onAnswer: (correct: boolean) => void;
}

export function QuestionCard({ item, onAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    let isCorrect = false;
    
    switch (item.kind) {
      case 'mcq':
        isCorrect = selectedAnswer === (item as McqItem).answerIndex;
        break;
      case 'truefalse':
        isCorrect = selectedAnswer === (item as TrueFalseItem).answer;
        break;
      case 'signal':
        const signalItem = item as SignalItem;
        isCorrect = typeof selectedAnswer === 'string' && 
          selectedAnswer.toLowerCase().trim() === signalItem.correct.toLowerCase().trim();
        break;
    }

    setShowResult(true);
    onAnswer(isCorrect);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getCorrectAnswer = (): string => {
    switch (item.kind) {
      case 'mcq':
        return (item as McqItem).choices[(item as McqItem).answerIndex];
      case 'truefalse':
        return (item as TrueFalseItem).answer ? 'True' : 'False';
      case 'signal':
        return (item as SignalItem).correct;
      default:
        return '';
    }
  };

  const isCorrect = () => {
    switch (item.kind) {
      case 'mcq':
        return selectedAnswer === (item as McqItem).answerIndex;
      case 'truefalse':
        return selectedAnswer === (item as TrueFalseItem).answer;
      case 'signal':
        const signalItem = item as SignalItem;
        return typeof selectedAnswer === 'string' && 
          selectedAnswer.toLowerCase().trim() === signalItem.correct.toLowerCase().trim();
      default:
        return false;
    }
  };

  const getQuestionIcon = () => {
    const iconClass = "h-4 w-4";
    switch (item.kind) {
      case 'mcq':
        return <CheckCircle className={iconClass} />;
      case 'truefalse':
        return <XCircle className={iconClass} />;
      case 'signal':
        return <Users className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {getQuestionIcon()}
          {item.question}
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Signal description for signal questions */}
        {item.kind === 'signal' && (
          <Alert>
            <Gauge className="h-4 w-4" />
            <AlertDescription className="font-medium">
              {(item as SignalItem).description}
            </AlertDescription>
          </Alert>
        )}

        {/* Question options based on type */}
        {item.kind === 'mcq' && (
          <div className="space-y-2" role="radiogroup" aria-labelledby="mcq-question">
            {(item as McqItem).choices.map((choice, index) => (
              <button
                key={index}
                type="button"
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-3 text-left border rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  selectedAnswer === index && "bg-primary/10 border-primary",
                  showResult && selectedAnswer === index && isCorrect() && "bg-green-50 border-green-500",
                  showResult && selectedAnswer === index && !isCorrect() && "bg-red-50 border-red-500",
                  showResult && index === (item as McqItem).answerIndex && "bg-green-50 border-green-500"
                )}
                role="radio"
                aria-checked={selectedAnswer === index}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {choice}
                {showResult && index === (item as McqItem).answerIndex && (
                  <CheckCircle className="inline-block ml-2 h-4 w-4 text-green-600" />
                )}
                {showResult && selectedAnswer === index && !isCorrect() && (
                  <XCircle className="inline-block ml-2 h-4 w-4 text-red-600" />
                )}
              </button>
            ))}
          </div>
        )}

        {item.kind === 'truefalse' && (
          <div className="flex gap-4 justify-center">
            <Button
              variant={selectedAnswer === true ? "default" : "outline"}
              onClick={() => !showResult && setSelectedAnswer(true)}
              disabled={showResult}
              className={cn(
                "flex-1 max-w-32",
                showResult && selectedAnswer === true && isCorrect() && "bg-green-600 hover:bg-green-700",
                showResult && selectedAnswer === true && !isCorrect() && "bg-red-600 hover:bg-red-700",
                showResult && (item as TrueFalseItem).answer === true && selectedAnswer !== true && "bg-green-600 hover:bg-green-700"
              )}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              True
            </Button>
            <Button
              variant={selectedAnswer === false ? "default" : "outline"}
              onClick={() => !showResult && setSelectedAnswer(false)}
              disabled={showResult}
              className={cn(
                "flex-1 max-w-32",
                showResult && selectedAnswer === false && isCorrect() && "bg-green-600 hover:bg-green-700",
                showResult && selectedAnswer === false && !isCorrect() && "bg-red-600 hover:bg-red-700",
                showResult && (item as TrueFalseItem).answer === false && selectedAnswer !== false && "bg-green-600 hover:bg-green-700"
              )}
            >
              <ThumbsDown className="h-4 w-4 mr-2" />
              False
            </Button>
          </div>
        )}

        {item.kind === 'signal' && (
          <div className="space-y-2">
            <label htmlFor="signal-input" className="text-sm font-medium">
              Your answer:
            </label>
            <input
              id="signal-input"
              type="text"
              value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
              onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
              disabled={showResult}
              placeholder="Enter the meaning of this signal"
              className={cn(
                "w-full p-3 border rounded-md",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                showResult && isCorrect() && "bg-green-50 border-green-500",
                showResult && !isCorrect() && "bg-red-50 border-red-500"
              )}
            />
          </div>
        )}

        {/* Show result and rationale */}
        {showResult && (
          <Alert className={cn(
            isCorrect() ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
          )}>
            {isCorrect() ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">
                  {isCorrect() ? "Correct!" : "Incorrect"}
                </p>
                {!isCorrect() && (
                  <p>
                    <strong>Correct answer:</strong> {getCorrectAnswer()}
                  </p>
                )}
                <p>
                  <strong>Explanation:</strong> {item.rationale}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!showResult ? (
          <Button 
            onClick={handleSubmit} 
            disabled={selectedAnswer === null}
            className="ml-auto"
          >
            Submit Answer
          </Button>
        ) : (
          <Button 
            onClick={handleReset}
            variant="outline"
            className="ml-auto"
          >
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}