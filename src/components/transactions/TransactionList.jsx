import React from 'react';
import TransactionItem from './TransactionItem';
import EmptyState from '../common/EmptyState';

const TransactionList = ({ transactions, settings, onEdit, onDelete, onSelect, searchTerm }) => {
  if (transactions.length === 0) {
    return (
      <EmptyState 
        type={searchTerm ? 'search' : 'filter'} 
        message={searchTerm ? 'No results found' : 'No transactions match filters'}
        subtext={searchTerm ? `We couldn't find anything matching "${searchTerm}"` : 'Try adjusting your filters to see more results.'}
      />
    );
  }

  return (
    <div className="transactions-list-container">
      <div className="table-container card">
        <table>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Amount</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <TransactionItem 
                key={t.id} 
                transaction={t} 
                settings={settings}
                onEdit={onEdit}
                onDelete={onDelete}
                onClick={() => onSelect(t)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
