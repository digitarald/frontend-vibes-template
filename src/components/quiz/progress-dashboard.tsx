'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Flame, 
  Star, 
  Award,
  TrendingUp,
  Users,
  Calendar,
  Target
} from 'lucide-react';
import { UserProgress } from '@/types/quiz';
import { topicMetadata } from '@/lib/quiz-data';
import { mockLeaderboard } from '@/lib/quiz-data';

interface ProgressDashboardProps {
  progress: UserProgress;
  onStartQuiz: () => void;
}

export default function ProgressDashboard({ progress, onStartQuiz }: ProgressDashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const hasCompletedToday = progress.lastQuizDate === today;
  
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{progress.currentStreak}</div>
            <div className="text-sm text-orange-600">Day Streak</div>
            {progress.longestStreak > progress.currentStreak && (
              <div className="text-xs text-orange-500 mt-1">Best: {progress.longestStreak}</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-700">{progress.totalPoints}</div>
            <div className="text-sm text-yellow-600">Total Points</div>
            <div className="text-xs text-yellow-500 mt-1">
              {500 - (progress.totalPoints % 500)} to next level
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{progress.level}</div>
            <div className="text-sm text-purple-600">Level</div>
            <div className="text-xs text-purple-500 mt-1">
              {progress.completedQuizzes} quizzes completed
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{progress.achievements.length}</div>
            <div className="text-sm text-green-600">Achievements</div>
            <div className="text-xs text-green-500 mt-1">
              {8 - progress.achievements.length} more to unlock
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Challenge */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Today&apos;s Challenge</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasCompletedToday ? (
            <div className="text-center py-4">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Daily Challenge Complete! 🎉</h3>
                <p className="text-green-700 mb-4">
                  Great job! You&apos;ve completed today&apos;s PADI quiz. Come back tomorrow for your next challenge.
                </p>
              </div>
              <Button onClick={onStartQuiz} variant="outline" className="border-blue-500 text-blue-600">
                Practice More Questions
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready for Today&apos;s Dive? 🤿</h3>
                <p className="text-blue-700 mb-4">
                  Test your PADI Open Water knowledge with 6 carefully selected questions. 
                  Build your streak and earn points!
                </p>
              </div>
              <Button onClick={onStartQuiz} className="bg-blue-600 hover:bg-blue-700">
                Start Today&apos;s Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Topic Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Topic Mastery</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(progress.topicProgress).map(([topicKey, topicProgress]) => {
            const metadata = topicMetadata[topicKey as keyof typeof topicMetadata];
            const accuracy = topicProgress.totalQuestions > 0 
              ? (topicProgress.correctAnswers / topicProgress.totalQuestions) * 100 
              : 0;
            
            return (
              <div key={topicKey} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{metadata.icon}</span>
                    <div>
                      <div className="font-medium">{metadata.name}</div>
                      <div className="text-sm text-muted-foreground">{metadata.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={topicProgress.masteryLevel === 'expert' ? 'default' : 
                              topicProgress.masteryLevel === 'advanced' ? 'secondary' : 'outline'}
                      className="mb-1"
                    >
                      {topicProgress.masteryLevel}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {topicProgress.correctAnswers}/{topicProgress.totalQuestions} correct
                    </div>
                  </div>
                </div>
                <Progress value={accuracy} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {accuracy.toFixed(0)}% accuracy
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      {progress.achievements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progress.achievements.slice(-4).map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <div className="font-semibold text-yellow-800">{achievement.name}</div>
                    <div className="text-sm text-yellow-700">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mini Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboard.slice(0, 5).map((entry, index) => (
              <div key={entry.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                entry.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  index === 2 ? 'bg-amber-400 text-amber-900' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{entry.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Level {entry.level} • {entry.currentStreak} day streak
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{entry.points}</div>
                  <div className="text-sm text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}