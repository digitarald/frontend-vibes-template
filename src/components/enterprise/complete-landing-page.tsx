"use client";

import { useState } from "react";

export default function MCPEnterpriseLandingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [teamSize, setTeamSize] = useState(50);
  const [currentCost, setCurrentCost] = useState(25000);

  // Calculate ROI
  const mcpMonthlyCost = (teamSize * 150) + 5000;
  const mcpAnnualCost = mcpMonthlyCost * 12;
  const currentAnnualCost = currentCost * 12;
  const annualSavings = currentAnnualCost - mcpAnnualCost;
  const roi = Math.round((annualSavings / mcpAnnualCost) * 100);

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg">
              🛡️ Enterprise-Grade AI Infrastructure
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-8">
              Standardize Your{" "}
              <span className="text-blue-600">
                AI Infrastructure
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Model Context Protocol (MCP) provides enterprise teams with a unified, 
              secure framework for AI integration. Eliminate vendor lock-in while 
              maintaining complete control over your AI infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Enterprise Demo →
              </button>
              <button className="px-8 py-4 text-lg font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Start Enterprise Trial
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-3 mb-3 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Rapid Deployment</h3>
                <p className="text-sm text-slate-600">Production-ready in hours, not months</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-3 mb-3 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Enterprise Security</h3>
                <p className="text-sm text-slate-600">SOC 2 compliant with end-to-end encryption</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full p-3 mb-3 w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Team Scalability</h3>
                <p className="text-sm text-slate-600">Support thousands of users seamlessly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg">
              Trusted by Enterprise Leaders
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Partnership with Industry Leaders
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              MCP is built in partnership with Anthropic, ensuring enterprise-grade reliability 
              and seamless integration with Claude AI systems.
            </p>
          </div>

          {/* Anthropic Partnership */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-16 border border-blue-100">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold mr-4">
                    Anthropic
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Official Partner
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Built for Claude Enterprise
                </h3>
                <p className="text-slate-600">
                  Native integration with Claude AI, backed by Anthropic&rsquo;s enterprise support
                </p>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-blue-600">50M+</div>
                <div className="text-sm text-slate-600">Claude users worldwide</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50M+", label: "Claude Enterprise Users", desc: "Active monthly users across enterprise deployments" },
              { number: "99.9%", label: "Security Uptime", desc: "Guaranteed enterprise SLA with 24/7 monitoring" },
              { number: "SOC 2", label: "Type II Certified", desc: "Comprehensive security and compliance framework" },
              { number: "300%", label: "ROI Average", desc: "Typical return on investment within 12 months" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-slate-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-slate-700 mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-slate-600">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg">
              ROI Calculator
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Calculate Your Enterprise Savings
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how MCP can reduce costs and accelerate your AI implementation timeline. 
              Enterprise customers typically see 300%+ ROI in the first year.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Inputs */}
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                🧮 Your Enterprise Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-700 mb-2">
                    Team Size: {teamSize} developers
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>10</span>
                    <span>500+</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">
                    Current Monthly AI Infrastructure Cost
                  </label>
                  <input
                    type="number"
                    value={currentCost}
                    onChange={(e) => setCurrentCost(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                    placeholder="25000"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-6">
                Your Projected Savings
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-2xl font-bold text-blue-900">
                    ${annualSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">
                    Annual Savings
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {roi}%
                  </div>
                  <div className="text-sm text-blue-700">
                    ROI
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-800">Current Annual Cost:</span>
                  <span className="font-semibold text-blue-900">
                    ${currentAnnualCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">MCP Annual Cost:</span>
                  <span className="font-semibold text-blue-900">
                    ${mcpAnnualCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-blue-200">
                  <span className="text-blue-800 font-semibold">Annual Savings:</span>
                  <span className="font-bold text-green-600">
                    ${annualSavings.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking CTAs */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg">
              Get Started with MCP
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Choose Your Path to Enterprise AI Success
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you need a personalized demo, hands-on trial, or detailed implementation guide,
              we have the right option for your enterprise journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary CTA */}
            <div className="lg:col-span-2 bg-white rounded-lg p-8 border border-blue-200 relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                📅 Schedule Enterprise Demo
              </h3>
              <p className="text-slate-600 mb-6">
                Get a personalized 45-minute demo tailored to your enterprise requirements
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="px-4 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Work Email"
                  className="px-4 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Company"
                  className="px-4 py-2 border border-slate-300 rounded-lg"
                />
                <select className="px-4 py-2 border border-slate-300 rounded-lg">
                  <option>Select your role</option>
                  <option>CTO</option>
                  <option>VP Engineering</option>
                  <option>Enterprise Architect</option>
                  <option>AI/ML Lead</option>
                </select>
              </div>

              <button className="w-full px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Book Your Enterprise Demo →
              </button>

              <div className="flex items-center justify-center space-x-6 text-sm text-slate-600 mt-4">
                <div className="flex items-center">
                  <span className="text-green-600 mr-1">✓</span>
                  No commitment required
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-1">✓</span>
                  45-minute session
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-1">✓</span>
                  Technical Q&A included
                </div>
              </div>
            </div>

            {/* Secondary CTAs */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  👥 Start Enterprise Trial
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  30-day full-feature trial with dedicated support
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-slate-700">
                    <span className="text-green-600 mr-2">✓</span>
                    Full enterprise features
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <span className="text-green-600 mr-2">✓</span>
                    Dedicated support team
                  </div>
                </div>
                <button className="w-full px-6 py-3 font-semibold text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  Start Free Trial →
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  📥 Download Enterprise Guide
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Comprehensive implementation guide and best practices
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-slate-700">
                    <span className="text-purple-600 mr-2">📋</span>
                    Architecture blueprints
                  </div>
                  <div className="flex items-center text-sm text-slate-700">
                    <span className="text-purple-600 mr-2">📋</span>
                    Security checklists
                  </div>
                </div>
                <button className="w-full px-6 py-3 font-semibold text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  Download Guide →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}