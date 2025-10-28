"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings2, Volume2, Gauge, Move, Eye } from "lucide-react";
import type { TunerSettings } from "@/types/guitar-tuner";

export function SettingsSidebar() {
  const [settings, setSettings] = useState<TunerSettings>({
    a4Frequency: 440,
    sensitivity: 75,
    transposition: 0,
    minFrequency: 80,
    maxFrequency: 800,
    visualization: {
      theme: "auto",
      showWaveform: true,
      showSpectrum: true,
      showHarmonics: false,
      scale: "linear",
    },
  });

  const [isPlayingTone, setIsPlayingTone] = useState(false);

  const handlePlayReferenceTone = () => {
    setIsPlayingTone(true);
    // Mock playing tone
    setTimeout(() => setIsPlayingTone(false), 2000);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Settings2 className="h-5 w-5" />
        <h2 className="text-xl font-bold">Settings</h2>
      </div>

      {/* Calibration Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Calibration
          </CardTitle>
          <CardDescription className="text-xs">
            Adjust reference pitch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="a4-freq" className="text-sm">
              A4 Frequency (Hz)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="a4-freq"
                type="number"
                value={settings.a4Frequency}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    a4Frequency: Number(e.target.value),
                  })
                }
                min={415}
                max={466}
                className="h-8"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSettings({ ...settings, a4Frequency: 440 })
                }
              >
                Reset
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Standard: 440 Hz | Baroque: 415 Hz
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transposition" className="text-sm">
              Transposition (Capo: {settings.transposition > 0 ? "+" : ""}
              {settings.transposition})
            </Label>
            <Slider
              id="transposition"
              value={[settings.transposition]}
              onValueChange={(value) =>
                setSettings({ ...settings, transposition: value[0] })
              }
              min={-12}
              max={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-12</span>
              <span>0</span>
              <span>+12</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sensitivity Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Move className="h-4 w-4" />
            Sensitivity
          </CardTitle>
          <CardDescription className="text-xs">
            Detection sensitivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Label htmlFor="sensitivity">Sensitivity</Label>
              <span className="font-mono text-sm">{settings.sensitivity}%</span>
            </div>
            <Slider
              id="sensitivity"
              value={[settings.sensitivity]}
              onValueChange={(value) =>
                setSettings({ ...settings, sensitivity: value[0] })
              }
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm">Frequency Range</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Min</span>
                <span className="text-xs font-mono">
                  {settings.minFrequency} Hz
                </span>
              </div>
              <Slider
                value={[settings.minFrequency]}
                onValueChange={(value) =>
                  setSettings({ ...settings, minFrequency: value[0] })
                }
                min={20}
                max={200}
                step={10}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Max</span>
                <span className="text-xs font-mono">
                  {settings.maxFrequency} Hz
                </span>
              </div>
              <Slider
                value={[settings.maxFrequency]}
                onValueChange={(value) =>
                  setSettings({ ...settings, maxFrequency: value[0] })
                }
                min={400}
                max={2000}
                step={50}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualization Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visualization
          </CardTitle>
          <CardDescription className="text-xs">
            Display preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-waveform" className="text-sm">
              Show Waveform
            </Label>
            <Switch
              id="show-waveform"
              checked={settings.visualization.showWaveform}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  visualization: {
                    ...settings.visualization,
                    showWaveform: checked,
                  },
                })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="show-spectrum" className="text-sm">
              Show Spectrum
            </Label>
            <Switch
              id="show-spectrum"
              checked={settings.visualization.showSpectrum}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  visualization: {
                    ...settings.visualization,
                    showSpectrum: checked,
                  },
                })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="show-harmonics" className="text-sm">
              Show Harmonics
            </Label>
            <Switch
              id="show-harmonics"
              checked={settings.visualization.showHarmonics}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  visualization: {
                    ...settings.visualization,
                    showHarmonics: checked,
                  },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Reference Tone Generator */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Reference Tone
          </CardTitle>
          <CardDescription className="text-xs">
            Play calibration tone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={handlePlayReferenceTone}
            disabled={isPlayingTone}
          >
            <Volume2 className="mr-2 h-4 w-4" />
            {isPlayingTone ? "Playing..." : `Play A4 (${settings.a4Frequency} Hz)`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
