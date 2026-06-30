import type { Metadata } from "next";

import { CommunityDashboard } from "@/components/github-dashboard/community-dashboard";

export const metadata: Metadata = {
  title: "GitHub Community Dashboard",
  description: "TV-optimized dashboard for tracking GitHub community health and contribution momentum.",
};

export default function Home() {
  return <CommunityDashboard />;
}
