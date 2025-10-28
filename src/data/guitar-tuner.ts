import { TuningPreset } from "@/types/guitar-tuner";

export const TUNING_PRESETS: TuningPreset[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Standard tuning (E-A-D-G-B-E)",
    strings: [
      { note: "E2", frequency: 82.41 },
      { note: "A2", frequency: 110.0 },
      { note: "D3", frequency: 146.83 },
      { note: "G3", frequency: 196.0 },
      { note: "B3", frequency: 246.94 },
      { note: "E4", frequency: 329.63 },
    ],
  },
  {
    id: "drop-d",
    name: "Drop D",
    description: "Drop D tuning (D-A-D-G-B-E)",
    strings: [
      { note: "D2", frequency: 73.42 },
      { note: "A2", frequency: 110.0 },
      { note: "D3", frequency: 146.83 },
      { note: "G3", frequency: 196.0 },
      { note: "B3", frequency: 246.94 },
      { note: "E4", frequency: 329.63 },
    ],
  },
  {
    id: "open-g",
    name: "Open G",
    description: "Open G tuning (D-G-D-G-B-D)",
    strings: [
      { note: "D2", frequency: 73.42 },
      { note: "G2", frequency: 98.0 },
      { note: "D3", frequency: 146.83 },
      { note: "G3", frequency: 196.0 },
      { note: "B3", frequency: 246.94 },
      { note: "D4", frequency: 293.66 },
    ],
  },
  {
    id: "dadgad",
    name: "DADGAD",
    description: "DADGAD tuning (D-A-D-G-A-D)",
    strings: [
      { note: "D2", frequency: 73.42 },
      { note: "A2", frequency: 110.0 },
      { note: "D3", frequency: 146.83 },
      { note: "G3", frequency: 196.0 },
      { note: "A3", frequency: 220.0 },
      { note: "D4", frequency: 293.66 },
    ],
  },
];

export const DEFAULT_CALIBRATION = 440; // A4 frequency in Hz
export const MIN_CALIBRATION = 435;
export const MAX_CALIBRATION = 445;
