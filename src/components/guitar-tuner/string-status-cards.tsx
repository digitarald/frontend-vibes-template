"use client";

import { Card } from "@/components/ui/card";
import { Check, AlertCircle, Circle } from "lucide-react";
import { GuitarString } from "@/types/guitar-tuner";
import { cn } from "@/lib/utils";

interface StringStatusCardsProps {
  strings: GuitarString[];
}

export function StringStatusCards({ strings }: StringStatusCardsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">String Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {strings.map((string) => (
            <Card
              key={string.id}
              className={cn(
                "p-4 text-center transition-all",
                string.state === "in-tune" &&
                  "bg-green-50 border-green-500 dark:bg-green-950/30",
                string.state === "tuning" &&
                  "bg-yellow-50 border-yellow-500 dark:bg-yellow-950/30",
                string.state === "inactive" && "opacity-60"
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    string.state === "in-tune" && "bg-green-500 text-white",
                    string.state === "tuning" && "bg-yellow-500 text-white",
                    string.state === "inactive" &&
                      "bg-muted text-muted-foreground"
                  )}
                >
                  {string.state === "in-tune" && <Check className="w-5 h-5" />}
                  {string.state === "tuning" && (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  {string.state === "inactive" && (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <div className="text-sm font-mono font-semibold">
                  {string.note}
                </div>
                <div className="text-xs text-muted-foreground">
                  String {string.id}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
