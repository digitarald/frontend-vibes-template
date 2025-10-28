"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Mic, MicOff, AlertCircle } from "lucide-react";
import type { TuningState } from "@/types/guitar-tuner";

interface MicrophoneSetupProps {
  state: TuningState;
  onStart: () => void;
  onStop: () => void;
}

export function MicrophoneSetup({ state, onStart, onStop }: MicrophoneSetupProps) {
  if (state === "tuning") {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Alert className="max-w-md">
          <Mic className="h-4 w-4" />
          <AlertTitle>Microphone Active</AlertTitle>
          <AlertDescription>
            Play a string on your guitar to see tuning information
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={onStop} className="gap-2">
          <MicOff className="h-4 w-4" />
          Stop Tuning
        </Button>
      </div>
    );
  }

  if (state === "denied") {
    return (
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Microphone Access Denied</AlertTitle>
        <AlertDescription>
          Please allow microphone access in your browser settings to use the tuner.
        </AlertDescription>
      </Alert>
    );
  }

  if (state === "error") {
    return (
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An error occurred while accessing the microphone. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (state === "requesting") {
    return (
      <div className="flex flex-col items-center space-y-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Requesting Permission</AlertTitle>
          <AlertDescription>
            Please allow microphone access to continue...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button onClick={onStart} size="lg" className="gap-2">
        <Mic className="h-5 w-5" />
        Start Tuning
      </Button>
      <p className="text-sm text-muted-foreground">
        Click to begin tuning your guitar
      </p>
    </div>
  );
}
