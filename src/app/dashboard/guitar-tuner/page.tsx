import { Metadata } from "next";
import { GuitarTunerClient } from "./client";

export const metadata: Metadata = {
  title: "Guitar Tuner - Frontend Vibes",
  description: "Advanced multi-mode guitar tuner with chromatic detection, presets, and history",
};

export default function GuitarTunerPage() {
  return <GuitarTunerClient />;
}
