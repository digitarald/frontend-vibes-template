"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NoteDisplayProps {
  note: string;
  octave: number;
  isDetecting: boolean;
}

export function NoteDisplay({ note, octave, isDetecting }: NoteDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div
          className={cn(
            "text-8xl md:text-9xl font-bold tracking-tight transition-all duration-300",
            isDetecting
              ? "text-foreground scale-100"
              : "text-muted-foreground/30 scale-95"
          )}
        >
          {note || "–"}
        </div>
        {isDetecting && (
          <Badge
            variant="secondary"
            className="absolute -top-2 -right-2 text-lg px-3 py-1"
          >
            {octave}
          </Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {isDetecting ? "Detecting pitch..." : "Play a string to begin"}
      </p>
    </div>
  );
}
