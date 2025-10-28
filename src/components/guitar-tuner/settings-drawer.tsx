"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";
import { TunerSettings } from "@/types/guitar-tuner";
import { TUNING_PRESETS } from "@/data/guitar-tuner";

interface SettingsDrawerProps {
  settings: TunerSettings;
  onSettingsChange: (settings: TunerSettings) => void;
}

export function SettingsDrawer({
  settings,
  onSettingsChange,
}: SettingsDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tuner Settings</SheetTitle>
          <SheetDescription>
            Customize your tuning preferences
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Tuning Presets */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Tuning Preset</Label>
            <RadioGroup
              value={settings.selectedPreset}
              onValueChange={(value) =>
                onSettingsChange({ ...settings, selectedPreset: value })
              }
            >
              {TUNING_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-start space-x-3 space-y-0"
                >
                  <RadioGroupItem value={preset.id} id={preset.id} />
                  <Label
                    htmlFor={preset.id}
                    className="font-normal cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold">{preset.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {preset.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Calibration */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Calibration (A4: {settings.calibration} Hz)
            </Label>
            <div className="space-y-2">
              <Slider
                value={[settings.calibration]}
                onValueChange={([value]) =>
                  onSettingsChange({ ...settings, calibration: value })
                }
                min={435}
                max={445}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>435 Hz</span>
                <span>440 Hz (standard)</span>
                <span>445 Hz</span>
              </div>
            </div>
          </div>

          {/* Visual Theme */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Visual Theme</Label>
            <RadioGroup
              value={settings.visualTheme}
              onValueChange={(value: "realistic" | "minimal") =>
                onSettingsChange({ ...settings, visualTheme: value })
              }
            >
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="realistic" id="realistic" />
                <Label
                  htmlFor="realistic"
                  className="font-normal cursor-pointer"
                >
                  <div>
                    <div className="font-semibold">Realistic</div>
                    <div className="text-sm text-muted-foreground">
                      Wood textures and string colors
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value="minimal" id="minimal" />
                <Label htmlFor="minimal" className="font-normal cursor-pointer">
                  <div>
                    <div className="font-semibold">Minimal</div>
                    <div className="text-sm text-muted-foreground">
                      Clean and simple design
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
