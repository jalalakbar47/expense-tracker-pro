export const exportToCSV = (transactions, currency = 'PKR') => {
  if (!transactions || transactions.length === 0) return;

  const headers = ['Title', 'Amount', 'Type', 'Category', 'Date', 'Payment Method', 'Note'];
  const csvRows = [headers.join(',')];

  transactions.forEach((t) => {
    const row = [
      `"${t.title.replace(/"/g, '""')}"`,
      t.amount,
      t.type,
      t.category,
      t.date,
      `"${t.paymentMethod}"`,
      `"${(t.note || '').replace(/"/g, '""')}"`,
    ];
    csvRows.push(row.join(','));
  });

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `transactions_export_${new Date().getTime()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
