"use client";

import * as React from "react";
import { Volume2, VolumeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GuitarNeck } from "@/components/guitar-tuner/guitar-neck";
import { TuningMeter } from "@/components/guitar-tuner/tuning-meter";
import { MicrophoneSetup } from "@/components/guitar-tuner/microphone-setup";
import {
  createAudioAnalyzer,
  detectPitch,
  findClosestString,
  frequencyToCents,
  isInTune,
} from "@/lib/audio-utils";
import {
  STANDARD_TUNING,
  TUNING_TOLERANCE,
  type GuitarString,
  type TuningState,
} from "@/types/guitar-tuner";

export default function GuitarTunerPage() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);
  const [selectedString, setSelectedString] = React.useState<GuitarString | null>(
    STANDARD_TUNING[0]
  );
  const [tuningState, setTuningState] = React.useState<TuningState>({
    detectedFrequency: null,
    targetFrequency: STANDARD_TUNING[0].frequency,
    targetString: STANDARD_TUNING[0],
    cents: 0,
    isInTune: false,
  });

  const audioContextRef = React.useRef<AudioContext | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const dataArrayRef = React.useRef<Float32Array | null>(null);
  const animationFrameRef = React.useRef<number | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  function handlePermissionGranted(stream: MediaStream) {
    setHasPermission(true);
    streamRef.current = stream;
    initializeAudioContext(stream);
  }

  function handlePermissionDenied(error: string) {
    setHasPermission(false);
    console.error("Microphone permission denied:", error);
  }

  function initializeAudioContext(stream: MediaStream) {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    const { analyser, dataArray } = createAudioAnalyzer(audioContext, stream);
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    setIsListening(true);
    startPitchDetection();
  }

  function startPitchDetection() {
    const detect = () => {
      if (!analyserRef.current || !dataArrayRef.current || !audioContextRef.current) {
        return;
      }

      analyserRef.current.getFloatTimeDomainData(dataArrayRef.current);
      const frequency = detectPitch(
        dataArrayRef.current,
        audioContextRef.current.sampleRate
      );

      if (frequency) {
        // If no string is manually selected, auto-detect the closest string
        const targetString = selectedString || findClosestString(frequency);
        const cents = frequencyToCents(frequency, targetString.frequency);
        const tuned = isInTune(cents, TUNING_TOLERANCE);

        setTuningState({
          detectedFrequency: frequency,
          targetFrequency: targetString.frequency,
          targetString,
          cents,
          isInTune: tuned,
        });
      } else {
        setTuningState((prev) => ({
          ...prev,
          detectedFrequency: null,
          cents: 0,
          isInTune: false,
        }));
      }

      animationFrameRef.current = requestAnimationFrame(detect);
    };

    detect();
  }

  function toggleListening() {
    if (isListening) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsListening(false);
    } else if (streamRef.current) {
      initializeAudioContext(streamRef.current);
    }
  }

  function handleStringSelect(guitarString: GuitarString) {
    setSelectedString(guitarString);
    setTuningState((prev) => ({
      ...prev,
      targetFrequency: guitarString.frequency,
      targetString: guitarString,
    }));
  }

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (!hasPermission) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">🎸 Guitar Tuner</h1>
            <p className="text-muted-foreground text-lg">
              Tune your guitar with precision using visual feedback
            </p>
          </div>
          <MicrophoneSetup
            onPermissionGranted={handlePermissionGranted}
            onPermissionDenied={handlePermissionDenied}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">🎸 Guitar Tuner</h1>
            <p className="text-muted-foreground text-lg">
              Standard Tuning (E-A-D-G-B-E)
            </p>
          </div>
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={toggleListening}
            size="lg"
          >
            {isListening ? (
              <>
                <VolumeOff className="size-5" />
                Stop Listening
              </>
            ) : (
              <>
                <Volume2 className="size-5" />
                Start Listening
              </>
            )}
          </Button>
        </div>

        {/* Guitar Neck Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Guitar Neck</CardTitle>
            <CardDescription>
              Click on any string to tune it individually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GuitarNeck
              selectedString={selectedString}
              onStringSelect={handleStringSelect}
              isInTune={tuningState.isInTune && isListening}
            />
          </CardContent>
        </Card>

        {/* Tuning Meter */}
        <TuningMeter tuningState={tuningState} />

        {/* Instructions Card */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <ol className="list-decimal list-inside space-y-2">
              <li>Click on a string in the guitar neck above to select it</li>
              <li>Play that string on your guitar</li>
              <li>Watch the tuning meter for visual feedback</li>
              <li>
                Adjust the tuning peg until the needle centers and shows &quot;In Tune&quot;
              </li>
              <li>The string will glow green when perfectly in tune</li>
            </ol>
            <p className="mt-4 text-xs">
              <strong>Tip:</strong> For best results, tune in a quiet environment and
              pluck strings clearly.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
