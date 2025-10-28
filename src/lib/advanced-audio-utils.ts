/**
 * Advanced audio utilities for high-precision pitch detection
 * Uses Web Audio API with enhanced FFT analysis
 */

import type { PitchDetectionResult } from '@/types/guitar-tuner';

// Note names for chromatic scale
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export class AdvancedAudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private dataArray: Float32Array | null = null;
  private bufferLength: number = 0;
  private animationFrameId: number | null = null;
  private a4Frequency: number = 440;
  private sensitivity: number = 50;
  
  constructor(a4Frequency: number = 440, sensitivity: number = 50) {
    this.a4Frequency = a4Frequency;
    this.sensitivity = sensitivity;
  }

  async initialize(): Promise<void> {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          autoGainControl: false,
          noiseSuppression: false,
        } 
      });
      
      // Create analyzer
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 8192; // Larger FFT for better frequency resolution
      this.analyser.smoothingTimeConstant = 0.8;
      
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Float32Array(this.bufferLength);
      
      // Connect microphone to analyzer
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);
    } catch (error) {
      throw new Error(`Failed to initialize audio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Detect pitch using autocorrelation algorithm
   * More accurate than simple FFT peak detection
   */
  detectPitch(): PitchDetectionResult | null {
    if (!this.analyser || !this.dataArray || !this.audioContext) {
      return null;
    }

    // Get time domain data
    this.analyser.getFloatTimeDomainData(this.dataArray);
    
    // Apply autocorrelation
    const sampleRate = this.audioContext.sampleRate;
    const frequency = this.autoCorrelate(this.dataArray, sampleRate);
    
    if (frequency === -1) {
      return null;
    }

    // Calculate note information
    const noteInfo = this.frequencyToNote(frequency);
    
    // Calculate confidence based on signal strength
    const confidence = this.calculateConfidence(this.dataArray);
    
    // Apply sensitivity threshold
    const sensitivityThreshold = (100 - this.sensitivity) / 100;
    if (confidence < sensitivityThreshold) {
      return null;
    }

    return {
      frequency,
      note: noteInfo.note,
      octave: noteInfo.octave,
      cents: noteInfo.cents,
      confidence,
    };
  }

  /**
   * Autocorrelation algorithm for pitch detection
   * More robust than FFT for musical pitch detection
   */
  private autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    // Find the RMS (root mean square) to determine if signal is strong enough
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);
    
    if (rms < 0.01) {
      return -1; // Signal too weak
    }

    // Autocorrelation
    const size = buffer.length;
    const maxSamples = Math.floor(size / 2);
    let bestOffset = -1;
    let bestCorrelation = 0;
    let foundGoodCorrelation = false;
    
    // Search for the best correlation
    for (let offset = 0; offset < maxSamples; offset++) {
      let correlation = 0;
      
      for (let i = 0; i < maxSamples; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset]);
      }
      
      correlation = 1 - (correlation / maxSamples);
      
      if (correlation > 0.9 && correlation > bestCorrelation) {
        foundGoodCorrelation = true;
        bestCorrelation = correlation;
        bestOffset = offset;
      }
    }
    
    if (foundGoodCorrelation && bestOffset !== -1) {
      // Refine using parabolic interpolation
      const shift = this.parabolicInterpolation(buffer, bestOffset);
      return sampleRate / (bestOffset + shift);
    }
    
    return -1;
  }

  /**
   * Parabolic interpolation for sub-sample accuracy
   */
  private parabolicInterpolation(buffer: Float32Array, offset: number): number {
    if (offset === 0 || offset >= buffer.length - 1) {
      return 0;
    }
    
    const y1 = buffer[offset - 1];
    const y2 = buffer[offset];
    const y3 = buffer[offset + 1];
    
    return 0.5 * (y1 - y3) / (y1 - 2 * y2 + y3);
  }

  /**
   * Calculate confidence based on signal characteristics
   */
  private calculateConfidence(buffer: Float32Array): number {
    let sum = 0;
    let sumSquares = 0;
    
    for (let i = 0; i < buffer.length; i++) {
      const value = buffer[i];
      sum += value;
      sumSquares += value * value;
    }
    
    const mean = sum / buffer.length;
    const variance = (sumSquares / buffer.length) - (mean * mean);
    
    // Normalize confidence to 0-1 range
    return Math.min(Math.sqrt(variance) * 10, 1);
  }

  /**
   * Convert frequency to note name, octave, and cents off
   */
  private frequencyToNote(frequency: number): { note: string; octave: number; cents: number } {
    // Calculate the number of half steps from A4
    const halfStepsFromA4 = 12 * Math.log2(frequency / this.a4Frequency);
    const roundedHalfSteps = Math.round(halfStepsFromA4);
    
    // Calculate cents off from perfect pitch
    const cents = Math.round((halfStepsFromA4 - roundedHalfSteps) * 100);
    
    // Calculate octave and note
    const noteIndex = (roundedHalfSteps + 9 + 120) % 12; // +9 because A is 9 half steps from C
    const octave = Math.floor((roundedHalfSteps + 9 + 120) / 12) - 6; // A4 is in octave 4
    
    return {
      note: NOTE_NAMES[noteIndex],
      octave,
      cents,
    };
  }

  /**
   * Get the closest note frequency for a given note name and octave
   */
  static getNoteFrequency(note: string, octave: number, a4Frequency: number = 440): number {
    const noteIndex = NOTE_NAMES.indexOf(note);
    if (noteIndex === -1) {
      throw new Error(`Invalid note: ${note}`);
    }
    
    // Calculate half steps from A4
    const a4Octave = 4;
    const a4Index = 9; // A is at index 9 in NOTE_NAMES
    
    const halfStepsFromA4 = (octave - a4Octave) * 12 + (noteIndex - a4Index);
    
    return a4Frequency * Math.pow(2, halfStepsFromA4 / 12);
  }

  /**
   * Start continuous pitch detection
   */
  startDetection(callback: (result: PitchDetectionResult | null) => void): void {
    const detect = () => {
      const result = this.detectPitch();
      callback(result);
      this.animationFrameId = requestAnimationFrame(detect);
    };
    detect();
  }

  /**
   * Stop pitch detection
   */
  stopDetection(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Update analyzer settings
   */
  updateSettings(a4Frequency: number, sensitivity: number): void {
    this.a4Frequency = a4Frequency;
    this.sensitivity = sensitivity;
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    this.stopDetection();
    
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.analyser = null;
    this.dataArray = null;
  }
}

/**
 * Calculate cents difference between two frequencies
 */
export function calculateCents(frequency: number, targetFrequency: number): number {
  return Math.round(1200 * Math.log2(frequency / targetFrequency));
}

/**
 * Check if a note is in tune based on tolerance (in cents)
 */
export function isInTune(cents: number, tolerance: number = 5): boolean {
  return Math.abs(cents) <= tolerance;
}
