'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  Flame, 
  Target, 
  Star, 
  CheckCircle, 
  XCircle,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';
import { QuizSession, UserProgress } from '@/types/quiz';
import { storage, progressUtils } from '@/lib/quiz-storage';
import { getDailyQuizQuestions, topicMetadata } from '@/lib/quiz-data';

interface QuizContainerProps {
  initialProgress?: UserProgress;
}

export default function QuizContainer({ initialProgress }: QuizContainerProps) {
  const [progress, setProgress] = useState<UserProgress>(initialProgress || storage.getUserProgress());
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Initialize quiz session
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const existingSession = storage.getCurrentSession();
    
    if (existingSession && existingSession.date === today) {
      // Continue existing session
      setCurrentSession(existingSession);
      setCurrentQuestionIndex(existingSession.answers.findIndex(a => a === null) || 0);
    } else {
      // Create new session
      const questions = getDailyQuizQuestions(6);
      const newSession: QuizSession = {
        id: `session-${Date.now()}`,
        date: today,
        questions,
        answers: new Array(questions.length).fill(null),
        score: 0,
        completed: false,
        timeSpent: 0,
        challengeType: 'mixed-practice'
      };
      setCurrentSession(newSession);
      storage.saveCurrentSession(newSession);
      setStartTime(Date.now());
    }
    setIsLoading(false);
  }, []);

  const currentQuestion = currentSession?.questions[currentQuestionIndex];
  const totalQuestions = currentSession?.questions.length || 0;
  const progressPercentage = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentSession || !currentQuestion) return;

    const updatedSession = { ...currentSession };
    updatedSession.answers[currentQuestionIndex] = selectedAnswer;
    
    setCurrentSession(updatedSession);
    storage.saveCurrentSession(updatedSession);
    setShowExplanation(true);

    // Auto-advance after showing explanation
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        // Quiz completed
        completeQuiz(updatedSession);
      }
    }, 3000);
  };

  const completeQuiz = (session: QuizSession) => {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    
    // Calculate score
    const correctAnswers = session.answers.reduce((count, answer, index) => {
      return answer === session.questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const finalScore = Math.round((correctAnswers / session.questions.length) * 100);
    
    const completedSession: QuizSession = {
      ...session,
      score: finalScore,
      completed: true,
      timeSpent
    };

    // Update user progress
    const sessionPoints = progressUtils.calculateSessionPoints(completedSession);
    const updatedProgress = progressUtils.updateStreak(progress, session.date);
    const topicUpdatedProgress = progressUtils.updateTopicProgress(updatedProgress, completedSession);
    const newAchievements = progressUtils.checkAchievements(topicUpdatedProgress);
    
    const finalProgress: UserProgress = {
      ...topicUpdatedProgress,
      totalPoints: topicUpdatedProgress.totalPoints + sessionPoints,
      level: progressUtils.calculateLevel(topicUpdatedProgress.totalPoints + sessionPoints),
      completedQuizzes: topicUpdatedProgress.completedQuizzes + 1,
      achievements: [...topicUpdatedProgress.achievements, ...newAchievements]
    };

    // Save data
    storage.saveQuizSession(completedSession);
    storage.saveUserProgress(finalProgress);
    storage.saveCurrentSession(null); // Clear current session
    
    setProgress(finalProgress);
    setCurrentSession(completedSession);
    setQuizCompleted(true);
  };

  const startNewQuiz = () => {
    window.location.reload(); // Simple way to restart
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Preparing your daily dive...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (quizCompleted && currentSession) {
    return <QuizResults session={currentSession} progress={progress} onStartNew={startNewQuiz} />;
  }

  if (!currentSession || !currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center p-8">
            <p className="text-muted-foreground">Unable to load quiz. Please try again.</p>
            <Button onClick={startNewQuiz} className="mt-4">Start New Quiz</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Header */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-semibold">{progress.currentStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{progress.totalPoints} points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold">Level {progress.level}</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Badge>
            </div>
            <Progress value={progressPercentage} className="mt-3" />
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className={`bg-gradient-to-r ${topicMetadata[currentQuestion.topic].color} text-white border-0`}
              >
                {topicMetadata[currentQuestion.topic].icon} {topicMetadata[currentQuestion.topic].name}
              </Badge>
              <Badge variant={currentQuestion.difficulty === 'easy' ? 'secondary' : 
                             currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'}>
                {currentQuestion.difficulty}
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed mt-4">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const isIncorrect = showExplanation && isSelected && !isCorrect;
              const shouldHighlight = showExplanation && isCorrect;

              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full text-left justify-start h-auto p-4 text-wrap ${
                    shouldHighlight ? 'bg-green-100 border-green-500 text-green-800 hover:bg-green-100' :
                    isIncorrect ? 'bg-red-100 border-red-500 text-red-800 hover:bg-red-100' :
                    isSelected ? 'bg-blue-100 border-blue-500' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <div className="flex items-center space-x-3">
                    {showExplanation && (
                      shouldHighlight ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                      isIncorrect ? <XCircle className="h-5 w-5 text-red-600" /> : null
                    )}
                    <span className="font-medium text-sm bg-gray-100 rounded px-2 py-1 min-w-[24px] text-center">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </div>
                </Button>
              );
            })}

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            )}

            {!showExplanation && (
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="px-8"
                >
                  Submit Answer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Quiz Results Component
interface QuizResultsProps {
  session: QuizSession;
  progress: UserProgress;
  onStartNew: () => void;
}

function QuizResults({ session, progress, onStartNew }: QuizResultsProps) {
  const correctAnswers = session.answers.reduce((count, answer, index) => {
    return answer === session.questions[index].correctAnswer ? count + 1 : count;
  }, 0);

  const sessionPoints = progressUtils.calculateSessionPoints(session);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Celebration Header */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50 text-center">
          <CardContent className="pt-8 pb-6">
            <div className="mb-4">
              <Award className="h-16 w-16 text-yellow-500 mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Dive Complete! 🎉
            </h1>
            <p className="text-green-700">
              You scored {correctAnswers} out of {session.questions.length} questions correctly!
            </p>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Session Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{session.score}%</div>
                <div className="text-sm text-blue-700">Score</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">+{sessionPoints}</div>
                <div className="text-sm text-green-700">Points Earned</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Time: {Math.floor(session.timeSpent / 60)}m {session.timeSpent % 60}s</span>
              </div>
              <div className="flex items-center space-x-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{progress.currentStreak} day streak</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold">{progress.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div>
                <div className="text-lg font-bold">Level {progress.level}</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
              <div>
                <div className="text-lg font-bold">{progress.completedQuizzes}</div>
                <div className="text-sm text-muted-foreground">Quizzes Done</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button onClick={onStartNew} className="flex-1">
            Practice More
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/'}>
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}