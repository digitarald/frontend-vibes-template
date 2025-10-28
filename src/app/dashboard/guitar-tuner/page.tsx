"use client";

import { useState, useEffect } from "react";
import { GuitarNeckVisual } from "@/components/guitar-tuner/guitar-neck-visual";
import { TuningMeter } from "@/components/guitar-tuner/tuning-meter";
import { StringStatusCards } from "@/components/guitar-tuner/string-status-cards";
import { SettingsDrawer } from "@/components/guitar-tuner/settings-drawer";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { GuitarString, TunerSettings } from "@/types/guitar-tuner";
import {
  TUNING_PRESETS,
  DEFAULT_CALIBRATION,
} from "@/data/guitar-tuner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GuitarTunerPage() {
  const isMobile = useIsMobile();

  // Initialize settings
  const [settings, setSettings] = useState<TunerSettings>({
    selectedPreset: "standard",
    calibration: DEFAULT_CALIBRATION,
    visualTheme: "realistic",
  });

  // Initialize guitar strings based on selected preset
  const [strings, setStrings] = useState<GuitarString[]>([]);
  const [activeStringId, setActiveStringId] = useState<number | null>(null);
  const [tuningInterval, setTuningInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  // Initialize strings when preset changes
  useEffect(() => {
    const preset = TUNING_PRESETS.find((p) => p.id === settings.selectedPreset);
    if (preset) {
      const newStrings: GuitarString[] = preset.strings.map((s, index) => ({
        id: index + 1,
        name: `String ${index + 1}`,
        note: s.note,
        frequency: s.frequency,
        state: "inactive",
        currentCents: 0,
      }));
      setStrings(newStrings);
      // Reset active string when preset changes
      setActiveStringId(null);
      if (tuningInterval) {
        clearInterval(tuningInterval);
        setTuningInterval(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.selectedPreset]);

  // Handle string selection
  const handleStringSelect = (stringId: number) => {
    // Clear any existing interval
    if (tuningInterval) {
      clearInterval(tuningInterval);
    }

    setActiveStringId(stringId);

    // Update string states
    setStrings((prev) =>
      prev.map((s) => ({
        ...s,
        state: s.id === stringId ? "tuning" : s.state,
      }))
    );

    // Start simulated tuning process
    const startCents = Math.random() * 40 - 20; // Random starting point between -20 and +20
    let currentCents = startCents;

    const interval = setInterval(() => {
      // Gradually move toward 0 (in tune)
      const step = currentCents > 0 ? -0.5 : 0.5;
      currentCents = currentCents + step;

      // Check if in tune (within ±5 cents)
      if (Math.abs(currentCents) <= 5) {
        currentCents = 0;
        clearInterval(interval);

        // Mark string as in-tune
        setStrings((prev) =>
          prev.map((s) =>
            s.id === stringId
              ? { ...s, state: "in-tune", currentCents: 0 }
              : s
          )
        );
        setTuningInterval(null);
        return;
      }

      // Update the string's current cents
      setStrings((prev) =>
        prev.map((s) =>
          s.id === stringId ? { ...s, currentCents } : s
        )
      );
    }, 100);

    setTuningInterval(interval);
  };

  // Handle reset
  const handleReset = () => {
    if (tuningInterval) {
      clearInterval(tuningInterval);
      setTuningInterval(null);
    }

    setStrings((prev) =>
      prev.map((s) => ({
        ...s,
        state: "inactive",
        currentCents: 0,
      }))
    );
    setActiveStringId(null);
  };

  // Get current string info
  const activeString = strings.find((s) => s.id === activeStringId);

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guitar Tuner</h1>
          <p className="text-muted-foreground">
            Interactive visual guitar tuning experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <SettingsDrawer settings={settings} onSettingsChange={setSettings} />
        </div>
      </div>

      {/* Main tuner layout */}
      <div
        className={
          isMobile
            ? "space-y-6"
            : "grid grid-cols-1 lg:grid-cols-2 gap-6"
        }
      >
        <GuitarNeckVisual
          strings={strings}
          activeStringId={activeStringId}
          onStringSelect={handleStringSelect}
        />
        <TuningMeter
          isActive={activeStringId !== null}
          currentCents={activeString?.currentCents || 0}
          stringName={activeString?.note}
        />
      </div>

      {/* String status cards */}
      <StringStatusCards strings={strings} />
    </div>
  );
}
