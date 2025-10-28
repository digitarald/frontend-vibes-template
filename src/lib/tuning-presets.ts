/**
 * Comprehensive tuning presets for various instruments and tuning systems
 */

import type { TuningPreset, Note } from '@/types/guitar-tuner';

// Helper function to create notes from standard notation
function createNote(name: string, frequency: number, octave?: number): Note {
  return { name, frequency, octave };
}

// Standard guitar tunings (E2, A2, D3, G3, B3, E4)
export const GUITAR_STANDARD: TuningPreset = {
  id: 'standard',
  name: 'Standard (E)',
  instrument: 'guitar',
  description: 'Standard guitar tuning',
  notes: [
    createNote('E', 82.41, 2),
    createNote('A', 110.00, 2),
    createNote('D', 146.83, 3),
    createNote('G', 196.00, 3),
    createNote('B', 246.94, 3),
    createNote('E', 329.63, 4),
  ],
};

export const GUITAR_DROP_D: TuningPreset = {
  id: 'drop-d',
  name: 'Drop D',
  instrument: 'guitar',
  description: 'Drop D tuning - low E dropped to D',
  notes: [
    createNote('D', 73.42, 2),
    createNote('A', 110.00, 2),
    createNote('D', 146.83, 3),
    createNote('G', 196.00, 3),
    createNote('B', 246.94, 3),
    createNote('E', 329.63, 4),
  ],
};

export const GUITAR_DROP_C: TuningPreset = {
  id: 'drop-c',
  name: 'Drop C',
  instrument: 'guitar',
  description: 'Drop C tuning - whole step down with low string to C',
  notes: [
    createNote('C', 65.41, 2),
    createNote('G', 98.00, 2),
    createNote('C', 130.81, 3),
    createNote('F', 174.61, 3),
    createNote('A', 220.00, 3),
    createNote('D', 293.66, 4),
  ],
};

export const GUITAR_DADGAD: TuningPreset = {
  id: 'dadgad',
  name: 'DADGAD',
  instrument: 'guitar',
  description: 'Celtic/modal tuning',
  notes: [
    createNote('D', 73.42, 2),
    createNote('A', 110.00, 2),
    createNote('D', 146.83, 3),
    createNote('G', 196.00, 3),
    createNote('A', 220.00, 3),
    createNote('D', 293.66, 4),
  ],
};

export const GUITAR_OPEN_G: TuningPreset = {
  id: 'open-g',
  name: 'Open G',
  instrument: 'guitar',
  description: 'Open G tuning - forms a G major chord',
  notes: [
    createNote('D', 73.42, 2),
    createNote('G', 98.00, 2),
    createNote('D', 146.83, 3),
    createNote('G', 196.00, 3),
    createNote('B', 246.94, 3),
    createNote('D', 293.66, 4),
  ],
};

export const GUITAR_OPEN_D: TuningPreset = {
  id: 'open-d',
  name: 'Open D',
  instrument: 'guitar',
  description: 'Open D tuning - forms a D major chord',
  notes: [
    createNote('D', 73.42, 2),
    createNote('A', 110.00, 2),
    createNote('D', 146.83, 3),
    createNote('F#', 185.00, 3),
    createNote('A', 220.00, 3),
    createNote('D', 293.66, 4),
  ],
};

export const GUITAR_OPEN_E: TuningPreset = {
  id: 'open-e',
  name: 'Open E',
  instrument: 'guitar',
  description: 'Open E tuning - forms an E major chord',
  notes: [
    createNote('E', 82.41, 2),
    createNote('B', 123.47, 2),
    createNote('E', 164.81, 3),
    createNote('G#', 207.65, 3),
    createNote('B', 246.94, 3),
    createNote('E', 329.63, 4),
  ],
};

export const GUITAR_HALF_STEP_DOWN: TuningPreset = {
  id: 'half-step-down',
  name: 'Half Step Down (Eb)',
  instrument: 'guitar',
  description: 'Standard tuning down a half step',
  notes: [
    createNote('Eb', 77.78, 2),
    createNote('Ab', 103.83, 2),
    createNote('Db', 138.59, 3),
    createNote('Gb', 185.00, 3),
    createNote('Bb', 233.08, 3),
    createNote('Eb', 311.13, 4),
  ],
};

