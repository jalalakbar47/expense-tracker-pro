import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  ArrowUpDown, 
  Plus
} from 'lucide-react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../data/categories';
import Modal from '../components/common/Modal';
import TransactionDetails from '../components/transactions/TransactionDetails';
import TransactionList from '../components/transactions/TransactionList';



const TransactionsPage = ({ transactions, settings, onEdit, onDelete, onAddExpense }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePayment, setActivePayment] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(term) || 
        t.note?.toLowerCase().includes(term) ||
        t.paymentMethod.toLowerCase().includes(term)
      );
    }

    // Type Filter
    if (activeFilter !== 'all') {
      result = result.filter(t => t.type === activeFilter);
    }

    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }

    // Payment Method Filter
    if (activePayment !== 'all') {
      result = result.filter(t => t.paymentMethod === activePayment);
    }

    // Sorting
    switch (sortBy) {
      case 'newest': result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case 'oldest': result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'highest': result.sort((a, b) => b.amount - a.amount); break;
      case 'lowest': result.sort((a, b) => a.amount - b.amount); break;
      case 'az': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'za': result.sort((a, b) => b.title.localeCompare(a.title)); break;
      default: break;
    }

    return result;
  }, [transactions, searchTerm, activeFilter, activeCategory, activePayment, sortBy]);

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div className="header-text">
          <h1>Transactions</h1>
          <p>History of all your incomes and expenses</p>
        </div>
        <button className="primary-btn" onClick={onAddExpense}>
          <Plus size={20} /> Add New
        </button>
      </div>

      <div className="filters-card card">
        <div className="filter-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by title, note, or method..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-groups">
          <div className="filter-group">
            <label><Filter size={14} /> Type</label>
            <select value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="income">Income Only</option>
              <option value="expense">Expense Only</option>
            </select>
          </div>

          <div className="filter-group">
            <label><ArrowUpDown size={14} /> Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <optgroup label="Income">
                {INCOME_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </optgroup>
              <optgroup label="Expense">
                {EXPENSE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <TransactionList 
        transactions={filteredTransactions}
        settings={settings}
        onEdit={onEdit}
        onDelete={onDelete}
        onSelect={setSelectedTransaction}
        searchTerm={searchTerm}
      />

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

export default TransactionsPage;
