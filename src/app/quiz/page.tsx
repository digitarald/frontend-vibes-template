import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, Clock, BookOpen, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PADI Open Water Adaptive Quiz - Learn Smarter',
  description: 'Personalized learning quiz for PADI Open Water certification with adaptive difficulty and spaced repetition',
};

export default function QuizHomePage() {
  // Mock data for demonstration
  const userStats = {
    questionsAnswered: 127,
    overallAccuracy: 78,
    studyStreak: 5,
    masteryLevel: 68,
    timeSpent: 245, // minutes
  };

  const recentTopics = [
    { name: 'Buoyancy Control', accuracy: 85, improvement: '+12%' },
    { name: 'Safety Procedures', accuracy: 72, improvement: '+8%' },
    { name: 'Equipment Knowledge', accuracy: 91, improvement: '+3%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PADI Open Water <span className="text-blue-600">Adaptive Quiz</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Personalized learning that adapts to your knowledge gaps, uses spaced repetition, 
            and helps you master diving concepts efficiently.
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{userStats.questionsAnswered}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{userStats.overallAccuracy}%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overall Accuracy</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">{userStats.studyStreak}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">{userStats.timeSpent}m</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time Studied</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Start Quiz Session */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Adaptive Practice
              </CardTitle>
              <CardDescription>
                AI-powered question selection based on your performance patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Mastery</span>
                    <span>{userStats.masteryLevel}%</span>
                  </div>
                  <Progress value={userStats.masteryLevel} className="h-2" />
                </div>
                <Link href="/quiz/session" className="block">
                  <Button className="w-full" size="lg">
                    Start Smart Session
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Review Session */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Spaced Review
              </CardTitle>
              <CardDescription>
                Review previously mastered questions at optimal intervals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Items Due for Review</p>
                </div>
                <Link href="/quiz/review" className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    Start Review Session
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Dashboard */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Learning Analytics
              </CardTitle>
              <CardDescription>
                Insights into your progress and personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-purple-600">
                    3 New Insights
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ready to view</p>
                </div>
                <Link href="/quiz/dashboard" className="block">
                  <Button variant="outline" className="w-full" size="lg">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Topic Performance
            </CardTitle>
            <CardDescription>
              Your progress across different PADI knowledge areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex-1">
                    <h4 className="font-medium">{topic.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={topic.accuracy} className="flex-1 h-2" />
                      <span className="text-sm font-medium">{topic.accuracy}%</span>
                    </div>
                  </div>
                  <Badge variant={topic.improvement.startsWith('+') ? 'default' : 'secondary'} className="ml-4">
                    {topic.improvement}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Topic Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Practice specific PADI knowledge areas
              </p>
              <Link href="/quiz/topics">
                <Button variant="outline" className="w-full">
                  Browse by Topic
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Assessment Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Test your knowledge with exam-style questions
              </p>
              <Link href="/quiz/assessment">
                <Button variant="outline" className="w-full">
                  Take Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features Highlight */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Why Choose Adaptive Learning?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
              <Brain className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Smart Question Selection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI analyzes your performance to present questions that challenge you appropriately and target knowledge gaps.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
              <Target className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Spaced Repetition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review mastered topics at scientifically-optimized intervals to maximize long-term retention.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-white dark:bg-gray-800">
              <TrendingUp className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Personalized Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get recommendations on where to focus your study time for maximum improvement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}