import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Target, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PADI Open Water Quiz - Frontend Vibes',
  description: 'Interactive scenario-based quiz for PADI Open Water certification training',
};

export default function Home() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
            <Waves className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">PADI Open Water Training</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight">
            Diving Scenario Quiz
          </h1>
          
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Practice real-world diving scenarios to build confidence and critical thinking skills for your certification.
          </p>
        </div>

        <Card className="text-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              What You&apos;ll Learn
            </CardTitle>
            <CardDescription>
              Interactive scenarios covering emergency responses, equipment handling, and dive planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Emergency response procedures</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Equipment troubleshooting techniques</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-green-500 rounded"></div>
                <span className="text-sm">Buoyancy control and coral protection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-orange-500 rounded"></div>
                <span className="text-sm">Navigation and surface procedures</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Link href="/quiz">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Quiz
              <Waves className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            6 scenarios • Multiple choice with explanations • Visual learning elements
          </p>
        </div>
      </div>
    </div>
  );
}
