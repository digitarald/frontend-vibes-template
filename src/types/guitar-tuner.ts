export interface GuitarString {
  name: string;
  frequency: number;
  color: string;
  stringNumber: number;
}

export interface TuningState {
  detectedFrequency: number | null;
  targetFrequency: number | null;
  targetString: GuitarString | null;
  cents: number;
  isInTune: boolean;
}

export interface AudioAnalyzerState {
  isListening: boolean;
  hasPermission: boolean;
  error: string | null;
}

// Standard guitar tuning frequencies (E2-A2-D3-G3-B3-E4)
export const STANDARD_TUNING: GuitarString[] = [
  { name: "E", frequency: 82.41, color: "#8B4513", stringNumber: 6 },
  { name: "A", frequency: 110.0, color: "#B8860B", stringNumber: 5 },
  { name: "D", frequency: 146.83, color: "#CD853F", stringNumber: 4 },
  { name: "G", frequency: 196.0, color: "#DEB887", stringNumber: 3 },
  { name: "B", frequency: 246.94, color: "#F4A460", stringNumber: 2 },
  { name: "E", frequency: 329.63, color: "#FFD700", stringNumber: 1 },
];

// Tuning tolerance in cents (100 cents = 1 semitone)
export const TUNING_TOLERANCE = 5; // cents
