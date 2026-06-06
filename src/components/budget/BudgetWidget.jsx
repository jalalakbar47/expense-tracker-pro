import React from 'react';
import { formatCurrency } from '../../utils/dateFormatter';



const BudgetWidget = ({ budget, spent, currency }) => {
  const percentage = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  const remaining = budget - spent;
  const isOverBudget = spent > budget;

  return (
    <div className={`budget-widget animate-fade-in ${isOverBudget ? 'over-budget' : ''}`}>
      <div className="budget-widget-header">
        <h3>Monthly Budget</h3>
        <span className="budget-badge">{Math.min(100, percentage)}% used</span>
      </div>

      <div className="budget-progress-container">
        <div className="budget-stats">
          <div className="stat">
            <span className="label">Spent</span>
            <span className="value">{formatCurrency(spent, currency)}</span>
          </div>
          <div className="stat text-right">
            <span className="label">Budget</span>
            <span className="value">{formatCurrency(budget, currency)}</span>
          </div>
        </div>

        <div className="main-progress-bg">
          <div 
            className="main-progress-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="budget-footer">
          {isOverBudget ? (
            <p className="budget-warning">You are over budget by {formatCurrency(Math.abs(remaining), currency)}!</p>
          ) : (
            <p className="budget-safe">{formatCurrency(remaining, currency)} remaining this month</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetWidget;
