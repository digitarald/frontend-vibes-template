"use client";

import type { TuningPresetKey, InstrumentType } from '@/types/guitar-tuner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getPresetsByInstrument, TUNING_PRESETS } from '@/lib/tuning-presets';

interface TuningPresetsProps {
  instrument: InstrumentType;
  value: TuningPresetKey;
  onChange: (preset: TuningPresetKey) => void;
}

export function TuningPresets({ instrument, value, onChange }: TuningPresetsProps) {
  const presets = getPresetsByInstrument(instrument);

  return (
    <div className="space-y-2">
      <Label>Tuning Preset</Label>
      <Select value={value} onValueChange={(val) => onChange(val as TuningPresetKey)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {presets.map((preset) => (
            <SelectItem key={preset.id} value={preset.id}>
              <div className="flex flex-col items-start">
                <span className="font-medium">{preset.name}</span>
                {preset.description && (
                  <span className="text-xs text-muted-foreground">{preset.description}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="text-xs text-muted-foreground mt-2">
        Notes: {TUNING_PRESETS[value]?.notes.map(n => n.name).join(' - ')}
      </div>
    </div>
  );
}
