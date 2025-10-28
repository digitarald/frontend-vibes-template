"use client";

import type { InstrumentType } from '@/types/guitar-tuner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Guitar, Music2, Music } from 'lucide-react';

interface InstrumentSelectorProps {
  value: InstrumentType;
  onChange: (instrument: InstrumentType) => void;
}

const INSTRUMENTS: { value: InstrumentType; label: string; icon: typeof Guitar }[] = [
  { value: 'guitar', label: 'Guitar', icon: Guitar },
  { value: 'bass', label: 'Bass', icon: Music2 },
  { value: 'ukulele', label: 'Ukulele', icon: Music },
  { value: 'mandolin', label: 'Mandolin', icon: Music },
];

export function InstrumentSelector({ value, onChange }: InstrumentSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Instrument</Label>
      <Select value={value} onValueChange={(val) => onChange(val as InstrumentType)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {INSTRUMENTS.map((instrument) => {
            const Icon = instrument.icon;
            return (
              <SelectItem key={instrument.value} value={instrument.value}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{instrument.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
