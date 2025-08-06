"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import { UserProgress } from '@/types/quiz';
import { initialUserProgress, padiTopics, achievements } from '@/data/mockData';
import { loadUserProgress, saveUserProgress, canTakeQuiz, getStreakEmoji } from '@/lib/quizUtils';
import { QuizInterface } from './quiz-interface';
import { Flame, Trophy, Target, Calendar, Award, Users } from 'lucide-react';

export function Dashboard() {
  const [userProgress, setUserProgress] = useState<UserProgress>(initialUserProgress);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const isMobile = useIsMobile();

  // Load user progress on mount
  useEffect(() => {
    const saved = loadUserProgress();
    if (saved) {
      setUserProgress(saved);
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  const earnedAchievements = achievements.filter(achievement => 
    userProgress.earnedBadges.includes(achievement.id)
  );

  const canTakeQuizToday = canTakeQuiz(userProgress);
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (showQuiz) {
    return (
      <QuizInterface
        userProgress={userProgress}
        onComplete={(updatedProgress) => {
          setUserProgress(updatedProgress);
          setShowQuiz(false);
        }}
        onExit={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">PADI Quiz Pro</h1>
        <p className="text-muted-foreground">
          Master your Open Water certification with daily practice
        </p>
        <p className="text-sm text-muted-foreground">{today}</p>
      </div>

      {/* Stats Overview */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {userProgress.currentStreak}
              <span className="text-lg">{getStreakEmoji(userProgress.currentStreak)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Best: {userProgress.longestStreak} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Keep learning!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnedAchievements.length}</div>
            <p className="text-xs text-muted-foreground">
              {achievements.length - earnedAchievements.length} to go
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Done</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgress.completedQuizzes.length}</div>
            <p className="text-xs text-muted-foreground">
              Practice makes perfect
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Quiz Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today&apos;s Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {canTakeQuizToday ? (
            <>
              <p className="text-muted-foreground">
                Ready for today&apos;s challenge? Test your PADI knowledge with 5 questions covering various topics.
              </p>
              <Button 
                onClick={() => setShowQuiz(true)}
                className="w-full"
                size="lg"
              >
                Start Daily Quiz
              </Button>
            </>
          ) : (
            <>
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-lg font-semibold mb-2">Quiz Complete!</h3>
                <p className="text-muted-foreground">
                  Great job! Come back tomorrow for your next challenge.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Your streak: {userProgress.currentStreak} days {getStreakEmoji(userProgress.currentStreak)}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Topic Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Topic Mastery</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {padiTopics.map(topic => {
            const progress = userProgress.topicProgress[topic.id];
            const masteryLevel = progress?.masteryLevel || 0;
            const questionsAnswered = progress?.questionsAnswered || 0;
            
            return (
              <div key={topic.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{topic.icon}</span>
                    <span className="font-medium">{topic.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {masteryLevel}% • {questionsAnswered} questions
                  </div>
                </div>
                <Progress value={masteryLevel} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          {earnedAchievements.length > 0 ? (
            <div className="grid gap-3">
              {earnedAchievements.slice(-3).map(achievement => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.name}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge variant="secondary">+{achievement.points} pts</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Complete quizzes to earn your first achievement!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
        >
          <Users className="mr-2 h-4 w-4" />
          Leaderboard
        </Button>
        <Button variant="outline" className="flex-1">
          <Award className="mr-2 h-4 w-4" />
          All Badges
        </Button>
      </div>

      {/* Leaderboard Preview */}
      {showLeaderboard && (
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-4">
              Leaderboard feature coming soon! Compare your progress with fellow divers.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}