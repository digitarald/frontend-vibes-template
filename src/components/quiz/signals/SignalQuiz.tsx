"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SignalQuestion } from "@/data/owd-signals";
import { CheckCircle, X, RotateCcw, Trophy } from "lucide-react";

interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  showFeedback: boolean;
  quizCompleted: boolean;
  score: number;
}

interface SignalQuizProps {
  questions: SignalQuestion[];
  onQuizComplete?: (score: number, answers: (number | null)[]) => void;
}

export function SignalQuiz({ questions, onQuizComplete }: SignalQuizProps) {
  const [quizState, setQuizState] = React.useState<QuizState>({
    currentQuestionIndex: 0,
    answers: new Array(questions.length).fill(null),
    showFeedback: false,
    quizCompleted: false,
    score: 0
  });

  const currentQuestion = questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (choiceIndex: number) => {
    if (quizState.showFeedback) return;

    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = choiceIndex;
    
    setQuizState(prev => ({
      ...prev,
      answers: newAnswers,
      showFeedback: true
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestionIndex < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showFeedback: false
      }));
    } else {
      // Quiz completed
      const score = quizState.answers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].answerIndex ? 1 : 0);
      }, 0);
      
      setQuizState(prev => ({
        ...prev,
        quizCompleted: true,
        score
      }));
      
      onQuizComplete?.(score, quizState.answers);
    }
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: new Array(questions.length).fill(null),
      showFeedback: false,
      quizCompleted: false,
      score: 0
    });
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return "Excellent! You're ready for the water!";
    if (percentage >= 80) return "Great job! Just review a few signals.";
    if (percentage >= 70) return "Good work! Consider more practice.";
    if (percentage >= 60) return "Not bad, but more study recommended.";
    return "More practice needed before diving.";
  };

  if (quizState.quizCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className={`w-16 h-16 ${getScoreColor(quizState.score, questions.length)}`} />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold">
              <span className={getScoreColor(quizState.score, questions.length)}>
                {quizState.score}
              </span>
              <span className="text-muted-foreground">/{questions.length}</span>
            </div>
            <div className="text-lg">
              {Math.round((quizState.score / questions.length) * 100)}% Correct
            </div>
            <p className="text-muted-foreground">
              {getScoreMessage(quizState.score, questions.length)}
            </p>
          </div>

          {/* Review incorrect answers */}
          <div className="space-y-4">
            <h3 className="font-semibold">Review:</h3>
            {questions.map((question, index) => {
              const userAnswer = quizState.answers[index];
              const isCorrect = userAnswer === question.answerIndex;
              
              if (isCorrect) return null;

              return (
                <div key={question.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <p className="font-medium">{question.prompt}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-red-600">
                          Your answer: {userAnswer !== null ? question.choices[userAnswer] : "No answer"}
                        </p>
                        <p className="text-sm text-green-600">
                          Correct answer: {question.choices[question.answerIndex]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {question.rationale}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <Button onClick={handleRestart} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg">
            Question {quizState.currentQuestionIndex + 1} of {questions.length}
          </CardTitle>
          <Badge variant="outline">
            {Math.round((quizState.score / quizState.currentQuestionIndex || 1) * 100)}% so far
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <h2 className="text-xl font-semibold">{currentQuestion.prompt}</h2>
        
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => {
            const isSelected = quizState.answers[quizState.currentQuestionIndex] === index;
            const isCorrect = index === currentQuestion.answerIndex;
            const showResult = quizState.showFeedback;
            
            let variant: "default" | "outline" | "secondary" = "outline";
            let className = "";
            
            if (showResult) {
              if (isCorrect) {
                variant = "default";
                className = "bg-green-100 border-green-500 text-green-800 hover:bg-green-100";
              } else if (isSelected && !isCorrect) {
                variant = "secondary";
                className = "bg-red-100 border-red-500 text-red-800 hover:bg-red-100";
              }
            } else if (isSelected) {
              variant = "default";
            }

            return (
              <Button
                key={index}
                variant={variant}
                className={`w-full justify-start text-left h-auto p-4 whitespace-normal ${className}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={quizState.showFeedback}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-background/50 flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{choice}</span>
                  {showResult && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {quizState.showFeedback && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h3 className="font-semibold">Explanation:</h3>
            <p className="text-sm text-muted-foreground">{currentQuestion.rationale}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {currentQuestion.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {quizState.showFeedback && (
          <div className="flex justify-end">
            <Button onClick={handleNext}>
              {quizState.currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}