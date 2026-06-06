import React from 'react';
import { PlusCircle, MinusCircle, Wallet, Download } from 'lucide-react';



const QuickActions = ({ onAddIncome, onAddExpense, onSetBudget, onExport }) => {
  const actions = [
    { label: 'Add Income', icon: <PlusCircle size={20} />, onClick: onAddIncome, type: 'income' },
    { label: 'Add Expense', icon: <MinusCircle size={20} />, onClick: onAddExpense, type: 'expense' },
    { label: 'Set Budget', icon: <Wallet size={20} />, onClick: onSetBudget, type: 'budget' },
    { label: 'Export CSV', icon: <Download size={20} />, onClick: onExport, type: 'export' },
  ];

  return (
    <div className="quick-actions-container">
      <h3 className="section-title">Quick Actions</h3>
      <div className="quick-actions-grid">
        {actions.map((action, index) => (
          <button 
            key={index} 
            className={`action-btn action-${action.type}`}
            onClick={action.onClick}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
