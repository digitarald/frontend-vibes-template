"use client";

import { Progress } from "@/components/ui/progress";
import { getTuningColor, getTuningStatus } from "@/data/guitar-tuner";
import type { PitchDetection } from "@/types/guitar-tuner";

interface TunerDisplayProps {
  pitchDetection: PitchDetection | null;
}

export function TunerDisplay({ pitchDetection }: TunerDisplayProps) {
  if (!pitchDetection) {
    return (
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-8 border-muted">
          <div className="text-center">
            <p className="text-6xl font-bold text-muted-foreground">--</p>
            <p className="mt-2 text-sm text-muted-foreground">Play a string</p>
          </div>
        </div>
      </div>
    );
  }

  const { note, cents, isInTune } = pitchDetection;
  
  // Convert cents to progress value (0-100)
  // -50 cents = 0%, 0 cents = 50%, +50 cents = 100%
  const progressValue = ((cents + 50) / 100) * 100;
  
  // Determine color class based on tuning
  const colorClass = getTuningColor(cents);
  const statusText = getTuningStatus(cents);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Main circular display */}
      <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-8 border-muted">
        <div className="text-center">
          <p className={`text-8xl font-bold ${colorClass}`}>
            {note.name}
          </p>
          <p className="mt-2 text-2xl text-muted-foreground">
            {note.octave}
          </p>
        </div>
        
        {/* Tuning indicator ring */}
        <div className="absolute inset-0 -rotate-90">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-muted opacity-20"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray={`${(progressValue / 100) * 289.027} 289.027`}
              className={isInTune ? "text-green-500" : cents < 0 ? "text-red-500" : "text-orange-500"}
              style={{
                transition: "stroke-dasharray 0.3s ease",
              }}
            />
          </svg>
        </div>
      </div>

      {/* Status and cents display */}
      <div className="text-center space-y-2">
        <p className={`text-2xl font-semibold ${colorClass}`}>
          {statusText}
        </p>
        <p className="text-lg text-muted-foreground">
          {cents > 0 ? "+" : ""}{cents} cents
        </p>
        <p className="text-sm text-muted-foreground">
          String {note.stringNumber}
        </p>
      </div>

      {/* Visual progress bar */}
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Flat</span>
          <span>Perfect</span>
          <span>Sharp</span>
        </div>
        <Progress value={progressValue} className="h-2" />
      </div>
    </div>
  );
}
