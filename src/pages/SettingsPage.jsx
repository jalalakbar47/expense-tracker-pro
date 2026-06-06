import React, { useRef } from 'react';
import { 
  Globe, 
  Trash2, 
  Download, 
  Upload, 
  Palette, 
  RefreshCw,
  Coins
} from 'lucide-react';
import { CURRENCIES } from '../data/categories';
import { exportBackup, importBackup } from '../utils/localStorage';



const SettingsPage = ({ settings, onUpdateSettings, onAddExpense, onReset }) => {
  const fileInputRef = useRef(null);

  const handleCurrencyChange = (e) => {
    onUpdateSettings({ ...settings, currency: e.target.value });
  };

  const handleExportBackup = () => {
    exportBackup();
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await importBackup(file);
        window.location.reload(); // Reload to apply imported data
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to delete all transactions and settings? This cannot be undone.')) {
      onReset();
    }
  };

  const handleClearSampleData = () => {
    // Logic to clear specifically sample transactions
    // In this app, we'll just refer to onReset as sample data is stored in the same place
    onReset();
  };

  return (
    <div className="settings-page animate-fade-in">
      <div className="page-header">
        <div className="header-text">
          <h1>Settings</h1>
          <p>Personalize your experience and manage your data</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Profile */}
        <section className="settings-section card">
          <div className="section-header">
            <Globe size={20} />
            <h3>Profile</h3>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <label>Your Name</label>
              <p>How should we address you in the dashboard?</p>
            </div>
            <input 
              type="text" 
              value={settings.userName || ''} 
              onChange={(e) => onUpdateSettings({ ...settings, userName: e.target.value })}
              className="setting-input"
              placeholder="Enter your name"
            />
          </div>
        </section>

        {/* Localization */}
        <section className="settings-section card">
          <div className="section-header">
            <Coins size={20} />
            <h3>Localization</h3>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <label>Currency</label>
              <p>Select your preferred currency for display</p>
            </div>
            <select value={settings.currency} onChange={handleCurrencyChange} className="setting-select">
              {CURRENCIES.map(curr => (
                <option key={curr.code} value={curr.code}>{curr.code} - {curr.label}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Appearance */}
        <section className="settings-section card">
          <div className="section-header">
            <Palette size={20} />
            <h3>Appearance</h3>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <label>Theme</label>
              <p>Choose between light and dark mode</p>
            </div>
            <div className="theme-options">
              {/* Theme is controlled via Header/Sidebar button, showing status here */}
              <p className="theme-status">Theme is controlled in the header toggle.</p>
            </div>
          </div>
        </section>

        {/* Backup & Restore */}
        <section className="settings-section card">
          <div className="section-header">
            <RefreshCw size={20} />
            <h3>Data Management</h3>
          </div>
          <div className="data-actions-grid">
            <button className="data-btn export" onClick={handleExportBackup}>
              <Download size={18} />
              <span>Export Backup (JSON)</span>
            </button>
            <button className="data-btn import" onClick={handleImportClick}>
              <Upload size={18} />
              <span>Import Backup (JSON)</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
                accept=".json"
              />
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="settings-section card danger-zone">
          <div className="section-header">
            <Trash2 size={20} />
            <h3>Danger Zone</h3>
          </div>
          <div className="danger-actions">
            <div className="danger-item">
              <div className="danger-info">
                <label>Clear Sample Data</label>
                <p>Remove the pre-filled sample transactions</p>
              </div>
              <button className="danger-btn outline" onClick={handleClearSampleData}>Clear Samples</button>
            </div>
            <div className="danger-item">
              <div className="danger-info">
                <label>Reset All Data</label>
                <p>Erase everything and start fresh</p>
              </div>
              <button className="danger-btn" onClick={handleResetData}>Reset Factory</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
