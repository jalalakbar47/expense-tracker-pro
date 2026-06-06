import React from 'react';
import { Menu, Search, Calendar, Bell } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import { getMonthName } from '../../utils/dateFormatter';



const Header = ({ toggleSidebar, theme, setTheme }) => {
  return (
    <header className="header glass">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="header-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search transactions..." />
        </div>
      </div>

      <div className="header-right">
        <div className="current-date">
          <Calendar size={18} />
          <span>{getMonthName()}, {new Date().getFullYear()}</span>
        </div>
        
        <div className="header-actions">
          <button className="icon-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </header>
  );
};

export default Header;
