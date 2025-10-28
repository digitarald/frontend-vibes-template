"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { generateMockFrequencyData } from "@/data/guitar-tuner";
import type { FrequencyData } from "@/types/guitar-tuner";

export function FrequencyAnalyzer() {
  const [frequencyRange, setFrequencyRange] = useState<[number, number]>([
    80, 800,
  ]);
  const [scale, setScale] = useState<"linear" | "logarithmic">("linear");
  const [showHarmonics, setShowHarmonics] = useState<"yes" | "no">("yes");
  const [frequencyData, setFrequencyData] = useState<FrequencyData[]>([]);
  const [centerFrequency, setCenterFrequency] = useState(440);

  // Simulate frequency changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through different frequencies
      setCenterFrequency((prev) => {
        const newFreq = prev + (Math.random() - 0.5) * 20;
        return Math.max(80, Math.min(800, newFreq));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update frequency data when parameters change
  useEffect(() => {
    const data = generateMockFrequencyData(
      centerFrequency,
      showHarmonics === "yes"
    );

    // Filter data based on selected range
    const filteredData = data.filter(
      (d) => d.frequency >= frequencyRange[0] && d.frequency <= frequencyRange[1]
    );

    // Apply scale transformation
    const transformedData = filteredData.map((d) => ({
      frequency: d.frequency,
      amplitude:
        scale === "logarithmic" && d.amplitude > 0
          ? Math.log10(d.amplitude * 10 + 1)
          : d.amplitude,
    }));

    setFrequencyData(transformedData);
  }, [centerFrequency, frequencyRange, scale, showHarmonics]);

  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Frequency Spectrum Analyzer</CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time frequency analysis with harmonic visualization
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              amplitude: {
                label: "Amplitude",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={frequencyData}>
                <defs>
                  <linearGradient id="colorAmplitude" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="frequency"
                  label={{
                    value: "Frequency (Hz)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  label={{
                    value: scale === "logarithmic" ? "Log Amplitude" : "Amplitude",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="amplitude"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fill="url(#colorAmplitude)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Frequency Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Frequency Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Min</span>
                <span className="font-mono font-semibold">
                  {frequencyRange[0]} Hz
                </span>
              </div>
              <Slider
                value={[frequencyRange[0]]}
                onValueChange={(value) =>
                  setFrequencyRange([value[0], frequencyRange[1]])
                }
                min={20}
                max={500}
                step={10}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Max</span>
                <span className="font-mono font-semibold">
                  {frequencyRange[1]} Hz
                </span>
              </div>
              <Slider
                value={[frequencyRange[1]]}
                onValueChange={(value) =>
                  setFrequencyRange([frequencyRange[0], value[0]])
                }
                min={100}
                max={1200}
                step={10}
              />
            </div>
          </CardContent>
        </Card>

        {/* Visualization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Visualization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Scale</Label>
              <ToggleGroup
                type="single"
                value={scale}
                onValueChange={(value) => {
                  if (value) setScale(value as "linear" | "logarithmic");
                }}
                className="justify-start"
              >
                <ToggleGroupItem value="linear" aria-label="Linear scale">
                  Linear
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="logarithmic"
                  aria-label="Logarithmic scale"
                >
                  Logarithmic
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label>Show Harmonics</Label>
              <ToggleGroup
                type="single"
                value={showHarmonics}
                onValueChange={(value) => {
                  if (value) setShowHarmonics(value as "yes" | "no");
                }}
                className="justify-start"
              >
                <ToggleGroupItem value="yes" aria-label="Show harmonics">
                  Yes
                </ToggleGroupItem>
                <ToggleGroupItem value="no" aria-label="Hide harmonics">
                  No
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Harmonic Overtones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              The frequency analyzer displays the fundamental frequency and its
              harmonic overtones. These harmonics occur at integer multiples of
              the fundamental frequency.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-xs text-muted-foreground">
                  Fundamental
                </div>
                <div className="text-lg font-bold font-mono">
                  {centerFrequency.toFixed(1)} Hz
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-xs text-muted-foreground">2nd Harmonic</div>
                <div className="text-lg font-bold font-mono">
                  {(centerFrequency * 2).toFixed(1)} Hz
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
