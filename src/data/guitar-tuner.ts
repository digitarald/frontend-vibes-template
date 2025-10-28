import type { Note, PitchDetection } from "@/types/guitar-tuner";

// Standard guitar tuning notes (from low to high)
export const standardTuning: Note[] = [
  { name: "E", octave: 2, frequency: 82.41, stringNumber: 6 },
  { name: "A", octave: 2, frequency: 110.0, stringNumber: 5 },
  { name: "D", octave: 3, frequency: 146.83, stringNumber: 4 },
  { name: "G", octave: 3, frequency: 196.0, stringNumber: 3 },
  { name: "B", octave: 3, frequency: 246.94, stringNumber: 2 },
  { name: "E", octave: 4, frequency: 329.63, stringNumber: 1 },
];

// Mock pitch detection - returns a random note from standard tuning with random cents offset
export function getMockPitchDetection(): PitchDetection {
  // Cycle through strings in a pattern
  const index = Math.floor(Date.now() / 3000) % standardTuning.length;
  const note = standardTuning[index];
  
  // Generate random cents between -30 and +30 for realistic variation
  const cents = Math.floor(Math.random() * 61) - 30;
  const isInTune = Math.abs(cents) <= 5;
  
  return {
    frequency: note.frequency,
    note,
    cents,
    isInTune,
  };
}

// Calculate color based on cents offset
export function getTuningColor(cents: number): string {
  if (Math.abs(cents) <= 5) {
    return "text-green-500";
  }
  if (cents < 0) {
    return "text-red-500"; // flat
  }
  return "text-orange-500"; // sharp
}

// Get tuning status text
export function getTuningStatus(cents: number): string {
  if (Math.abs(cents) <= 5) {
    return "In Tune";
  }
  if (cents < 0) {
    return "Flat";
  }
  return "Sharp";
}
