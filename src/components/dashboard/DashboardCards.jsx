import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Percent 
} from 'lucide-react';
import { formatCurrency } from '../../utils/dateFormatter';



const DashboardCards = ({ balance, income, expenses, savingsRate, currency }) => {
  const cards = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance, currency),
      icon: <Wallet />,
      color: 'blue',
      trend: balance >= 0 ? 'up' : 'down',
    },
    {
      title: 'Total Income',
      value: formatCurrency(income, currency),
      icon: <TrendingUp />,
      color: 'green',
      trend: 'up',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(expenses, currency),
      icon: <TrendingDown />,
      color: 'red',
      trend: 'down',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: <Percent />,
      color: 'purple',
      trend: savingsRate > 20 ? 'up' : 'neutral',
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div key={index} className={`stat-card stat-card-${card.color} animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="stat-card-header">
            <span className="stat-card-title">{card.title}</span>
            <div className={`stat-card-icon icon-${card.color}`}>{card.icon}</div>
          </div>
          <div className="stat-card-body">
            <h2 className="stat-card-value">{card.value}</h2>
            <div className={`stat-card-trend trend-${card.trend}`}>
              {card.trend === 'up' ? '▲ Positive' : card.trend === 'down' ? '▼ Caution' : '● Stable'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
