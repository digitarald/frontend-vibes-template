import { Metadata } from 'next';
import MCPEnterpriseLandingPage from '@/components/enterprise/complete-landing-page';

export const metadata: Metadata = {
  title: 'MCP Enterprise - Standardize Your AI Infrastructure',
  description: 'Model Context Protocol (MCP) provides enterprise teams with a unified, secure framework for AI integration. Eliminate vendor lock-in while maintaining complete control over your AI infrastructure.',
  keywords: 'enterprise AI, model context protocol, AI infrastructure, Claude enterprise, vendor lock-in prevention, enterprise security',
};

export default function Home() {
  return <MCPEnterpriseLandingPage />;
}
