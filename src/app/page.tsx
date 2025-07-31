import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MCP - Stop Building AI Integrations From Scratch',
  description: 'Model Context Protocol simplifies AI integrations with standardized connections, reducing maintenance overhead and vendor lock-in.',
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div style={{ background: 'rgba(0,0,0,0.1)', padding: '8px 16px', borderRadius: '20px', display: 'inline-block', marginBottom: '24px' }}>
            🚀 Solving AI Integration Challenges
          </div>
          <h1>
            Stop Building AI Integrations<br />
            <span style={{ color: '#fbbf24' }}>From Scratch</span>
          </h1>
          <p>
            End the endless cycle of bespoke integrations, maintenance overhead, and vendor lock-in. 
            MCP provides standardized AI connections that just work.
          </p>
          <div>
            <a href="#demo" className="btn btn-primary">
              Solve Your Integration Challenges →
            </a>
            <a href="#calculator" className="btn btn-primary">
              Calculate Your Savings 💰
            </a>
          </div>
          
          {/* Quick Stats */}
          <div className="features-grid" style={{ marginTop: '40px' }}>
            <div className="stat-item">
              <strong>⏱️ 90% Less Integration Time</strong>
            </div>
            <div className="stat-item">
              <strong>🛡️ Enterprise Security</strong>
            </div>
            <div className="stat-item">
              <strong>👥 Growing Ecosystem</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              The AI Integration Nightmare
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Every AI tool requires custom integration work. Your team is drowning in maintenance.
            </p>
          </div>

          <div className="grid">
            <div className="card">
              <h3>⚠️ Bespoke Integrations</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Each AI service requires custom code, documentation deep-dives, and unique authentication flows.
              </p>
              <ul style={{ color: '#6b7280', listStyle: 'none', padding: 0 }}>
                <li>• Weeks of development per integration</li>
                <li>• No code reusability</li>
              </ul>
            </div>

            <div className="card">
              <h3>🔧 Maintenance Overhead</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                API changes break integrations. Security updates require touching every connection.
              </p>
              <ul style={{ color: '#6b7280', listStyle: 'none', padding: 0 }}>
                <li>• Constant breaking changes</li>
                <li>• Technical debt accumulation</li>
              </ul>
            </div>

            <div className="card">
              <h3>🔒 Vendor Lock-in</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Switching providers means rewriting integrations. Your architecture becomes rigid.
              </p>
              <ul style={{ color: '#6b7280', listStyle: 'none', padding: 0 }}>
                <li>• Expensive switching costs</li>
                <li>• Limited negotiating power</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="section bg-gray">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              Before vs After MCP
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              See the dramatic difference MCP makes
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {/* Before */}
            <div className="card" style={{ borderLeft: '4px solid #dc2626' }}>
              <h3 style={{ color: '#dc2626' }}>❌ Without MCP</h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>The current painful reality</p>
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Custom Integration per Service</strong>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>OpenAI, Anthropic, Cohere each need unique code</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Security Complexity</strong>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Different auth methods, credential management</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Maintenance Nightmare</strong>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Breaking changes affect every integration</p>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="card card-success">
              <h3 style={{ color: '#10b981' }}>✅ With MCP</h3>
              <p style={{ color: '#6b7280', marginBottom: '20px' }}>Standardized simplicity</p>
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Universal Interface</strong>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>One API for all AI services</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Built-in Security</strong>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Standardized authentication & encryption</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong>Future-Proof</strong>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Provider changes don&apos;t break your code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Showcase */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              The MCP Solution
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
              Model Context Protocol standardizes AI integrations with a unified interface that scales
            </p>
          </div>

          <div className="grid">
            <div className="card card-success">
              <h3 style={{ color: '#10b981' }}>⚡ Standardization</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                One protocol for all AI services. Write once, connect everywhere.
              </p>
              <ul style={{ color: '#6b7280', listStyle: 'none', padding: 0 }}>
                <li>✓ Unified API interface</li>
                <li>✓ Common data formats</li>
              </ul>
            </div>

            <div className="card card-success">
              <h3 style={{ color: '#10b981' }}>📈 Reusability</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Build integration components once, reuse across projects and teams.
              </p>
              <ul style={{ color: '#6b7280', listStyle: 'none', padding: 0 }}>
                <li>✓ Modular components</li>
                <li>✓ Cross-project compatibility</li>
              </ul>
            </div>

            <div className="card card-success">
              <h3 style={{ color: '#10b981' }}>🌐 Ecosystem</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Growing community of providers and tools built on shared standards.
              </p>
              <ul style={{ color: '#6b7280', listStyle: 'none', padding: 0 }}>
                <li>✓ Community-driven</li>
                <li>✓ Interoperable tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="section bg-gray">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              See MCP in Action
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              Interactive demo showing integration simplification
            </p>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', padding: '40px', marginTop: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <h4>Before: Custom Integration</h4>
                <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '8px', border: '2px solid #dc2626' }}>
                  <pre style={{ fontSize: '0.8rem', color: '#dc2626' }}>{`// OpenAI Integration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  baseURL: 'https://api.openai.com/v1'
});

// Anthropic Integration  
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_KEY,
  baseURL: 'https://api.anthropic.com'
});

// Different APIs, auth, formats...`}</pre>
                </div>
              </div>
              
              <div style={{ fontSize: '2rem' }}>→</div>
              
              <div style={{ textAlign: 'center' }}>
                <h4>After: MCP Protocol</h4>
                <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '2px solid #10b981' }}>
                  <pre style={{ fontSize: '0.8rem', color: '#10b981' }}>{`// Universal MCP Interface
const mcp = new MCPClient();

// Works with any provider
await mcp.connect('openai');
await mcp.connect('anthropic');
await mcp.connect('cohere');

// Same API for all services
const result = await mcp.complete({
  prompt: "Hello world",
  provider: "openai" // or any other
});`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="calculator" className="section">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              Calculate Your Savings
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              See how much time and money MCP saves your team
            </p>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, #f97316, #f59e0b)', borderRadius: '12px', padding: '40px', marginTop: '40px', color: 'white' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
              <div>
                <h3 style={{ fontSize: '3rem', margin: 0 }}>300+</h3>
                <p>Hours Saved per Integration</p>
              </div>
              <div>
                <h3 style={{ fontSize: '3rem', margin: 0 }}>$50K+</h3>
                <p>Cost Savings per Year</p>
              </div>
              <div>
                <h3 style={{ fontSize: '3rem', margin: 0 }}>90%</h3>
                <p>Faster Time to Market</p>
              </div>
              <div>
                <h3 style={{ fontSize: '3rem', margin: 0 }}>75%</h3>
                <p>Reduction in Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gray">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              Success Stories
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              Teams solving their integration challenges with MCP
            </p>
          </div>
          
          <div className="grid">
            <div className="card">
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontStyle: 'italic', color: '#374151' }}>
                  &quot;MCP eliminated 3 months of integration work. We went from 6 different AI APIs to one unified interface.&quot;
                </p>
              </div>
              <div>
                <strong>Sarah Chen</strong>
                <p style={{ color: '#6b7280', margin: 0 }}>CTO, TechStartup Inc.</p>
              </div>
            </div>

            <div className="card">
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontStyle: 'italic', color: '#374151' }}>
                  &quot;No more vendor lock-in fears. We can switch AI providers in minutes, not months.&quot;
                </p>
              </div>
              <div>
                <strong>Marcus Johnson</strong>
                <p style={{ color: '#6b7280', margin: 0 }}>Lead Engineer, DataCorp</p>
              </div>
            </div>

            <div className="card">
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontStyle: 'italic', color: '#374151' }}>
                  &quot;Our maintenance overhead dropped by 75%. The team can focus on features, not integration bugs.&quot;
                </p>
              </div>
              <div>
                <strong>Lisa Rodriguez</strong>
                <p style={{ color: '#6b7280', margin: 0 }}>Product Manager, AI Solutions Ltd.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-step Solution */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              How MCP Solves Your Problems
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>
              A simple 4-step process to integration freedom
            </p>
          </div>
          
          <div style={{ marginTop: '60px' }}>
            <div style={{ display: 'grid', gap: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'center' }}>
                <div style={{ background: '#f97316', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>1</div>
                <div>
                  <h3>Install MCP Client</h3>
                  <p style={{ color: '#6b7280' }}>Add our lightweight SDK to your project. Zero configuration required.</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'center' }}>
                <div style={{ background: '#f97316', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>2</div>
                <div>
                  <h3>Connect Your Providers</h3>
                  <p style={{ color: '#6b7280' }}>Register your AI service credentials once through our secure protocol.</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'center' }}>
                <div style={{ background: '#f97316', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
                <div>
                  <h3>Use Universal API</h3>
                  <p style={{ color: '#6b7280' }}>Call any AI service through our standardized interface. Same code, any provider.</p>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'center' }}>
                <div style={{ background: '#f97316', color: 'white', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>4</div>
                <div>
                  <h3>Scale Effortlessly</h3>
                  <p style={{ color: '#6b7280' }}>Add new providers, features, and integrations without touching existing code.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            Ready to Solve Your Integration Challenges?
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '32px' }}>
            Join thousands of developers who&apos;ve eliminated integration pain with MCP
          </p>
          <div>
            <a href="#success-stories" className="btn btn-primary">
              See Success Stories 👥
            </a>
            <a href="#implementation-guide" className="btn btn-primary">
              Get Implementation Guide →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
