"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { ChromaticNote, NoteDetection } from "@/types/guitar-tuner";
import { generateMockFrequencyData } from "@/data/guitar-tuner";

const chromaticNotes: ChromaticNote[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

// Standard frequencies for A4 = 440 Hz
const noteFrequencies: Record<string, number> = {
  "C4": 261.63,
  "C#4": 277.18,
  "D4": 293.66,
  "D#4": 311.13,
  "E4": 329.63,
  "F4": 349.23,
  "F#4": 369.99,
  "G4": 392.0,
  "G#4": 415.3,
  "A4": 440.0,
  "A#4": 466.16,
  "B4": 493.88,
};

export function ChromaticTuner() {
  const [detection, setDetection] = useState<NoteDetection>({
    note: "A",
    octave: 4,
    frequency: 440,
    cents: 0,
  });
  const [frequencyData, setFrequencyData] = useState<
    { frequency: number; amplitude: number }[]
  >([]);

  // Mock chromatic detection cycling
  useEffect(() => {
    let noteIndex = 9; // Start at A
    let centsValue = 0;
    let direction = 1;

    const interval = setInterval(() => {
      // Cycle through cents offset
      centsValue += direction * 5;
      if (centsValue >= 25 || centsValue <= -25) {
        direction *= -1;
      }

      // When near perfect pitch, move to next note
      if (Math.abs(centsValue) < 3) {
        noteIndex = (noteIndex + 1) % 12;
      }

      const note = chromaticNotes[noteIndex];
      const octave = 4;
      const baseFreq = noteFrequencies[`${note}${octave}`] || 440;
      const frequency = baseFreq * Math.pow(2, centsValue / 1200);

      setDetection({
        note,
        octave,
        frequency,
        cents: centsValue,
      });

      // Update frequency spectrum
      setFrequencyData(generateMockFrequencyData(frequency, true));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (cents: number) => {
    if (Math.abs(cents) < 5) return "hsl(var(--chart-2))"; // Green - in tune
    if (Math.abs(cents) < 15) return "hsl(var(--chart-3))"; // Yellow - close
    return "hsl(var(--chart-1))"; // Red - out of tune
  };

  const getStatusText = (cents: number) => {
    if (Math.abs(cents) < 5) return "In Tune";
    if (cents > 0) return "Sharp";
    return "Flat";
  };

  return (
    <div className="space-y-6">
      {/* Main Detection Display */}
      <Card>
        <CardHeader>
          <CardTitle>Chromatic Tuner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Circular Frequency Visualization */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Note Display */}
            <div className="relative">
              <div
                className="h-48 w-48 rounded-full border-8 flex items-center justify-center"
                style={{
                  borderColor: getStatusColor(detection.cents),
                  transition: "border-color 0.3s",
                }}
              >
                <div className="text-center">
                  <div className="text-6xl font-bold">
                    {detection.note}
                    <sub className="text-2xl">{detection.octave}</sub>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {detection.frequency.toFixed(2)} Hz
                  </div>
                </div>
              </div>
              {/* Cents Indicator */}
              <div
                className="absolute -bottom-2 left-1/2 h-16 w-1 bg-primary origin-bottom transition-transform duration-300"
                style={{
                  transform: `translateX(-50%) rotate(${detection.cents * 1.8}deg)`,
                }}
              />
            </div>

            {/* Status Badge */}
            <Badge
              variant={Math.abs(detection.cents) < 5 ? "default" : "secondary"}
              className="text-lg px-4 py-1"
            >
              {getStatusText(detection.cents)}
            </Badge>

            {/* Cents Offset Display */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono">-50</span>
              <div className="w-64 h-2 bg-muted rounded-full relative overflow-hidden">
                <div
                  className="absolute top-0 h-full w-1 transition-all duration-300"
                  style={{
                    left: `${((detection.cents + 50) / 100) * 100}%`,
                    backgroundColor: getStatusColor(detection.cents),
                  }}
                />
                <div className="absolute top-0 left-1/2 h-full w-0.5 bg-foreground/20" />
              </div>
              <span className="text-sm font-mono">+50</span>
            </div>

            <div className="text-center">
              <div
                className="text-3xl font-bold font-mono"
                style={{ color: getStatusColor(detection.cents) }}
              >
                {detection.cents > 0 ? "+" : ""}
                {detection.cents.toFixed(1)}¢
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Waveform Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Frequency Spectrum</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amplitude: {
                label: "Amplitude",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={frequencyData}>
                <XAxis
                  dataKey="frequency"
                  label={{ value: "Frequency (Hz)", position: "insideBottom", offset: -5 }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  label={{ value: "Amplitude", angle: -90, position: "insideLeft" }}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip />
                <Line
                  type="monotone"
                  dataKey="amplitude"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
