'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  TrendingUp, 
  Target,
  Clock,
  Brain,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Calendar,
  BarChart3
} from 'lucide-react';
import { AdaptiveQuizEngine } from '@/lib/quiz/adaptive-engine';
import { TOPIC_LABELS, RecommendationItem } from '@/types/quiz';

export default function QuizDashboardPage() {
  const [quizEngine] = useState(() => new AdaptiveQuizEngine());
  const [analytics, setAnalytics] = useState<ReturnType<AdaptiveQuizEngine['getAnalytics']> | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      quizEngine.loadUserData();
      const analyticsData = quizEngine.getAnalytics();
      const recommendationsData = quizEngine.generateRecommendations();
      
      setAnalytics(analyticsData);
      setRecommendations(recommendationsData);
      setLoading(false);
    };

    loadData();
  }, [quizEngine]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'focus_topic': return Target;
      case 'review_session': return Clock;
      case 'difficulty_adjustment': return TrendingUp;
      case 'study_break': return Calendar;
      default: return Brain;
    }
  };

  const getMasteryLevelColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-950 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-lg font-semibold mb-2">Loading your analytics...</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Analyzing your learning patterns and progress.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-950 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/quiz">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Quiz Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Learning Analytics</span>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600">{analytics.totalQuestions}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Questions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(analytics.overallAccuracy * 100)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overall Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(analytics.recentAccuracy * 100)}%
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recent Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatTime(analytics.averageTime)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Time/Question</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">Topic Mastery</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Overall Progress</span>
                      <div className="flex items-center gap-2">
                        <Progress value={analytics.overallAccuracy * 100} className="w-20 h-2" />
                        <span className="text-sm font-medium">
                          {Math.round(analytics.overallAccuracy * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Recent Performance</span>
                      <div className="flex items-center gap-2">
                        <Progress value={analytics.recentAccuracy * 100} className="w-20 h-2" />
                        <span className="text-sm font-medium">
                          {Math.round(analytics.recentAccuracy * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Study Efficiency</span>
                      <Badge variant="secondary">
                        {(analytics.totalQuestions / (analytics.totalTime / 3600)).toFixed(1)} Q/hr
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Study Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Study Time</span>
                      <span className="font-medium">
                        {Math.round(analytics.totalTime / 60)} minutes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Questions Due for Review</span>
                      <Badge variant={analytics.reviewItemsDue > 0 ? "destructive" : "secondary"}>
                        {analytics.reviewItemsDue}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Response Time</span>
                      <span className="font-medium">{formatTime(analytics.averageTime)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Strongest & Weakest Topics</CardTitle>
                <CardDescription>
                  Your best and most challenging knowledge areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-600 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Strongest Topics
                    </h4>
                    <div className="space-y-2">
                      {analytics.strongestTopics.map((topic) => (
                        <div key={topic.topic} className="flex justify-between items-center p-2 rounded bg-green-50 dark:bg-green-950">
                          <span className="text-sm">{TOPIC_LABELS[topic.topic]}</span>
                          <span className="text-sm font-medium text-green-600">
                            {Math.round(topic.masteryLevel)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-600 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Areas for Improvement
                    </h4>
                    <div className="space-y-2">
                      {analytics.weakestTopics.map((topic) => (
                        <div key={topic.topic} className="flex justify-between items-center p-2 rounded bg-red-50 dark:bg-red-950">
                          <span className="text-sm">{TOPIC_LABELS[topic.topic]}</span>
                          <span className="text-sm font-medium text-red-600">
                            {Math.round(topic.masteryLevel)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic Mastery Breakdown</CardTitle>
                <CardDescription>
                  Detailed performance analysis across all PADI knowledge areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topicPerformance.map((topic) => (
                    <div key={topic.topic} className="p-4 rounded-lg border bg-white dark:bg-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{TOPIC_LABELS[topic.topic]}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${getMasteryLevelColor(topic.masteryLevel)}`}>
                            {Math.round(topic.masteryLevel)}%
                          </span>
                          {topic.recommendedFocus && (
                            <Badge variant="outline" className="text-xs">
                              Focus Area
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Questions:</span>
                          <div className="font-medium">{topic.totalQuestions}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
                          <div className="font-medium">
                            {topic.totalQuestions > 0 
                              ? `${Math.round((topic.correctAnswers / topic.totalQuestions) * 100)}%`
                              : 'N/A'
                            }
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Avg. Time:</span>
                          <div className="font-medium">{formatTime(topic.averageTime)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Last Attempt:</span>
                          <div className="font-medium text-xs">
                            {topic.lastAttempt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Progress value={topic.masteryLevel} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>
                  AI-generated suggestions to optimize your learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-500 dark:text-gray-400">
                        No recommendations at this time. Keep practicing to get personalized insights!
                      </div>
                    </div>
                  ) : (
                    recommendations.map((rec) => {
                      const IconComponent = getRecommendationIcon(rec.type);
                      return (
                        <div key={rec.id} className="p-4 rounded-lg border bg-white dark:bg-gray-800">
                          <div className="flex items-start gap-3">
                            <IconComponent className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{rec.title}</h4>
                                <Badge 
                                  variant="outline" 
                                  className={getPriorityColor(rec.priority)}
                                >
                                  {rec.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {rec.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {rec.reasoning}
                                </div>
                                <div className="flex items-center gap-2">
                                  {rec.estimatedTime && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      ~{rec.estimatedTime} min
                                    </span>
                                  )}
                                  <Button size="sm" variant="outline">
                                    {rec.actionText}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Insights</CardTitle>
                <CardDescription>
                  Deeper analysis of your learning patterns and habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                      Performance Analysis
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {analytics.recentAccuracy > analytics.overallAccuracy 
                        ? "You're improving! Your recent accuracy is higher than your overall average."
                        : "Consider reviewing fundamental concepts to improve your recent performance."
                      }
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                      Study Efficiency
                    </h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {analytics.averageTime < 45 
                        ? "Great job! You're answering questions efficiently while maintaining accuracy."
                        : "Consider spending more time reading questions carefully to improve accuracy."
                      }
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800">
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                      Spaced Repetition Status
                    </h4>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      {analytics.reviewItemsDue > 0 
                        ? `You have ${analytics.reviewItemsDue} items due for review. Regular review sessions help with long-term retention.`
                        : "You're up to date with your reviews! This helps with long-term knowledge retention."
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/quiz/session">
                <Button className="w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  Start Adaptive Session
                </Button>
              </Link>
              <Link href="/quiz/review">
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Review Due Items ({analytics.reviewItemsDue})
                </Button>
              </Link>
              <Link href="/quiz/topics">
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Practice by Topic
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}