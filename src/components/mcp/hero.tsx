"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, MessageCircle, Star, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/10 text-primary">
            <Star className="mr-1 h-3 w-3" />
            Growing Open Source Ecosystem
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Join the Growing{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MCP Ecosystem
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Connect AI models to the tools they need with Model Context Protocol. 
            Join thousands of developers building the future of AI interactions.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button size="lg" className="group">
              <MessageCircle className="mr-2 h-4 w-4" />
              Join Our Community
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" size="lg" className="group">
              <Github className="mr-2 h-4 w-4" />
              Browse MCP Servers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>1,000+ Servers</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>212+ Contributors</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>70+ Compatible Clients</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute left-8 top-20 h-24 w-24 rounded-full bg-primary/10 blur-xl" />
      <div className="absolute right-12 top-40 h-32 w-32 rounded-full bg-accent/10 blur-xl" />
      <div className="absolute bottom-20 left-1/4 h-20 w-20 rounded-full bg-primary/5 blur-xl" />
    </section>
  );
}