"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Download, 
  ExternalLink, 
  Code, 
  Briefcase, 
  Bot,
  Database,
  FileText,
  Calendar
} from "lucide-react";

interface ServerCardProps {
  name: string;
  description: string;
  category: string;
  stars: number;
  downloads: string;
  icon: React.ReactNode;
  featured?: boolean;
}

function ServerCard({ name, description, category, stars, downloads, icon, featured }: ServerCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? 'border-primary/50 shadow-md' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                {category}
              </Badge>
            </div>
          </div>
          {featured && (
            <Badge className="bg-gradient-to-r from-primary to-accent">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-2">
          {description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="h-4 w-4" />
            <span>{downloads}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <ExternalLink className="mr-2 h-3 w-3" />
            View Server
          </Button>
          <Button size="sm" variant="outline">
            <Code className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function FeaturedServers() {
  const serverCategories = {
    productivity: [
      {
        name: "File Manager Pro",
        description: "Advanced file operations, search, and organization capabilities for AI models",
        category: "Productivity",
        stars: 1247,
        downloads: "45.2K",
        icon: <FileText className="h-4 w-4" />,
        featured: true,
      },
      {
        name: "Calendar Connect",
        description: "Complete calendar integration with scheduling and event management",
        category: "Productivity", 
        stars: 892,
        downloads: "32.1K",
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        name: "Task Master",
        description: "Comprehensive task and project management with team collaboration",
        category: "Productivity",
        stars: 756,
        downloads: "28.5K",
        icon: <Briefcase className="h-4 w-4" />,
      },
    ],
    development: [
      {
        name: "Code Assistant",
        description: "Advanced code analysis, generation, and debugging capabilities",
        category: "Development",
        stars: 1891,
        downloads: "67.3K",
        icon: <Code className="h-4 w-4" />,
        featured: true,
      },
      {
        name: "Database Helper",
        description: "Database query optimization and schema management tools",
        category: "Development",
        stars: 1234,
        downloads: "41.8K",
        icon: <Database className="h-4 w-4" />,
      },
    ],
    ai: [
      {
        name: "AI Model Hub",
        description: "Connect to multiple AI models and compare responses in real-time",
        category: "AI Tools",
        stars: 2145,
        downloads: "89.4K",
        icon: <Bot className="h-4 w-4" />,
        featured: true,
      },
    ],
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Featured MCP Servers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover powerful servers built by our community, organized by category
          </p>
        </div>
        
        <Tabs defaultValue="productivity" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="productivity" className="text-sm">
              <Briefcase className="mr-2 h-4 w-4" />
              Productivity
            </TabsTrigger>
            <TabsTrigger value="development" className="text-sm">
              <Code className="mr-2 h-4 w-4" />
              Development
            </TabsTrigger>
            <TabsTrigger value="ai" className="text-sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Tools
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="productivity">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serverCategories.productivity.map((server, index) => (
                <ServerCard key={index} {...server} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="development">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serverCategories.development.map((server, index) => (
                <ServerCard key={index} {...server} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ai">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serverCategories.ai.map((server, index) => (
                <ServerCard key={index} {...server} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Browse All Servers
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}