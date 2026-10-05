import { ShieldCheck, Crosshair, AlertTriangle } from 'lucide-react';
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Compliance = () => {
  const [framework, setFramework] = useState('CIS Benchmarks');
  const [selectedFinding, setSelectedFinding] = useState(null);
  const { complianceResults } = useContext(AppContext);

  return (
    <div className="animate-fade-in">
      <div className="header">
        <div>
          <h2 className="text-gradient">Multi-Framework Compliance Engine</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Deviation analysis based on selected security standards
          </p>
        </div>
        <div className="header-actions">
          <select 
            className="btn-secondary" 
            style={{ padding: '10px' }}
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
          >
            <option>CIS Benchmarks</option>
            <option>NIST SP 800-53</option>
            <option>DISA STIGs</option>
            <option>ISO/IEC 27001</option>
          </select>
        </div>
      </div>

      <div className="grid-layout">
        <div className="col-span-12 glass-panel stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div className="stat-icon"><Crosshair size={24} /></div>
            <div>
              <h3 style={{ fontSize: '1.2rem' }}>Currently Evaluating: {framework}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Deviation Engine checking against baseline rules...</p>
            </div>
          </div>
          
          <table style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <thead>
              <tr>
                <th>Rule ID</th>
                <th>Description</th>
                <th>Expected (Framework)</th>
                <th>Actual (Extracted)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complianceResults.map((result, idx) => (
                <tr 
                  key={idx} 
                  onClick={() => setSelectedFinding(result)}
                  style={{ cursor: 'pointer', background: selectedFinding?.id === result.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent' }}
                  className="hover-bg"
                >
                  <td>{framework === 'CIS Benchmarks' ? result.id : (framework === 'NIST SP 800-53' ? 'AC/SC-Rule' : 'STIG-Rule')}</td>
                  <td>{result.desc}</td>
                  <td><code>{result.expected}</code></td>
                  <td><code>{result.actual}</code></td>
                  <td>
                    <span className={`status-badge ${result.status === 'PASS' ? 'success' : (result.status === 'FAIL' ? 'danger' : 'warning')}`}>
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedFinding && (
            <div className="glass-panel animate-fade-in" style={{ marginTop: '32px', padding: '24px', border: '1px solid var(--accent-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                <h3 style={{ color: 'var(--accent-color)' }}>Evidence Explorer: Traceability Chain</h3>
                <span className={`status-badge ${selectedFinding.status === 'PASS' ? 'success' : (selectedFinding.status === 'FAIL' ? 'danger' : 'warning')}`}>{selectedFinding.status}</span>
              </div>
              
              <div className="grid-layout">
                <div className="col-span-6">
                  <h5 className="sub-heading" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>1. Raw Configuration Evidence</h5>
                  <div className="terminal" style={{ fontSize: '0.8rem', padding: '12px', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                    {selectedFinding.id === 'CIS-1.1' ? "line vty 0 4\n transport input telnet ssh" : 
                     selectedFinding.id === 'CIS-1.2' ? "ip ssh version 1" : "logging facility 4"}
                  </div>
                  
                  <h5 className="sub-heading" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>2. AI Normalization (Confidence: 98%)</h5>
                  <div className="terminal" style={{ fontSize: '0.8rem', padding: '12px', background: 'rgba(0,0,0,0.5)', whiteSpace: 'pre-wrap' }}>
                    {`{\n  "intent": "${selectedFinding.desc}",\n  "value": "${selectedFinding.actual}"\n}`}
                  </div>
                </div>

                <div className="col-span-6" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <h5 className="sub-heading" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>3. Deterministic Verdict</h5>
                    <p style={{ fontSize: '0.9rem' }}>
                      Rule Engine asserts: <strong>{selectedFinding.actual}</strong> 
                      {selectedFinding.status === 'PASS' ? " strictly matches required " : " does not strictly match required "} 
                      <strong>{selectedFinding.expected}</strong>.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="sub-heading" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>4. Attack Path Correlation</h5>
                    <p style={{ fontSize: '0.9rem', color: selectedFinding.status === 'FAIL' ? 'var(--danger)' : 'var(--success)' }}>
                      {selectedFinding.status === 'FAIL' ? "Exposes clear-text credential interception vector leading to Core DB." : "Path secured."}
                    </p>
                  </div>

                  <div>
                    <h5 className="sub-heading" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>5. Recommended Remediation</h5>
                    <div className="terminal" style={{ fontSize: '0.8rem', padding: '12px', borderColor: 'var(--success)', whiteSpace: 'pre-wrap' }}>
                      {selectedFinding.status === 'PASS' ? "No remediation required." : 
                       (selectedFinding.id === 'CIS-1.1' ? "transport input ssh\nno transport input telnet" : "Apply strict ACLs")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', display: 'flex', gap: '16px' }}>
            <AlertTriangle color="var(--danger)" />
            <div>
              <h4 style={{ color: 'var(--danger)', marginBottom: '4px' }}>Choke-Point Remediation Required</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Attack-graph correlation shows that exposed vulnerabilities combined allow unauthorized database access. 
                Fixing the Mgmt ACL collapses both attack paths.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
