/* BudgetWise Utility Helper Functions */
import { CURRENCIES } from './config.js';

export function generateId() {
  return 'bw_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}

export function formatCurrency(amount, currencyCode = 'USD') {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const numericAmount = Number(amount) || 0;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
}

export function formatDate(dateInput, style = 'medium') {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return String(dateInput);

  if (style === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } else if (style === 'iso') {
    return date.toISOString().split('T')[0];
  } else if (style === 'monthYear') {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function calculateSummary(transactions = []) {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(t => {
    const amt = Number(t.amount) || 0;
    if (t.type === 'income') {
      totalIncome += amt;
    } else if (t.type === 'expense') {
      totalExpense += amt;
    }
  });

  const netBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? Math.max(0, ((totalIncome - totalExpense) / totalIncome) * 100) : 0;

  return {
    totalIncome,
    totalExpense,
    netBalance,
    savingsRate: Number(savingsRate.toFixed(1))
  };
}

export function calculateCategoryTotals(transactions = [], type = 'expense') {
  const totals = {};
  transactions
    .filter(t => t.type === type)
    .forEach(t => {
      const cat = t.category || 'Other';
      totals[cat] = (totals[cat] || 0) + (Number(t.amount) || 0);
    });
  return totals;
}

export function calculateMonthlyTrends(transactions = [], monthsCount = 12) {
  const result = [];
  const now = new Date();

  for (let i = monthsCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();

    const monthTxs = transactions.filter(t => {
      const txDate = new Date(t.date);
      return txDate.getFullYear() === year && txDate.getMonth() === month;
    });

    let income = 0;
    let expense = 0;

    monthTxs.forEach(t => {
      if (t.type === 'income') income += Number(t.amount) || 0;
      if (t.type === 'expense') expense += Number(t.amount) || 0;
    });

    result.push({
      label: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      year,
      month,
      income,
      expense,
      net: income - expense
    });
  }

  return result;
}

export function calculateHealthScore(summary, budgetUsageRatio = 0.7) {
  // Score from 0 to 100 based on savings rate, net balance, and budget control
  const savingsScore = Math.min(40, (summary.savingsRate / 30) * 40); // 30% savings rate = 40 pts
  const balanceScore = summary.netBalance >= 0 ? 30 : 5;
  const budgetScore = budgetUsageRatio <= 1 ? Math.max(0, (1 - (budgetUsageRatio - 0.5)) * 30) : 10;
  
  const totalScore = Math.round(savingsScore + balanceScore + budgetScore);
  return Math.min(100, Math.max(0, totalScore));
}

export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;
  
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row => headers.map(header => {
      const val = row[header] === null || row[header] === undefined ? '' : String(row[header]);
      return `"${val.replace(/"/g, '""')}"`;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadJSON(filename, data) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
