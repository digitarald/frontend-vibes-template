"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown, Gift, Users, ArrowRight, Sparkles } from "lucide-react";

interface EarlyAdoptersProps {}

const benefits = [
  {
    icon: Crown,
    title: "Pioneer Status",
    description: "Exclusive recognition as a foundational member of the MCP ecosystem with permanent pioneer badges."
  },
  {
    icon: Zap,
    title: "Priority Access",
    description: "First access to new features, beta releases, and cutting-edge capabilities months before public release."
  },
  {
    icon: Users,
    title: "Direct Influence",
    description: "Shape product development through exclusive feedback channels and quarterly strategy sessions."
  },
  {
    icon: Gift,
    title: "Exclusive Perks",
    description: "Special pricing, dedicated support, premium resources, and invitations to private events."
  },
  {
    icon: Sparkles,
    title: "Innovation Lab",
    description: "Access to experimental features and collaboration opportunities with our research team."
  },
  {
    icon: Star,
    title: "Thought Leadership",
    description: "Co-marketing opportunities, case study features, and speaking opportunities at industry events."
  }
];

const testimonials = [
  {
    quote: "Being an early adopter of MCP has given us a competitive edge in the AI space. The protocol's standardization has accelerated our development by 300%.",
    author: "Sarah Johnson",
    role: "CTO",
    company: "TechVentures Inc",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
  },
  {
    quote: "The early access program allowed us to integrate MCP into our infrastructure before our competitors. The ROI has been phenomenal.",
    author: "Marcus Chen",
    role: "Head of AI",
    company: "NextGen Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
  },
  {
    quote: "MCP's standardized approach to AI connectivity has revolutionized how we build and deploy AI applications. It's the future of AI infrastructure.",
    author: "Elena Rodriguez",
    role: "Engineering Director",
    company: "Innovation Labs",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
  }
];

const tiers = [
  {
    name: "Explorer",
    description: "Perfect for individual developers and small teams",
    price: "Free",
    features: [
      "Basic MCP protocol access",
      "Community support",
      "Standard documentation",
      "Monthly updates"
    ],
    highlighted: false,
    cta: "Get Started"
  },
  {
    name: "Pioneer",
    description: "For serious innovators and growing companies",
    price: "Early Access",
    originalPrice: "$299/mo",
    features: [
      "Everything in Explorer",
      "Priority beta access",
      "Direct feedback channel",
      "Quarterly strategy calls",
      "Pioneer badge & recognition",
      "Premium support"
    ],
    highlighted: true,
    cta: "Join Pioneer Program"
  },
  {
    name: "Visionary",
    description: "For enterprises shaping the future of AI",
    price: "Partnership",
    features: [
      "Everything in Pioneer",
      "Custom integration support",
      "Co-development opportunities",
      "Speaking opportunities",
      "Custom SLAs",
      "Dedicated success manager"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export function EarlyAdopters({}: EarlyAdoptersProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-4">
            <Crown className="w-4 h-4 mr-2" />
            Early Adopter Program
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Exclusive Benefits for{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Pioneers
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join the exclusive community of innovators shaping the future of AI connectivity. 
            Get unprecedented access, influence, and advantages as an early adopter.
          </p>
        </div>
        
        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm group">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500/20 to-red-500/20 w-fit mb-4">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 group-hover:bg-clip-text transition-all duration-300">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Pricing tiers */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Choose Your Pioneer Level</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Select the program that best fits your innovation goals and unlock exclusive benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative ${
                  tier.highlighted 
                    ? 'bg-gradient-to-b from-orange-500/20 to-red-500/20 border-orange-500 scale-105' 
                    : 'bg-slate-800/50 border-slate-700'
                } hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-slate-300 mb-4">
                    {tier.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-white">
                      {tier.price}
                    </div>
                    {tier.originalPrice && (
                      <div className="text-slate-400 line-through text-lg mt-1">
                        {tier.originalPrice}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-300">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      tier.highlighted 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    } text-white transition-all duration-300`}
                    size="lg"
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">What Pioneers Are Saying</h3>
            <p className="text-slate-300">
              Hear from early adopters who are already transforming their businesses with MCP.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-300 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="text-white font-medium">{testimonial.author}</div>
                      <div className="text-slate-400 text-sm">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-8 backdrop-blur-sm border border-orange-500/30 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Pioneer the Future?
            </h3>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
              Join an exclusive community of innovators and get early access to the most advanced AI connectivity protocol ever created.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Crown className="w-5 h-5 mr-2" />
                Become a Pioneer
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-400/50 text-orange-300 hover:bg-orange-500/10 hover:border-orange-300 px-8 py-4 text-lg backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}