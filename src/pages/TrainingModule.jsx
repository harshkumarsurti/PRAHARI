import { BrainCircuit, Save, Code, Check } from 'lucide-react';
import { useState } from 'react';

const TrainingModule = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="header">
        <div>
          <h2 className="text-gradient">AI Training Interface</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Map unknown vendor syntax to the Security Baseline Model (No code release needed)
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handleSave}>
            {isSaved ? <Check size={18} /> : <Save size={18} />}
            {isSaved ? 'Heuristics Updated' : 'Update NLP Model'}
          </button>
        </div>
      </div>

      <div className="training-split">
        {/* Left Pane: Raw Unrecognized Config */}
        <div className="training-pane glass-panel" style={{ padding: '24px' }}>
          <div className="pane-header">
            <span>Raw Vendor Config (SONiC White-box)</span>
            <Code size={18} />
          </div>
          <div className="terminal" style={{ flex: 1, marginTop: '16px' }}>
            <span className="comment"># Unrecognized configuration block detected</span><br />
            <br />
            <span className="keyword">system</span> hardware { '{' }<br />
            &nbsp;&nbsp;console { '{' }<br />
            &nbsp;&nbsp;&nbsp;&nbsp;timeout <span className="string">0</span>;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;auth-retries <span className="string">5</span>;<br />
            &nbsp;&nbsp;{ '}' }<br />
            { '}' }<br />
            <br />
            <span className="comment"># AI Confidence Score: Low (Requires Human Mapping)</span>
          </div>
        </div>

        {/* Right Pane: Mapping Interface */}
        <div className="training-pane glass-panel" style={{ padding: '24px' }}>
          <div className="pane-header">
            <span>Map to Security Baseline Model</span>
            <BrainCircuit size={18} />
          </div>
          
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="mapping-card">
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Extracted Parameter: <strong style={{ color: 'var(--text-primary)' }}>timeout 0</strong>
              </label>
              <select style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}>
                <option>Select Baseline Mapping...</option>
                <option selected>Device Admin &gt; Console Timeout</option>
                <option>Device Admin &gt; SSH Timeout</option>
                <option>Network &gt; OSPF Timeout</option>
              </select>
            </div>

            <div className="mapping-card">
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Extracted Parameter: <strong style={{ color: 'var(--text-primary)' }}>auth-retries 5</strong>
              </label>
              <select style={{ width: '100%', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-primary)' }}>
                <option>Select Baseline Mapping...</option>
                <option>Device Admin &gt; Password Complexity</option>
                <option selected>Device Admin &gt; Max Auth Retries</option>
              </select>
            </div>
            
            <div style={{ padding: '16px', background: 'rgba(0, 240, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.1)' }}>
              <h4 style={{ color: 'var(--accent-color)', marginBottom: '8px' }}>AI Learning Loop</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                By mapping these parameters, the NLP engine will internalize the pattern <code>system hardware &#123; console ... &#125;</code> for future SONiC devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;
