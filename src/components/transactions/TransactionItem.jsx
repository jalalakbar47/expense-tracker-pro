import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/dateFormatter';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../data/categories';
import * as LucideIcons from 'lucide-react';

const TransactionItem = ({ transaction, settings, onEdit, onDelete, onClick }) => {
  const getCategoryIcon = (categoryId) => {
    const category = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(c => c.id === categoryId);
    if (!category) return <LucideIcons.HelpCircle size={18} />;
    const Icon = LucideIcons[category.icon];
    return <Icon size={18} style={{ color: category.color }} />;
  };

  const categoryLabel = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].find(c => c.id === transaction.category)?.label;

  return (
    <tr className="transaction-row animate-fade-in" onClick={onClick}>
      <td>
        <div className="td-title">
          <span className="title-text">{transaction.title}</span>
          {transaction.note && <span className="note-indicator" title={transaction.note}>Note</span>}
        </div>
      </td>
      <td>
        <div className="td-category">
          {getCategoryIcon(transaction.category)}
          <span>{categoryLabel}</span>
        </div>
      </td>
      <td><span className="badge-method">{transaction.paymentMethod}</span></td>
      <td>{formatDate(transaction.date)}</td>
      <td>
        <span className={`td-amount ${transaction.type}`}>
          {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount, settings.currency)}
        </span>
      </td>
      <td className="text-right" onClick={(e) => e.stopPropagation()}>
        <div className="row-actions">
          <button className="row-action-btn edit" onClick={() => onEdit(transaction)}>
            <Pencil size={16} />
          </button>
          <button className="row-action-btn delete" onClick={() => onDelete(transaction.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;
