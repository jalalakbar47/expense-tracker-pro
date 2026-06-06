import React, { useState } from 'react';
import DashboardCards from '../components/dashboard/DashboardCards';
import HealthScore from '../components/dashboard/HealthScore';
import QuickActions from '../components/dashboard/QuickActions';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TopCategories from '../components/dashboard/TopCategories';
import BudgetWidget from '../components/budget/BudgetWidget';
import Modal from '../components/common/Modal';
import TransactionDetails from '../components/transactions/TransactionDetails';
import { 
  calculateBalance, 
  calculateTotalIncome, 
  calculateTotalExpenses, 
  calculateSavingsRate,
  calculateHealthScore 
} from '../utils/calculations';
import { exportToCSV } from '../utils/csvExport';



const DashboardPage = ({ 
  transactions, 
  budget, 
  settings, 
  onAddIncome, 
  onAddExpense, 
  onSetBudget, 
  onViewAll,
  onEdit,
  onDelete
}) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const balance = calculateBalance(transactions);
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  const savingsRate = calculateSavingsRate(income, expenses);
  const healthScore = calculateHealthScore(income, expenses, budget);

  const handleExport = () => {
    exportToCSV(transactions, settings.currency);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header animate-slide-in">
        <div className="welcome-text">
          <h1>Finance Overview</h1>
          <p>Welcome back, {settings.userName || 'Finance Master'}. Here's what's happening with your money.</p>
        </div>
      </div>

      <DashboardCards 
        balance={balance} 
        income={income} 
        expenses={expenses} 
        savingsRate={savingsRate}
        currency={settings.currency}
      />

      <div className="dashboard-grid">
        <div className="grid-left">
          <HealthScore score={healthScore} />
          <QuickActions 
            onAddIncome={onAddIncome}
            onAddExpense={onAddExpense}
            onSetBudget={onSetBudget}
            onExport={handleExport}
          />
          <RecentTransactions 
            transactions={transactions} 
            currency={settings.currency}
            onViewAll={onViewAll}
            onSelect={setSelectedTransaction}
          />
        </div>
        
        <div className="grid-right">
          <BudgetWidget 
            budget={budget.amount} 
            spent={expenses} 
            currency={settings.currency} 
          />
          <TopCategories 
            transactions={transactions} 
            currency={settings.currency} 
          />
        </div>
      </div>

      <Modal 
        isOpen={!!selectedTransaction} 
        onClose={() => setSelectedTransaction(null)} 
        title="Transaction Details"
      >
        <TransactionDetails 
          transaction={selectedTransaction}
          currency={settings.currency}
          onEdit={(t) => {
            setSelectedTransaction(null);
            onEdit(t);
          }}
          onDelete={(id) => {
            setSelectedTransaction(null);
            onDelete(id);
          }}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
