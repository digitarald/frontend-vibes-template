import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users2, TrendingUp } from "lucide-react";

export function TrustIndicators() {
  const stats = [
    {
      icon: Users2,
      number: "50M+",
      label: "Claude Enterprise Users",
      description: "Active monthly users across enterprise deployments"
    },
    {
      icon: Shield,
      number: "99.9%",
      label: "Security Uptime",
      description: "Guaranteed enterprise SLA with 24/7 monitoring"
    },
    {
      icon: Award,
      number: "SOC 2",
      label: "Type II Certified",
      description: "Comprehensive security and compliance framework"
    },
    {
      icon: TrendingUp,
      number: "300%",
      label: "ROI Average",
      description: "Typical return on investment within 12 months"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-slate-700 border-slate-200 bg-slate-50 dark:text-slate-300 dark:border-slate-700 dark:bg-slate-800">
            Trusted by Enterprise Leaders
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Partnership with Industry Leaders
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            MCP is built in partnership with Anthropic, ensuring enterprise-grade reliability 
            and seamless integration with Claude AI systems.
          </p>
        </div>

        {/* Anthropic Partnership Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl p-8 mb-16 border border-blue-100 dark:border-blue-800">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-3">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold mr-4">
                  Anthropic
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Official Partner
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Built for Claude Enterprise
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Native integration with Claude AI, backed by Anthropic&rsquo;s enterprise support
              </p>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50M+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Claude users worldwide</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Enterprise Logos */}
        <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Trusted by leading enterprises worldwide
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {/* Placeholder for enterprise logos */}
            <div className="bg-slate-200 dark:bg-slate-700 rounded-lg px-6 py-3 text-slate-600 dark:text-slate-400 font-semibold">
              Fortune 500
            </div>
            <div className="bg-slate-200 dark:bg-slate-700 rounded-lg px-6 py-3 text-slate-600 dark:text-slate-400 font-semibold">
              Tech Giants
            </div>
            <div className="bg-slate-200 dark:bg-slate-700 rounded-lg px-6 py-3 text-slate-600 dark:text-slate-400 font-semibold">
              Global Banks
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}