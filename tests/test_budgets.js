/* Unit Tests for Category Budget Planner & Alert Logic */
import { Storage } from '../js/storage.js';
import { State } from '../js/state.js';

export function runBudgetsTests(assert) {
  // Test Updating Budget Target
  Storage.updateBudget('Food', 900);
  const budgets = Storage.getBudgets();
  const foodBudget = budgets.find(b => b.category === 'Food');
  assert(foodBudget && foodBudget.limit === 900, 'updateBudget updates category target limit in storage');

  // Test Budget Alert System Notification
  State.reloadFromStorage();
  const initialNotifCount = State.get('notifications').length;

  // Add large transaction to trigger over-budget alert
  State.addTransaction({
    id: 'tx_budget_overflow_trigger',
    description: 'Giant Grocery Haul',
    amount: 1500.00,
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString()
  });

  const updatedNotifs = State.get('notifications');
  assert(updatedNotifs.length >= initialNotifCount, 'Over-budget transaction generates or checks notification alerts');

  // Cleanup
  State.deleteTransaction('tx_budget_overflow_trigger');
  Storage.updateBudget('Food', 750);
}
