/* Unit Tests for Transactions CRUD & Filtering */
import { State } from '../js/state.js';
import { Storage } from '../js/storage.js';

export function runTransactionsTests(assert) {
  // Ensure clean seed data
  Storage.seedDemoData();
  State.reloadFromStorage();

  const initialList = State.get('transactions');
  const countBefore = initialList.length;

  // Add Transaction via State
  const newTx = {
    id: 'tx_unit_test_add',
    description: 'Special Grocery Shopping',
    amount: 145.50,
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString(),
    notes: 'Unit test added item'
  };

  State.addTransaction(newTx);
  const countAfterAdd = State.get('transactions').length;
  assert(countAfterAdd === countBefore + 1, 'State.addTransaction updates state transactions list length');

  // Edit Transaction via State
  const updatedTx = { ...newTx, amount: 200.00, notes: 'Updated notes' };
  State.updateTransaction(updatedTx);
  const foundUpdated = State.get('transactions').find(t => t.id === 'tx_unit_test_add');
  assert(foundUpdated && foundUpdated.amount === 200.00, 'State.updateTransaction modifies target transaction values');

  // Delete Transaction via State
  State.deleteTransaction('tx_unit_test_add');
  const countAfterDelete = State.get('transactions').length;
  assert(countAfterDelete === countBefore, 'State.deleteTransaction removes item and restores original count');
}
