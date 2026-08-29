/* Unit Tests for Analytics & Financial Math Utilities */
import { calculateSummary, calculateCategoryTotals, calculateHealthScore, formatCurrency } from '../js/utils.js';

export function runAnalyticsTests(assert) {
  const sampleTxs = [
    { type: 'income', amount: 5000, category: 'Salary' },
    { type: 'income', amount: 1000, category: 'Freelance' },
    { type: 'expense', amount: 1500, category: 'Bills' },
    { type: 'expense', amount: 500, category: 'Food' }
  ];

  // Test Summary Math
  const summary = calculateSummary(sampleTxs);
  assert(summary.totalIncome === 6000, 'calculateSummary calculates total income correctly ($6000)');
  assert(summary.totalExpense === 2000, 'calculateSummary calculates total expense correctly ($2000)');
  assert(summary.netBalance === 4000, 'calculateSummary calculates net balance correctly ($4000)');
  assert(summary.savingsRate === 66.7, `calculateSummary calculates savings rate correctly (66.7%)`);

  // Test Category Totals
  const catTotals = calculateCategoryTotals(sampleTxs, 'expense');
  assert(catTotals.Bills === 1500, 'Category totals aggregates Bills correctly');
  assert(catTotals.Food === 500, 'Category totals aggregates Food correctly');

  // Test Health Score
  const score = calculateHealthScore(summary, 0.5);
  assert(score >= 80, `calculateHealthScore evaluates strong savings rate as high score (${score}/100)`);

  // Test Currency Formatter
  const formattedUSD = formatCurrency(1234.5, 'USD');
  assert(formattedUSD.includes('$1,234.50'), `formatCurrency formats USD correctly (${formattedUSD})`);
}
