import { Upload, Server, ShieldAlert, CheckCircle, Activity, FileWarning, History, ArrowRight, X } from 'lucide-react';
import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isTimeMachineOpen, setIsTimeMachineOpen] = useState(false);
  const { devices, analyzeConfigFile } = useContext(AppContext);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    // Call the FastAPI backend
    const success = await analyzeConfigFile(file);
    
    setIsUploading(false);
    
    if (success) {
      alert('Configuration file ingested and analyzed successfully via Python Backend.');
    } else {
      alert('Error analyzing configuration. Make sure backend is running on port 8000.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const chartData = [
    { name: 'Compliant', value: devices.filter(d => d.score > 80).length },
    { name: 'Partial/Review', value: devices.filter(d => d.score <= 80 && d.score > 40).length },
    { name: 'Non-Compliant', value: devices.filter(d => d.score <= 40).length },
  ];
  const COLORS = ['var(--success)', 'var(--warning)', 'var(--danger)'];

  return (
    <div className="animate-fade-in">
      <div className="header">
        <div>
          <h2 className="text-gradient">Fleet Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Unified Ingestion Engine & Exposure Overview</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setIsTimeMachineOpen(true)} style={{ marginRight: '16px', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}><History size={18} /> Security Time Machine</button>
          <button className="btn-secondary" onClick={() => alert("Fleet rescanning initiated. AI engine validating compliance against latest STIG updates...")}><Activity size={18} /> Rescan Fleet</button>
        </div>
      </div>

      {isTimeMachineOpen && (
        <div className="info-modal-overlay">
          <div className="info-modal glass-panel animate-fade-in" style={{ maxWidth: '1000px' }}>
            <button className="close-btn" onClick={() => setIsTimeMachineOpen(false)}>
              <X size={24} />
            </button>
            <h2 className="text-gradient" style={{ marginBottom: '8px' }}>Security Time Machine</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Configuration versioning and regression detection.</p>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <h4 style={{ color: 'var(--text-secondary)' }}>V1 (Oct 1)</h4>
                <div style={{ fontSize: '1.2rem', color: 'var(--success)', marginTop: '8px' }}>92% Compliant</div>
              </div>
              <ArrowRight size={24} color="var(--text-secondary)" />
              <div style={{ textAlign: 'center', flex: 1 }}>
                <h4 style={{ color: 'var(--text-secondary)' }}>V2 (Oct 3)</h4>
                <div style={{ fontSize: '1.2rem', color: 'var(--danger)', marginTop: '8px' }}>68% Compliant</div>
              </div>
              <ArrowRight size={24} color="var(--text-secondary)" />
              <div style={{ textAlign: 'center', flex: 1, border: '2px solid var(--accent-color)', padding: '12px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)' }}>
                <h4 style={{ color: 'var(--accent-color)' }}>V3 (Current)</h4>
                <div style={{ fontSize: '1.2rem', color: 'var(--danger)', marginTop: '8px' }}>42% Compliant</div>
              </div>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
              <h4 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldAlert size={18} /> SECURITY REGRESSION DETECTED</h4>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem' }}>
                The latest configuration update for FW-edge-01 introduced critical vulnerabilities.
              </p>
            </div>

            <div className="grid-layout">
              <div className="col-span-6">
                <h4 style={{ marginBottom: '12px' }}>Removed Configuration (V2)</h4>
                <div className="terminal" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>
                  - config firewall address<br />
                  - &nbsp;&nbsp;edit "MGMT-SUBNET"<br />
                  - &nbsp;&nbsp;&nbsp;&nbsp;set subnet 10.0.50.0 255.255.255.0
                </div>
              </div>
              <div className="col-span-6">
                <h4 style={{ marginBottom: '12px' }}>Added Configuration (V3)</h4>
                <div className="terminal" style={{ borderColor: 'var(--success)', color: 'var(--success)' }}>
                  + config firewall address<br />
                  + &nbsp;&nbsp;edit "MGMT-SUBNET"<br />
                  + &nbsp;&nbsp;&nbsp;&nbsp;set subnet 0.0.0.0 0.0.0.0
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button className="btn-secondary" onClick={() => setIsTimeMachineOpen(false)}>Close Analysis</button>
              <button className="btn-primary" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => { alert('Configuration V2 restored successfully.'); setIsTimeMachineOpen(false); }}>
                <History size={18} /> Restore to V2 (Safe State)
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid-layout">
        <div className="col-span-8">
          <div className="glass-panel stat-card" style={{ height: '100%' }}>
            <h3 style={{ marginBottom: '16px' }}>Upload Configuration (Any Vendor)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Upload Cisco, Palo Alto, Fortinet, Juniper, or White-box configs. 
              The AI Engine will automatically parse and normalize the data.
            </p>
            <input 
              type="file" 
              accept=".txt,.cfg,.conf" 
              style={{ display: 'none' }} 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <div className="upload-zone" onClick={triggerFileInput}>
              {isUploading ? (
                <div style={{ padding: '24px' }}>
                  <div className="stat-icon" style={{ margin: '0 auto', marginBottom: '16px', background: 'transparent', animation: 'fadeIn 1s infinite alternate' }}>
                    <Activity size={48} />
                  </div>
                  <h3>Processing with NLP Layer...</h3>
                </div>
              ) : (
                <>
                  <Upload className="upload-icon" />
                  <h3 style={{ marginBottom: '8px' }}>Click to Upload Config Files</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Accepts .txt, .cfg, .conf from local device</p>
                </>
              )}
            </div>

            {/* Gartner CTEM Loop */}
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ marginBottom: '16px', textAlign: 'center', fontSize: '1rem', color: 'var(--text-secondary)' }}>Continuous Exposure Management (CTEM) Loop</h3>
              <div className="ctem-container" style={{ padding: '0', borderTop: 'none' }}>
                <div className="ctem-stage active">
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
                  <span style={{ fontSize: '0.8rem' }}>Scope</span>
                </div>
                <div className="ctem-arrow" style={{ marginTop: '8px' }}>→</div>
                <div className="ctem-stage active" style={{ animationDelay: '0.2s' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
                  <span style={{ fontSize: '0.8rem' }}>Discover</span>
                </div>
                <div className="ctem-arrow" style={{ marginTop: '8px' }}>→</div>
                <div className="ctem-stage active" style={{ animationDelay: '0.4s' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
                  <span style={{ fontSize: '0.8rem' }}>Prioritise</span>
                </div>
                <div className="ctem-arrow" style={{ marginTop: '8px' }}>→</div>
                <div className="ctem-stage">
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
                  <span style={{ fontSize: '0.8rem' }}>Validate</span>
                </div>
                <div className="ctem-arrow" style={{ marginTop: '8px' }}>→</div>
                <div className="ctem-stage">
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</div>
                  <span style={{ fontSize: '0.8rem' }}>Mobilise</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel stat-card" style={{ padding: '16px' }}>
             <h3 style={{ marginBottom: '8px', fontSize: '1rem' }}>Fleet Compliance Posture</h3>
             <div style={{ height: '200px' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={chartData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                     stroke="none"
                   >
                     {chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0 16px' }}>
                <div style={{ color: 'var(--success)' }}>Compliant ({chartData[0].value})</div>
                <div style={{ color: 'var(--danger)' }}>Non-Comp ({chartData[2].value})</div>
             </div>
          </div>

          <div className="glass-panel stat-card">
            <div className="stat-icon" style={{ color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)' }}>
              <ShieldAlert size={24} />
            </div>
            <div>
              <div className="stat-value" style={{ color: 'var(--danger)' }}>14</div>
              <div className="stat-label">Critical Attack Paths Identified</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 glass-panel table-container mt-4">
          <h3 style={{ marginBottom: '24px' }}>Recent Ingestions</h3>
          <table>
            <thead>
              <tr>
                <th>Device ID</th>
                <th>Vendor Model</th>
                <th>Status</th>
                <th>Compliance Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, idx) => (
                <tr key={idx}>
                  <td>{device.id}</td>
                  <td>{device.vendor}</td>
                  <td>
                    {device.status === 'Normalized' ? (
                      <span className="status-badge success"><CheckCircle size={14} /> Normalized</span>
                    ) : (
                      <span className="status-badge warning"><FileWarning size={14} /> {device.status}</span>
                    )}
                  </td>
                  <td>
                    {device.framework === 'Pending' ? (
                       <span style={{ color: 'var(--warning)' }}>Pending Training</span>
                    ) : (
                      <span style={{ color: device.score > 80 ? 'var(--success)' : (device.score > 40 ? 'var(--warning)' : 'var(--danger)') }}>
                        {device.score}% ({device.framework})
                      </span>
                    )}
                  </td>
                  <td>
                    {device.framework === 'Pending' ? (
                      <button className="btn-primary" onClick={() => navigate('/training')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Train AI</button>
                    ) : (
                      <button className="btn-secondary" onClick={() => navigate('/reports')} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
