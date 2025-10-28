export type StringState = "inactive" | "tuning" | "in-tune";

export interface GuitarString {
  id: number;
  name: string;
  note: string;
  frequency: number;
  state: StringState;
  currentCents: number; // -50 to +50 cents offset
}

export interface TuningPreset {
  id: string;
  name: string;
  description: string;
  strings: {
    note: string;
    frequency: number;
  }[];
}

export interface TunerSettings {
  selectedPreset: string;
  calibration: number; // A4 frequency (default 440)
  visualTheme: "realistic" | "minimal";
}
