"use client";

import { cn } from "@/lib/utils";

interface PitchMeterProps {
  cents: number; // -50 to +50
  isInTune: boolean;
}

export function PitchMeter({ cents, isInTune }: PitchMeterProps) {
  // Convert cents (-50 to +50) to percentage (0 to 100)
  const percentage = ((cents + 50) / 100) * 100;

  // Determine color based on tuning accuracy
  const getIndicatorStyle = () => {
    if (isInTune) return { backgroundColor: "rgb(34, 197, 94)" }; // green-500
    if (Math.abs(cents) < 10) return { backgroundColor: "rgb(234, 179, 8)" }; // yellow-500
    return { backgroundColor: "rgb(239, 68, 68)" }; // red-500
  };

  return (
    <div className="w-full space-y-6">
      {/* Visual meter */}
      <div className="relative h-24 bg-muted/30 rounded-xl overflow-hidden">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border z-10" />

        {/* Indicator */}
        <div
          className="absolute top-0 bottom-0 w-2 transition-all duration-150 ease-out"
          style={{
            left: `calc(${percentage}% - 4px)`,
            ...getIndicatorStyle(),
          }}
        >
          <div className="absolute inset-0 animate-pulse" />
        </div>

        {/* Gradient zones */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-0 right-1/2 h-full bg-gradient-to-r from-red-500/40 to-transparent" />
          <div className="absolute left-1/2 right-0 h-full bg-gradient-to-l from-red-500/40 to-transparent" />
          <div className="absolute left-[45%] right-[45%] h-full bg-green-500/40" />
        </div>

        {/* Scale markers */}
        <div className="absolute inset-0 flex items-center justify-between px-4 text-xs text-muted-foreground">
          <span>♭</span>
          <span className="font-bold">•</span>
          <span>♯</span>
        </div>
      </div>

      {/* Progress bar alternative (simpler design) */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Flat</span>
          <span className={cn("font-semibold", isInTune && "text-green-500")}>
            {isInTune ? "In Tune ✓" : `${cents > 0 ? "+" : ""}${cents} cents`}
          </span>
          <span>Sharp</span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
          <div
            className="h-full transition-all duration-150"
            style={{
              width: `${percentage}%`,
              ...getIndicatorStyle(),
            }}
          />
        </div>
      </div>
    </div>
  );
}
