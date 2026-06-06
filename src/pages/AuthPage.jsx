import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  PlayCircle 
} from 'lucide-react';
import { loginUser, registerUser } from '../utils/localStorage';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    if (!isLogin) {
      if (!formData.fullName) {
        setError('Full name is required');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isLogin) {
        const user = loginUser(formData.email, formData.password);
        onLoginSuccess(user);
      } else {
        const user = registerUser({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        });
        // Auto login after registration
        loginUser(formData.email, formData.password);
        onLoginSuccess(user);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleDemoLogin = () => {
    // Check if demo user exists, if not register it
    try {
      const demoEmail = 'demo@example.com';
      const demoPass = '123456';
      
      try {
        const user = loginUser(demoEmail, demoPass);
        onLoginSuccess(user);
      } catch (e) {
        // Register demo if not exists
        registerUser({
          fullName: 'Demo User',
          email: demoEmail,
          password: demoPass
        });
        const user = loginUser(demoEmail, demoPass);
        onLoginSuccess(user);
      }
    } catch (err) {
      setError('Demo login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-in">
        <div className="auth-header">
          <div className="auth-logo">ET</div>
          <h1 className="auth-title">Expense Tracker Pro</h1>
          <p className="auth-subtitle">Take control of your money.</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                  className="auth-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', background: 'transparent', color: 'var(--text-tertiary)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="auth-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <button type="submit" className="auth-btn">
            {isLogin ? 'Login to Dashboard' : 'Create Professional Account'}
          </button>

          <button type="button" className="demo-btn" onClick={handleDemoLogin}>
            <PlayCircle size={18} /> Try Demo Account
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>Don't have an account? <button className="toggle-auth" onClick={() => setIsLogin(false)}>Register Now</button></p>
          ) : (
            <p>Already have an account? <button className="toggle-auth" onClick={() => setIsLogin(true)}>Login Instead</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
