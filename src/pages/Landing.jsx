import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Database, Network, Activity, Cpu, Lock, Globe, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const pipelineSteps = [
  {
    title: 'Config File',
    subtitle: 'Multi-vendor payload ingestion',
    spec: 'Ingests Cisco IOS, Fortinet FortiOS, and White-Box raw configuration payloads via single upload or compressed .zip fleet archives with zip-bomb safeguards.',
    airGapped: true,
    codeLabel: 'EXECUTION CODE / SCHEMA EXCERPT',
    code: `line vty 0 4\n transport input telnet ssh\n login\n snmp-server community public ro`
  },
  {
    title: 'NLP Normalisation',
    subtitle: 'AI-driven schema mapping',
    spec: 'Uses Natural Language Processing to extract proprietary syntax intent and map it to a deterministic, vendor-neutral Security Baseline JSON Schema.',
    airGapped: true,
    codeLabel: 'NORMALIZED JSON OUTPUT',
    code: `{\n  "device_admin": {\n    "ssh_enabled": true,\n    "telnet_enabled": true,\n    "snmp_v2_active": true\n  }\n}`
  },
  {
    title: 'Rule Engine',
    subtitle: 'CIS, NIST & STIG evaluation',
    spec: 'Executes deterministic deviation analysis by comparing the normalized schema against versioned regulatory frameworks. No AI hallucinations; strict rules.',
    airGapped: false,
    codeLabel: 'DEVIATION ANALYSIS LOG',
    code: `[FAIL] CIS-1.1: Disable Insecure Protocols\n       -> Expected: telnet disabled\n       -> Actual: transport input telnet ssh\n[FAIL] NIST-AC-4: Strong SNMP\n       -> Actual: community public ro`
  },
  {
    title: 'Attack Graph',
    subtitle: 'Multi-hop exploit path mapping',
    spec: 'Correlates failed controls onto a cross-device Attack Graph. Executes minimum-hardening logic to identify Choke-Points that collapse multiple vectors.',
    airGapped: false,
    codeLabel: 'GRAPH SOLVER OUTPUT',
    code: `Node: Mgmt_VLAN_Interface\nVulnerability: Clear-text admin access\nImpact: Exposes Core_DB (Crown Jewel)\nRecommendation: Sever path at Edge FW`
  },
  {
    title: 'Audit Ledger',
    subtitle: 'Cryptographic SHA-256 hash',
    spec: 'Generates per-device step-by-step CLI remediation PDFs. Hashes the final audit report into a tamper-evident ledger for non-repudiability.',
    airGapped: false,
    codeLabel: 'LEDGER HASH COMMIT',
    code: `Device: FW-edge-01\nTimestamp: 2026-10-05T20:30:00Z\nIntegrity Hash (SHA-256):\n8f434346648f6b96df89dda901c5...`
  }
];

const PipelineComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="pipeline-container">
      {/* Horizontal Tabs */}
      <div className="pipeline-tabs">
        {pipelineSteps.map((step, index) => (
          <div 
            key={index} 
            className={`pipeline-tab ${activeStep === index ? 'active' : ''}`}
            onClick={() => setActiveStep(index)}
          >
            <div className="step-num">{(index + 1).toString().padStart(2, '0')}</div>
            <div className="step-titles">
              <h4>{step.title}</h4>
              <p>{step.subtitle.length > 20 ? step.subtitle.substring(0, 20) + '...' : step.subtitle}</p>
            </div>
            {activeStep === index && <div className="active-dot"></div>}
          </div>
        ))}
      </div>

      {/* Active Panel */}
      <div className="pipeline-panel glass-panel">
        <div className="panel-header">
          <div className="step-num-large">{(activeStep + 1).toString().padStart(2, '0')}</div>
          <h3>Step {(activeStep + 1).toString().padStart(2, '0')}: {pipelineSteps[activeStep].title} <br/> <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '400' }}>{pipelineSteps[activeStep].subtitle}</span></h3>
        </div>

        <div className="panel-body">
          <div className="panel-left">
            <h5 className="sub-heading">TECHNICAL SPECIFICATION</h5>
            <p className="spec-text">{pipelineSteps[activeStep].spec}</p>
            
            {pipelineSteps[activeStep].airGapped && (
              <div className="air-gapped-badge">
                <CheckCircle2 size={16} />
                <span>Verified 100% Offline Air-Gapped Safe</span>
              </div>
            )}
          </div>
          
          <div className="panel-right">
            <h5 className="sub-heading">{pipelineSteps[activeStep].codeLabel}</h5>
            <div className="terminal">
              {pipelineSteps[activeStep].code.split('\\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    // Simple intersection observer to add animation class on scroll
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-bg"></div>
        <div className="landing-content">
          <h1 className="landing-title">
            <span className="blink-text text-gradient">प्रHARI</span>
          </h1>
          <p className="landing-subtitle">
            AI-Driven Multi-Vendor Network Security Compliance Auditor
          </p>
          <div className="landing-actions">
            <button className="btn-secondary landing-btn" onClick={() => document.getElementById('problem').scrollIntoView({ behavior: 'smooth' })}>
              Explore The Vision
            </button>
            <button className="btn-primary landing-btn" onClick={() => navigate('/login')}>
              Enter Platform <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section id="problem" className="landing-section">
        <div className="section-container animate-on-scroll">
          <div className="section-header text-center">
            <h2 className="text-gradient">The Operational Gap</h2>
            <p>Modern enterprise networks are inherently heterogeneous. Managing compliance manually is failing.</p>
          </div>
          <div className="grid-layout" style={{ marginTop: '48px' }}>
            <div className="col-span-6 glass-panel feature-card">
              <Globe size={40} color="var(--danger)" className="floating-icon" />
              <h3>Syntactic Diversity</h3>
              <p>Each vendor uses proprietary CLI syntax. A 'secure password' setting in a Cisco IOS switch is syntactically distinct from the same setting in a Juniper SRX firewall.</p>
            </div>
            <div className="col-span-6 glass-panel feature-card">
              <Activity size={40} color="var(--warning)" className="floating-icon" />
              <h3>Scalability & Adaptation</h3>
              <p>Traditional parsers fail because they cannot predict or interpret the configuration structures of newly acquired 'White Box' or proprietary hardware.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Architecture Pipeline Section */}
      <section className="landing-section bg-alt" style={{ padding: '100px 24px' }}>
        <div className="section-container animate-on-scroll">
          <div className="section-header text-center" style={{ marginBottom: '48px' }}>
            <h2 className="text-gradient">End-to-End High Assurance Pipeline</h2>
            <p>Explore how raw network configurations flow through our 5-step deterministic evaluation engine.</p>
          </div>
          
          <PipelineComponent />

        </div>
      </section>

      {/* Core Innovation Section */}
      <section className="landing-section">
        <div className="section-container animate-on-scroll">
          <div className="grid-layout" style={{ alignItems: 'center' }}>
            <div className="col-span-6">
              <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Choke-Point Remediation</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Every failed control lands on a cross-device attack graph. Using minimum-cost network-hardening graph theory, PRAHARI identifies the smallest configuration fix set required to collapse the most exploitable paths.
              </p>
              <ul style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Lock color="var(--success)" size={20} /> Fixes ranked by exploitable paths, not severity alone.</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Lock color="var(--success)" size={20} /> Actionable, step-by-step CLI command remediations.</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><Lock color="var(--success)" size={20} /> Tamper-evident, SHA-256 hashed PDF report ledger.</li>
              </ul>
            </div>
            <div className="col-span-6 text-center">
              <div className="glass-panel" style={{ padding: '48px', position: 'relative' }}>
                <Network size={120} color="var(--accent-color)" className="pulse-slow" style={{ margin: '0 auto' }} />
                <div className="orbit-container">
                  <div className="orbit-item"></div>
                  <div className="orbit-item delay-1"></div>
                  <div className="orbit-item delay-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Footer */}
      <section className="landing-hero" style={{ height: '50vh', minHeight: '400px' }}>
        <div className="landing-content animate-on-scroll text-center" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Ready to secure the heterogeneous enterprise?</h2>
          <button className="btn-primary landing-btn" onClick={() => navigate('/login')} style={{ margin: '0 auto' }}>
            Enter The Dashboard <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
