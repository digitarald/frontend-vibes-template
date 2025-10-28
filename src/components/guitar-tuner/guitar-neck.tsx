"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { STANDARD_TUNING, type GuitarString } from "@/types/guitar-tuner";

interface GuitarNeckProps {
  selectedString: GuitarString | null;
  onStringSelect: (guitarString: GuitarString) => void;
  isInTune: boolean;
}

export function GuitarNeck({
  selectedString,
  onStringSelect,
  isInTune,
}: GuitarNeckProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Guitar neck background */}
        <defs>
          <linearGradient id="neckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="50%" stopColor="#A0522D" />
            <stop offset="100%" stopColor="#8B4513" />
          </linearGradient>
          <linearGradient id="fretboardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#654321" />
            <stop offset="50%" stopColor="#8B6F47" />
            <stop offset="100%" stopColor="#654321" />
          </linearGradient>
        </defs>

        {/* Neck body */}
        <rect
          x="50"
          y="50"
          width="700"
          height="300"
          fill="url(#neckGradient)"
          stroke="#3e2723"
          strokeWidth="2"
          rx="10"
        />

        {/* Fretboard overlay */}
        <rect
          x="60"
          y="80"
          width="680"
          height="240"
          fill="url(#fretboardGradient)"
          opacity="0.7"
          rx="8"
        />

        {/* Frets */}
        {[150, 250, 350, 450, 550, 650].map((x, i) => (
          <line
            key={`fret-${i}`}
            x1={x}
            y1="80"
            x2={x}
            y2="320"
            stroke="#C0C0C0"
            strokeWidth="3"
            opacity="0.6"
          />
        ))}

        {/* Fret markers */}
        {[200, 400, 600].map((x, i) => (
          <circle
            key={`marker-${i}`}
            cx={x}
            cy="200"
            r="8"
            fill="#E0E0E0"
            opacity="0.3"
          />
        ))}

        {/* Guitar strings */}
        {STANDARD_TUNING.map((string, index) => {
          const y = 100 + index * 40;
          const isSelected = selectedString?.stringNumber === string.stringNumber;
          const stringWidth = 6 - index * 0.7; // Thicker strings at top

          return (
            <g key={`string-${string.stringNumber}`}>
              {/* String glow effect when selected */}
              {isSelected && (
                <line
                  x1="60"
                  y1={y}
                  x2="740"
                  y2={y}
                  stroke={isInTune ? "#22c55e" : string.color}
                  strokeWidth={stringWidth + 8}
                  opacity="0.3"
                  className="animate-pulse"
                />
              )}
              
              {/* Main string */}
              <line
                x1="60"
                y1={y}
                x2="740"
                y2={y}
                stroke={isSelected ? (isInTune ? "#22c55e" : string.color) : string.color}
                strokeWidth={stringWidth}
                strokeLinecap="round"
                opacity={isSelected ? 1 : 0.7}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected && "drop-shadow-lg"
                )}
                onClick={() => onStringSelect(string)}
                style={{ filter: isSelected ? "brightness(1.2)" : "brightness(1)" }}
              />

              {/* String label on left */}
              <text
                x="30"
                y={y + 5}
                fontSize="20"
                fontWeight="bold"
                fill={isSelected ? (isInTune ? "#22c55e" : string.color) : "#888"}
                className="cursor-pointer select-none transition-colors"
                onClick={() => onStringSelect(string)}
              >
                {string.name}
              </text>

              {/* String number on right */}
              <text
                x="760"
                y={y + 5}
                fontSize="16"
                fill="#888"
                className="select-none"
              >
                {string.stringNumber}
              </text>

              {/* Interactive hit area */}
              <line
                x1="60"
                y1={y}
                x2="740"
                y2={y}
                stroke="transparent"
                strokeWidth="30"
                className="cursor-pointer"
                onClick={() => onStringSelect(string)}
              >
                <title>{`${string.name} String (${string.frequency.toFixed(2)} Hz)`}</title>
              </line>
            </g>
          );
        })}

        {/* Nut (top of neck) */}
        <rect
          x="50"
          y="75"
          width="10"
          height="250"
          fill="#F5F5DC"
          stroke="#3e2723"
          strokeWidth="1"
        />

        {/* Headstock */}
        <path
          d="M 50 80 L 30 90 L 20 150 L 20 250 L 30 310 L 50 320"
          fill="#654321"
          stroke="#3e2723"
          strokeWidth="2"
        />
      </svg>

      {/* String selection hint */}
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Click on any string to select it for tuning
      </div>
    </div>
  );
}
