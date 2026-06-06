import React from 'react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { getHealthStatus } from '../../utils/calculations';



const HealthScore = ({ score }) => {
  const status = getHealthStatus(score);
  
  const getIcon = () => {
    if (score >= 80) return <ShieldCheck size={32} className="score-icon success" />;
    if (score >= 50) return <Shield size={32} className="score-icon warning" />;
    return <ShieldAlert size={32} className="score-icon danger" />;
  };

  return (
    <div className="health-score-card animate-fade-in">
      <div className="health-score-header">
        <h3>Financial Health</h3>
        {getIcon()}
      </div>
      
      <div className="health-score-body">
        <div className="score-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path className={`circle stroke-${status.toLowerCase()}`}
              strokeDasharray={`${score}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="score-text">
            <span className="score-value">{score}</span>
            <span className="score-total">/100</span>
          </div>
        </div>
        
        <div className="score-info">
          <p className="score-status">Status: <span className={`status-label ${status.toLowerCase()}`}>{status}</span></p>
          <p className="score-desc">
            {score >= 80 ? 'Your financial habits are excellent!' : 
             score >= 50 ? 'You are on the right track, but could save more.' : 
             'Attention needed on your spending habits.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthScore;
