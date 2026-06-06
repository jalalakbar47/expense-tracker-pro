import React from 'react';
import { Globe, Heart } from 'lucide-react';



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo">
            <div className="logo-icon">ET</div>
            <span>Expense Tracker Pro</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/jalalakbar" target="_blank" rel="noopener noreferrer">
              <Globe size={20} />
            </a>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p className="copyright">© 2026 Jalal Akbar. All rights reserved.</p>
            <p className="version">Expense Tracker Pro • v1.0.0</p>
          </div>
          
          <div className="dedication">
            Created with <Heart size={14} className="heart-icon" /> by <span className="author">Jalal Akbar</span>
            <p className="inspiration">Dedicated To My ❤️ J/S — My Inspiration.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
