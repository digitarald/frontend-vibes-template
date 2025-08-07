import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DivingScenario, ScenarioQuestion } from './types';
import { AlertTriangle, Waves, Wrench, Compass, Fish, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ScenarioViewProps {
  scenario: DivingScenario;
  question: ScenarioQuestion;
  questionIndex: number;
  selectedAnswer?: string;
  onAnswerSelect: (questionId: string, answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
}

const scenarioIcons = {
  emergency: AlertTriangle,
  equipment: Wrench,
  buoyancy: Fish,
  navigation: Compass,
  environment: Waves,
  planning: Calendar,
};

const scenarioColors = {
  emergency: 'bg-red-500',
  equipment: 'bg-blue-500',
  buoyancy: 'bg-green-500',
  navigation: 'bg-orange-500',
  environment: 'bg-cyan-500',
  planning: 'bg-purple-500',
};

const difficultyColors = {
  basic: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
};

export function ScenarioView({
  scenario,
  question,
  questionIndex,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoBack,
  isLastQuestion,
}: ScenarioViewProps) {
  const Icon = scenarioIcons[scenario.type];
  const canProceed = selectedAnswer !== undefined;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Scenario Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`${scenarioColors[scenario.type]} p-2 rounded-md text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{scenario.title}</h1>
                  <p className="text-sm text-muted-foreground">{scenario.environment.replace('_', ' ').toUpperCase()} • Question {questionIndex + 1} of {scenario.questions.length}</p>
                </div>
              </div>
            </div>
            <Badge className={difficultyColors[scenario.difficulty]}>
              {scenario.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base">{scenario.context}</p>
          
          {scenario.imageUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={scenario.imageUrl}
                alt={scenario.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {scenario.visualElements && scenario.visualElements.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenario.visualElements.map((element, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={element.url}
                      alt={element.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{element.caption}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={selectedAnswer || ''}
            onValueChange={(value) => onAnswerSelect(question.id, value)}
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
                <Label htmlFor={option.id} className="text-sm font-normal leading-relaxed cursor-pointer flex-1">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedAnswer && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Explanation</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">{question.explanation}</p>
              
              {question.consequences && (
                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-green-700 dark:text-green-300">Correct Choice: </span>
                      <span className="text-xs text-green-600 dark:text-green-400">{question.consequences.correct}</span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-red-700 dark:text-red-300">Incorrect Choice: </span>
                      <span className="text-xs text-red-600 dark:text-red-400">{question.consequences.incorrect}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}