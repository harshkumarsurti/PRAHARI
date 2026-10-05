import { ShieldAlert, Database, Globe, Network, ServerCrash, XCircle, Shield, Target } from 'lucide-react';
import { useState } from 'react';

const AttackGraph = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [viewMode, setViewMode] = useState('DEFENDER');

  return (
    <div className="animate-fade-in">
      <div className="header">
        <div>
          <h2 className="text-gradient">Attack-Graph Correlation Engine</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Powered by Minimum-Cost Network Hardening Graph Theory (Noel et al.)
          </p>
        </div>
        <div className="header-actions">
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', marginRight: '16px' }}>
            <button 
              style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', background: viewMode === 'DEFENDER' ? 'var(--bg-secondary)' : 'transparent', color: viewMode === 'DEFENDER' ? 'var(--accent-color)' : 'var(--text-secondary)' }}
              onClick={() => setViewMode('DEFENDER')}
            >
              <Shield size={16} /> DEFENDER VIEW
            </button>
            <button 
              style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', background: viewMode === 'ATTACKER' ? 'var(--bg-secondary)' : 'transparent', color: viewMode === 'ATTACKER' ? 'var(--danger)' : 'var(--text-secondary)' }}
              onClick={() => setViewMode('ATTACKER')}
            >
              <Target size={16} /> ATTACKER VIEW
            </button>
          </div>
          
          <button 
            className={isFixed ? "btn-secondary" : "btn-primary"} 
            onClick={() => setIsFixed(!isFixed)}
          >
            {isFixed ? "Reset Topology" : "Simulate Remediation (Sever Path)"}
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '40px', minHeight: '500px', position: 'relative', overflow: 'hidden' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ marginBottom: '8px' }}>{viewMode === 'DEFENDER' ? 'Exploitable Path Analysis' : 'Kill-Chain Analysis (MITRE ATT&CK)'}</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            {viewMode === 'DEFENDER' ? (
              <>Instead of patching 500 minor vulnerabilities, the engine identifies the <strong>Choke Point</strong> (Mgmt VLAN) where a single configuration fix blocks multiple attack vectors to the Crown Jewel database.</>
            ) : (
              <>Visualizing the attack lifecycle from Initial Access (T1190) through Lateral Movement (T1021) to Impact/Data Exfiltration on the Core Database.</>
            )}
          </p>
        </div>

        {/* Graph Container */}
        <div className="graph-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '60px', marginTop: '60px' }}>
          
          {/* Node 1: Internet */}
          <div className="graph-node">
            <Globe size={32} color="var(--text-secondary)" />
            <span>Internet</span>
            {viewMode === 'ATTACKER' && <div className="choke-label" style={{ background: 'var(--danger)', color: '#fff' }}>Threat Source</div>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative' }}>
            {/* Node 2: Edge FW */}
            <div className="graph-node danger-pulse">
              <ShieldAlert size={32} color="var(--danger)" />
              <span>{viewMode === 'DEFENDER' ? 'Edge FW (Exposed SSH)' : 'T1190 - Exploit Public App (SSH)'}</span>
            </div>
            
            {/* Node 3: VPN GW */}
            <div className="graph-node danger-pulse">
              <Network size={32} color="var(--danger)" />
              <span>{viewMode === 'DEFENDER' ? 'VPN Gateway (Weak Cipher)' : 'T1133 - External Remote Services'}</span>
            </div>

            {/* Connecting Lines from Internet */}
            <svg style={{ position: 'absolute', left: '-80px', top: '20px', width: '80px', height: '140px', zIndex: -1 }}>
              <path d="M 0,50 L 80,0" stroke="var(--danger)" strokeWidth="2" fill="none" opacity="0.5" />
              <path d="M 0,50 L 80,120" stroke="var(--danger)" strokeWidth="2" fill="none" opacity="0.5" />
            </svg>
          </div>

          {/* Node 4: Choke Point (Mgmt VLAN) */}
          <div style={{ position: 'relative' }}>
            <div className={`graph-node choke-point ${isFixed ? 'fixed' : ''}`} style={{ transform: 'scale(1.2)' }}>
              {isFixed ? <XCircle size={32} color="var(--success)" /> : <ServerCrash size={32} color="var(--warning)" />}
              <span style={{ fontWeight: 'bold', color: isFixed ? 'var(--success)' : 'var(--warning)' }}>
                {viewMode === 'DEFENDER' ? 'Mgmt VLAN (Choke Point)' : 'T1021 - Lateral Movement (Cleartext)'}
              </span>
              {!isFixed && <div className="choke-label">{viewMode === 'DEFENDER' ? 'Fix This!' : 'Pivoting Point'}</div>}
            </div>

            {/* Connecting Lines from FW & VPN */}
            <svg style={{ position: 'absolute', left: '-80px', top: '20px', width: '80px', height: '140px', zIndex: -1 }}>
              <path d="M 0,-40 L 80,10" stroke={isFixed ? "var(--border-color)" : "var(--danger)"} strokeWidth={isFixed ? "1" : "3"} fill="none" strokeDasharray={isFixed ? "5,5" : "0"} />
              <path d="M 0,80 L 80,30" stroke={isFixed ? "var(--border-color)" : "var(--danger)"} strokeWidth={isFixed ? "1" : "3"} fill="none" strokeDasharray={isFixed ? "5,5" : "0"} />
            </svg>
          </div>

          {/* Node 5: Crown Jewel */}
          <div style={{ position: 'relative' }}>
            <div className="graph-node safe-node" style={{ background: isFixed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
              <Database size={32} color={isFixed ? 'var(--success)' : 'var(--danger)'} />
              <span style={{ color: isFixed ? 'var(--success)' : 'var(--danger)' }}>
                {viewMode === 'DEFENDER' ? 'Core DB (Crown Jewel)' : 'T1422 - Data Impact / Target'}
              </span>
            </div>

            {/* Connecting Line from Choke Point */}
            <svg style={{ position: 'absolute', left: '-80px', top: '20px', width: '80px', height: '20px', zIndex: -1 }}>
              <path d="M 0,20 L 80,20" stroke={isFixed ? "var(--border-color)" : "var(--danger)"} strokeWidth={isFixed ? "1" : "3"} fill="none" strokeDasharray={isFixed ? "5,5" : "0"} />
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AttackGraph;
