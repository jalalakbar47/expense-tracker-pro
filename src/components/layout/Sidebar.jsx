import React from 'react';
import { 
  LayoutDashboard, 
  IndianRupee, 
  BarChart3, 
  Wallet, 
  Settings, 
  X,
  LogOut
} from 'lucide-react';

const Sidebar = ({ isOpen, activePage, setActivePage, toggleSidebar, onLogout, user }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: IndianRupee },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">ET</div>
            <span>Tracker Pro</span>
          </div>
          <button className="mobile-close" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button 
                    className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setActivePage(item.id);
                      if (window.innerWidth <= 768) toggleSidebar();
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          
          <div className="nav-divider"></div>
          
          <button className="nav-item logout-btn" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">{getInitials(user?.fullName || 'User')}</div>
            <div className="user-info">
              <p className="user-name">{user?.fullName || 'User'}</p>
              <p className="user-role">{user?.email || 'Finance Master'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
