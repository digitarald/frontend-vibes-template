"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Code, Network } from "lucide-react";

interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM0ZjQ2ZTUiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Innovation badge */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 px-4 py-2 text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Pioneering AI Connectivity
          </Badge>
        </div>
        
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Pioneer the Future of{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Connectivity
          </span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Model Context Protocol (MCP) revolutionizes how AI agents connect, communicate, and collaborate. 
          Join the vanguard of next-generation AI infrastructure.
        </p>
        
        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center text-cyan-300">
            <Code className="w-5 h-5 mr-2" />
            Standardized AI Protocols
          </div>
          <div className="flex items-center text-blue-300">
            <Network className="w-5 h-5 mr-2" />
            Cross-Platform Portability
          </div>
          <div className="flex items-center text-purple-300">
            <Zap className="w-5 h-5 mr-2" />
            Future-Proof Infrastructure
          </div>
        </div>
        
        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Pioneer the Future
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-300 px-8 py-4 text-lg backdrop-blur-sm"
          >
            Join Innovation Program
          </Button>
        </div>
        
        {/* Secondary CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
          <Button 
            variant="link" 
            className="text-slate-400 hover:text-white transition-colors"
          >
            Partner With Us →
          </Button>
          
          <Button 
            variant="link" 
            className="text-slate-400 hover:text-white transition-colors"
          >
            Reserve Early Access →
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <p className="text-slate-500 text-sm mb-4">Trusted by innovative teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-slate-400 font-semibold">TechCorp</div>
            <div className="text-slate-400 font-semibold">AI Ventures</div>
            <div className="text-slate-400 font-semibold">FutureLabs</div>
            <div className="text-slate-400 font-semibold">NextGen AI</div>
          </div>
        </div>
      </div>
    </section>
  );
}