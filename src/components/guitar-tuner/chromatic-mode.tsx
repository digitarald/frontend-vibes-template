"use client";

import type { PitchDetectionResult } from '@/types/guitar-tuner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { isInTune } from '@/lib/advanced-audio-utils';

interface ChromaticModeProps {
  currentNote: PitchDetectionResult | null;
  tolerance: number;
}

export function ChromaticMode({ currentNote, tolerance }: ChromaticModeProps) {
  const inTune = currentNote ? isInTune(currentNote.cents, tolerance) : false;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chromatic Tuner</CardTitle>
        <CardDescription>Detects any note on the chromatic scale</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentNote ? (
          <>
            {/* Note Display */}
            <div className="text-center space-y-2">
              <div className={cn(
                "text-6xl font-bold transition-colors",
                inTune ? "text-green-600 dark:text-green-500" : "text-foreground"
              )}>
                {currentNote.note}
                <span className="text-3xl">{currentNote.octave}</span>
              </div>
              <div className="text-lg text-muted-foreground">
                {currentNote.frequency.toFixed(2)} Hz
              </div>
            </div>

            {/* Cents Display */}
            <div className="space-y-2">
              <div className="flex justify-center items-baseline gap-2">
                <span className={cn(
                  "text-4xl font-mono font-bold",
                  inTune ? "text-green-600 dark:text-green-500" :
                  currentNote.cents > 0 ? "text-orange-600 dark:text-orange-500" :
                  "text-blue-600 dark:text-blue-500"
                )}>
                  {currentNote.cents > 0 ? '+' : ''}{currentNote.cents}
                </span>
                <span className="text-xl text-muted-foreground">cents</span>
              </div>
              {inTune && (
                <div className="text-center text-sm font-medium text-green-600 dark:text-green-500">
                  ✓ In Tune
                </div>
              )}
            </div>

            {/* Visual Meter */}
            <div className="space-y-2">
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                {/* Center line */}
                <div className="absolute left-1/2 top-0 w-0.5 h-full bg-border z-10" />
                
                {/* Tuning indicator */}
                <div
                  className={cn(
                    "absolute top-0 h-full w-2 rounded-full transition-all",
                    inTune ? "bg-green-600 dark:bg-green-500" :
                    currentNote.cents > 0 ? "bg-orange-600 dark:bg-orange-500" :
                    "bg-blue-600 dark:bg-blue-500"
                  )}
                  style={{
                    left: `calc(50% + ${Math.max(-50, Math.min(50, currentNote.cents))}%)`,
                    transform: 'translateX(-50%)'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Flat (-50¢)</span>
                <span>Sharp (+50¢)</span>
              </div>
            </div>

            {/* Confidence */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Signal:</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${currentNote.confidence * 100}%` }}
                />
              </div>
              <span className="w-12 text-right">{Math.round(currentNote.confidence * 100)}%</span>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Play a note to start tuning
          </div>
        )}
      </CardContent>
    </Card>
  );
}
