import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Waves, Fish, AlertTriangle, Compass, Wrench, Calendar } from 'lucide-react';

interface QuizIntroProps {
  onStart: () => void;
  totalScenarios: number;
}

export function QuizIntro({ onStart, totalScenarios }: QuizIntroProps) {
  const scenarioTypes = [
    {
      icon: AlertTriangle,
      title: 'Emergency Situations',
      description: 'Out of air scenarios, equipment failures, emergency responses',
      color: 'bg-red-500',
    },
    {
      icon: Wrench,
      title: 'Equipment Challenges',
      description: 'Mask problems, regulator issues, BCD malfunctions',
      color: 'bg-blue-500',
    },
    {
      icon: Fish,
      title: 'Buoyancy Control',
      description: 'Descent control, coral protection, neutral buoyancy',
      color: 'bg-green-500',
    },
    {
      icon: Compass,
      title: 'Navigation Problems',
      description: 'Lost boat, underwater navigation, surface procedures',
      color: 'bg-orange-500',
    },
    {
      icon: Waves,
      title: 'Environmental Hazards',
      description: 'Current handling, drift diving, weather conditions',
      color: 'bg-cyan-500',
    },
    {
      icon: Calendar,
      title: 'Dive Planning',
      description: 'Depth limits, time calculations, dive table usage',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
          <Waves className="h-5 w-5 text-blue-600" />
          <span className="text-blue-700 dark:text-blue-300 font-medium">PADI Open Water Certification</span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">
          Scenario-Based Diving Quiz
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Bridge the gap between theory and practical diving application with realistic underwater scenarios
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fish className="h-5 w-5" />
            What You&apos;ll Experience
          </CardTitle>
          <CardDescription>
            Interactive scenarios designed to build confidence and critical thinking skills for real diving situations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarioTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                  <div className={`${type.color} p-2 rounded-md text-white shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{type.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Learning Objectives</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Develop practical confidence through realistic scenarios</li>
              <li>• Build critical thinking and decision-making skills</li>
              <li>• Reinforce safety-first mindset in underwater situations</li>
              <li>• Practice emergency response procedures</li>
              <li>• Learn equipment problem-solving techniques</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Structure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Scenarios:</span>
            <Badge variant="secondary">{totalScenarios} scenarios</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Question Format:</span>
            <Badge variant="secondary">Multiple choice with explanations</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Visual Elements:</span>
            <Badge variant="secondary">Images, diagrams, and context photos</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Difficulty:</span>
            <div className="flex gap-1">
              <Badge variant="outline" className="text-xs">Basic</Badge>
              <Badge variant="outline" className="text-xs">Intermediate</Badge>
              <Badge variant="outline" className="text-xs">Advanced</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          size="lg" 
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
        >
          Start Diving Quiz
          <Waves className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Take your time and think through each scenario carefully
        </p>
      </div>
    </div>
  );
}