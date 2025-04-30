// filepath: /Users/digitarald/Developer/frontend-vibes/src/components/ui/progress-ring.tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProgressRingProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  currentStep,
  totalSteps,
  className,
  size = 60,
  strokeWidth = 4,
}: ProgressRingProps) {
  const [progress, setProgress] = useState(0);
  
  // Calculate radius and other values
  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    // Animate progress change
    const targetProgress = (currentStep / totalSteps) * 100;
    const start = progress;
    const duration = 400; // Animation duration in ms
    const startTime = performance.now();
    
    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentProgress = start + (targetProgress - start) * progress;
      
      setProgress(currentProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    requestAnimationFrame(animateProgress);
  }, [currentStep, progress, totalSteps]);

  return (
    <svg
      height={size}
      width={size}
      className={cn("transform transition-transform", className)}
    >
      {/* Background circle */}
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeOpacity={0.2}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Progress circle */}
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      {/* Current step / total steps text */}
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        fill="currentColor"
      >
        {currentStep}/{totalSteps}
      </text>
    </svg>
  );
}
