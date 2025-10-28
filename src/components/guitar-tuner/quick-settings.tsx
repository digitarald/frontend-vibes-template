"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";
import type { TunerSettings } from "@/types/guitar-tuner";

interface QuickSettingsProps {
  settings: TunerSettings;
  onSettingsChange: (settings: TunerSettings) => void;
}

export function QuickSettings({ settings, onSettingsChange }: QuickSettingsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Tuner Settings</h4>
            <p className="text-sm text-muted-foreground">
              Adjust calibration and sensitivity
            </p>
          </div>
          
          <div className="space-y-4">
            {/* A4 Calibration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="a4-frequency">A4 Frequency</Label>
                <span className="text-sm text-muted-foreground">
                  {settings.a4Frequency} Hz
                </span>
              </div>
              <Slider
                id="a4-frequency"
                min={435}
                max={445}
                step={1}
                value={[settings.a4Frequency]}
                onValueChange={(value) =>
                  onSettingsChange({
                    ...settings,
                    a4Frequency: value[0],
                  })
                }
              />
              <p className="text-xs text-muted-foreground">
                Standard: 440 Hz
              </p>
            </div>

            {/* Sensitivity Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sensitivity">High Sensitivity</Label>
                <p className="text-xs text-muted-foreground">
                  More responsive to pitch changes
                </p>
              </div>
              <Switch
                id="sensitivity"
                checked={settings.sensitivity}
                onCheckedChange={(checked) =>
                  onSettingsChange({
                    ...settings,
                    sensitivity: checked,
                  })
                }
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
