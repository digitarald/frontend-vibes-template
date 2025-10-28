"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { GuitarString } from "@/types/guitar-tuner";

export function GuitarModeTuner() {
  const [strings, setStrings] = useState<GuitarString[]>([
    {
      stringNumber: 1,
      targetNote: "E",
      targetOctave: 4,
      currentNote: "E",
      currentOctave: 4,
      cents: 0,
      status: "in-tune",
    },
    {
      stringNumber: 2,
      targetNote: "B",
      targetOctave: 3,
      currentNote: "B",
      currentOctave: 3,
      cents: -8,
      status: "flat",
    },
    {
      stringNumber: 3,
      targetNote: "G",
      targetOctave: 3,
      currentNote: "G",
      currentOctave: 3,
      cents: 12,
      status: "sharp",
    },
    {
      stringNumber: 4,
      targetNote: "D",
      targetOctave: 3,
      currentNote: "D",
      currentOctave: 3,
      cents: -3,
      status: "in-tune",
    },
    {
      stringNumber: 5,
      targetNote: "A",
      targetOctave: 2,
      currentNote: "A",
      currentOctave: 2,
      cents: 15,
      status: "sharp",
    },
    {
      stringNumber: 6,
      targetNote: "E",
      targetOctave: 2,
      currentNote: "E",
      currentOctave: 2,
      cents: -20,
      status: "flat",
    },
  ]);

  // Mock real-time tuning simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStrings((prev) =>
        prev.map((str) => {
          // Gradually tune strings towards perfect pitch
          let newCents = str.cents;
          if (Math.abs(newCents) > 2) {
            newCents += newCents > 0 ? -1.5 : 1.5;
          } else {
            // Add small variations when in tune
            newCents = (Math.random() - 0.5) * 4;
          }

          let status: GuitarString["status"];
          if (Math.abs(newCents) < 5) {
            status = "in-tune";
          } else if (newCents > 0) {
            status = "sharp";
          } else {
            status = "flat";
          }

          return {
            ...str,
            cents: newCents,
            status,
          };
        })
      );
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: GuitarString["status"]) => {
    switch (status) {
      case "in-tune":
        return "text-green-600 dark:text-green-400";
      case "sharp":
        return "text-orange-600 dark:text-orange-400";
      case "flat":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getProgressValue = (cents: number) => {
    // Convert cents (-50 to +50) to progress value (0 to 100)
    return ((cents + 50) / 100) * 100;
  };

  const getProgressColor = (status: GuitarString["status"]) => {
    switch (status) {
      case "in-tune":
        return "bg-green-600";
      case "sharp":
        return "bg-orange-600";
      case "flat":
        return "bg-blue-600";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guitar String Tuner</CardTitle>
        <p className="text-sm text-muted-foreground">
          Standard tuning - All strings visible
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {strings.map((string) => (
          <div
            key={string.stringNumber}
            className="space-y-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            {/* String Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                  {string.stringNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {string.targetNote}
                      <sub className="text-xs">{string.targetOctave}</sub>
                    </span>
                    <Badge
                      variant={
                        string.status === "in-tune" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {string.status === "in-tune"
                        ? "✓ In Tune"
                        : string.status === "sharp"
                          ? "↑ Sharp"
                          : "↓ Flat"}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    String {string.stringNumber}
                  </div>
                </div>
              </div>

              {/* Cents Display */}
              <div className={`text-right ${getStatusColor(string.status)}`}>
                <div className="text-2xl font-bold font-mono">
                  {string.cents > 0 ? "+" : ""}
                  {string.cents.toFixed(1)}¢
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <Progress
                value={getProgressValue(string.cents)}
                className="h-3"
              />
              {/* Center indicator */}
              <div className="absolute top-0 left-1/2 h-full w-0.5 bg-foreground/30 pointer-events-none" />
              {/* Colored overlay */}
              <div
                className={`absolute top-0 h-full transition-all duration-300 ${getProgressColor(string.status)}`}
                style={{
                  left: `${Math.min(50, getProgressValue(string.cents))}%`,
                  width: `${Math.abs(getProgressValue(string.cents) - 50)}%`,
                }}
              />
            </div>

            {/* Scale */}
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>-50¢</span>
              <span>0¢</span>
              <span>+50¢</span>
            </div>
          </div>
        ))}

        {/* Overall Status */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Status:</span>
            <Badge
              variant={
                strings.filter((s) => s.status === "in-tune").length ===
                strings.length
                  ? "default"
                  : "secondary"
              }
              className="text-sm"
            >
              {strings.filter((s) => s.status === "in-tune").length} / 6
              strings in tune
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
