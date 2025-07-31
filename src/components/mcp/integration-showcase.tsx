"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface IntegrationCardProps {
  name: string;
  description: string;
  category: string;
  logo: string;
  supported: boolean;
  popular?: boolean;
}

function IntegrationCard({ name, description, category, logo, supported, popular }: IntegrationCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${popular ? 'border-primary/50 shadow-md' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
              {logo}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                {category}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {popular && (
              <Badge className="bg-gradient-to-r from-primary to-accent">
                Popular
              </Badge>
            )}
            <div className="flex items-center space-x-1">
              <CheckCircle className={`h-4 w-4 ${supported ? 'text-green-500' : 'text-muted-foreground'}`} />
              <span className="text-xs text-muted-foreground">
                {supported ? 'Supported' : 'Coming Soon'}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {description}
        </CardDescription>
        
        <Button 
          variant={supported ? "default" : "outline"} 
          size="sm" 
          className="w-full"
          disabled={!supported}
        >
          {supported ? (
            <>
              <ExternalLink className="mr-2 h-3 w-3" />
              Connect Now
            </>
          ) : (
            "Coming Soon"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export function IntegrationShowcase() {
  const integrations = [
    {
      name: "Claude Desktop",
      description: "Native integration with Anthropic's Claude Desktop application",
      category: "AI Client",
      logo: "🤖",
      supported: true,
      popular: true,
    },
    {
      name: "VS Code",
      description: "Enhanced coding experience with MCP server capabilities",
      category: "IDE",
      logo: "🆚",
      supported: true,
      popular: true,
    },
    {
      name: "ChatGPT",
      description: "Connect ChatGPT to external tools and data sources",
      category: "AI Client",
      logo: "💬",
      supported: true,
    },
    {
      name: "Cursor",
      description: "AI-powered code editor with MCP server integration",
      category: "IDE",
      logo: "↗️",
      supported: true,
    },
    {
      name: "Notion",
      description: "Seamless integration with Notion workspaces and databases",
      category: "Productivity",
      logo: "📝",
      supported: true,
    },
    {
      name: "Linear",
      description: "Project management and issue tracking integration",
      category: "Productivity",
      logo: "📊",
      supported: false,
    },
    {
      name: "Figma",
      description: "Design tool integration for creative workflows",
      category: "Design",
      logo: "🎨",
      supported: false,
    },
    {
      name: "Slack",
      description: "Team communication and collaboration features",
      category: "Communication",
      logo: "💬",
      supported: false,
    },
  ];

  const compatibleClients = [
    "Claude Desktop",
    "VS Code Extensions",
    "Cursor IDE",
    "Custom CLI Tools",
    "Web Applications",
    "Mobile Apps (Beta)",
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Integration Showcase
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            MCP works with the tools you already love, making AI integration seamless
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} {...integration} />
          ))}
        </div>
        
        {/* Compatible Clients Section */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              70+ Compatible Clients
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              MCP servers work across a wide range of applications and platforms
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {compatibleClients.map((client, index) => (
              <div 
                key={index}
                className="bg-background/80 backdrop-blur-sm rounded-lg p-4 text-center border border-primary/10"
              >
                <Zap className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{client}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Quick Start Integration */}
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Integrate?</CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Get started with MCP in minutes using our integration guides
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="group">
                View Integration Guide
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <ExternalLink className="mr-2 h-4 w-4" />
                API Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}