import React from 'react';
import {ArrowRight, Receipt} from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/dateFormatter';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/categories';
import * as LucideIcons from 'lucide-react';



const RecentTransactions = ({ transactions, currency, onViewAll, onSelect }) => {
  const recent = transactions.slice(0, 5);

  const getCategoryIcon = (categoryId, type) => {
    const category = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(c => c.id === categoryId);
    if (!category) return <LucideIcons.HelpCircle size={18} />;
    const Icon = LucideIcons[category.icon];
    return <Icon size={18} style={{ color: category.color }} />;
  };

  return (
    <div className="recent-transactions-card animate-fade-in">
      <div className="card-header">
        <h3>Recent Transactions</h3>
        <button className="view-all-btn" onClick={onViewAll}>
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="transactions-list">
        {recent.length === 0 ? (
          <div className="no-transactions">
            <Receipt size={40} />
            <p>No recent activity</p>
          </div>
        ) : (
          recent.map((t) => (
            <div key={t.id} className="transaction-item" onClick={() => onSelect(t)}>
              <div className="item-icon-wrapper">
                {getCategoryIcon(t.category, t.type)}
              </div>
              <div className="item-info">
                <p className="item-title">{t.title}</p>
                <p className="item-date">{formatDate(t.date)}</p>
              </div>
              <div className={`item-amount ${t.type}`}>
                {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount, currency)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
