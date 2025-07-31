"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Github,
  Star,
  MessageCircle,
  Award,
  Users,
  Calendar,
  ExternalLink
} from "lucide-react";

interface ContributorProps {
  name: string;
  username: string;
  avatar: string;
  contributions: number;
  badge: string;
  specialty: string;
}

function ContributorSpotlight({ name, username, avatar, contributions, badge, specialty }: ContributorProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20">
      <CardHeader className="text-center pb-3">
        <Avatar className="mx-auto mb-4 h-16 w-16">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>@{username}</CardDescription>
        <Badge className="mx-auto mt-2 bg-gradient-to-r from-primary to-accent">
          <Award className="mr-1 h-3 w-3" />
          {badge}
        </Badge>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-2 mb-4">
          <p className="text-sm text-muted-foreground">{specialty}</p>
          <p className="text-lg font-semibold">{contributions} contributions</p>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <Github className="mr-2 h-3 w-3" />
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  type: "contribution" | "discussion" | "release";
  title: string;
  description: string;
  author: string;
  time: string;
  engagement: number;
}

function ActivityItem({ type, title, description, author, time, engagement }: ActivityItemProps) {
  const getIcon = () => {
    switch (type) {
      case "contribution":
        return <Github className="h-4 w-4 text-green-500" />;
      case "discussion":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "release":
        return <Star className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
          <span>by {author}</span>
          <span>{time}</span>
          <span className="flex items-center">
            <Star className="mr-1 h-3 w-3" />
            {engagement}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CommunityHighlights() {
  const contributors = [
    {
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      contributions: 342,
      badge: "Top Contributor",
      specialty: "Database Integration Specialist",
    },
    {
      name: "Alex Rivera",
      username: "alexr",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      contributions: 289,
      badge: "Community Champion",
      specialty: "AI Model Integration Expert",
    },
    {
      name: "Jordan Kim",
      username: "jordank",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      contributions: 256,
      badge: "Rising Star",
      specialty: "Frontend & UX Developer",
    },
  ];

  const activities = [
    {
      type: "release" as const,
      title: "MCP File Manager v2.1.0 Released",
      description: "New batch operations and improved performance",
      author: "Sarah Chen",
      time: "2 hours ago",
      engagement: 47,
    },
    {
      type: "discussion" as const,
      title: "Best Practices for MCP Server Authentication",
      description: "Community discussion on security patterns",
      author: "Alex Rivera",
      time: "4 hours ago",
      engagement: 23,
    },
    {
      type: "contribution" as const,
      title: "Added TypeScript Support to Calendar Server",
      description: "Complete type definitions and improved developer experience",
      author: "Jordan Kim",
      time: "6 hours ago",
      engagement: 31,
    },
    {
      type: "release" as const,
      title: "MCP CLI Tools v1.5.0",
      description: "New scaffolding commands and better debugging",
      author: "Community Team",
      time: "1 day ago",
      engagement: 89,
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Community Highlights
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our amazing contributors and stay up to date with the latest community activity
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contributor Spotlights */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="mr-3 h-6 w-6 text-primary" />
              Contributor Spotlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
              {contributors.map((contributor, index) => (
                <ContributorSpotlight key={index} {...contributor} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Contributors
              </Button>
            </div>
          </div>
          
          {/* Community Activity Feed */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-primary" />
              Recent Activity
            </h3>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {activities.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 text-center">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Activity Feed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}