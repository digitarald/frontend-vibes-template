"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { TuningState } from "@/types/guitar-tuner";
import { TUNING_TOLERANCE } from "@/types/guitar-tuner";

interface TuningMeterProps {
  tuningState: TuningState;
}

export function TuningMeter({ tuningState }: TuningMeterProps) {
  const { cents, isInTune, targetString, detectedFrequency } = tuningState;

  // Calculate needle position (-50 to +50 cents mapped to 0-100%)
  const needlePosition = Math.max(0, Math.min(100, (cents + 50) / 100 * 100));

  // Determine color based on tuning accuracy
  const getStatusColor = () => {
    if (isInTune) return "text-green-500";
    if (Math.abs(cents) < TUNING_TOLERANCE * 2) return "text-yellow-500";
    return "text-red-500";
  };

  const getStatusText = () => {
    if (!detectedFrequency) return "Play a string";
    if (isInTune) return "In Tune! ✓";
    if (cents > 0) return "Too High ↑";
    return "Too Low ↓";
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Target String Display */}
          <div className="text-center">
            <div className="text-6xl font-bold mb-2" style={{ color: targetString?.color || "inherit" }}>
              {targetString?.name || "-"}
            </div>
            <div className="text-sm text-muted-foreground">
              {targetString ? `Target: ${targetString.frequency.toFixed(2)} Hz` : "Select a string"}
            </div>
            {detectedFrequency && (
              <div className="text-xs text-muted-foreground mt-1">
                Detected: {detectedFrequency.toFixed(2)} Hz
              </div>
            )}
          </div>

          {/* Tuning Meter Visual */}
          <div className="relative h-24 bg-muted rounded-lg overflow-hidden">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-foreground/20 z-10" />
            
            {/* Tolerance zone */}
            <div
              className="absolute top-0 bottom-0 bg-green-500/10"
              style={{
                left: `${((50 - TUNING_TOLERANCE) / 100) * 100}%`,
                width: `${(TUNING_TOLERANCE * 2 / 100) * 100}%`,
              }}
            />

            {/* Scale markers */}
            <div className="absolute inset-x-0 top-0 flex justify-between px-2 pt-2">
              {[-50, -25, 0, 25, 50].map((value) => (
                <div key={value} className="text-xs text-muted-foreground">
                  {value}
                </div>
              ))}
            </div>

            {/* Needle */}
            {detectedFrequency && (
              <div
                className={cn(
                  "absolute bottom-0 w-1 transition-all duration-200",
                  getStatusColor()
                )}
                style={{
                  left: `${needlePosition}%`,
                  height: "70%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-current" />
                </div>
              </div>
            )}
          </div>

          {/* Cents Display */}
          <div className="text-center space-y-2">
            <div className={cn("text-4xl font-bold", getStatusColor())}>
              {detectedFrequency ? `${cents > 0 ? "+" : ""}${cents.toFixed(0)}¢` : "--"}
            </div>
            <div className={cn("text-lg font-medium", getStatusColor())}>
              {getStatusText()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
