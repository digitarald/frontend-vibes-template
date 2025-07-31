"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, Building, Users, Rocket, Target, Globe, ArrowRight, CheckCircle } from "lucide-react";

interface PartnershipOpportunitiesProps {}

const partnershipTypes = [
  {
    icon: Building,
    title: "Technology Integration",
    description: "Integrate MCP into your existing AI platform and offer enhanced connectivity to your users.",
    benefits: [
      "Joint go-to-market strategy",
      "Technical integration support",
      "Co-branded marketing materials",
      "Revenue sharing opportunities"
    ],
    tier: "Technology Partner",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Rocket,
    title: "Solution Provider",
    description: "Build and sell MCP-powered solutions to enterprise customers with our support and resources.",
    benefits: [
      "Partner enablement program",
      "Sales training and certification",
      "Lead sharing program",
      "Priority technical support"
    ],
    tier: "Solution Partner",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Strategic Alliance",
    description: "Form deep strategic partnerships to shape the future of AI infrastructure and standards.",
    benefits: [
      "Joint product development",
      "Executive-level collaboration",
      "Industry thought leadership",
      "Exclusive partnership terms"
    ],
    tier: "Strategic Partner",
    color: "from-orange-500 to-red-500"
  }
];

const partnerLogos = [
  { name: "TechCorp", logo: "TC" },
  { name: "AI Ventures", logo: "AV" },
  { name: "Cloud Systems", logo: "CS" },
  { name: "DataFlow", logo: "DF" },
  { name: "Neural Networks Inc", logo: "NN" },
  { name: "Future Labs", logo: "FL" }
];

const stats = [
  {
    value: "50+",
    label: "Strategic Partners",
    description: "Leading AI companies"
  },
  {
    value: "$2.5B+",
    label: "Partner Revenue",
    description: "Generated through MCP"
  },
  {
    value: "95%",
    label: "Partner Satisfaction",
    description: "Based on quarterly surveys"
  },
  {
    value: "300%",
    label: "Average ROI",
    description: "For partnership programs"
  }
];

export function PartnershipOpportunities({}: PartnershipOpportunitiesProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 mb-4">
            <Handshake className="w-4 h-4 mr-2" />
            Partnership Opportunities
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Shape the Future{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join forces with leading AI companies to drive innovation, accelerate adoption, and 
            create the next generation of intelligent applications.
          </p>
        </div>
        
        {/* Partnership stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text mb-2">
                {stat.value}
              </div>
              <div className="text-white font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-slate-400 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        
        {/* Partnership types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {partnershipTypes.map((partnership, index) => {
            const Icon = partnership.icon;
            return (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm group h-full">
                <CardHeader>
                  <div className={`p-4 rounded-lg bg-gradient-to-r ${partnership.color}/20 w-fit mb-4`}>
                    <Icon className={`w-8 h-8 text-transparent bg-gradient-to-r ${partnership.color} bg-clip-text`} />
                  </div>
                  
                  <Badge className={`bg-gradient-to-r ${partnership.color}/20 text-transparent bg-gradient-to-r ${partnership.color} bg-clip-text border-0 w-fit mb-3`}>
                    {partnership.tier}
                  </Badge>
                  
                  <CardTitle className="text-white text-xl mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">
                    {partnership.title}
                  </CardTitle>
                  
                  <CardDescription className="text-slate-300 leading-relaxed">
                    {partnership.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-8 flex-1">
                    <h4 className="text-slate-200 font-medium text-sm mb-3">Key Benefits:</h4>
                    {partnership.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-slate-300 text-sm">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-400 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${partnership.color} hover:opacity-90 text-white transition-all duration-300 shadow-lg`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Current partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Trusted by Industry Leaders</h3>
            <p className="text-slate-300">
              Join an ecosystem of innovative companies already leveraging MCP for competitive advantage.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center mb-3 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300">
                  <span className="text-white font-bold text-lg">
                    {partner.logo}
                  </span>
                </div>
                <span className="text-slate-400 text-sm group-hover:text-white transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Partnership process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Partnership Process</h3>
            <p className="text-slate-300">
              A streamlined approach to building successful partnerships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Initial Contact", description: "Submit partnership inquiry and schedule discovery call" },
              { step: "2", title: "Evaluation", description: "Technical and business alignment assessment" },
              { step: "3", title: "Agreement", description: "Partnership terms negotiation and contract signing" },
              { step: "4", title: "Activation", description: "Onboarding, training, and go-to-market planning" }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 opacity-30"></div>
                )}
                
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  {process.step}
                </div>
                
                <h4 className="text-white font-semibold mb-2">{process.title}</h4>
                <p className="text-slate-400 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-8 backdrop-blur-sm border border-green-500/30 max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-green-500/20">
                <Target className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Partner with Us?
            </h3>
            
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
              Let's explore how we can work together to drive innovation, create value, and 
              shape the future of AI infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
              >
                <Handshake className="w-5 h-5 mr-2" />
                Start Partnership Discussion
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-green-400/50 text-green-300 hover:bg-green-500/10 hover:border-green-300 px-8 py-4 text-lg backdrop-blur-sm"
              >
                Download Partner Kit
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button variant="link" className="text-slate-400 hover:text-white">
                Schedule a Call →
              </Button>
              <Button variant="link" className="text-slate-400 hover:text-white">
                View Success Stories →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}