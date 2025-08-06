"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import { SignalCard } from "@/components/quiz/signals/SignalCard";
import { SignalQuiz } from "@/components/quiz/signals/SignalQuiz";
import { owdSignals, signalQuestions, Signal, SignalQuestion } from "@/data/owd-signals";
import { RotateCcw, Play, Shuffle } from "lucide-react";

interface PracticeProgress {
  knownSignals: string[];
  practicedSignals: string[];
  lastSeenSignalIds: string[];
}

interface QuizProgress {
  scores: number[];
  lastQuizAnswers: (number | null)[];
}

interface StorageData {
  practice: PracticeProgress;
  quiz: QuizProgress;
  version: string;
}

const STORAGE_KEY = 'owd-signals-v1';

function getStorageData(): StorageData {
  if (typeof window === 'undefined') {
    return {
      practice: { knownSignals: [], practicedSignals: [], lastSeenSignalIds: [] },
      quiz: { scores: [], lastQuizAnswers: [] },
      version: '1.0'
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  return {
    practice: { knownSignals: [], practicedSignals: [], lastSeenSignalIds: [] },
    quiz: { scores: [], lastQuizAnswers: [] },
    version: '1.0'
  };
}

function saveStorageData(data: StorageData) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function SignalsPageClient() {
  const [storageData, setStorageData] = React.useState<StorageData>(getStorageData);
  const [practiceSignals, setPracticeSignals] = React.useState<Signal[]>(owdSignals);
  const [quizQuestions, setQuizQuestions] = React.useState<SignalQuestion[]>([]);

  const [flippedCards, setFlippedCards] = React.useState<Record<string, boolean>>({});
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  // Initialize quiz questions (10 random questions)
  React.useEffect(() => {
    const shuffled = shuffleArray(signalQuestions).slice(0, 10);
    setQuizQuestions(shuffled);
  }, []);

  const updateStorageData = (updater: (prev: StorageData) => StorageData) => {
    setStorageData(prev => {
      const updated = updater(prev);
      saveStorageData(updated);
      return updated;
    });
  };

  const handleSignalKnown = (signalId: string) => {
    updateStorageData(prev => ({
      ...prev,
      practice: {
        ...prev.practice,
        knownSignals: Array.from(new Set([...prev.practice.knownSignals, signalId])),
        practicedSignals: Array.from(new Set([...prev.practice.practicedSignals, signalId]))
      }
    }));
    
    // Move to next card
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  };

  const handleSignalUnknown = (signalId: string) => {
    updateStorageData(prev => ({
      ...prev,
      practice: {
        ...prev.practice,
        knownSignals: prev.practice.knownSignals.filter(id => id !== signalId),
        practicedSignals: Array.from(new Set([...prev.practice.practicedSignals, signalId]))
      }
    }));
    
    // Move to next card
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  };

  const handleFlipCard = (signalId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [signalId]: !prev[signalId]
    }));
  };

  const resetPractice = () => {
    updateStorageData(prev => ({
      ...prev,
      practice: {
        ...prev.practice,
        knownSignals: [],
        practicedSignals: []
      }
    }));
    setFlippedCards({});
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
  };

  const shufflePractice = () => {
    setPracticeSignals(shuffleArray(owdSignals));
    setFlippedCards({});
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
  };

  const handleQuizComplete = (score: number, answers: (number | null)[]) => {
    updateStorageData(prev => ({
      ...prev,
      quiz: {
        scores: [...prev.quiz.scores, score],
        lastQuizAnswers: answers
      }
    }));
  };

  const newQuiz = () => {
    const shuffled = shuffleArray(signalQuestions).slice(0, 10);
    setQuizQuestions(shuffled);
  };

  const practiceProgress = storageData.practice;
  const knownCount = practiceProgress.knownSignals.length;
  const totalSignals = owdSignals.length;
  const practicePercentage = (knownCount / totalSignals) * 100;

  return (
    <Tabs defaultValue="practice" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="practice" className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          Practice Mode
        </TabsTrigger>
        <TabsTrigger value="quiz" className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs px-2 py-1">
            10Q
          </Badge>
          Quiz Mode
        </TabsTrigger>
      </TabsList>

      <TabsContent value="practice" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Practice Flashcards</h2>
              <Badge variant="outline">
                {knownCount}/{totalSignals} mastered
              </Badge>
            </div>
            <Progress value={practicePercentage} className="w-full sm:w-64" />
          </div>
          <div className="flex gap-2">
            <Button onClick={shufflePractice} variant="outline" size="sm">
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle
            </Button>
            <Button onClick={resetPractice} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Progress
            </Button>
          </div>
        </div>

        <Carousel setApi={setCarouselApi} className="w-full">
          <CarouselContent>
            {practiceSignals.map((signal) => (
              <CarouselItem key={signal.id}>
                <div className="p-1">
                  <SignalCard
                    signal={signal}
                    isFlipped={flippedCards[signal.id] || false}
                    onFlip={() => handleFlipCard(signal.id)}
                    onKnown={() => handleSignalKnown(signal.id)}
                    onUnknown={() => handleSignalUnknown(signal.id)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="text-center text-sm text-muted-foreground">
          <p>Tap cards to flip them and learn the signals. Mark signals as known or needing practice.</p>
        </div>
      </TabsContent>

      <TabsContent value="quiz" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Signal Knowledge Quiz</h2>
            <p className="text-muted-foreground">
              Test your knowledge with 10 random questions about diving signals
            </p>
            {storageData.quiz.scores.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Best score:</span>
                <Badge variant="secondary">
                  {Math.max(...storageData.quiz.scores)}/10
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ({storageData.quiz.scores.length} attempt{storageData.quiz.scores.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}
          </div>
          <Button onClick={newQuiz} variant="outline" size="sm">
            <Shuffle className="w-4 h-4 mr-2" />
            New Questions
          </Button>
        </div>

        {quizQuestions.length > 0 && (
          <SignalQuiz 
            questions={quizQuestions} 
            onQuizComplete={handleQuizComplete}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}