export const GUITAR_WHOLE_STEP_DOWN: TuningPreset = {
  id: 'whole-step-down',
  name: 'Whole Step Down (D)',
  instrument: 'guitar',
  description: 'Standard tuning down a whole step',
  notes: [
    createNote('D', 73.42, 2),
    createNote('G', 98.00, 2),
    createNote('C', 130.81, 3),
    createNote('F', 174.61, 3),
    createNote('A', 220.00, 3),
    createNote('D', 293.66, 4),
  ],
};

// Bass tunings
export const BASS_STANDARD: TuningPreset = {
  id: 'standard-bass',
  name: 'Standard Bass',
  instrument: 'bass',
  description: 'Standard 4-string bass tuning',
  notes: [
    createNote('E', 41.20, 1),
    createNote('A', 55.00, 1),
    createNote('D', 73.42, 2),
    createNote('G', 98.00, 2),
  ],
};

export const BASS_DROP_D: TuningPreset = {
  id: 'drop-d-bass',
  name: 'Drop D Bass',
  instrument: 'bass',
  description: 'Bass with low E dropped to D',
  notes: [
    createNote('D', 36.71, 1),
    createNote('A', 55.00, 1),
    createNote('D', 73.42, 2),
    createNote('G', 98.00, 2),
  ],
};

// Ukulele tunings
export const UKULELE_C: TuningPreset = {
  id: 'ukulele-c',
  name: 'Ukulele C (GCEA)',
  instrument: 'ukulele',
  description: 'Standard ukulele tuning',
  notes: [
    createNote('G', 392.00, 4),
    createNote('C', 261.63, 4),
    createNote('E', 329.63, 4),
    createNote('A', 440.00, 4),
  ],
};

export const UKULELE_D: TuningPreset = {
  id: 'ukulele-d',
  name: 'Ukulele D (ADF#B)',
  instrument: 'ukulele',
  description: 'D tuning for ukulele',
  notes: [
    createNote('A', 440.00, 4),
    createNote('D', 293.66, 4),
    createNote('F#', 369.99, 4),
    createNote('B', 493.88, 4),
  ],
};

// Mandolin tuning
export const MANDOLIN_STANDARD: TuningPreset = {
  id: 'mandolin-standard',
  name: 'Standard Mandolin (GDAE)',
  instrument: 'mandolin',
  description: 'Standard mandolin tuning',
  notes: [
    createNote('G', 196.00, 3),
    createNote('D', 293.66, 4),
    createNote('A', 440.00, 4),
    createNote('E', 659.25, 5),
  ],
};

// All presets organized by instrument
export const TUNING_PRESETS: Record<string, TuningPreset> = {
  'standard': GUITAR_STANDARD,
  'drop-d': GUITAR_DROP_D,
  'drop-c': GUITAR_DROP_C,
  'dadgad': GUITAR_DADGAD,
  'open-g': GUITAR_OPEN_G,
  'open-d': GUITAR_OPEN_D,
  'open-e': GUITAR_OPEN_E,
  'half-step-down': GUITAR_HALF_STEP_DOWN,
  'whole-step-down': GUITAR_WHOLE_STEP_DOWN,
  'standard-bass': BASS_STANDARD,
  'drop-d-bass': BASS_DROP_D,
  'ukulele-c': UKULELE_C,
  'ukulele-d': UKULELE_D,
  'mandolin-standard': MANDOLIN_STANDARD,
};

// Get presets by instrument type
export function getPresetsByInstrument(instrument: string): TuningPreset[] {
  return Object.values(TUNING_PRESETS).filter(
    preset => preset.instrument === instrument
  );
}

// Get default preset for an instrument
export function getDefaultPreset(instrument: string): TuningPreset {
  switch (instrument) {
    case 'guitar':
      return GUITAR_STANDARD;
    case 'bass':
      return BASS_STANDARD;
    case 'ukulele':
      return UKULELE_C;
    case 'mandolin':
      return MANDOLIN_STANDARD;
    default:
      return GUITAR_STANDARD;
  }
}
