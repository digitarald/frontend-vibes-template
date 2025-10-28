// Types for the Advanced Multi-Mode Guitar Tuner

export type ChromaticNote =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

export type TuningMode = "chromatic" | "guitar" | "presets" | "history";

export interface NoteDetection {
  note: ChromaticNote;
  octave: number;
  frequency: number;
  cents: number; // -50 to +50, offset from perfect pitch
}

export interface GuitarString {
  stringNumber: number; // 1-6
  targetNote: ChromaticNote;
  targetOctave: number;
  currentNote?: ChromaticNote;
  currentOctave?: number;
  cents: number;
  status: "in-tune" | "flat" | "sharp" | "not-detected";
}

export interface TuningPreset {
  id: string;
  name: string;
  description: string;
  strings: {
    note: ChromaticNote;
    octave: number;
  }[]; // From string 6 (lowest) to string 1 (highest)
  isCustom: boolean;
  category?: string;
}

export interface TuningSession {
  id: string;
  date: Date;
  tuningPreset: string; // preset name
  duration: number; // in seconds
  completed: boolean;
  averageCents: number; // average accuracy
  stringAccuracy: number[]; // accuracy per string
}

export interface FrequencyData {
  frequency: number;
  amplitude: number;
}

export interface VisualizationSettings {
  theme: "light" | "dark" | "auto";
  showWaveform: boolean;
  showSpectrum: boolean;
  showHarmonics: boolean;
  scale: "linear" | "logarithmic";
}

export interface TunerSettings {
  a4Frequency: number; // Standard is 440 Hz
  sensitivity: number; // 0-100
  transposition: number; // -12 to +12 semitones (for capo)
  minFrequency: number;
  maxFrequency: number;
  visualization: VisualizationSettings;
}
