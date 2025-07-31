"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Download, 
  ArrowRight,
  CheckCircle,
  Users,
  Building
} from "lucide-react";
import { format } from "date-fns";

export function DemoBookingCTAs() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    teamSize: "",
    useCase: ""
  });

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.name && formData.email && formData.company && selectedDate && selectedTime;
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-300 dark:border-blue-800 dark:bg-blue-950">
            Get Started with MCP
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Choose Your Path to Enterprise AI Success
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you need a personalized demo, hands-on trial, or detailed implementation guide,
            we have the right option for your enterprise journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary CTA - Enterprise Demo */}
          <Card className="bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-700 relative overflow-hidden lg:col-span-2">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold">
              Most Popular
            </div>
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-white">
                <CalendarIcon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                Schedule Enterprise Demo
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400">
                Get a personalized 45-minute demo tailored to your enterprise requirements
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Work Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleFormChange("company", e.target.value)}
                    placeholder="Acme Corporation"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => handleFormChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cto">CTO</SelectItem>
                      <SelectItem value="vp-engineering">VP Engineering</SelectItem>
                      <SelectItem value="architect">Enterprise Architect</SelectItem>
                      <SelectItem value="ai-lead">AI/ML Lead</SelectItem>
                      <SelectItem value="procurement">IT Procurement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Select Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Select Time *</Label>
                  <Select onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {time} EST
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="useCase">Tell us about your AI use case</Label>
                <Textarea
                  id="useCase"
                  value={formData.useCase}
                  onChange={(e) => handleFormChange("useCase", e.target.value)}
                  placeholder="Describe your current AI challenges and goals..."
                  rows={3}
                />
              </div>

              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!isFormValid()}
              >
                Book Your Enterprise Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex items-center justify-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  No commitment required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  45-minute session
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  Technical Q&A included
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary CTAs */}
          <div className="space-y-6">
            {/* Enterprise Trial */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900 dark:text-white">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Start Enterprise Trial
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  30-day full-feature trial with dedicated support
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Full enterprise features
                  </div>
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Dedicated support team
                  </div>
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Custom integration help
                  </div>
                </div>
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Download Guide */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900 dark:text-white">
                  <Download className="w-5 h-5 mr-2 text-purple-600" />
                  Download Enterprise Guide
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Comprehensive implementation guide and best practices
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <Building className="w-4 h-4 mr-2 text-purple-600" />
                    Architecture blueprints
                  </div>
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <Building className="w-4 h-4 mr-2 text-purple-600" />
                    Security checklists
                  </div>
                  <div className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                    <Building className="w-4 h-4 mr-2 text-purple-600" />
                    ROI calculations
                  </div>
                </div>
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950">
                  Download Guide
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl mx-auto border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Need immediate assistance?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Our enterprise team is available for urgent inquiries and custom requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                📧 enterprise@mcp.ai
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                📞 +1 (555) 123-4567
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                ⏰ Mon-Fri 9AM-6PM EST
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}