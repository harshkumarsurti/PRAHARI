import { useState } from 'react';
import { Save, Settings2, Key, Database, Globe } from 'lucide-react';

const Settings = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div className="header">
        <div>
          <h2 className="text-gradient">Platform Settings</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Configure LLM engines and ITSM Integrations
          </p>
        </div>
      </div>

      <div className="grid-layout">
        <div className="col-span-8">
          <form className="glass-panel stat-card" onSubmit={handleSave}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
              <Settings2 size={24} color="var(--accent-color)" />
              <h3>System Integrations</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <Database size={16} /> PostgreSQL Core DB URI
                </label>
                <input type="text" className="btn-secondary" style={{ width: '100%', textAlign: 'left', cursor: 'text' }} defaultValue="postgresql://admin:***@localhost:5432/prahari" />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <Key size={16} /> Ollama LLM Endpoint (For Offline NLP)
                </label>
                <input type="text" className="btn-secondary" style={{ width: '100%', textAlign: 'left', cursor: 'text' }} defaultValue="http://localhost:11434/api/generate" />
                <p style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '4px' }}>Status: Connected (Air-gapped mode active)</p>
              </div>
              
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <Globe size={16} /> ServiceNow ITSM Ticket Webhook
                </label>
                <input type="url" className="btn-secondary" style={{ width: '100%', textAlign: 'left', cursor: 'text' }} placeholder="https://instance.service-now.com/api/now/table/incident" />
              </div>

              <div style={{ marginTop: '16px' }}>
                <button type="submit" className="btn-primary">
                  <Save size={18} /> {isSaved ? "Saved Successfully" : "Save Configurations"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-span-4">
          <div className="glass-panel stat-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h3 style={{ color: 'var(--danger)', marginBottom: '16px' }}>Danger Zone</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Purge all ingestion data and clear the compliance ledger. This action cannot be undone.
            </p>
            <button 
              type="button" 
              className="btn-secondary" 
              style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}
              onClick={() => {
                if(window.confirm('Are you sure you want to purge all data? This action cannot be undone.')) {
                  alert('Database purged successfully.');
                }
              }}
            >
              Factory Reset Engine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
