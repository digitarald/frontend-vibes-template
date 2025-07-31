import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, FileCheck, Server, UserCheck } from "lucide-react";

export function SecurityCompliance() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "SOC 2 Type II Certified",
      description: "Comprehensive annual audits ensuring the highest standards of security controls and data protection."
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data encrypted in transit and at rest using AES-256 encryption with customer-managed keys."
    },
    {
      icon: Eye,
      title: "Zero Trust Architecture",
      description: "Every request is verified and authenticated, ensuring no implicit trust within the network."
    },
    {
      icon: FileCheck,
      title: "GDPR & CCPA Compliant",
      description: "Full compliance with global data protection regulations including data residency requirements."
    },
    {
      icon: Server,
      title: "Private Cloud Deployment",
      description: "Deploy MCP in your own VPC or on-premises environment for maximum data control."
    },
    {
      icon: UserCheck,
      title: "Advanced Access Controls",
      description: "Role-based permissions, SSO integration, and multi-factor authentication support."
    }
  ];

  const certifications = [
    { name: "SOC 2 Type II", status: "Certified" },
    { name: "ISO 27001", status: "Certified" },
    { name: "GDPR", status: "Compliant" },
    { name: "CCPA", status: "Compliant" },
    { name: "HIPAA", status: "Ready" },
    { name: "FedRAMP", status: "In Progress" }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-green-700 border-green-200 bg-green-50 dark:text-green-300 dark:border-green-800 dark:bg-green-950">
            Enterprise Security & Compliance
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Security Built for Enterprise Scale
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            MCP meets the most stringent enterprise security requirements with comprehensive 
            compliance frameworks and advanced security controls designed for mission-critical workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Security Features
            </h3>
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900 rounded-lg p-2 flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              Compliance & Certifications
            </h3>
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900 dark:text-white">
                  Current Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700 last:border-b-0">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {cert.name}
                      </span>
                      <Badge 
                        variant={cert.status === "Certified" || cert.status === "Compliant" ? "default" : "secondary"}
                        className={
                          cert.status === "Certified" || cert.status === "Compliant"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        }
                      >
                        {cert.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                    24/7 Security Monitoring
                  </h4>
                </div>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Round-the-clock threat detection and incident response with 
                  dedicated security operations center and real-time alerting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Promise */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Enterprise Security Promise
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Your data never leaves your control. With on-premises deployment options 
            and customer-managed encryption keys, you maintain complete sovereignty 
            over your AI infrastructure.
          </p>
          <Badge variant="outline" className="text-green-300 border-green-400 bg-green-950">
            Zero Data Retention Policy
          </Badge>
        </div>
      </div>
    </section>
  );
}