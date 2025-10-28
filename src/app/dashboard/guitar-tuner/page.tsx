"use client";

import { useState, useEffect } from "react";
import { TunerDisplay } from "@/components/guitar-tuner/tuner-display";
import { MicrophoneSetup } from "@/components/guitar-tuner/microphone-setup";
import { QuickSettings } from "@/components/guitar-tuner/quick-settings";
import { getMockPitchDetection } from "@/data/guitar-tuner";
import type { TuningState, PitchDetection, TunerSettings } from "@/types/guitar-tuner";

export default function GuitarTunerPage() {
  const [state, setState] = useState<TuningState>("idle");
  const [pitchDetection, setPitchDetection] = useState<PitchDetection | null>(null);
  const [settings, setSettings] = useState<TunerSettings>({
    a4Frequency: 440,
    sensitivity: false,
  });

  // Mock pitch detection updates
  useEffect(() => {
    if (state !== "tuning") {
      setPitchDetection(null);
      return;
    }

    const interval = setInterval(() => {
      setPitchDetection(getMockPitchDetection());
    }, 100);

    return () => clearInterval(interval);
  }, [state]);

  const handleStart = () => {
    // Mock permission request
    setState("requesting");
    setTimeout(() => {
      setState("granted");
      setTimeout(() => {
        setState("tuning");
      }, 500);
    }, 1000);
  };

  const handleStop = () => {
    setState("idle");
    setPitchDetection(null);
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex flex-col space-y-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Guitar Tuner</h1>
            <p className="text-muted-foreground">
              Tune your guitar with automatic note detection
            </p>
          </div>
          <QuickSettings settings={settings} onSettingsChange={setSettings} />
        </div>

        {/* Main tuner area */}
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center space-y-8">
            {state !== "tuning" && state !== "granted" && state !== "requesting" && (
              <MicrophoneSetup
                state={state}
                onStart={handleStart}
                onStop={handleStop}
              />
            )}
            
            {(state === "requesting" || state === "granted") && (
              <MicrophoneSetup
                state={state}
                onStart={handleStart}
                onStop={handleStop}
              />
            )}

            {state === "tuning" && (
              <>
                <TunerDisplay pitchDetection={pitchDetection} />
                <MicrophoneSetup
                  state={state}
                  onStart={handleStart}
                  onStop={handleStop}
                />
              </>
            )}
          </div>
        </div>

        {/* Info section */}
        <div className="rounded-lg border bg-muted/50 p-6">
          <h2 className="text-lg font-semibold mb-2">How to use</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Click &quot;Start Tuning&quot; to begin</li>
            <li>• Play a string on your guitar</li>
            <li>• Tune until the display shows green and &quot;In Tune&quot;</li>
            <li>• Standard tuning: E-A-D-G-B-E (low to high)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
