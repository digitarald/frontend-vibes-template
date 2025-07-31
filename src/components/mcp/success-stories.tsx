"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Quote,
  Star,
  ExternalLink,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

interface SuccessStoryProps {
  title: string;
  description: string;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
  metrics: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  category: string;
  featured?: boolean;
}

function SuccessStoryCard({ title, description, quote, author, metrics, category, featured }: SuccessStoryProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'border-primary/50 shadow-md' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          {featured && (
            <Badge className="bg-gradient-to-r from-primary to-accent">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* Quote Section */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary/50">
          <Quote className="h-4 w-4 text-primary mb-2" />
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
        
        {/* Author */}
        <div className="flex items-center space-x-3 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.role}, {author.company}</p>
          </div>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-2 bg-muted/30 rounded-lg">
              <div className="text-primary mb-1 flex justify-center">
                {metric.icon}
              </div>
              <p className="text-sm font-semibold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="w-full">
          <ExternalLink className="mr-2 h-3 w-3" />
          Read Full Story
        </Button>
      </CardContent>
    </Card>
  );
}

export function SuccessStories() {
  const stories = [
    {
      title: "AI-Powered Customer Support Revolution",
      description: "TechCorp increased response efficiency by 300% using custom MCP servers",
      quote: "MCP transformed how our AI agents interact with our customer database. What used to take hours now happens in minutes.",
      author: {
        name: "Maria Rodriguez",
        role: "Head of Engineering",
        company: "TechCorp",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      metrics: [
        {
          label: "Faster Response",
          value: "300%",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        {
          label: "Cost Reduction",
          value: "65%",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          label: "Happy Customers",
          value: "95%",
          icon: <Star className="h-4 w-4" />,
        },
      ],
      category: "Enterprise",
      featured: true,
    },
    {
      title: "Open Source Project Management",
      description: "DevFlow built a comprehensive project management system with MCP integration",
      quote: "The MCP ecosystem allowed us to create powerful integrations that would have taken months to build from scratch.",
      author: {
        name: "David Chen",
        role: "CTO",
        company: "DevFlow",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      metrics: [
        {
          label: "Dev Time Saved",
          value: "80%",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        {
          label: "Active Users",
          value: "50K+",
          icon: <Users className="h-4 w-4" />,
        },
        {
          label: "Integrations",
          value: "25",
          icon: <Zap className="h-4 w-4" />,
        },
      ],
      category: "Startup",
    },
    {
      title: "Educational AI Assistant Platform",
      description: "EduTech created personalized learning experiences using MCP servers",
      quote: "MCP enabled us to connect AI tutors with real-time student data and educational resources seamlessly.",
      author: {
        name: "Sarah Kim",
        role: "Product Manager",
        company: "EduTech",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      },
      metrics: [
        {
          label: "Learning Improvement",
          value: "45%",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        {
          label: "Student Satisfaction",
          value: "92%",
          icon: <Star className="h-4 w-4" />,
        },
        {
          label: "Schools Using",
          value: "200+",
          icon: <Users className="h-4 w-4" />,
        },
      ],
      category: "Education",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See how organizations are transforming their AI capabilities with MCP
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <SuccessStoryCard key={index} {...story} />
          ))}
        </div>
        
        {/* Community Impact Stats */}
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Community Impact</h3>
              <p className="text-primary-foreground/90">
                MCP is powering innovation across industries
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-primary-foreground/80">Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">2.5M+</div>
                <div className="text-sm text-primary-foreground/80">API Calls/Day</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">150+</div>
                <div className="text-sm text-primary-foreground/80">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">99.9%</div>
                <div className="text-sm text-primary-foreground/80">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <ExternalLink className="mr-2 h-4 w-4" />
            Submit Your Success Story
          </Button>
        </div>
      </div>
    </section>
  );
}