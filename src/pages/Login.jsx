import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ChevronRight } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-panel">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>PRAHARI</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Enterprise Network Security Auditor</p>
        </div>

        {error && (
          <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '8px', color: 'var(--danger)', marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group">
            <User size={18} className="input-icon" />
            <input 
              type="text" 
              placeholder="Admin Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '12px' }}>
            Authenticate Session <ChevronRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <p>Protected System Environment. Unauthorized access is strictly prohibited under IT Act, 2000 Sec 70A.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
