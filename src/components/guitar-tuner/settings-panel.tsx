"use client";

import type { TunerSettings } from '@/types/guitar-tuner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { CalibrationControls } from './calibration-controls';
import { Settings2 } from 'lucide-react';

interface SettingsPanelProps {
  settings: TunerSettings;
  onChange: (settings: Partial<TunerSettings>) => void;
}

export function SettingsPanel({ settings, onChange }: SettingsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings2 className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Advanced Settings</h3>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="calibration">Calibration</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-4">
          {/* Sensitivity Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Sensitivity</Label>
              <span className="text-sm text-muted-foreground">{settings.sensitivity}%</span>
            </div>
            <Slider
              value={[settings.sensitivity]}
              onValueChange={(values) => onChange({ sensitivity: values[0] })}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Higher sensitivity picks up quieter sounds but may be less stable
            </p>
          </div>

          {/* Tolerance Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Tolerance (cents)</Label>
              <span className="text-sm text-muted-foreground">±{settings.tolerance}¢</span>
            </div>
            <Slider
              value={[settings.tolerance]}
              onValueChange={(values) => onChange({ tolerance: values[0] })}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              How close to perfect pitch is considered &quot;in tune&quot;
            </p>
          </div>

          {/* Auto Detect */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Detect</Label>
              <p className="text-xs text-muted-foreground">
                Automatically select the closest string
              </p>
            </div>
            <Switch
              checked={settings.autoDetect}
              onCheckedChange={(checked) => onChange({ autoDetect: checked })}
            />
          </div>
        </TabsContent>

        <TabsContent value="calibration" className="space-y-6 mt-4">
          <CalibrationControls
            a4Frequency={settings.a4Frequency}
            onChange={(frequency) => onChange({ a4Frequency: frequency })}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6 mt-4">
          {/* Temperament */}
          <div className="space-y-2">
            <Label>Temperament</Label>
            <Select
              value={settings.temperament}
              onValueChange={(value) => onChange({ temperament: value as TunerSettings['temperament'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equal">Equal Temperament</SelectItem>
                <SelectItem value="just">Just Intonation</SelectItem>
                <SelectItem value="pythagorean">Pythagorean</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Equal temperament is standard for modern music
            </p>
          </div>

          {/* Visualization Mode */}
          <div className="space-y-2">
            <Label>Visualization Mode</Label>
            <Select
              value={settings.visualizationMode}
              onValueChange={(value) => onChange({ visualizationMode: value as TunerSettings['visualizationMode'] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meter">Meter</SelectItem>
                <SelectItem value="strobe">Strobe</SelectItem>
                <SelectItem value="cents">Cents Display</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chromatic Mode */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Chromatic Mode</Label>
              <p className="text-xs text-muted-foreground">
                Detect any note instead of tuning to preset
              </p>
            </div>
            <Switch
              checked={settings.chromaticMode}
              onCheckedChange={(checked) => onChange({ chromaticMode: checked })}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
