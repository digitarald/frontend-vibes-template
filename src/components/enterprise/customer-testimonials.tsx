import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  results: string;
  avatar: string;
}

export function CustomerTestimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "TechCorp Global",
      content: "MCP transformed our AI infrastructure deployment from months to weeks. The standardized approach eliminated vendor lock-in concerns and gave us the flexibility we needed for multi-cloud deployment.",
      rating: 5,
      results: "Reduced deployment time by 75%",
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of AI Architecture",
      company: "Financial Services Inc",
      content: "The security controls and compliance frameworks in MCP met all our banking regulations. SOC 2 certification and zero-trust architecture were exactly what our risk team required.",
      rating: 5,
      results: "100% compliance audit success",
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "VP of Engineering",
      company: "HealthTech Solutions",
      content: "MCP's integration capabilities allowed us to connect our existing tools seamlessly. The Claude enterprise integration was particularly impressive for our healthcare AI applications.",
      rating: 5,
      results: "300% improvement in development velocity",
      avatar: "EW"
    }
  ];

  const caseStudies = [
    {
      company: "Global Bank",
      industry: "Financial Services",
      challenge: "Required HIPAA-compliant AI infrastructure for customer service automation",
      solution: "Implemented MCP with private cloud deployment and customer-managed encryption",
      results: [
        "60% reduction in support ticket resolution time",
        "100% compliance with financial regulations",
        "$2.3M annual cost savings"
      ]
    },
    {
      company: "Manufacturing Giant",
      industry: "Industrial",
      challenge: "Needed to integrate AI across 200+ factory locations with legacy systems",
      solution: "Deployed MCP with on-premises hosting and custom integration adapters",
      results: [
        "85% reduction in quality control errors",
        "40% improvement in production efficiency",
        "18-month ROI achievement"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-slate-700 border-slate-200 bg-slate-50 dark:text-slate-300 dark:border-slate-700 dark:bg-slate-800">
            Customer Success Stories
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Trusted by Enterprise Leaders
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            See how leading enterprises are transforming their AI infrastructure 
            with MCP and achieving measurable business results.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 relative">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}
                      </div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Badge variant="secondary" className="mt-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {testimonial.results}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Detailed Case Studies
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {study.company}
                    </h4>
                    <Badge variant="outline" className="text-slate-600 border-slate-300 dark:text-slate-400 dark:border-slate-600">
                      {study.industry}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Challenge</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {study.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Solution</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {study.solution}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Results</h5>
                      <ul className="space-y-1">
                        {study.results.map((result, i) => (
                          <li key={i} className="text-sm text-green-600 dark:text-green-400 flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mr-2"></div>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Join Industry Leaders</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Over 500+ enterprise customers trust MCP for their AI infrastructure. 
            See why CTOs choose MCP for mission-critical deployments.
          </p>
          <div className="flex justify-center space-x-8">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-blue-200 text-sm">Enterprise Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-blue-200 text-sm">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-blue-200 text-sm">Enterprise Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}