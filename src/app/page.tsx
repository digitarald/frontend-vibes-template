import { Metadata } from 'next';
import { HeroSection } from '@/components/mcp/hero-section';
import { InnovationShowcase } from '@/components/mcp/innovation-showcase';
import { TechnologyRoadmap } from '@/components/mcp/technology-roadmap';
import { ThoughtLeadership } from '@/components/mcp/thought-leadership';
import { EarlyAdopters } from '@/components/mcp/early-adopters';
import { PartnershipOpportunities } from '@/components/mcp/partnership-opportunities';

export const metadata: Metadata = {
  title: 'MCP - Pioneer the Future of AI Connectivity',
  description: 'Join the Model Context Protocol revolution. Next-generation AI agent ecosystems and standardized AI connectivity for forward-thinking innovators.',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <InnovationShowcase />
      <TechnologyRoadmap />
      <ThoughtLeadership />
      <EarlyAdopters />
      <PartnershipOpportunities />
    </div>
  );
}
