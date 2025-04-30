"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { WizardQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Initial set of questions
const initialQuestions: WizardQuestion[] = [
  {
    id: "main-concern",
    text: "What's your main concern about sleep?",
    options: [
      { id: "duration", text: "Not sleeping enough hours" },
      { id: "awakenings", text: "Waking up during the night" },
      { id: "energy", text: "Low energy during the day" },
      { id: "other", text: "Something else" },
    ],
  },
  {
    id: "fitness",
    text: "How would you describe your physical activity?",
    options: [
      { id: "sedentary", text: "Mostly sedentary" },
      { id: "light", text: "Light exercise 1-2 times a week" },
      { id: "moderate", text: "Moderate exercise 3-4 times a week" },
      { id: "active", text: "Very active (almost daily exercise)" },
    ],
  },
  {
    id: "nutrition",
    text: "How would you rate your evening eating habits?",
    options: [
      { id: "late", text: "I often eat late at night" },
      { id: "irregular", text: "My meal times are irregular" },
      { id: "caffeine", text: "I consume caffeine in the afternoon/evening" },
      { id: "balanced", text: "I have regular, balanced meals" },
    ],
  },
  {
    id: "environment",
    text: "How would you describe your sleep environment?",
    options: [
      { id: "noisy", text: "Often noisy or distracting" },
      { id: "tech", text: "I use screens right before bed" },
      { id: "uncomfortable", text: "Not very comfortable (temperature, bed, etc.)" },
      { id: "optimal", text: "Generally quiet, dark, and comfortable" },
    ],
  },
  {
    id: "schedule",
    text: "How consistent is your sleep schedule?",
    options: [
      { id: "irregular", text: "Very irregular (varies by >2 hours)" },
      { id: "weekends", text: "Regular weekdays, different on weekends" },
      { id: "shift", text: "I work shifts that change my schedule" },
      { id: "consistent", text: "Quite consistent (within 1 hour)" },
    ],
  },
  {
    id: "stress",
    text: "How often do you feel stressed or anxious before bed?",
    options: [
      { id: "often", text: "Almost every night" },
      { id: "sometimes", text: "A few times a week" },
      { id: "rarely", text: "Occasionally" },
      { id: "never", text: "Rarely or never" },
    ],
  },
];

interface WizardCardProps {
  onComplete: (answers: Record<string, string>) => void;
}

export function WizardCard({ onComplete }: WizardCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentQuestion = initialQuestions[currentStep];
  const totalSteps = initialQuestions.length;
  const isLastStep = currentStep === totalSteps - 1;

  useEffect(() => {
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentStep > 0) {
        goToPreviousStep();
      } else if (e.key === "ArrowRight" && selectedOption && !isLastStep) {
        goToNextStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, selectedOption, isLastStep]);

  // Reset selected option when moving to a new question
  useEffect(() => {
    setSelectedOption(answers[currentQuestion.id] || null);
  }, [currentStep, currentQuestion.id, answers]);

  const goToNextStep = () => {
    if (isAnimating) return;

    // Save current answer
    if (selectedOption) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedOption,
      }));
    }

    if (isLastStep) {
      // Complete the wizard
      onComplete(answers);
    } else {
      // Animate card transition
      setIsAnimating(true);
      if (cardRef.current) {
        cardRef.current.classList.add("translate-x-[-10px]", "opacity-0");
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          if (cardRef.current) {
            cardRef.current.classList.add("translate-x-[10px]");
            cardRef.current.classList.remove("translate-x-[-10px]");
            
            // After a short delay, animate the card back in
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.remove("translate-x-[10px]", "opacity-0");
                setIsAnimating(false);
              }
            }, 50);
          }
        }, 200);
      }
    }
  };

  const goToPreviousStep = () => {
    if (isAnimating || currentStep === 0) return;

    // Animate card transition
    setIsAnimating(true);
    if (cardRef.current) {
      cardRef.current.classList.add("translate-x-[10px]", "opacity-0");
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        if (cardRef.current) {
          cardRef.current.classList.add("translate-x-[-10px]");
          cardRef.current.classList.remove("translate-x-[10px]");
          
          // After a short delay, animate the card back in
          setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.classList.remove("translate-x-[-10px]", "opacity-0");
              setIsAnimating(false);
            }
          }, 50);
        }
      }, 200);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <Card 
      ref={cardRef}
      className="w-full max-w-md mx-auto overflow-hidden transition-all duration-200 ease-out"
    >
      <CardHeader className="relative pb-0">
        <div className="absolute top-4 right-4 text-indigo-600 dark:text-indigo-400">
          <ProgressRing currentStep={currentStep + 1} totalSteps={totalSteps} />
        </div>
        <h2 className="text-2xl font-bold pt-4 pb-2">{currentQuestion.text}</h2>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="grid gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className={cn(
                "p-4 text-left rounded-lg border-2 border-slate-200 dark:border-slate-800 transition-all duration-150",
                "hover:border-indigo-300 dark:hover:border-indigo-700",
                selectedOption === option.id && [
                  "border-indigo-500 dark:border-indigo-500",
                  "bg-indigo-50 dark:bg-indigo-950",
                  "scale-[1.02] shadow-sm"
                ]
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <span className="font-medium">{option.text}</span>
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          onClick={goToPreviousStep}
          disabled={currentStep === 0 || isAnimating}
          className="flex items-center"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={goToNextStep}
          disabled={!selectedOption || isAnimating}
          className="flex items-center"
        >
          {isLastStep ? "Complete" : "Next"}
          {!isLastStep && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
