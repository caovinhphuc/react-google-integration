import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import AlertTest from '../components/AlertTest';
import GoogleDriveTest from '../components/GoogleDriveTest';
import GoogleSheetsTest from '../components/GoogleSheetsTest';
import ReportDashboard from '../components/ReportDashboard';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('sheets');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const tabs = [
    { 
      id: 'sheets', 
      label: '📊 Google Sheets', 
      component: GoogleSheetsTest,
      permission: 'read'
    },
    { 
      id: 'drive', 
      label: '📁 Google Drive', 
      component: GoogleDriveTest,
      permission: 'write'
    },
    { 
      id: 'alerts', 
      label: '🔔 Alerts', 
      component: AlertTest,
      permission: 'manage'
    },
    { 
      id: 'reports', 
      label: '📈 Reports', 
      component: ReportDashboard,
      permission: 'read'
    }
  ];

  const availableTabs = tabs.filter(tab => 
    !tab.permission || AuthService.hasPermission(tab.permission)
  );

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>🏢 React Google Integration</h1>
          <p>Dashboard quản lý tích hợp Google Services</p>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">👋 {user?.fullName || 'User'}</span>
            <span className="user-role">{user?.role || 'user'}</span>
          </div>
          <button 
            className="logout-btn"
            onClick={handleLogout}
            title="Đăng xuất"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <div className="nav-tabs">
          {availableTabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {ActiveComponent && <ActiveComponent />}
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>
            🔒 Logged in as <strong>{user?.email}</strong> | 
            Role: <strong>{user?.role}</strong> | 
            Permissions: <strong>{user?.permissions?.join(', ') || 'none'}</strong>
          </p>
          <p>
            © 2024 React Google Integration | 
            <a href="/docs" target="_blank" rel="noopener noreferrer">📚 Documentation</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
