"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Workflow, Shield, Cpu, Globe } from "lucide-react";

interface InnovationShowcaseProps {}

const innovations = [
  {
    icon: Brain,
    title: "Intelligent Agent Orchestration",
    description: "Seamlessly coordinate multiple AI agents with standardized protocols for complex multi-agent workflows.",
    category: "AI Agents",
    status: "Live",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Database,
    title: "Context-Aware Data Bridging",
    description: "Connect disparate data sources with AI-native context understanding for enhanced decision making.",
    category: "Data Integration",
    status: "Beta",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Workflow,
    title: "Automated Workflow Generation",
    description: "AI-powered workflow creation that adapts to your business processes and scales automatically.",
    category: "Automation",
    status: "Preview",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Built-in security protocols ensuring safe AI agent interactions across organizational boundaries.",
    category: "Security",
    status: "Live",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Cpu,
    title: "High-Performance Computing",
    description: "Optimized for edge computing and cloud-native deployments with minimal latency overhead.",
    category: "Performance",
    status: "Beta",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Globe,
    title: "Global Model Compatibility",
    description: "Universal compatibility with leading AI models from OpenAI, Anthropic, Google, and more.",
    category: "Compatibility",
    status: "Live",
    gradient: "from-teal-500 to-blue-500"
  }
];

export function InnovationShowcase({}: InnovationShowcaseProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 mb-4">
            Innovation Showcase
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cutting-Edge AI Applications
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore groundbreaking use cases that demonstrate the transformative power of 
            standardized AI connectivity in real-world scenarios.
          </p>
        </div>
        
        {/* Innovation grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {innovations.map((innovation, index) => {
            const Icon = innovation.icon;
            return (
              <Card 
                key={index} 
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm group"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${innovation.gradient} bg-opacity-20`}>
                      <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${innovation.gradient} bg-clip-text`} />
                    </div>
                    <Badge 
                      variant={innovation.status === 'Live' ? 'default' : innovation.status === 'Beta' ? 'secondary' : 'outline'}
                      className={
                        innovation.status === 'Live' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : innovation.status === 'Beta'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      }
                    >
                      {innovation.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <CardTitle className="text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {innovation.title}
                    </CardTitle>
                    <p className="text-slate-500 text-sm mt-1">{innovation.category}</p>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {innovation.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">Ready to build the next generation of AI applications?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
              Explore Documentation
            </button>
            <button className="px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all duration-300">
              View Code Examples
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}