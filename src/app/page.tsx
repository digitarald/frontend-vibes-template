import { Metadata } from 'next';
import { Hero } from '@/components/mcp/hero';
import { StatsSection } from '@/components/mcp/stats-section';
import { FeaturedServers } from '@/components/mcp/featured-servers';
import { CommunityHighlights } from '@/components/mcp/community-highlights';
import { IntegrationShowcase } from '@/components/mcp/integration-showcase';
import { SuccessStories } from '@/components/mcp/success-stories';
import { GettingStarted } from '@/components/mcp/getting-started';

export const metadata: Metadata = {
  title: 'Model Context Protocol - Join the Growing Ecosystem',
  description: 'Join the thriving MCP ecosystem with 1000+ servers, 212+ contributors, and 70+ compatible clients. Build, share, and discover powerful Model Context Protocol implementations.',
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StatsSection />
      <FeaturedServers />
      <CommunityHighlights />
      <IntegrationShowcase />
      <SuccessStories />
      <GettingStarted />
    </div>
  );
}
