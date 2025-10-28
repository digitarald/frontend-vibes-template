"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NoteDisplay } from "@/components/guitar-tuner/note-display";
import { PitchMeter } from "@/components/guitar-tuner/pitch-meter";
import { AutoDetector } from "@/components/guitar-tuner/auto-detector";
import { GUITAR_STRINGS } from "@/types/guitar-tuner";
import { Music, Mic, MicOff } from "lucide-react";

export default function GuitarTunerPage() {
  const [isActive, setIsActive] = useState(false);
  const [detectedNote, setDetectedNote] = useState<string>("");
  const [detectedOctave, setDetectedOctave] = useState<number>(0);
  const [cents, setCents] = useState<number>(0);
  const [targetString, setTargetString] = useState<string | null>(null);
  const [isInTune, setIsInTune] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  const handleDetection = useCallback(
    (data: {
      frequency: number;
      note: string;
      octave: number;
      cents: number;
      targetString: string | null;
      isInTune: boolean;
    }) => {
      setDetectedNote(data.note);
      setDetectedOctave(data.octave);
      setCents(data.cents);
      setTargetString(data.targetString);
      setIsInTune(data.isInTune);
      setIsDetecting(true);

      // Reset detecting state after a short delay if no new detection
      const timeout = setTimeout(() => setIsDetecting(false), 500);
      return () => clearTimeout(timeout);
    },
    []
  );

  const toggleTuner = () => {
    setIsActive(!isActive);
    if (isActive) {
      // Reset state when stopping
      setDetectedNote("");
      setDetectedOctave(0);
      setCents(0);
      setTargetString(null);
      setIsInTune(false);
      setIsDetecting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Music className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Guitar Tuner</h1>
          </div>
          <p className="text-muted-foreground">
            Auto-detecting chromatic tuner for guitar
          </p>
        </div>

        {/* Main Tuner Card */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {targetString && (
                <Badge variant="default" className="text-lg px-4 py-1">
                  {targetString} String
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Note Display */}
            <NoteDisplay
              note={detectedNote}
              octave={detectedOctave}
              isDetecting={isDetecting}
            />

            {/* Pitch Meter */}
            {isActive && detectedNote && (
              <PitchMeter cents={cents} isInTune={isInTune} />
            )}

            {/* Control Button */}
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={toggleTuner}
                className="min-w-48 gap-2"
                variant={isActive ? "destructive" : "default"}
              >
                {isActive ? (
                  <>
                    <MicOff className="h-5 w-5" />
                    Stop Tuner
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Start Tuner
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reference Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Standard Tuning Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {GUITAR_STRINGS.map((string, index) => (
                <div
                  key={`${string.note}-${index}`}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 space-y-1"
                >
                  <div className="text-2xl font-bold">{string.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {string.note}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round(string.frequency)} Hz
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Allow microphone access when prompted to use the tuner
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Play one string at a time for accurate detection
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  The tuner will automatically detect which string you&apos;re playing
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Green indicator means your string is in tune (within 5 cents)
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auto Detector Component */}
      {isActive && (
        <AutoDetector onDetection={handleDetection} isActive={isActive} />
      )}
    </div>
  );
}
