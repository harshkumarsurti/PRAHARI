import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [devices, setDevices] = useState([
    { id: 'FW-edge-01', vendor: 'Fortinet FortiGate', status: 'Normalized', score: 92, framework: 'CIS' },
    { id: 'CORE-SW-02', vendor: 'Cisco Catalyst 9300', status: 'Normalized', score: 88, framework: 'NIST' },
    { id: 'UNK-WHITEBOX-99', vendor: 'SONiC Custom', status: 'Unrecognized Syntax', score: 0, framework: 'Pending' }
  ]);

  const [complianceResults, setComplianceResults] = useState([
    { id: 'CIS-1.1', desc: 'Disable Insecure Protocols (Telnet)', expected: 'telnet-server disable', actual: 'telnet disabled', status: 'PASS' },
    { id: 'CIS-1.2', desc: 'Enforce Strong SSH Version', expected: 'ssh_version 2', actual: 'ssh version 1', status: 'FAIL' },
    { id: 'CIS-2.4', desc: 'Management Interface ACL', expected: 'permit ip mgmt', actual: 'permit ip any', status: 'FAIL' },
    { id: 'CIS-3.1', desc: 'Admin Access Logging', expected: 'logging on', actual: 'logging facility 4', status: 'PARTIAL' }
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    // Mock authentication
    if (username && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  // API call to the Python backend for analysis
  const analyzeConfigFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Backend analysis failed');
      }

      const data = await response.json();
      
      // Update global state with the results from the python backend
      setDevices([data.device, ...devices]);
      setComplianceResults(data.compliance);
      return true;
    } catch (error) {
      console.error("Error analyzing configuration:", error);
      return false;
    }
  };

  return (
    <AppContext.Provider value={{ devices, complianceResults, analyzeConfigFile, isAuthenticated, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
