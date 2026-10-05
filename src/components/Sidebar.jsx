import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, ShieldCheck, FileText, Activity, Network, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AppContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Training Module', path: '/training', icon: <BrainCircuit size={20} /> },
    { name: 'Compliance Engine', path: '/compliance', icon: <ShieldCheck size={20} /> },
    { name: 'Attack Graph', path: '/attack-graph', icon: <Network size={20} /> },
    { name: 'Reports', path: '/reports', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="brand">
        <h1>PRAHARI</h1>
      </div>

      <div className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <button 
          onClick={logout} 
          className="nav-item" 
          style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--danger)' }}
        >
          <LogOut size={20} />
          <span>Terminate Session</span>
        </button>

        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Continuous Exposure Loop
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
            <span style={{ fontSize: '0.9rem' }}>System Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
