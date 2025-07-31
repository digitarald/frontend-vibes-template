"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";

interface TechnologyRoadmapProps {}

const roadmapItems = [
  {
    quarter: "Q4 2024",
    status: "completed",
    title: "Core Protocol Foundation",
    description: "Established base MCP protocol with standardized message formats and authentication mechanisms.",
    features: [
      "Basic agent-to-agent communication",
      "Security protocol implementation", 
      "Initial SDK release"
    ]
  },
  {
    quarter: "Q1 2025",
    status: "current",
    title: "Advanced Integration Layer",
    description: "Enhanced connectivity features with support for complex multi-agent orchestration and workflow automation.",
    features: [
      "Multi-agent coordination protocols",
      "Advanced workflow automation",
      "Enterprise security features",
      "Real-time monitoring dashboard"
    ]
  },
  {
    quarter: "Q2 2025",
    status: "upcoming",
    title: "AI Model Ecosystem",
    description: "Universal compatibility layer supporting all major AI models with intelligent routing and load balancing.",
    features: [
      "Universal model compatibility",
      "Intelligent request routing",
      "Auto-scaling infrastructure",
      "Performance optimization engine"
    ]
  },
  {
    quarter: "Q3 2025",
    status: "planned",
    title: "Developer Platform 2.0",
    description: "Comprehensive developer experience with visual workflow builders, marketplace, and collaborative tools.",
    features: [
      "Visual workflow builder",
      "MCP marketplace launch",
      "Collaborative development tools",
      "Advanced analytics platform"
    ]
  },
  {
    quarter: "Q4 2025",
    status: "vision",
    title: "Autonomous AI Networks",
    description: "Self-organizing AI agent networks with autonomous discovery, negotiation, and collaboration capabilities.",
    features: [
      "Autonomous agent discovery",
      "Self-healing network protocols",
      "Decentralized governance system",
      "AI-driven optimization"
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'current':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'upcoming':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'planned':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'vision':
      return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'current':
      return <Clock className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
};

export function TechnologyRoadmap({}: TechnologyRoadmapProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 mb-4">
            Technology Roadmap
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Future of AI Infrastructure
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our ambitious roadmap outlines the evolution of Model Context Protocol from 
            foundational standards to autonomous AI networks.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform md:-translate-x-0.5"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transform -translate-x-2 md:-translate-x-2 z-10 border-4 border-slate-900"></div>
                
                {/* Content card */}
                <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-2 capitalize">{item.status}</span>
                        </Badge>
                        <span className="text-slate-400 text-sm font-medium">{item.quarter}</span>
                      </div>
                      
                      <CardTitle className="text-white text-xl">
                        {item.title}
                      </CardTitle>
                      
                      <CardDescription className="text-slate-300">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-slate-200 font-medium text-sm mb-3">Key Features:</h4>
                        {item.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-slate-300 text-sm">
                            <ArrowRight className="w-3 h-3 mr-2 text-cyan-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Spacer for alignment */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-4">
              Shape the Future of AI Infrastructure
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join our early access program and help influence the development of next-generation AI connectivity standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                Request Early Access
              </button>
              <button className="px-8 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all duration-300">
                Download Technical Specs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}