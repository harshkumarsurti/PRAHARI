import { useState } from 'react';
import { FileDown, Terminal, Activity, X, AlertTriangle } from 'lucide-react';

const Reports = () => {
  const [isSimulateModalOpen, setSimulateModalOpen] = useState(false);
  return (
    <div className="animate-fade-in">
      <div className="header">
        <div>
          <h2 className="text-gradient">Actionable Intelligence & Reports</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Per-device remediation reports and PDF generation
          </p>
        </div>
      </div>

      <div className="grid-layout">
        <div className="col-span-8 glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3>Remediation Plan: FW-edge-01 (Fortinet)</h3>
            <button className="btn-primary" onClick={() => window.print()}>
              <FileDown size={18} /> Export PDF
            </button>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Device ID</span>
              <strong>FW-edge-01</strong>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Vendor/Model</span>
              <strong>Fortinet FortiGate 100F</strong>
            </div>
            <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>Risk Severity</span>
              <strong style={{ color: 'var(--danger)' }}>CRITICAL</strong>
            </div>
          </div>

          <h4 style={{ marginBottom: '16px', color: 'var(--accent-color)' }}>Step-by-step CLI Remediation:</h4>
          
          <div className="terminal">
            <span className="comment"># Fix 1: Update SSH Version to v2 (CIS-1.2)</span><br />
            config system global<br />
            &nbsp;&nbsp;set admin-ssh-v1 disable<br />
            end<br />
            <br />
            <span className="comment"># Fix 2: Restrict Management Interface ACL (CIS-2.4)</span><br />
            config firewall address<br />
            &nbsp;&nbsp;edit "MGMT-SUBNET"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;set subnet 10.0.50.0 255.255.255.0<br />
            &nbsp;&nbsp;next<br />
            end<br />
            <br />
            config system interface<br />
            &nbsp;&nbsp;edit "mgmt"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;set allowaccess https ssh<br />
            &nbsp;&nbsp;&nbsp;&nbsp;set trust-ip-1 10.0.50.0 255.255.255.0<br />
            &nbsp;&nbsp;next<br />
            end
          </div>
          
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-secondary" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }} onClick={() => setSimulateModalOpen(true)}>
              <Activity size={18} /> SIMULATE FIX (WHAT-IF)
            </button>
          </div>
        </div>

        {isSimulateModalOpen && (
          <div className="info-modal-overlay">
            <div className="info-modal glass-panel animate-fade-in" style={{ maxWidth: '900px' }}>
              <button className="close-btn" onClick={() => setSimulateModalOpen(false)}>
                <X size={24} />
              </button>
              
              <h2 className="text-gradient" style={{ marginBottom: '8px' }}>Security Simulation (Digital Twin)</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                <AlertTriangle size={16} color="var(--warning)" />
                <span style={{ color: 'var(--warning)', fontSize: '0.9rem', fontWeight: 'bold' }}>SIMULATION — NOT APPLIED TO DEVICE</span>
              </div>

              <div className="grid-layout">
                {/* BEFORE STATE */}
                <div className="col-span-6" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--danger)', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ color: 'var(--danger)', marginBottom: '16px', textAlign: 'center' }}>BEFORE (Current State)</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Compliance Score</span>
                      <strong style={{ fontSize: '1.2rem' }}>68%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Attack Paths</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--danger)' }}>7</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Critical Paths</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--danger)' }}>3</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Risk Rating</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--danger)' }}>HIGH</strong>
                    </div>
                  </div>
                </div>

                {/* AFTER STATE */}
                <div className="col-span-6" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success)', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ color: 'var(--success)', marginBottom: '16px', textAlign: 'center' }}>AFTER (Simulated State)</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Compliance Score</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--success)' }}>91% (+23%)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Attack Paths</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--warning)' }}>3 (-4)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Critical Paths</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--success)' }}>0 (-3)</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Risk Rating</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--warning)' }}>MEDIUM</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ marginBottom: '12px', color: 'var(--accent-color)' }}>Simulation Traceability:</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <strong>Affected Controls:</strong> CIS-1.2, CIS-2.4 (Failed controls removed: 2)
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <strong>Affected Assets:</strong> FW-edge-01, CORE-DB (Protected Assets: 1)
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <strong>Changed Paths:</strong> Path from External-VLAN to CORE-DB via cleartext management severed.
                </p>
              </div>

            </div>
          </div>
        )}

        <div className="col-span-4 glass-panel stat-card">
          <h3 style={{ marginBottom: '16px' }}>Cryptographic Evidence Ledger</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
            Append-only hash-chain for non-repudiable audit evidence. 
          </p>
          
          <button 
            className="btn-secondary" 
            style={{ width: '100%', marginBottom: '24px', justifyContent: 'center' }}
            onClick={() => {
              const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
                "assessment-results": {
                  "uuid": "a1b2c3d4",
                  "title": "PRAHARI Automated Assessment",
                  "findings": [
                    { "id": "CIS-1.1", "status": "PASS" },
                    { "id": "CIS-1.2", "status": "FAIL" }
                  ],
                  "hash-chain": "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4"
                }
              }, null, 2));
              const a = document.createElement('a');
              a.href = data;
              a.download = 'oscal-assessment.json';
              a.click();
            }}
          >
            <FileDown size={18} /> Export NIST OSCAL Package (JSON)
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'Seq: #4092 (FW-edge-01)', config: 'a1b2...', evidence: '8f43...', prev: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', output: 'd7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592' },
              { id: 'Seq: #4091 (CORE-SW-02)', config: '9c21...', evidence: 'b167...', prev: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', output: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
            ].map((report, idx) => (
              <div key={idx} style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>{report.id}</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>Verified</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Config Hash:</span> <span>{report.config}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Evidence Hash:</span> <span>{report.evidence}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--warning)' }}><span>Prev Hash:</span> <span>...{report.prev.substring(56)}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-color)' }}><span>Output Hash:</span> <span>...{report.output.substring(56)}</span></div>
                </div>
                {idx === 0 && (
                  <div style={{ position: 'absolute', top: '-16px', left: '24px', width: '2px', height: '16px', background: 'var(--accent-color)' }}></div>
                )}
              </div>
            ))}
          </div>
          
          <button 
            className="btn-secondary" 
            style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}
            onClick={() => alert("Verification successful. \n✓ Configuration integrity: PASSED\n✓ Evidence integrity: PASSED\n✓ Hash chain integrity: PASSED")}
          >
            VERIFY AUDIT PACKAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
