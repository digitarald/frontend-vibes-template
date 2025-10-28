"use client";

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface CalibrationControlsProps {
  a4Frequency: number;
  onChange: (frequency: number) => void;
}

export function CalibrationControls({ a4Frequency, onChange }: CalibrationControlsProps) {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 400 && value <= 480) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>A4 Calibration (Hz)</Label>
          <Input
            type="number"
            min="400"
            max="480"
            step="0.1"
            value={a4Frequency.toFixed(1)}
            onChange={handleInputChange}
            className="w-24 h-8 text-right"
          />
        </div>
        <Slider
          value={[a4Frequency]}
          onValueChange={handleSliderChange}
          min={400}
          max={480}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>400 Hz</span>
          <span>440 Hz (Standard)</span>
          <span>480 Hz</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Standard pitch is A4 = 440 Hz. Some orchestras use 442 or 443 Hz.
      </p>
    </div>
  );
}
