"use client";

import { useEffect, useRef, useState } from "react";
import {
  autoCorrelate,
  cleanupAudio,
  findClosestString,
  frequencyToNote,
  initAudioContext,
} from "@/lib/audio-utils";
import { GUITAR_STRINGS } from "@/types/guitar-tuner";

interface AutoDetectorProps {
  onDetection: (data: {
    frequency: number;
    note: string;
    octave: number;
    cents: number;
    targetString: string | null;
    isInTune: boolean;
  }) => void;
  isActive: boolean;
}

export function AutoDetector({ onDetection, isActive }: AutoDetectorProps) {
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const startDetection = async () => {
      if (!isActive) return;

      try {
        const audioData = await initAudioContext();
        if (!audioData || !mounted) {
          setError("Could not access microphone");
          return;
        }

        audioContextRef.current = audioData.audioContext;
        analyserRef.current = audioData.analyser;
        streamRef.current = audioData.stream;
        setError(null);

        // Start the detection loop
        detectPitch();
      } catch (err) {
        console.error("Error starting detection:", err);
        setError("Failed to start audio detection");
      }
    };

    const detectPitch = () => {
      if (!analyserRef.current || !audioContextRef.current || !isActive) {
        return;
      }

      const bufferLength = analyserRef.current.fftSize;
      const buffer = new Float32Array(bufferLength);
      analyserRef.current.getFloatTimeDomainData(buffer);

      const frequency = autoCorrelate(
        buffer,
        audioContextRef.current.sampleRate
      );

      if (frequency > 0) {
        const { note, octave } = frequencyToNote(frequency);
        const closestString = findClosestString(frequency, GUITAR_STRINGS);

        if (closestString) {
          const cents = closestString.cents;
          const isInTune = Math.abs(cents) < 5; // Within 5 cents is "in tune"

          onDetection({
            frequency,
            note,
            octave,
            cents,
            targetString: closestString.string.name,
            isInTune,
          });
        } else {
          // Still show the detected note even if not close to a standard string
          onDetection({
            frequency,
            note,
            octave,
            cents: 0,
            targetString: null,
            isInTune: false,
          });
        }
      }

      // Continue detection loop
      rafIdRef.current = requestAnimationFrame(detectPitch);
    };

    if (isActive) {
      startDetection();
    }

    return () => {
      mounted = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      cleanupAudio(audioContextRef.current, streamRef.current);
    };
  }, [isActive, onDetection]);

  if (error) {
    return (
      <div className="text-sm text-destructive p-4 bg-destructive/10 rounded-lg">
        {error}
      </div>
    );
  }

  return null;
}
