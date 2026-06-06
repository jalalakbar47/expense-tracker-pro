import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BudgetPage from './pages/BudgetPage';
import SettingsPage from './pages/SettingsPage';
import Modal from './components/common/Modal';
import TransactionForm from './components/transactions/TransactionForm';
import Toast from './components/common/Toast';
import AuthPage from './pages/AuthPage';
import { 
  getTransactions, 
  saveTransactions, 
  getBudget, 
  saveBudget, 
  getSettings, 
  saveSettings,
  getTheme,
  saveTheme,
  getCurrentUser,
  logoutUser
} from './utils/localStorage';
import { SAMPLE_TRANSACTIONS } from './data/sampleData';

const App = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState({ amount: 0 });
  const [settings, setSettings] = useState({ currency: 'PKR' });
  const [theme, setTheme] = useState('light');
  const [toasts, setToasts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', type: null, data: null });

  // Initial Load - runs when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const savedTransactions = getTransactions();
      const savedTheme = getTheme();
      const savedSettings = getSettings();
      const savedBudget = getBudget();

      if (savedTransactions.length === 0) {
        setTransactions(SAMPLE_TRANSACTIONS);
        saveTransactions(SAMPLE_TRANSACTIONS);
      } else {
        setTransactions(savedTransactions);
      }

      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      setSettings(savedSettings);
      setBudget(savedBudget);
    }
  }, [currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    setTransactions([]);
    setBudget({ amount: 0 });
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTransactions = (newTransactions) => {
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const openFormModal = (type = 'expense', data = null) => {
    setModalConfig({ 
      title: data ? 'Edit Transaction' : `Add ${type === 'income' ? 'Income' : 'Expense'}`, 
      type: 'form', 
      data,
      initialType: type 
    });
    setIsModalOpen(true);
  };

  const handleTransactionSubmit = (formData) => {
    let newTransactions;
    if (modalConfig.data) {
      // Edit
      newTransactions = transactions.map(t => 
        t.id === modalConfig.data.id ? { ...formData, updatedAt: new Date().toISOString() } : t
      );
      addToast('Transaction updated successfully');
    } else {
      // Add
      const newTransaction = {
        ...formData,
        id: `t-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      newTransactions = [newTransaction, ...transactions];
      addToast('Transaction added successfully');
    }
    handleUpdateTransactions(newTransactions);
    setIsModalOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    const newTransactions = transactions.filter(t => t.id !== id);
    handleUpdateTransactions(newTransactions);
    addToast('Transaction deleted', 'info');
    setIsModalOpen(false);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const renderPage = () => {
    const commonProps = {
      transactions,
      budget,
      settings,
      onUpdateTransactions: handleUpdateTransactions,
      onAddIncome: () => openFormModal('income'),
      onAddExpense: () => openFormModal('expense'),
      onSetBudget: () => setActivePage('budget'),
      onDelete: handleDeleteTransaction,
      onEdit: (t) => openFormModal(t.type, t),
    };

    switch (activePage) {
      case 'dashboard': return <DashboardPage {...commonProps} onViewAll={() => setActivePage('transactions')} />;
      case 'transactions': return <TransactionsPage {...commonProps} />;
      case 'analytics': return <AnalyticsPage {...commonProps} />;
      case 'budget': return <BudgetPage {...commonProps} onUpdateBudget={(b) => { setBudget(b); saveBudget(b); addToast('Budget updated'); }} />;
      case 'settings': return <SettingsPage 
        {...commonProps} 
        onUpdateSettings={(s) => { setSettings(s); saveSettings(s); addToast('Settings saved'); }}
        onReset={() => { setTransactions([]); saveTransactions([]); addToast('Data reset', 'warning'); }}
        onImport={() => { /* Handled in component */ }}
      />;
      default: return <DashboardPage {...commonProps} />;
    }
  };

  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={isSidebarOpen} 
        activePage={activePage} 
        setActivePage={setActivePage} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        onLogout={handleLogout}
        user={currentUser}
      />
      
      <main className="main-content">
        <Header 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          theme={theme} 
          setTheme={handleThemeChange} 
        />
        
        <div className="page-wrapper">
          {renderPage()}
        </div>
        
        <Footer />
      </main>

      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            {...toast} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalConfig.title}
      >
        {modalConfig.type === 'form' && (
          <TransactionForm 
            onSubmit={handleTransactionSubmit} 
            initialData={modalConfig.data}
            initialType={modalConfig.initialType}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
