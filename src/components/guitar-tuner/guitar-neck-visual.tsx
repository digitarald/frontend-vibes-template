"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GuitarString } from "@/types/guitar-tuner";
import { cn } from "@/lib/utils";

interface GuitarNeckVisualProps {
  strings: GuitarString[];
  activeStringId: number | null;
  onStringSelect: (stringId: number) => void;
}

export function GuitarNeckVisual({
  strings,
  activeStringId,
  onStringSelect,
}: GuitarNeckVisualProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Guitar Neck</h2>
          <p className="text-sm text-muted-foreground">
            Tap a string to start tuning
          </p>
        </div>

        <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-lg p-8">
          <div className="space-y-3">
            {strings.map((string, index) => {
              const isActive = activeStringId === string.id;
              const stringColors = [
                "bg-amber-600",
                "bg-amber-500",
                "bg-yellow-600",
                "bg-yellow-500",
                "bg-gray-400",
                "bg-gray-300",
              ];

              return (
                <div key={string.id} className="relative">
                  <Button
                    onClick={() => onStringSelect(string.id)}
                    className={cn(
                      "w-full h-12 relative overflow-hidden transition-all duration-300",
                      stringColors[index],
                      isActive &&
                        "ring-4 ring-primary ring-offset-2 ring-offset-background scale-105 animate-pulse",
                      string.state === "in-tune" &&
                        "ring-2 ring-green-500 ring-offset-2 ring-offset-background"
                    )}
                    variant={isActive ? "default" : "secondary"}
                  >
                    <div className="flex items-center justify-between w-full px-4">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className="font-mono text-sm"
                        >
                          {string.note}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {string.frequency.toFixed(2)} Hz
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {string.state === "tuning" && (
                          <Badge variant="outline" className="text-xs">
                            Tuning...
                          </Badge>
                        )}
                        {string.state === "in-tune" && (
                          <Badge
                            variant="default"
                            className="text-xs bg-green-600"
                          >
                            ✓ In Tune
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          String numbers: 1 (high E) to 6 (low E)
        </div>
      </div>
    </Card>
  );
}
