'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Brain, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Home,
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import { QuizQuestion, UserAnswer, TOPIC_LABELS } from '@/types/quiz';
import { AdaptiveQuizEngine } from '@/lib/quiz/adaptive-engine';
import { loadMockUserDataIntoStorage } from '@/data/mock-user-data';

interface QuizSessionState {
  currentQuestion: QuizQuestion | null;
  questionIndex: number;
  totalQuestions: number;
  answers: UserAnswer[];
  startTime: Date;
  currentQuestionStartTime: Date;
  sessionComplete: boolean;
  selectedAnswer: number | null;
  showExplanation: boolean;
  showResult: boolean;
}

export default function QuizSessionPage() {
  const router = useRouter();
  const [quizEngine] = useState(() => new AdaptiveQuizEngine());
  const [sessionState, setSessionState] = useState<QuizSessionState>({
    currentQuestion: null,
    questionIndex: 0,
    totalQuestions: 10, // Default session length
    answers: [],
    startTime: new Date(),
    currentQuestionStartTime: new Date(),
    sessionComplete: false,
    selectedAnswer: null,
    showExplanation: false,
    showResult: false,
  });

  // Initialize quiz session
  useEffect(() => {
    loadMockUserDataIntoStorage(); // Ensure demo data is available
    quizEngine.loadUserData();
    const firstQuestion = quizEngine.getNextQuestion();
    if (firstQuestion) {
      setSessionState(prev => ({
        ...prev,
        currentQuestion: firstQuestion,
        currentQuestionStartTime: new Date(),
      }));
    }
  }, [quizEngine]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (sessionState.showResult) return;
    
    setSessionState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
    }));
  };

  const handleSubmitAnswer = () => {
    if (sessionState.selectedAnswer === null || !sessionState.currentQuestion) return;

    const timeSpent = Math.floor((Date.now() - sessionState.currentQuestionStartTime.getTime()) / 1000);
    const isCorrect = sessionState.selectedAnswer === sessionState.currentQuestion.correctAnswer;

    const userAnswer: UserAnswer = {
      questionId: sessionState.currentQuestion.id,
      selectedAnswer: sessionState.selectedAnswer,
      isCorrect,
      timeSpent,
      timestamp: new Date(),
    };

    // Record answer in adaptive engine
    quizEngine.recordAnswer(userAnswer);
    quizEngine.saveUserData();

    // Update session state
    setSessionState(prev => ({
      ...prev,
      answers: [...prev.answers, userAnswer],
      showResult: true,
      showExplanation: true,
    }));
  };

  const handleNextQuestion = () => {
    const answeredQuestionIds = sessionState.answers.map(a => a.questionId);
    if (sessionState.currentQuestion) {
      answeredQuestionIds.push(sessionState.currentQuestion.id);
    }

    const nextQuestion = quizEngine.getNextQuestion(answeredQuestionIds);
    
    if (!nextQuestion || sessionState.questionIndex + 1 >= sessionState.totalQuestions) {
      // Session complete
      setSessionState(prev => ({
        ...prev,
        sessionComplete: true,
      }));
      return;
    }

    setSessionState(prev => ({
      ...prev,
      currentQuestion: nextQuestion,
      questionIndex: prev.questionIndex + 1,
      selectedAnswer: null,
      showResult: false,
      showExplanation: false,
      currentQuestionStartTime: new Date(),
    }));
  };

  const handleReturnHome = () => {
    router.push('/quiz');
  };

  const handleRestartSession = () => {
    const firstQuestion = quizEngine.getNextQuestion();
    setSessionState({
      currentQuestion: firstQuestion,
      questionIndex: 0,
      totalQuestions: 10,
      answers: [],
      startTime: new Date(),
      currentQuestionStartTime: new Date(),
      sessionComplete: false,
      selectedAnswer: null,
      showExplanation: false,
      showResult: false,
    });
  };

  const calculateSessionAccuracy = () => {
    if (sessionState.answers.length === 0) return 0;
    const correct = sessionState.answers.filter(a => a.isCorrect).length;
    return Math.round((correct / sessionState.answers.length) * 100);
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-700 border-green-300';
      case 2: return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 3: return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getDifficultyLabel = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'Unknown';
    }
  };

  if (sessionState.sessionComplete) {
    const accuracy = calculateSessionAccuracy();
    const totalTime = Math.floor((Date.now() - sessionState.startTime.getTime()) / 1000 / 60);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-950 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="mt-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Session Complete! 🎉</CardTitle>
              <CardDescription>
                Great job! Here&apos;s how you performed in this adaptive learning session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{sessionState.answers.length}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{totalTime}m</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Time</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold">Question Breakdown:</h3>
                {sessionState.answers.map((answer, index) => {
                  return (
                    <div key={answer.questionId} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center gap-3">
                        {answer.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className="text-sm">Question {index + 1}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {answer.timeSpent}s
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={handleReturnHome} variant="outline" className="flex-1">
                  <Home className="h-4 w-4 mr-2" />
                  Return Home
                </Button>
                <Button onClick={handleRestartSession} className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Start New Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!sessionState.currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-950 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-lg font-semibold mb-2">Loading your personalized questions...</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Our AI is selecting the best questions for your current level.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((sessionState.questionIndex + 1) / sessionState.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-950 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handleReturnHome}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Adaptive Session</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {sessionState.questionIndex + 1} of {sessionState.totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  {TOPIC_LABELS[sessionState.currentQuestion.topic]}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={getDifficultyColor(sessionState.currentQuestion.difficulty)}
                  >
                    {getDifficultyLabel(sessionState.currentQuestion.difficulty)}
                  </Badge>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    ~{sessionState.currentQuestion.estimatedTime}s
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Question */}
              <div className="text-lg font-medium leading-relaxed">
                {sessionState.currentQuestion.question}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {sessionState.currentQuestion.options.map((option, index) => {
                  let buttonClass = "justify-start text-left h-auto p-4 ";
                  
                  if (sessionState.showResult) {
                    if (index === sessionState.currentQuestion!.correctAnswer) {
                      buttonClass += "bg-green-50 border-green-500 text-green-700 dark:bg-green-950 dark:border-green-400";
                    } else if (index === sessionState.selectedAnswer) {
                      buttonClass += "bg-red-50 border-red-500 text-red-700 dark:bg-red-950 dark:border-red-400";
                    } else {
                      buttonClass += "bg-gray-50 dark:bg-gray-800 opacity-60";
                    }
                  } else if (sessionState.selectedAnswer === index) {
                    buttonClass += "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950 dark:border-blue-400";
                  } else {
                    buttonClass += "hover:bg-gray-50 dark:hover:bg-gray-800";
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={sessionState.showResult}
                    >
                      <span className="font-medium mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </Button>
                  );
                })}
              </div>

              {/* Explanation */}
              {sessionState.showExplanation && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        Explanation
                      </div>
                      <div className="text-blue-800 dark:text-blue-200 text-sm">
                        {sessionState.currentQuestion.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {!sessionState.showResult ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={sessionState.selectedAnswer === null}
                    className="flex-1"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion}
                    className="flex-1"
                  >
                    Next Question
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}