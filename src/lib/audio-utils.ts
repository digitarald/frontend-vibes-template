import { STANDARD_TUNING, type GuitarString } from "@/types/guitar-tuner";

/**
 * Converts frequency in Hz to cents relative to a reference frequency
 * @param frequency - The detected frequency in Hz
 * @param referenceFrequency - The target frequency in Hz
 * @returns The difference in cents (100 cents = 1 semitone)
 */
export function frequencyToCents(
  frequency: number,
  referenceFrequency: number
): number {
  return 1200 * Math.log2(frequency / referenceFrequency);
}

/**
 * Finds the closest guitar string to a given frequency
 * @param frequency - The detected frequency in Hz
 * @returns The closest guitar string from standard tuning
 */
export function findClosestString(frequency: number): GuitarString {
  let closest = STANDARD_TUNING[0];
  let minDiff = Math.abs(frequency - closest.frequency);

  for (const string of STANDARD_TUNING) {
    const diff = Math.abs(frequency - string.frequency);
    if (diff < minDiff) {
      minDiff = diff;
      closest = string;
    }
  }

  return closest;
}

/**
 * Autocorrelation-based pitch detection algorithm
 * @param buffer - Audio data buffer
 * @param sampleRate - Sample rate of the audio
 * @returns Detected frequency in Hz or null if no clear pitch found
 */
export function detectPitch(
  buffer: Float32Array,
  sampleRate: number
): number | null {
  // Minimum and maximum frequencies we care about (E2 to E4 roughly)
  const minFrequency = 70;
  const maxFrequency = 400;
  const minPeriod = Math.floor(sampleRate / maxFrequency);
  const maxPeriod = Math.ceil(sampleRate / minFrequency);

  // Calculate autocorrelation
  const correlations: number[] = [];
  let bestCorrelation = 0;
  let bestOffset = -1;

  for (let offset = minPeriod; offset <= maxPeriod; offset++) {
    let correlation = 0;
    for (let i = 0; i < buffer.length - offset; i++) {
      correlation += Math.abs(buffer[i] - buffer[i + offset]);
    }
    correlation = 1 - correlation / (buffer.length - offset);
    correlations.push(correlation);

    if (correlation > bestCorrelation) {
      bestCorrelation = correlation;
      bestOffset = offset;
    }
  }

  // Check if we found a strong enough correlation
  if (bestCorrelation < 0.9 || bestOffset === -1) {
    return null;
  }

  const frequency = sampleRate / (bestOffset + minPeriod);

  // Validate frequency is in our expected range
  if (frequency < minFrequency || frequency > maxFrequency) {
    return null;
  }

  return frequency;
}

/**
 * Creates and configures an audio analyzer for pitch detection
 * @param audioContext - Web Audio API context
 * @param stream - MediaStream from microphone
 * @returns Object containing analyzer node and data array
 */
export function createAudioAnalyzer(
  audioContext: AudioContext,
  stream: MediaStream
): { analyser: AnalyserNode; dataArray: Float32Array } {
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 4096;
  analyser.smoothingTimeConstant = 0.8;

  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  const dataArray = new Float32Array(analyser.fftSize);

  return { analyser, dataArray };
}

/**
 * Checks if a frequency is within the tuning tolerance
 * @param cents - Difference in cents from target
 * @param tolerance - Tolerance in cents
 * @returns True if the note is in tune
 */
export function isInTune(cents: number, tolerance: number): boolean {
  return Math.abs(cents) <= tolerance;
}
