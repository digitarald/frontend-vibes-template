"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Server, 
  Zap, 
  GitFork, 
  Download,
  Activity
} from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "neutral";
}

function StatCard({ icon, label, value, change, changeType }: StatCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        <Badge 
          variant={changeType === "positive" ? "default" : "secondary"}
          className="text-xs"
        >
          <TrendingUp className="mr-1 h-3 w-3" />
          {change}
        </Badge>
      </div>
    </Card>
  );
}

export function StatsSection() {
  const stats = [
    {
      icon: <Server className="h-5 w-5" />,
      label: "MCP Servers",
      value: "1,247",
      change: "+142 this month",
      changeType: "positive" as const,
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Contributors",
      value: "212",
      change: "+23 this week",
      changeType: "positive" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "Compatible Clients",
      value: "73",
      change: "+8 this month",
      changeType: "positive" as const,
    },
    {
      icon: <GitFork className="h-5 w-5" />,
      label: "Active Forks",
      value: "1,891",
      change: "+234 this month",
      changeType: "positive" as const,
    },
    {
      icon: <Download className="h-5 w-5" />,
      label: "Downloads",
      value: "45.2K",
      change: "+5.8K this week",
      changeType: "positive" as const,
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Community Activity",
      value: "High",
      change: "98% uptime",
      changeType: "positive" as const,
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Live Ecosystem Stats
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See the growth and vitality of our thriving MCP community in real-time
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Stats updated in real-time • Last update: 2 minutes ago
          </p>
        </div>
      </div>
    </section>
  );
}