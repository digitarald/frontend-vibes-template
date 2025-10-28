import { NOTE_NAMES, PitchDetectionResult } from "@/types/guitar-tuner";

/**
 * Autocorrelation-based pitch detection algorithm
 * Returns the fundamental frequency of the audio signal
 */
export function autoCorrelate(
  buffer: Float32Array,
  sampleRate: number
): number {
  // Find the size of the buffer
  const SIZE = buffer.length;
  const MAX_SAMPLES = Math.floor(SIZE / 2);
  let best_offset = -1;
  let best_correlation = 0;
  let rms = 0;

  // Calculate RMS (root mean square) to determine if there's enough signal
  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // Not enough signal
  if (rms < 0.01) return -1;

  // Find the best correlation
  let lastCorrelation = 1;
  for (let offset = 0; offset < MAX_SAMPLES; offset++) {
    let correlation = 0;

    for (let i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs(buffer[i] - buffer[i + offset]);
    }

    correlation = 1 - correlation / MAX_SAMPLES;

    if (correlation > 0.9 && correlation > lastCorrelation) {
      const foundGoodCorrelation =
        correlation > best_correlation && correlation > 0.9;
      if (foundGoodCorrelation) {
        best_correlation = correlation;
        best_offset = offset;
      }
    }

    lastCorrelation = correlation;
  }

  if (best_offset === -1) return -1;

  return sampleRate / best_offset;
}

/**
 * Convert frequency to note name and octave
 */
export function frequencyToNote(frequency: number): PitchDetectionResult {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  const noteIndex = Math.round(noteNum) + 69;
  const cents = Math.floor((noteNum - Math.round(noteNum)) * 100);
  const octave = Math.floor(noteIndex / 12) - 1;
  const note = NOTE_NAMES[noteIndex % 12];

  return {
    frequency,
    note,
    cents,
    octave,
  };
}

/**
 * Calculate the deviation in cents from the target frequency
 */
export function calculateCentsOff(
  detectedFreq: number,
  targetFreq: number
): number {
  return Math.floor((1200 * Math.log(detectedFreq / targetFreq)) / Math.log(2));
}

/**
 * Find the closest guitar string to the detected frequency
 */
export function findClosestString(
  frequency: number,
  strings: { name: string; frequency: number; note: string }[]
): { string: { name: string; frequency: number; note: string }; cents: number } | null {
  if (frequency <= 0) return null;

  let closestString = strings[0];
  let minCents = Math.abs(calculateCentsOff(frequency, strings[0].frequency));

  for (const string of strings) {
    const cents = Math.abs(calculateCentsOff(frequency, string.frequency));
    if (cents < minCents) {
      minCents = cents;
      closestString = string;
    }
  }

  // Only return if within reasonable range (within 50 cents)
  if (minCents > 50) return null;

  return {
    string: closestString,
    cents: calculateCentsOff(frequency, closestString.frequency),
  };
}

/**
 * Initialize audio context and get microphone stream
 */
export async function initAudioContext(): Promise<{
  audioContext: AudioContext;
  analyser: AnalyserNode;
  stream: MediaStream;
} | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    source.connect(analyser);

    return { audioContext, analyser, stream };
  } catch (error) {
    console.error("Error accessing microphone:", error);
    return null;
  }
}

/**
 * Clean up audio resources
 */
export function cleanupAudio(
  audioContext: AudioContext | null,
  stream: MediaStream | null
): void {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  if (audioContext && audioContext.state !== "closed") {
    audioContext.close();
  }
}
