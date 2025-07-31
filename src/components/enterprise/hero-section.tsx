"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-300 dark:border-blue-800 dark:bg-blue-950">
            <Shield className="w-3 h-3 mr-1" />
            Enterprise-Grade AI Infrastructure
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8">
            Standardize Your{" "}
            <span className="text-blue-600 dark:text-blue-400">
              AI Infrastructure
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Model Context Protocol (MCP) provides enterprise teams with a unified, 
            secure framework for AI integration. Eliminate vendor lock-in while 
            maintaining complete control over your AI infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Schedule Enterprise Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
              Start Enterprise Trial
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mb-3">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Rapid Deployment</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Production-ready in hours, not months</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mb-3">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Enterprise Security</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">SOC 2 compliant with end-to-end encryption</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mb-3">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Team Scalability</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Support thousands of users seamlessly</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}