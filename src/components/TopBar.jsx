import { ShieldCheck, Plus, WifiOff } from 'lucide-react';

const TopBar = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '16px 32px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      gap: '24px'
    }}>
      
      {/* Air-Gapped Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.05)',
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.1)',
        fontSize: '0.85rem',
        fontWeight: '500',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)' }}></div>
        <WifiOff size={16} color="var(--success)" />
        <span style={{ color: 'var(--text-primary)' }}>AIR-GAPPED</span>
      </div>

      {/* New Audit Button */}
      <button 
        className="btn-primary" 
        style={{ padding: '8px 20px', borderRadius: '20px' }}
        onClick={() => alert("Please upload a new configuration file in the Dashboard to initiate a new Audit.")}
      >
        <Plus size={18} /> NEW AUDIT
      </button>

      {/* Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--border-color)', paddingLeft: '24px' }}>
        <div style={{ width: '36px', height: '36px', background: 'rgba(0, 240, 255, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)', fontWeight: 'bold' }}>
          PR
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Power Rangers1</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Security Analyst</span>
        </div>
      </div>
      
    </div>
  );
};

export default TopBar;
