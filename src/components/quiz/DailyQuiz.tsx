"use client";

import { useState, useEffect } from 'react';
import { QuizItem, owdQuestions } from '@/data/owd-questions';
import { srsManager } from '@/lib/srs';
import { QuestionCard } from './QuestionCard';
import { SessionSummary } from './SessionSummary';
import { Disclaimer } from './Disclaimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Target, Flame, RotateCcw } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SessionResult {
  questionId: string;
  correct: boolean;
  question: string;
  tags: string[];
}

enum SessionState {
  LOADING = 'loading',
  READY = 'ready',
  IN_PROGRESS = 'in_progress',
  COMPLETE = 'complete',
  NO_ITEMS = 'no_items'
}

export function DailyQuiz() {
  const [sessionState, setSessionState] = useState<SessionState>(SessionState.LOADING);
  const [currentItems, setCurrentItems] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState({ totalItems: 0, dueItems: 0, masteredItems: 0, streak: 0 });
  const [isAnswered, setIsAnswered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = () => {
    setSessionState(SessionState.LOADING);
    
    try {
      const dueItems = srsManager.getDueItems(owdQuestions);
      const currentStats = srsManager.getStats(owdQuestions);
      const currentStreak = srsManager.getStreak();
      
      setStats(currentStats);
      setStreak(currentStreak);

      if (dueItems.length === 0) {
        setSessionState(SessionState.NO_ITEMS);
        return;
      }

      // Limit to 5-7 questions per session
      const sessionItems = dueItems.slice(0, Math.min(7, dueItems.length));
      setCurrentItems(sessionItems);
      setCurrentIndex(0);
      setResults([]);
      setIsAnswered(false);
      setSessionState(SessionState.READY);
    } catch (error) {
      console.error('Failed to initialize session:', error);
      setSessionState(SessionState.NO_ITEMS);
    }
  };

  const startReviewMissed = () => {
    try {
      const missedItems = srsManager.getMissedItems(owdQuestions);
      if (missedItems.length === 0) {
        // Fallback to random items
        const randomItems = srsManager.getRandomItems(owdQuestions, 2);
        setCurrentItems(randomItems);
      } else {
        // Limit missed items review to 5 questions
        setCurrentItems(missedItems.slice(0, 5));
      }
      
      setCurrentIndex(0);
      setResults([]);
      setIsAnswered(false);
      setSessionState(SessionState.IN_PROGRESS);
    } catch (error) {
      console.error('Failed to start missed review:', error);
    }
  };

  const startRandomPractice = () => {
    try {
      const randomItems = srsManager.getRandomItems(owdQuestions, 5);
      setCurrentItems(randomItems);
      setCurrentIndex(0);
      setResults([]);
      setIsAnswered(false);
      setSessionState(SessionState.IN_PROGRESS);
    } catch (error) {
      console.error('Failed to start random practice:', error);
    }
  };

  const handleAnswer = (correct: boolean) => {
    const currentItem = currentItems[currentIndex];
    
    // Grade the item in SRS
    srsManager.grade(currentItem.id, correct);
    
    // Add to results
    const result: SessionResult = {
      questionId: currentItem.id,
      correct,
      question: currentItem.question,
      tags: currentItem.tags
    };
    
    setResults(prev => [...prev, result]);
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= currentItems.length) {
      // Session complete
      srsManager.updateStreak();
      setStreak(srsManager.getStreak());
      setStats(srsManager.getStats(owdQuestions));
      setSessionState(SessionState.COMPLETE);
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
    }
  };

  const progress = currentItems.length > 0 ? ((currentIndex + 1) / currentItems.length) * 100 : 0;

  if (sessionState === SessionState.LOADING) {
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

  if (sessionState === SessionState.NO_ITEMS) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Disclaimer />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              All Caught Up!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 p-4 bg-accent/50 rounded-lg">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">Current Streak: {streak} days</span>
              </div>
              
              <p className="text-muted-foreground">
                You&apos;ve completed all available questions for today! Come back tomorrow for new reviews, 
                or practice with some random questions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalItems}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.masteredItems}</div>
                  <div className="text-sm text-muted-foreground">Mastered</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={startRandomPractice} className="w-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                Practice Random Questions
              </Button>
              
              <Button 
                onClick={startReviewMissed} 
                variant="outline" 
                className="w-full"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Review Previous Mistakes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sessionState === SessionState.COMPLETE) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Disclaimer />
        <SessionSummary
          results={results}
          streak={streak}
          onReviewMissed={startReviewMissed}
          onNewSession={initializeSession}
          dueItemsCount={stats.dueItems}
        />
      </div>
    );
  }

  if (sessionState === SessionState.READY) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Disclaimer />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Daily Quiz Ready
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 p-4 bg-accent/50 rounded-lg">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="font-semibold">Current Streak: {streak} days</span>
              </div>
              
              <p className="text-muted-foreground">
                Ready to review {currentItems.length} questions! Each session takes about 2-3 minutes.
              </p>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentItems.length}</div>
                  <div className="text-sm text-muted-foreground">Questions Due</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.masteredItems}</div>
                  <div className="text-sm text-muted-foreground">Mastered</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setSessionState(SessionState.IN_PROGRESS)} 
              className="w-full"
              size={isMobile ? "lg" : "default"}
            >
              Start Daily Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // IN_PROGRESS state
  const currentItem = currentItems[currentIndex];
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Disclaimer />
      
      {/* Progress Header */}
      <Card>
        <CardContent className="py-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Question {currentIndex + 1} of {currentItems.length}
              </span>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">{streak} day streak</span>
              </div>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <QuestionCard
        item={currentItem}
        onAnswer={handleAnswer}
      />

      {/* Next Button */}
      {isAnswered && (
        <div className="flex justify-center">
          <Button 
            onClick={nextQuestion}
            size={isMobile ? "lg" : "default"}
            className="w-full sm:w-auto"
          >
            {currentIndex + 1 >= currentItems.length ? 'Complete Session' : 'Next Question'}
          </Button>
        </div>
      )}
    </div>
  );
}