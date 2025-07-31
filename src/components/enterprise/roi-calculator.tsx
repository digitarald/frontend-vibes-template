"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Clock } from "lucide-react";

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState([50]);
  const [currentCost, setCurrentCost] = useState(25000);
  const [implementationTime, setImplementationTime] = useState([6]);

  // Calculate savings
  const currentAnnualCost = currentCost * 12;
  const mcpMonthlyCost = (teamSize[0] * 150) + 5000; // $150 per user + $5000 base
  const mcpAnnualCost = mcpMonthlyCost * 12;
  const annualSavings = currentAnnualCost - mcpAnnualCost;
  const implementationSavings = (implementationTime[0] - 2) * 50000; // Save implementation time
  const totalFirstYearSavings = annualSavings + implementationSavings;
  const roi = ((totalFirstYearSavings) / mcpAnnualCost) * 100;

  const benefits = [
    {
      icon: Clock,
      title: "Reduced Implementation Time",
      value: `${implementationTime[0] - 2} months saved`,
      savings: `$${implementationSavings.toLocaleString()}`
    },
    {
      icon: DollarSign,
      title: "Lower Operational Costs",
      value: `${Math.round((annualSavings / currentAnnualCost) * 100)}% reduction`,
      savings: `$${annualSavings.toLocaleString()}/year`
    },
    {
      icon: TrendingUp,
      title: "Developer Productivity",
      value: "40% faster development",
      savings: "$120,000/year"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-300 dark:border-blue-800 dark:bg-blue-950">
            ROI Calculator
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Calculate Your Enterprise Savings
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            See how MCP can reduce costs and accelerate your AI implementation timeline. 
            Enterprise customers typically see 300%+ ROI in the first year.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Inputs */}
          <Card className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <Calculator className="w-5 h-5 mr-2" />
                Your Enterprise Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="team-size" className="text-slate-700 dark:text-slate-300">
                  Team Size: {teamSize[0]} developers
                </Label>
                <Slider
                  id="team-size"
                  min={10}
                  max={500}
                  step={10}
                  value={teamSize}
                  onValueChange={setTeamSize}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>10</span>
                  <span>500+</span>
                </div>
              </div>

              <div>
                <Label htmlFor="current-cost" className="text-slate-700 dark:text-slate-300">
                  Current Monthly AI Infrastructure Cost
                </Label>
                <Input
                  id="current-cost"
                  type="number"
                  value={currentCost}
                  onChange={(e) => setCurrentCost(Number(e.target.value))}
                  className="mt-2"
                  placeholder="25000"
                />
              </div>

              <div>
                <Label htmlFor="implementation-time" className="text-slate-700 dark:text-slate-300">
                  Current Implementation Timeline: {implementationTime[0]} months
                </Label>
                <Slider
                  id="implementation-time"
                  min={3}
                  max={18}
                  step={1}
                  value={implementationTime}
                  onValueChange={setImplementationTime}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>3 months</span>
                  <span>18+ months</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">
                  Your Projected Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      ${totalFirstYearSavings.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      First Year Savings
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {Math.round(roi)}%
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      ROI
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-800 dark:text-blue-200">Current Annual Cost:</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">
                      ${currentAnnualCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800 dark:text-blue-200">MCP Annual Cost:</span>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">
                      ${mcpAnnualCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-blue-200 dark:border-blue-700">
                    <span className="text-blue-800 dark:text-blue-200 font-semibold">Annual Savings:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      ${annualSavings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 dark:bg-green-900 rounded-lg p-2">
                            <IconComponent className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              {benefit.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {benefit.value}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600 dark:text-green-400">
                            {benefit.savings}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            * Calculations based on typical enterprise implementations and industry benchmarks
          </p>
          <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-300 dark:border-blue-800 dark:bg-blue-950">
            Average customer ROI: 300% in first year
          </Badge>
        </div>
      </div>
    </section>
  );
}