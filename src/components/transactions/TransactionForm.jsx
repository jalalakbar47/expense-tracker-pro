import React, { useState, useEffect } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../data/categories';



const TransactionForm = ({ onSubmit, initialData, initialType = 'expense' }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: initialType,
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash',
    note: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date.split('T')[0],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset category if type changes
      ...(name === 'type' ? { category: '' } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      return;
    }
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Type</label>
        <div className="type-toggle">
          <button 
            type="button" 
            className={`type-btn income ${formData.type === 'income' ? 'active' : ''}`}
            onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
          >
            Income
          </button>
          <button 
            type="button" 
            className={`type-btn expense ${formData.type === 'expense' ? 'active' : ''}`}
            onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
          >
            Expense
          </button>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group flex-2">
          <label htmlFor="title">Transaction Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Monthly Salary"
            required
          />
        </div>
        <div className="form-group flex-1">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group flex-1">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group flex-1">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="note">Note (Optional)</label>
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add a special note..."
          rows="3"
        ></textarea>
      </div>

      <button type="submit" className="submit-btn">
        {initialData ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
