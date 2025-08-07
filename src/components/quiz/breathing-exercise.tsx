'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { type BreathingExercise } from '@/lib/quiz-data';

interface BreathingExerciseProps {
  exercise: BreathingExercise;
  onComplete: () => void;
  className?: string;
}

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export function BreathingExerciseComponent({ exercise, onComplete, className }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(exercise.pattern[0]);
  const [isComplete, setIsComplete] = useState(false);

  const phaseNames: Record<BreathingPhase, string> = {
    inhale: 'Breathe In',
    hold1: 'Hold',
    exhale: 'Breathe Out', 
    hold2: 'Rest'
  };

  const phases: BreathingPhase[] = useMemo(() => ['inhale', 'hold1', 'exhale', 'hold2'], []);
  const currentPhaseIndex = phases.indexOf(currentPhase);
  const phaseGuidance = exercise.guidance[currentPhaseIndex] || phaseNames[currentPhase];

  useEffect(() => {
    if (!isActive || isComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Move to next phase
          const nextPhaseIndex = (currentPhaseIndex + 1) % 4;
          
          if (nextPhaseIndex === 0) {
            // Completed a full cycle
            const nextCycle = currentCycle + 1;
            if (nextCycle >= exercise.cycles) {
              setIsComplete(true);
              setIsActive(false);
              return 0;
            }
            setCurrentCycle(nextCycle);
          }
          
          const nextPhase = phases[nextPhaseIndex];
          setCurrentPhase(nextPhase);
          return exercise.pattern[nextPhaseIndex];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentPhase, currentCycle, currentPhaseIndex, exercise.cycles, exercise.pattern, isComplete, phases]);

  const startExercise = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setCurrentCycle(0);
    setTimeRemaining(exercise.pattern[0]);
    setIsComplete(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setCurrentCycle(0);
    setTimeRemaining(exercise.pattern[0]);
    setIsComplete(false);
  };

  const getCircleScale = () => {
    const baseScale = 1;
    const maxScale = 1.8;
    
    if (currentPhase === 'inhale') {
      const progress = 1 - (timeRemaining / exercise.pattern[0]);
      return baseScale + (maxScale - baseScale) * progress;
    } else if (currentPhase === 'exhale') {
      const progress = timeRemaining / exercise.pattern[2];
      return baseScale + (maxScale - baseScale) * progress;
    }
    return currentPhase === 'hold1' ? maxScale : baseScale;
  };

  const getCircleColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'oklch(0.7 0.15 200)'; // Calm blue
      case 'hold1': return 'oklch(0.75 0.12 180)'; // Light blue-green
      case 'exhale': return 'oklch(0.6 0.18 160)'; // Ocean teal
      case 'hold2': return 'oklch(0.8 0.08 220)'; // Soft purple
      default: return 'oklch(0.7 0.15 200)';
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-6 p-6 ${className || ''}`}>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">{exercise.name}</h3>
        <p className="text-muted-foreground max-w-md">{exercise.description}</p>
      </div>

      {/* Breathing Circle Animation */}
      <div className="relative flex items-center justify-center w-80 h-80">
        {/* Background circles for visual depth */}
        <div 
          className="absolute w-32 h-32 rounded-full opacity-20 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${getCircleColor()} 0%, transparent 70%)`,
            transform: `scale(${getCircleScale() * 1.5})`
          }}
        />
        <div 
          className="absolute w-24 h-24 rounded-full opacity-40 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${getCircleColor()} 0%, transparent 70%)`,
            transform: `scale(${getCircleScale() * 1.2})`
          }}
        />
        
        {/* Main breathing circle */}
        <div 
          className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 ease-in-out"
          style={{
            background: `radial-gradient(circle, ${getCircleColor()} 0%, ${getCircleColor()}88 100%)`,
            transform: `scale(${getCircleScale()})`,
            boxShadow: `0 0 30px ${getCircleColor()}66`
          }}
        >
          {isActive && (
            <div className="text-center text-white font-medium">
              <div className="text-lg">{timeRemaining}</div>
            </div>
          )}
        </div>

        {/* Floating guidance text */}
        {isActive && (
          <div className="absolute -bottom-16 text-center max-w-xs">
            <div className="text-lg font-medium mb-1">{phaseNames[currentPhase]}</div>
            <div className="text-sm text-muted-foreground italic">{phaseGuidance}</div>
          </div>
        )}
      </div>

      {/* Progress and Controls */}
      <div className="text-center space-y-4">
        {isActive && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Cycle {currentCycle + 1} of {exercise.cycles}
            </div>
            <div className="w-48 bg-muted h-2 rounded-full mx-auto">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentCycle + 1) / exercise.cycles) * 100}%` }}
              />
            </div>
          </div>
        )}

        {isComplete && (
          <div className="space-y-3">
            <div className="text-green-600 font-medium flex items-center justify-center gap-2">
              <span>🌊</span>
              <span>Breathing exercise complete!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You&apos;re now centered and ready to continue. Notice how calm and focused you feel.
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {!isActive && !isComplete && (
            <Button onClick={startExercise} className="bg-blue-600 hover:bg-blue-700">
              Begin Breathing Exercise
            </Button>
          )}
          
          {isActive && (
            <Button onClick={resetExercise} variant="outline">
              Reset
            </Button>
          )}
          
          {isComplete && (
            <div className="flex gap-2">
              <Button onClick={resetExercise} variant="outline">
                Practice Again
              </Button>
              <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                Continue Feeling Centered
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}