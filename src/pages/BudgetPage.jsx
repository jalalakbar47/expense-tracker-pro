import React, { useState } from 'react';
import { Wallet, Target, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../utils/dateFormatter';



const BudgetPage = ({ budget, transactions, settings, onUpdateBudget }) => {
  const [newBudget, setNewBudget] = useState(budget.amount || '');
  const currency = settings.currency;

  const expenses = transactions.filter(t => t.type === 'expense');
  const spent = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const percentage = budget.amount > 0 ? Math.min(100, Math.round((spent / budget.amount) * 100)) : 0;
  const isOverBudget = spent > budget.amount && budget.amount > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBudget({ amount: Number(newBudget) });
  };

  return (
    <div className="budget-page animate-fade-in">
      <div className="page-header">
        <div className="header-text">
          <h1>Budget Planner</h1>
          <p>Set and track your monthly spending limits</p>
        </div>
      </div>

      <div className="budget-overview-grid">
        <div className="budget-setup-card card">
          <h3><Target size={20} /> Set Monthly Budget</h3>
          <form onSubmit={handleSubmit} className="budget-form">
            <div className="form-group">
              <label>Monthly Limit ({currency})</label>
              <div className="input-with-symbol">
                <span>{currency === 'PKR' ? 'Rs.' : currency === 'USD' ? '$' : currency}</span>
                <input 
                  type="number" 
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  required
                />
              </div>
            </div>
            <button type="submit" className="primary-btn full-width">Update Budget</button>
          </form>
        </div>

        <div className={`budget-status-detail card ${isOverBudget ? 'status-danger' : 'status-success'}`}>
          <div className="status-header">
            {isOverBudget ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
            <div className="header-info">
              <h3>{isOverBudget ? 'Over Budget' : 'Within Budget'}</h3>
              <p>{isOverBudget ? "You've exceeded your limit!" : "You're managing well this month."}</p>
            </div>
          </div>
          
          <div className="status-metrics">
            <div className="status-metric">
              <label>Limit</label>
              <p>{formatCurrency(budget.amount || 0, currency)}</p>
            </div>
            <div className="status-metric">
              <label>Spent</label>
              <p>{formatCurrency(spent, currency)}</p>
            </div>
            <div className="status-metric">
              <label>Remaining</label>
              <p>{formatCurrency(Math.max(0, budget.amount - spent), currency)}</p>
            </div>
          </div>

          <div className="big-progress-container">
            <div className="progress-label">
              <span>{spent > budget.amount ? 'Budget Exhausted' : 'Budget Usage'}</span>
              <span>{percentage}%</span>
            </div>
            <div className="progress-bar-bg-large">
              <div 
                className={`progress-bar-fill-large ${isOverBudget ? 'bg-danger' : 'bg-primary'}`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
