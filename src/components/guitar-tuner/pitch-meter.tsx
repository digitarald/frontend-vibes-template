"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PitchMeterProps {
  cents: number; // -50 to +50
  isInTune: boolean;
}

export function PitchMeter({ cents, isInTune }: PitchMeterProps) {
  // Convert cents (-50 to +50) to percentage (0 to 100)
  const percentage = ((cents + 50) / 100) * 100;

  // Determine color based on tuning accuracy
  const getColor = () => {
    if (isInTune) return "bg-green-500";
    if (Math.abs(cents) < 10) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full space-y-6">
      {/* Visual meter */}
      <div className="relative h-24 bg-muted/30 rounded-xl overflow-hidden">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border z-10" />

        {/* Indicator */}
        <div
          className={cn(
            "absolute top-0 bottom-0 w-2 transition-all duration-150 ease-out",
            getColor()
          )}
          style={{
            left: `calc(${percentage}% - 4px)`,
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
        <div className="relative">
          <Progress value={50} className="h-2 opacity-20" />
          <Progress
            value={percentage}
            className={cn("h-2 absolute top-0 left-0 right-0", getColor())}
          />
        </div>
      </div>
    </div>
  );
}
