// Mock data for the Advanced Multi-Mode Guitar Tuner

import type { TuningPreset, TuningSession, FrequencyData } from "@/types/guitar-tuner";

// Built-in tuning presets
export const tuningPresets: TuningPreset[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Standard guitar tuning (EADGBE)",
    strings: [
      { note: "E", octave: 2 }, // String 6 (lowest)
      { note: "A", octave: 2 },
      { note: "D", octave: 3 },
      { note: "G", octave: 3 },
      { note: "B", octave: 3 },
      { note: "E", octave: 4 }, // String 1 (highest)
    ],
    isCustom: false,
    category: "Standard",
  },
  {
    id: "drop-d",
    name: "Drop D",
    description: "Drop D tuning (DADGBE)",
    strings: [
      { note: "D", octave: 2 },
      { note: "A", octave: 2 },
      { note: "D", octave: 3 },
      { note: "G", octave: 3 },
      { note: "B", octave: 3 },
      { note: "E", octave: 4 },
    ],
    isCustom: false,
    category: "Drop",
  },
  {
    id: "drop-c",
    name: "Drop C",
    description: "Drop C tuning (CGCFAD)",
    strings: [
      { note: "C", octave: 2 },
      { note: "G", octave: 2 },
      { note: "C", octave: 3 },
      { note: "F", octave: 3 },
      { note: "A", octave: 3 },
      { note: "D", octave: 4 },
    ],
    isCustom: false,
    category: "Drop",
  },
  {
    id: "half-step-down",
    name: "Half Step Down",
    description: "Eb standard tuning (Eb Ab Db Gb Bb Eb)",
    strings: [
      { note: "D#", octave: 2 },
      { note: "G#", octave: 2 },
      { note: "C#", octave: 3 },
      { note: "F#", octave: 3 },
      { note: "A#", octave: 3 },
      { note: "D#", octave: 4 },
    ],
    isCustom: false,
    category: "Standard",
  },
  {
    id: "open-g",
    name: "Open G",
    description: "Open G tuning (DGDGBD)",
    strings: [
      { note: "D", octave: 2 },
      { note: "G", octave: 2 },
      { note: "D", octave: 3 },
      { note: "G", octave: 3 },
      { note: "B", octave: 3 },
      { note: "D", octave: 4 },
    ],
    isCustom: false,
    category: "Open",
  },
  {
    id: "open-d",
    name: "Open D",
    description: "Open D tuning (DADF#AD)",
    strings: [
      { note: "D", octave: 2 },
      { note: "A", octave: 2 },
      { note: "D", octave: 3 },
      { note: "F#", octave: 3 },
      { note: "A", octave: 3 },
      { note: "D", octave: 4 },
    ],
    isCustom: false,
    category: "Open",
  },
  {
    id: "dadgad",
    name: "DADGAD",
    description: "Celtic tuning (DADGAD)",
    strings: [
      { note: "D", octave: 2 },
      { note: "A", octave: 2 },
      { note: "D", octave: 3 },
      { note: "G", octave: 3 },
      { note: "A", octave: 3 },
      { note: "D", octave: 4 },
    ],
    isCustom: false,
    category: "Alternate",
  },
  {
    id: "open-c",
    name: "Open C",
    description: "Open C tuning (CGCGCE)",
    strings: [
      { note: "C", octave: 2 },
      { note: "G", octave: 2 },
      { note: "C", octave: 3 },
      { note: "G", octave: 3 },
      { note: "C", octave: 4 },
      { note: "E", octave: 4 },
    ],
    isCustom: false,
    category: "Open",
  },
  {
    id: "whole-step-down",
    name: "Whole Step Down",
    description: "D standard tuning (DGCFAD)",
    strings: [
      { note: "D", octave: 2 },
      { note: "G", octave: 2 },
      { note: "C", octave: 3 },
      { note: "F", octave: 3 },
      { note: "A", octave: 3 },
      { note: "D", octave: 4 },
    ],
    isCustom: false,
    category: "Standard",
  },
  {
    id: "baritone",
    name: "Baritone",
    description: "Baritone tuning (BEADF#B)",
    strings: [
      { note: "B", octave: 1 },
      { note: "E", octave: 2 },
      { note: "A", octave: 2 },
      { note: "D", octave: 3 },
      { note: "F#", octave: 3 },
      { note: "B", octave: 3 },
    ],
    isCustom: false,
    category: "Alternate",
  },
];

// Mock historical tuning sessions
export const mockTuningSessions: TuningSession[] = [
  {
    id: "session-1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    tuningPreset: "Standard",
    duration: 180,
    completed: true,
    averageCents: 3.2,
    stringAccuracy: [2.5, 3.1, 4.2, 2.8, 3.5, 3.8],
  },
  {
    id: "session-2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    tuningPreset: "Drop D",
    duration: 210,
    completed: true,
    averageCents: 2.8,
    stringAccuracy: [2.1, 2.5, 3.2, 2.9, 3.1, 2.8],
  },
  {
    id: "session-3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    tuningPreset: "Standard",
    duration: 165,
    completed: true,
    averageCents: 4.1,
    stringAccuracy: [3.5, 4.2, 4.8, 4.1, 3.9, 4.5],
  },
  {
    id: "session-4",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    tuningPreset: "DADGAD",
    duration: 240,
    completed: true,
    averageCents: 3.5,
    stringAccuracy: [3.2, 3.8, 3.5, 3.4, 3.6, 3.5],
  },
  {
    id: "session-5",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    tuningPreset: "Open G",
    duration: 195,
    completed: false,
    averageCents: 5.2,
    stringAccuracy: [4.5, 5.8, 5.2, 5.1, 5.3, 5.5],
  },
  {
    id: "session-6",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    tuningPreset: "Standard",
    duration: 175,
    completed: true,
    averageCents: 2.9,
    stringAccuracy: [2.8, 2.9, 3.1, 2.7, 3.0, 3.0],
  },
  {
    id: "session-7",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    tuningPreset: "Drop D",
    duration: 220,
    completed: true,
    averageCents: 3.8,
    stringAccuracy: [3.5, 3.9, 4.1, 3.7, 3.8, 3.8],
  },
];

// Generate mock frequency spectrum data
export function generateMockFrequencyData(
  centerFrequency: number,
  includeHarmonics: boolean = false
): FrequencyData[] {
  const data: FrequencyData[] = [];
  const minFreq = 80;
  const maxFreq = 1200;
  const step = 5;

  for (let freq = minFreq; freq <= maxFreq; freq += step) {
    let amplitude = 0;

    // Main frequency peak
    const distance = Math.abs(freq - centerFrequency);
    if (distance < 50) {
      amplitude = Math.max(0, 1 - distance / 50) * (0.8 + Math.random() * 0.2);
    }

    // Add harmonics if requested
    if (includeHarmonics) {
      for (let harmonic = 2; harmonic <= 4; harmonic++) {
        const harmonicFreq = centerFrequency * harmonic;
        const harmonicDistance = Math.abs(freq - harmonicFreq);
        if (harmonicDistance < 30) {
          amplitude += Math.max(0, 1 - harmonicDistance / 30) * 0.3 / harmonic;
        }
      }
    }

    // Add noise
    amplitude += Math.random() * 0.05;

    data.push({ frequency: freq, amplitude });
  }

  return data;
}
