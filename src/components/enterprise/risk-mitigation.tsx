import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Unlock, 
  RefreshCw, 
  Scale, 
  Globe, 
  Zap,
  CheckCircle
} from "lucide-react";

export function RiskMitigation() {
  const risks = [
    {
      icon: Unlock,
      title: "Vendor Lock-in Prevention",
      description: "Open protocol design ensures complete portability",
      solutions: [
        "Standards-based architecture prevents vendor dependency",
        "Easy migration between AI providers and platforms",
        "Future-proof design adapts to emerging technologies",
        "Full data export capabilities at any time"
      ]
    },
    {
      icon: Scale,
      title: "Scalability Assurance",
      description: "Enterprise-grade architecture for any scale",
      solutions: [
        "Horizontal scaling for unlimited growth",
        "Multi-region deployment capabilities",
        "Load balancing and auto-scaling features",
        "Performance monitoring and optimization tools"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Security Risk Mitigation",
      description: "Comprehensive security controls and compliance",
      solutions: [
        "Zero-trust security architecture",
        "End-to-end encryption for all data",
        "Regular security audits and penetration testing",
        "Compliance with SOC 2, ISO 27001, and GDPR"
      ]
    },
    {
      icon: RefreshCw,
      title: "Technology Evolution Protection",
      description: "Future-ready architecture for rapid AI advancement",
      solutions: [
        "Model-agnostic design supports any AI provider",
        "Extensible plugin architecture for new capabilities",
        "Backward compatibility guarantee for upgrades",
        "Continuous integration with latest AI developments"
      ]
    }
  ];

  const mitigationStrategies = [
    {
      category: "Technical Risk",
      strategies: [
        "Multi-cloud deployment options",
        "Containerized microservices architecture",
        "API versioning and backward compatibility",
        "Automated testing and validation pipelines"
      ]
    },
    {
      category: "Business Risk",
      strategies: [
        "Transparent pricing with no hidden costs",
        "Service level agreements with penalties",
        "24/7 enterprise support with guaranteed response times",
        "Regular business reviews and optimization sessions"
      ]
    },
    {
      category: "Compliance Risk",
      strategies: [
        "Built-in compliance frameworks and reporting",
        "Data residency controls for regulatory requirements",
        "Audit trails and comprehensive logging",
        "Regular compliance assessments and certifications"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-orange-700 border-orange-200 bg-orange-50 dark:text-orange-300 dark:border-orange-800 dark:bg-orange-950">
            Risk Mitigation & Future-Proofing
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            De-risk Your AI Infrastructure Investment
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            MCP eliminates common enterprise AI risks through open standards, 
            comprehensive security, and future-proof architecture designed for long-term success.
          </p>
        </div>

        {/* Risk Mitigation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {risks.map((risk, index) => {
            const IconComponent = risk.icon;
            return (
              <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900 dark:text-white">
                    <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-2 mr-3">
                      <IconComponent className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    {risk.title}
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400">
                    {risk.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {risk.solutions.map((solution, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {solution}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mitigation Strategies */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Comprehensive Risk Management Framework
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mitigationStrategies.map((category, index) => (
              <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.strategies.map((strategy, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {strategy}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 rounded-full p-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Enterprise Guarantee Program
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              We&rsquo;re so confident in MCP&rsquo;s ability to eliminate vendor lock-in and reduce enterprise 
              risk that we offer comprehensive guarantees backed by our enterprise support team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-blue-200">Data Portability Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-blue-200">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">30-Day</div>
                <div className="text-blue-200">Migration Assistance</div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Multi-region disaster recovery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Real-time performance monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Automatic failover and recovery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Continuous security monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Migration Support */}
        <div className="mt-16 bg-slate-100 dark:bg-slate-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Seamless Migration Support
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our migration team ensures smooth transition from your current AI infrastructure 
              with zero downtime and comprehensive data integrity verification.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Assessment</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Comprehensive analysis of current infrastructure
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Planning</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Detailed migration strategy and timeline
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Migration</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Phased rollout with continuous monitoring
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Validation</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Complete testing and performance verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}