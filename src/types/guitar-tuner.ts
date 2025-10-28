/**
 * Comprehensive type definitions for the advanced guitar tuner
 */

export interface Note {
  name: string;
  frequency: number;
  octave?: number;
}

export type InstrumentType = 'guitar' | 'bass' | 'ukulele' | 'mandolin';

export type TuningPresetKey = 
  | 'standard'
  | 'drop-d'
  | 'drop-c'
  | 'dadgad'
  | 'open-g'
  | 'open-d'
  | 'open-e'
  | 'half-step-down'
  | 'whole-step-down'
  | 'standard-bass'
  | 'drop-d-bass'
  | 'ukulele-c'
  | 'ukulele-d'
  | 'mandolin-standard';

export interface TuningPreset {
  id: TuningPresetKey;
  name: string;
  notes: Note[];
  instrument: InstrumentType;
  description?: string;
}

export interface TunerSettings {
  a4Frequency: number; // Default: 440 Hz
  sensitivity: number; // 0-100
  tolerance: number; // cents, how close is "in tune"
  chromaticMode: boolean;
  autoDetect: boolean;
  temperament: 'equal' | 'just' | 'pythagorean';
  visualizationMode: 'meter' | 'strobe' | 'cents';
}

export interface TuningSession {
  startTime: number;
  endTime?: number;
  preset: TuningPresetKey;
  instrument: InstrumentType;
  notesChecked: string[];
}

export interface PitchDetectionResult {
  frequency: number;
  note: string;
  octave: number;
  cents: number; // cents off from perfect pitch
  confidence: number; // 0-1
}

export interface AudioAnalyzerState {
  isActive: boolean;
  currentNote?: PitchDetectionResult;
  targetNote?: Note;
  error?: string;
}
