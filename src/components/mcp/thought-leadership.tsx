"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, BookOpen, Users, TrendingUp } from "lucide-react";

interface ThoughtLeadershipProps {}

const insights = [
  {
    category: "Industry Analysis",
    title: "The Rise of Standardized AI Communication",
    description: "How MCP is establishing the foundation for interoperable AI systems across industries.",
    author: "Dr. Sarah Chen",
    role: "Chief AI Architect",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    featured: true
  },
  {
    category: "Technical Deep Dive",
    title: "Building Resilient Multi-Agent Systems",
    description: "Architectural patterns and best practices for deploying fault-tolerant AI agent networks.",
    author: "Marcus Rodriguez",
    role: "Principal Engineer",
    readTime: "12 min read",
    date: "Dec 12, 2024",
    featured: false
  },
  {
    category: "Future Trends",
    title: "The Evolution of AI Infrastructure",
    description: "Predicting the next decade of AI connectivity and its impact on enterprise automation.",
    author: "Alex Kim",
    role: "Head of Research",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    featured: false
  }
];

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Developers in Community",
    gradient: "from-cyan-400 to-blue-400"
  },
  {
    icon: BookOpen,
    value: "150+",
    label: "Technical Articles",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    icon: TrendingUp,
    value: "500%",
    label: "YoY Growth in Adoption",
    gradient: "from-green-400 to-emerald-400"
  }
];

export function ThoughtLeadership({}: ThoughtLeadershipProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 mb-4">
            Thought Leadership
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Leading AI Infrastructure Evolution
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore insights from our research team and industry experts on the future 
            of AI connectivity and infrastructure development.
          </p>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                    <Icon className={`w-8 h-8 text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text`} />
                  </div>
                </div>
                <div className={`text-4xl font-bold text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text mb-2`}>
                  {stat.value}
                </div>
                <div className="text-slate-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Featured insight */}
        {insights.filter(insight => insight.featured).map((insight, index) => (
          <Card key={index} className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 mb-12 backdrop-blur-sm hover:border-slate-500 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  Featured • {insight.category}
                </Badge>
                <span className="text-slate-400 text-sm">{insight.date}</span>
              </div>
              
              <CardTitle className="text-2xl md:text-3xl text-white mb-3 leading-tight">
                {insight.title}
              </CardTitle>
              
              <CardDescription className="text-lg text-slate-300 leading-relaxed">
                {insight.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`} />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      {insight.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-medium">{insight.author}</div>
                    <div className="text-slate-400 text-sm">{insight.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-slate-400 text-sm">{insight.readTime}</span>
                  <button className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Regular insights grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {insights.filter(insight => !insight.featured).map((insight, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 backdrop-blur-sm group">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="text-slate-400 border-slate-600">
                    {insight.category}
                  </Badge>
                  <span className="text-slate-500 text-sm">{insight.date}</span>
                </div>
                
                <CardTitle className="text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {insight.title}
                </CardTitle>
                
                <CardDescription className="text-slate-300">
                  {insight.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face`} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        {insight.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-white text-sm font-medium">{insight.author}</div>
                      <div className="text-slate-500 text-xs">{insight.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-500 text-sm">{insight.readTime}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Newsletter signup */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-slate-600 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Ahead of AI Innovation
            </h3>
            <p className="text-slate-300 mb-6">
              Get exclusive insights, technical deep-dives, and early access to our research directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                Subscribe
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-3">
              Join 5,000+ AI professionals. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}