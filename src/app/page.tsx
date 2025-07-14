import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Zap, 
  Puzzle, 
  Brain, 
  Lock, 
  Cog, 
  TrendingUp, 
  Award,
  CheckCircle,
  ArrowRight,
  Users,
  Building2,
  Cpu,
  Database
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'MCP Servers - Enterprise Model Context Protocol Solutions',
  description: 'Transform your AI development with enterprise-grade Model Context Protocol servers. Standardized integration, enhanced security, and rapid deployment for modern software teams.',
};

const valuePropositions = [
  {
    icon: Puzzle,
    title: "Standardized AI-Tool Integration",
    description: "Unified protocol for seamless AI tool connectivity across your entire development ecosystem.",
    benefits: ["Single integration standard", "Reduced complexity", "Future-proof architecture"]
  },
  {
    icon: Zap,
    title: "Plug-and-Play Extensibility",
    description: "Add new AI capabilities instantly without custom integrations or complex configurations.",
    benefits: ["Instant tool addition", "Zero downtime deployment", "Modular architecture"]
  },
  {
    icon: Brain,
    title: "Contextual Intelligence",
    description: "Real-time access to your codebase, documentation, and workflows for smarter AI assistance.",
    benefits: ["Real-time context", "Intelligent suggestions", "Workflow awareness"]
  }
];

const enterpriseBenefits = [
  {
    icon: Cpu,
    title: "Rapid API Integration",
    description: "Connect with existing enterprise systems in minutes, not months.",
    impact: "75% faster integration"
  },
  {
    icon: Users,
    title: "Agent Orchestration",
    description: "Coordinate multiple AI agents across different business functions.",
    impact: "3x productivity gain"
  },
  {
    icon: TrendingUp,
    title: "Enhanced Developer Productivity",
    description: "Streamline development workflows with intelligent automation.",
    impact: "40% faster delivery"
  }
];

const technicalAdvantages = [
  {
    feature: "Client-Server Architecture",
    description: "Scalable, distributed design for enterprise workloads"
  },
  {
    feature: "JSON-RPC 2.0 Standard Messaging",
    description: "Industry-standard protocol ensuring reliability and compatibility"
  },
  {
    feature: "Real-Time Data Access",
    description: "Live connection to your development environment and data sources"
  },
  {
    feature: "Language Agnostic",
    description: "Works with any programming language or development stack"
  }
];

const securityFeatures = [
  {
    icon: Shield,
    title: "Enterprise-Grade Authentication",
    description: "SSO, RBAC, and multi-factor authentication support"
  },
  {
    icon: Lock,
    title: "Data Residency Control",
    description: "Keep sensitive data within your infrastructure boundaries"
  },
  {
    icon: Database,
    title: "Audit & Compliance",
    description: "Complete activity logging for SOC 2, GDPR, and other requirements"
  }
];

const roiMetrics = [
  { metric: "85%", label: "Reduction in integration costs" },
  { metric: "60%", label: "Faster AI feature development" },
  { metric: "50%", label: "Decrease in manual tasks" },
  { metric: "3x", label: "ROI within first year" }
];

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <Badge variant="secondary" className="mb-4">
          Enterprise Model Context Protocol
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          AI Development
          <span className="block text-primary">Accelerated</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Transform your software development with enterprise-grade Model Context Protocol servers. 
          Standardized AI integration, enhanced security, and rapid deployment for modern development teams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-lg px-8 py-3">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3">
            View Documentation
          </Button>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Core Value Propositions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three fundamental advantages that set MCP servers apart in enterprise AI development
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {valuePropositions.map((prop, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <prop.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{prop.title}</CardTitle>
                <CardDescription className="text-base">
                  {prop.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prop.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enterprise Benefits */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Enterprise Benefits</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measurable impact on your development organization
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {enterpriseBenefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <benefit.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
                <CardDescription className="text-base">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{benefit.impact}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Advantages */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Technical Excellence for CTOs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on proven technologies and industry standards
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {technicalAdvantages.map((advantage, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-lg border">
              <Cog className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">{advantage.feature}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="bg-muted/50 -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Security & Compliance First</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security that meets the most demanding requirements
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Proven ROI Impact</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real metrics from enterprise deployments
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {roiMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {metric.metric}
              </div>
              <div className="text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Capabilities */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Seamless Integration</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Works with your existing development ecosystem
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Drop-in IDE Support</CardTitle>
              <CardDescription className="text-base">
                Native integration with VSCode, IntelliJ, and other popular development environments
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Cog className="h-12 w-12 text-primary mb-4" />
              <CardTitle>CI/CD Pipeline Integration</CardTitle>
              <CardDescription className="text-base">
                Seamlessly integrate with Jenkins, GitHub Actions, GitLab CI, and other automation tools
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Why Choose MCP Servers?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vendor-neutral, future-proof AI infrastructure
          </p>
        </div>
        <Card className="p-8">
          <div className="flex items-start gap-6">
            <Award className="h-16 w-16 text-primary flex-shrink-0 mt-2" />
            <div>
              <h3 className="text-2xl font-bold mb-4">Vendor-Neutral Universal Protocol</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Unlike proprietary solutions, MCP is an open standard that ensures you&apos;re never locked into a single vendor. 
                Choose the best AI tools for each use case while maintaining consistent integration patterns.
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Open source foundation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Multi-vendor support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Future-proof architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Community-driven development</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* Enterprise Features */}
      <section className="bg-primary/5 -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Enterprise Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Governance and compliance controls for large-scale deployments
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Governance & Control</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Centralized policy management</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Usage monitoring and analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Resource allocation controls</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Automated compliance reporting</span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Scale & Performance</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Horizontal scaling capabilities</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Load balancing and failover</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Performance monitoring</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>SLA guarantees</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-8 py-12">
        <h2 className="text-4xl font-bold">Ready to Transform Your AI Development?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join leading enterprises who have already accelerated their AI initiatives with MCP servers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-lg px-8 py-3">
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3">
            Contact Sales
          </Button>
        </div>
      </section>
    </div>
  );
}
