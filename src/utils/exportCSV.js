export const exportToCSV = (data) => {
  const headers = ['Pair', 'Buy From', 'Sell To', 'Profit %'];
  const rows = data.map(op => [op.pair, op.buyExchange, op.sellExchange, op.profit]);

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "arbisout_opportunities.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
