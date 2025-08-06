import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Users, Clock, Waves } from 'lucide-react';
import { Disclaimer } from '@/components/quiz/Disclaimer';

export default function QuizHub() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            PADI Open Water Quiz
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice and reinforce your diving knowledge with our spaced-repetition quiz system. 
            Perfect for Open Water learners and certified divers looking to refresh their skills.
          </p>
        </div>

        <Disclaimer />

        {/* Quiz Modes */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Daily Quiz */}
          <Card className="relative">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>Daily Quiz</CardTitle>
                <Badge variant="default" className="ml-auto">Recommended</Badge>
              </div>
              <CardDescription>
                Your personalized daily practice with spaced repetition. 5-7 questions, 2-3 minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Adaptive difficulty based on your progress
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  Covers all PADI Open Water topics
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Track your learning streak
                </div>
              </div>
              <Button asChild className="w-full">
                <Link href="/quiz/daily">
                  Start Daily Quiz
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Scenario Practice */}
          <Card className="relative opacity-75">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Waves className="h-5 w-5 text-blue-500" />
                <CardTitle>Scenario Practice</CardTitle>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
              <CardDescription>
                Practice real-world diving scenarios and emergency procedures.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Emergency response training
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  Problem-solving scenarios
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  Buddy system practice
                </div>
              </div>
              <Button disabled className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Topic Areas */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">What You&apos;ll Practice</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-red-600">Safety</div>
              <div className="text-sm text-muted-foreground">BWRAF, ascent rates, safety stops</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-blue-600">Physics</div>
              <div className="text-sm text-muted-foreground">Boyle&apos;s Law, pressure, buoyancy</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-green-600">Physiology</div>
              <div className="text-sm text-muted-foreground">DCS, equalization, narcosis</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-purple-600">Equipment</div>
              <div className="text-sm text-muted-foreground">BCD, regulator, mask clearing</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-orange-600">Planning</div>
              <div className="text-sm text-muted-foreground">NDLs, computers, surface intervals</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-teal-600">Environment</div>
              <div className="text-sm text-muted-foreground">Marine life, currents, visibility</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-indigo-600">Signals</div>
              <div className="text-sm text-muted-foreground">Hand signals, communication</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="font-medium text-pink-600">Emergency</div>
              <div className="text-sm text-muted-foreground">Air sharing, separation, procedures</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Learning Features</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Target className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Spaced Repetition</h3>
                  <p className="text-sm text-muted-foreground">
                    Questions return at optimal intervals for long-term retention
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <BookOpen className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Detailed Explanations</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn from mistakes with comprehensive rationales
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Users className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-semibold">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Build streaks and track your improvement over time
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}