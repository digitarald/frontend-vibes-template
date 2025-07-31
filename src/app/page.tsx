import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { Star, Users, Zap, Shield, Layers, ArrowRight, Code, Database, Plug, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Model Context Protocol - The Universal Protocol for AI Context',
  description: 'MCP enables AI applications to securely connect to any data source. Join 4.9k+ developers building the future of AI integration.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              <GitHubLogoIcon className="w-4 h-4 mr-2" />
              Open Source Protocol
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                The Universal Protocol
                <br />
                <span className="text-primary">for AI Context</span>
              </h1>
              
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground lg:text-2xl">
                Model Context Protocol (MCP) is the <strong>USB-C for AI applications</strong>. 
                Connect any data source to any AI model with standardized, secure integrations.
              </p>
            </div>

            {/* GitHub Stats */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">4.9k</span>
                <span className="text-muted-foreground">stars</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">1000+</span>
                <span className="text-muted-foreground">servers</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
                <Layers className="w-5 h-5 text-green-500" />
                <span className="font-semibold">Growing</span>
                <span className="text-muted-foreground">ecosystem</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <a href="https://github.com/modelcontextprotocol/quickstart" target="_blank" rel="noopener noreferrer">
                  <GitHubLogoIcon className="w-5 h-5 mr-2" />
                  Start Building Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
                <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer">
                  <Layers className="w-5 h-5 mr-2" />
                  Explore MCP Servers
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple. Standardized. Secure.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Connect any data source to your AI application with just a few lines of code.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Quick Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 text-slate-100 border rounded-lg p-4 text-sm overflow-x-auto">
                    <code>{`npm install @modelcontextprotocol/client

import { Client } from '@modelcontextprotocol/client';

const client = new Client({
  server: 'filesystem',
  params: { rootPath: '/data' }
});

await client.connect();
const files = await client.listResources();`}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Why Developers Choose MCP</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Lightning Fast</h4>
                    <p className="text-sm text-muted-foreground">Connect to data sources in minutes, not days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Enterprise Secure</h4>
                    <p className="text-sm text-muted-foreground">Built-in authentication and permission controls</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Extensible</h4>
                    <p className="text-sm text-muted-foreground">Plugin architecture scales with your needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Connect Any Data Source
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              See how MCP enables seamless integration between AI models and diverse data sources.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Database className="w-12 h-12 mx-auto text-blue-500 mb-2" />
                <CardTitle>Data Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• File Systems</li>
                  <li>• Databases</li>
                  <li>• APIs & Web Services</li>
                  <li>• Cloud Storage</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center border-primary">
              <CardHeader>
                <Plug className="w-12 h-12 mx-auto text-green-500 mb-2" />
                <CardTitle>MCP Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Standardized interface that enables secure, authenticated connections between any data source and AI model.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 mx-auto text-purple-500 mb-2" />
                <CardTitle>AI Models</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Claude</li>
                  <li>• ChatGPT</li>
                  <li>• Local Models</li>
                  <li>• Custom Agents</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Benefits Grid */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for Developers, by Developers
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              MCP addresses the core challenges of AI integration with proven engineering principles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Standardization</h3>
              </div>
              <p className="text-muted-foreground">
                One protocol, unlimited possibilities. Stop writing custom integrations for every data source and AI model combination.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Plug className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Compatibility</h3>
              </div>
              <p className="text-muted-foreground">
                Drop-in replacement for existing integrations. MCP works with your current stack and scales as you grow.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Extensibility</h3>
              </div>
              <p className="text-muted-foreground">
                Plugin architecture designed for the future. Add new capabilities without breaking existing functionality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Build the Future of AI?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of developers already using MCP to create the next generation of AI applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <a href="https://github.com/modelcontextprotocol/quickstart" target="_blank" rel="noopener noreferrer">
                  <GitHubLogoIcon className="w-5 h-5 mr-2" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
                <a href="https://github.com/modelcontextprotocol/specification" target="_blank" rel="noopener noreferrer">
                  Read the Docs
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
