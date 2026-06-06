import React from 'react';
import { EXPENSE_CATEGORIES } from '../../data/categories';
import { formatCurrency } from '../../utils/dateFormatter';



const TopCategories = ({ transactions, currency }) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenseTransactions.reduce((acc, curr) => acc + Number(curr.amount), 0);
  
  const categoryTotals = expenseTransactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, amount]) => {
      const category = EXPENSE_CATEGORIES.find(c => c.id === id);
      return {
        id,
        amount,
        label: category?.label || 'Other',
        color: category?.color || '#64748B',
        percentage: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0
      };
    });

  return (
    <div className="top-categories-card animate-fade-in">
      <h3>Top Spending</h3>
      <div className="categories-breakdown">
        {sortedCategories.length === 0 ? (
          <p className="no-data">No expense data available</p>
        ) : (
          sortedCategories.map((cat, index) => (
            <div key={cat.id} className="category-progress-item">
              <div className="category-meta">
                <span className="category-name">{cat.label}</span>
                <span className="category-val">{formatCurrency(cat.amount, currency)}</span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${cat.percentage}%`, 
                    backgroundColor: cat.color 
                  }}
                ></div>
              </div>
              <div className="category-perc">{cat.percentage}% of total</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopCategories;
