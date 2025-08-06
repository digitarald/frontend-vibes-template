"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserProgress, Achievement } from '@/types/quiz';
import { mockQuestions } from '@/data/mockData';
import { 
  generateDailyQuiz, 
  updateProgressAfterQuiz, 
  checkNewAchievements,
  calculateQuestionPoints,
  formatTime
} from '@/lib/quizUtils';
import { ChevronLeft, Clock, CheckCircle, XCircle, Award } from 'lucide-react';
import { toast } from 'sonner';

interface QuizInterfaceProps {
  userProgress: UserProgress;
  onComplete: (updatedProgress: UserProgress) => void;
  onExit: () => void;
}

export function QuizInterface({ userProgress, onComplete, onExit }: QuizInterfaceProps) {
  const [quiz] = useState(() => generateDailyQuiz(mockQuestions, new Date().toISOString().split('T')[0]));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  // Move to next question or show results
  const handleNext = () => {
    if (isLastQuestion) {
      handleQuizComplete();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Complete the quiz and calculate results
  const handleQuizComplete = () => {
    const updatedProgress = updateProgressAfterQuiz(userProgress, quiz, selectedAnswers);
    
    // Check for perfect score achievement
    const correctCount = selectedAnswers.filter((answer, index) => 
      answer === quiz.questions[index].correctAnswer
    ).length;
    
    if (correctCount === quiz.questions.length) {
      if (!updatedProgress.earnedBadges.includes('perfect-quiz')) {
        updatedProgress.earnedBadges.push('perfect-quiz');
        updatedProgress.totalPoints += 100; // Perfect quiz achievement points
      }
    }
    
    // Check for new achievements
    const newAchievementsEarned = checkNewAchievements(userProgress, updatedProgress);
    setNewAchievements(newAchievementsEarned);
    
    // Add new achievements to progress
    newAchievementsEarned.forEach(achievement => {
      if (!updatedProgress.earnedBadges.includes(achievement.id)) {
        updatedProgress.earnedBadges.push(achievement.id);
        updatedProgress.totalPoints += achievement.points;
      }
    });
    
    setShowResults(true);
    
    // Complete the quiz after a delay to show results
    setTimeout(() => {
      onComplete(updatedProgress);
      
      // Show celebration toasts for achievements
      if (newAchievementsEarned.length > 0) {
        newAchievementsEarned.forEach(achievement => {
          toast.success(`🎉 Achievement Unlocked: ${achievement.name}!`, {
            description: achievement.description
          });
        });
      }
    }, 3000);
  };

  if (showResults) {
    const correctCount = selectedAnswers.filter((answer, index) => 
      answer === quiz.questions[index].correctAnswer
    ).length;
    const totalPoints = selectedAnswers.reduce((total, answer, index) => {
      const isCorrect = answer === quiz.questions[index].correctAnswer;
      return total + calculateQuestionPoints(quiz.questions[index], isCorrect);
    }, 0);
    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    return (
      <div className="container mx-auto px-4 py-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Complete! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Overview */}
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">{percentage}%</div>
              <div className="space-y-2">
                <p className="text-lg">
                  {correctCount} out of {quiz.questions.length} correct
                </p>
                <p className="text-muted-foreground">
                  Earned {totalPoints} points in {formatTime(timeTaken)}
                </p>
              </div>
            </div>

            {/* New Achievements */}
            {newAchievements.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  New Achievements!
                </h3>
                {newAchievements.map(achievement => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge>+{achievement.points} pts</Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Question Review */}
            <div className="space-y-4">
              <h3 className="font-semibold">Review Your Answers</h3>
              {quiz.questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="p-4 rounded-lg border space-y-2">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.question}</p>
                        <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-700">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-muted-foreground">
                Returning to dashboard in a moment...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onExit}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Exit Quiz
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </div>
          </div>
          <Progress value={((currentQuestionIndex + 1) / quiz.questions.length) * 100} className="h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Topic Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-sm">
              <span className="mr-1">{currentQuestion.topic.icon}</span>
              {currentQuestion.topic.name}
            </Badge>
          </div>

          {/* Question */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full p-4 h-auto text-left justify-start whitespace-normal"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="mr-3 font-semibold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}