"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight,
  BookOpen,
  Code,
  Rocket,
  Users,
  MessageCircle,
  Github,
  Mail,
  CheckCircle,
  Download
} from "lucide-react";
import { useState } from "react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  action: {
    label: string;
    icon: React.ReactNode;
  };
  code?: string;
}

function StepCard({ step, title, description, action, code }: StepCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
            {step}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {code && (
          <div className="mb-4 p-3 bg-muted rounded-lg font-mono text-xs overflow-x-auto">
            <code>{code}</code>
          </div>
        )}
        <Button className="w-full group">
          {action.icon}
          {action.label}
          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800">You&apos;re subscribed!</h3>
          <p className="text-green-600 text-sm">Welcome to the MCP community. Check your email for a welcome message.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Stay Updated</CardTitle>
        <CardDescription className="text-primary-foreground/90">
          Get the latest MCP news, updates, and community highlights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background/20 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
          <Button 
            type="submit" 
            variant="secondary" 
            className="w-full"
          >
            <Mail className="mr-2 h-4 w-4" />
            Subscribe to Newsletter
          </Button>
        </form>
        <p className="text-xs text-primary-foreground/70 text-center mt-3">
          No spam, unsubscribe anytime. Join 12,000+ developers.
        </p>
      </CardContent>
    </Card>
  );
}

export function GettingStarted() {
  const steps = [
    {
      step: 1,
      title: "Install MCP CLI",
      description: "Get started with our command-line tools for scaffolding and managing MCP servers",
      action: {
        label: "Install CLI",
        icon: <Download className="mr-2 h-3 w-3" />,
      },
      code: "npm install -g @mcp/cli",
    },
    {
      step: 2,
      title: "Create Your Server",
      description: "Use our scaffolding tools to create your first MCP server with best practices",
      action: {
        label: "Follow Tutorial",
        icon: <Code className="mr-2 h-3 w-3" />,
      },
      code: "mcp create my-server --template=basic",
    },
    {
      step: 3,
      title: "Connect to Client",
      description: "Integrate your server with Claude Desktop, VS Code, or any compatible client",
      action: {
        label: "Integration Guide",
        icon: <Rocket className="mr-2 h-3 w-3" />,
      },
      code: "mcp connect claude-desktop",
    },
    {
      step: 4,
      title: "Share with Community",
      description: "Publish your server to help others and grow the MCP ecosystem",
      action: {
        label: "Publish Server",
        icon: <Users className="mr-2 h-3 w-3" />,
      },
      code: "mcp publish --registry=community",
    },
  ];

  const resources = [
    {
      title: "Documentation",
      description: "Comprehensive guides and API reference",
      icon: <BookOpen className="h-5 w-5" />,
      href: "#",
    },
    {
      title: "GitHub Repository",
      description: "Source code, issues, and contributions",
      icon: <Github className="h-5 w-5" />,
      href: "#",
    },
    {
      title: "Discord Community",
      description: "Chat with other developers and get help",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "#",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the MCP community and start building powerful AI integrations today
          </p>
        </div>
        
        {/* Quick Start Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Resources */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Essential Resources</h3>
            <div className="space-y-4 mb-8">
              {resources.map((resource, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Community CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 group">
                <MessageCircle className="mr-2 h-4 w-4" />
                Join Discord
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="flex-1 group">
                <Github className="mr-2 h-4 w-4" />
                Contribute
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Stay Connected</h3>
            <NewsletterSignup />
            
            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">12K+</div>
                <div className="text-sm text-muted-foreground">Newsletter Subscribers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">5.2K</div>
                <div className="text-sm text-muted-foreground">Discord Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}