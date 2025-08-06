import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Quiz Hub - PADI Training Tools',
  description: 'Access practice modes and quizzes for PADI diving certification training',
};

export default function QuizHub() {
  return (
    <div className="container max-w-6xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Quiz Hub</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Practice and test your knowledge with interactive learning tools for PADI diving certification
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="secondary">New</Badge>
            </div>
            <CardTitle>Hand Signal Drills</CardTitle>
            <CardDescription>
              Master essential underwater communication signals for PADI Open Water Diver certification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">Practice Mode</Badge>
              <Badge variant="outline" className="text-xs">10-Question Quiz</Badge>
              <Badge variant="outline" className="text-xs">15 Signals</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Interactive flashcards</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Progress tracking</span>
              </div>
            </div>
            <Link href="/quiz/signals" className="block">
              <Button className="w-full">
                Start Practice
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Placeholder for future quizzes */}
        <Card className="relative overflow-hidden opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Trophy className="w-6 h-6 text-muted-foreground" />
              </div>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <CardTitle>Equipment Knowledge</CardTitle>
            <CardDescription>
              Learn about diving equipment, maintenance, and safety checks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden opacity-60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <Trophy className="w-6 h-6 text-muted-foreground" />
              </div>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <CardTitle>Safety Procedures</CardTitle>
            <CardDescription>
              Practice emergency procedures and safety protocols
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled className="w-full">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 p-6 bg-muted/50 rounded-lg border-l-4 border-primary">
        <h2 className="text-lg font-semibold mb-2">Educational Purpose Only</h2>
        <p className="text-sm text-muted-foreground">
          These tools are for educational practice only and do not replace official PADI training. 
          Always refer to official PADI materials and your certified instructor for authoritative guidance on diving procedures and safety.
        </p>
      </div>
    </div>
  );
}