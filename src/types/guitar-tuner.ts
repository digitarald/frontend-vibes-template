export interface GuitarString {
  name: string;
  frequency: number;
  note: string;
}

export interface PitchDetectionResult {
  frequency: number;
  note: string;
  cents: number;
  octave: number;
}

export interface TuningStatus {
  inTune: boolean;
  deviation: number; // in cents (-50 to +50)
  targetNote: string;
  detectedFrequency: number;
}

export const GUITAR_STRINGS: GuitarString[] = [
  { name: "E", frequency: 82.41, note: "E2" },
  { name: "A", frequency: 110.0, note: "A2" },
  { name: "D", frequency: 146.83, note: "D3" },
  { name: "G", frequency: 196.0, note: "G3" },
  { name: "B", frequency: 246.94, note: "B3" },
  { name: "E", frequency: 329.63, note: "E4" },
];

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
