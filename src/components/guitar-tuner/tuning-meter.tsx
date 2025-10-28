"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TuningMeterProps {
  isActive: boolean;
  currentCents: number; // -50 to +50
  stringName?: string;
}

export function TuningMeter({
  isActive,
  currentCents,
  stringName,
}: TuningMeterProps) {
  // Convert cents to percentage for display (0-100 scale)
  const percentage = ((currentCents + 50) / 100) * 100;

  // Determine color zone
  const getColorZone = (cents: number) => {
    const absCents = Math.abs(cents);
    if (absCents <= 10) return "green";
    if (absCents <= 30) return "yellow";
    return "red";
  };

  const colorZone = getColorZone(currentCents);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Tuning Meter</h2>
          {isActive && stringName ? (
            <p className="text-sm text-muted-foreground">
              Tuning string: <span className="font-mono">{stringName}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a string to begin
            </p>
          )}
        </div>

        {isActive ? (
          <div className="space-y-4">
            {/* Visual meter with tick marks */}
            <div className="relative h-24 bg-muted rounded-lg p-4">
              {/* Tick marks */}
              <div className="absolute inset-x-4 top-2 flex justify-between text-xs text-muted-foreground">
                <span>-50</span>
                <span>-30</span>
                <span>-10</span>
                <span className="font-bold">0</span>
                <span>+10</span>
                <span>+30</span>
                <span>+50</span>
              </div>

              {/* Color zones background */}
              <div className="absolute inset-x-4 top-8 bottom-8 flex">
                <div className="flex-1 bg-red-500/20" />
                <div className="flex-1 bg-yellow-500/20" />
                <div className="flex-1 bg-green-500/30" />
                <div className="flex-1 bg-yellow-500/20" />
                <div className="flex-1 bg-red-500/20" />
              </div>

              {/* Center line */}
              <div className="absolute left-1/2 top-8 bottom-8 w-0.5 bg-primary" />

              {/* Needle indicator */}
              <div
                className="absolute top-8 bottom-8 w-1 transition-all duration-300 ease-out"
                style={{
                  left: `calc(${percentage}% - 2px)`,
                }}
              >
                <div
                  className={cn(
                    "w-full h-full rounded-full",
                    colorZone === "green" && "bg-green-600 shadow-green-500/50",
                    colorZone === "yellow" &&
                      "bg-yellow-600 shadow-yellow-500/50",
                    colorZone === "red" && "bg-red-600 shadow-red-500/50",
                    "shadow-lg"
                  )}
                />
                {/* Needle pointer */}
                <div
                  className={cn(
                    "absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0",
                    "border-l-4 border-r-4 border-b-8",
                    "border-l-transparent border-r-transparent",
                    colorZone === "green" && "border-b-green-600",
                    colorZone === "yellow" && "border-b-yellow-600",
                    colorZone === "red" && "border-b-red-600"
                  )}
                />
              </div>
            </div>

            {/* Numeric display */}
            <div className="text-center space-y-2">
              <div
                className={cn(
                  "text-4xl font-bold font-mono",
                  colorZone === "green" && "text-green-600",
                  colorZone === "yellow" && "text-yellow-600",
                  colorZone === "red" && "text-red-600"
                )}
              >
                {currentCents > 0 ? "+" : ""}
                {currentCents.toFixed(1)} ¢
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.abs(currentCents) <= 5 ? (
                  <span className="text-green-600 font-semibold">
                    ✓ In tune!
                  </span>
                ) : currentCents < 0 ? (
                  <span>Too flat - tune up</span>
                ) : (
                  <span>Too sharp - tune down</span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-24 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground text-sm">
              Meter inactive - select a string
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
