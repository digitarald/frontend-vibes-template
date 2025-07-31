import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Slack, 
  Github, 
  Cloud, 
  Database, 
  Zap, 
  MessageSquare,
  FileText,
  Users
} from "lucide-react";

export function IntegrationShowcase() {
  const integrations = [
    {
      icon: Slack,
      name: "Slack",
      description: "Deploy AI assistants directly in Slack channels with context-aware responses",
      features: ["Real-time conversations", "Channel context", "Thread management"],
      status: "Available"
    },
    {
      icon: Github,
      name: "GitHub",
      description: "Intelligent code review, documentation generation, and issue analysis",
      features: ["Code analysis", "PR reviews", "Documentation AI"],
      status: "Available"
    },
    {
      icon: Cloud,
      name: "Google Drive",
      description: "Smart document processing and content generation across your workspace",
      features: ["Document analysis", "Content generation", "File organization"],
      status: "Available"
    },
    {
      icon: Database,
      name: "Salesforce",
      description: "AI-powered customer insights and automated data entry",
      features: ["Lead scoring", "Data enrichment", "Workflow automation"],
      status: "Coming Soon"
    },
    {
      icon: MessageSquare,
      name: "Microsoft Teams",
      description: "Seamless AI collaboration within your Microsoft ecosystem",
      features: ["Meeting summaries", "Task automation", "Knowledge base"],
      status: "Available"
    },
    {
      icon: FileText,
      name: "Confluence",
      description: "Intelligent knowledge management and documentation assistance",
      features: ["Content search", "Auto-documentation", "Knowledge synthesis"],
      status: "Available"
    }
  ];

  const architectureFeatures = [
    {
      icon: Zap,
      title: "Unified API Gateway",
      description: "Single integration point for all your enterprise tools and AI models"
    },
    {
      icon: Users,
      title: "Context Sharing",
      description: "Seamless context transfer between applications for consistent AI responses"
    },
    {
      icon: Database,
      title: "Data Persistence",
      description: "Maintain conversation history and learned preferences across platforms"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-700 border-blue-200 bg-blue-50 dark:text-blue-300 dark:border-blue-800 dark:bg-blue-950">
            Enterprise Integrations
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Connect Your Entire Tech Stack
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            MCP integrates with your existing enterprise tools, creating a unified AI experience 
            across your organization. No more siloed AI implementations or vendor lock-in.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <Card key={index} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
                        <IconComponent className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900 dark:text-white">
                          {integration.name}
                        </CardTitle>
                      </div>
                    </div>
                    <Badge 
                      variant={integration.status === "Available" ? "default" : "secondary"}
                      className={
                        integration.status === "Available"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }
                    >
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {integration.description}
                  </p>
                  <div className="space-y-2">
                    {integration.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Architecture Overview */}
        <div className="bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-950 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Unified Integration Architecture
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              MCP provides a standardized protocol that eliminates integration complexity 
              and enables seamless AI functionality across your enterprise applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {architectureFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white dark:bg-slate-700 rounded-lg p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                    <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Why Enterprises Choose MCP
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">No Vendor Lock-in</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Open protocol ensures you&rsquo;re never locked into specific AI providers or platforms
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Standardized Implementation</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Consistent AI behavior across all applications reduces training overhead
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Future-Proof Architecture</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Extensible framework adapts to new AI models and enterprise tools
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">
                Integration Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 dark:text-blue-200">Planning & Setup</span>
                  <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-700">
                    Week 1
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 dark:text-blue-200">Core Integrations</span>
                  <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-700">
                    Week 2-3
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 dark:text-blue-200">Testing & Training</span>
                  <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-700">
                    Week 4
                  </Badge>
                </div>
                <div className="flex justify-between items-center border-t border-blue-200 dark:border-blue-700 pt-4">
                  <span className="font-semibold text-blue-900 dark:text-blue-100">Production Ready</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    1 Month
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}