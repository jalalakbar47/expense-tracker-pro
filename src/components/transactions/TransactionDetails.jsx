import React from 'react';
import { 
  Calendar, 
  CreditCard, 
  StickyNote, 
  Clock, 
  Pencil, 
  Trash2 
} from 'lucide-react';
import { formatFullDate, formatDate, formatCurrency } from '../../utils/dateFormatter';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/categories';
import * as LucideIcons from 'lucide-react';



const TransactionDetails = ({ transaction, currency, onEdit, onDelete }) => {
  if (!transaction) return null;

  const category = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(c => c.id === transaction.category);
  const Icon = category ? LucideIcons[category.icon] : LucideIcons.HelpCircle;

  return (
    <div className="transaction-details">
      <div className="details-header">
        <div className="category-badge" style={{ backgroundColor: category?.color + '20', color: category?.color }}>
          <Icon size={24} />
          <span>{category?.label}</span>
        </div>
        <div className={`amount-display ${transaction.type}`}>
          {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount, currency)}
        </div>
      </div>

      <h2 className="details-title">{transaction.title}</h2>

      <div className="details-grid">
        <div className="detail-item">
          <div className="detail-icon"><Calendar size={18} /></div>
          <div className="detail-content">
            <label>Date</label>
            <p>{formatDate(transaction.date)}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon"><CreditCard size={18} /></div>
          <div className="detail-content">
            <label>Payment Method</label>
            <p>{transaction.paymentMethod}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon"><Clock size={18} /></div>
          <div className="detail-content">
            <label>Created At</label>
            <p>{formatFullDate(transaction.createdAt)}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon"><Pencil size={18} /></div>
          <div className="detail-content">
            <label>Last Updated</label>
            <p>{formatFullDate(transaction.updatedAt)}</p>
          </div>
        </div>
      </div>

      {transaction.note && (
        <div className="note-section">
          <div className="note-header">
            <StickyNote size={18} />
            <label>Notes</label>
          </div>
          <p className="note-text">{transaction.note}</p>
        </div>
      )}

      <div className="details-actions">
        <button className="edit-btn" onClick={() => onEdit(transaction)}>
          <Pencil size={18} /> Edit Transaction
        </button>
        <button className="delete-btn" onClick={() => onDelete(transaction.id)}>
          <Trash2 size={18} /> Delete Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionDetails;
