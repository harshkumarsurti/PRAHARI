import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import TrainingModule from './pages/TrainingModule';
import Compliance from './pages/Compliance';
import Reports from './pages/Reports';
import AttackGraph from './pages/AttackGraph';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import { AppProvider, AppContext } from './context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/training" element={<ProtectedRoute><TrainingModule /></ProtectedRoute>} />
          <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
          <Route path="/attack-graph" element={<ProtectedRoute><AttackGraph /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
