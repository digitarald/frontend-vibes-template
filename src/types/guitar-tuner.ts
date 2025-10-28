export type NoteName = "E" | "A" | "D" | "G" | "B";

export interface Note {
  name: NoteName;
  octave: number;
  frequency: number;
  stringNumber: number; // 1-6 for guitar strings (1 is high E)
}

export type TuningState = "idle" | "requesting" | "granted" | "denied" | "error" | "tuning";

export interface PitchDetection {
  frequency: number;
  note: Note;
  cents: number; // -50 to +50, 0 is perfectly in tune
  isInTune: boolean; // true when cents is within -5 to +5
}

export interface TunerSettings {
  a4Frequency: number; // 435-445 Hz, default 440
  sensitivity: boolean; // high/low sensitivity
}
