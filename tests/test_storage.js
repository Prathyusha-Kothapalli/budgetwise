/* Unit Tests for LocalStorage Storage Engine */
import { Storage } from '../js/storage.js';

export function runStorageTests(assert) {
  // Test Seeding
  const seeded = Storage.seedDemoData();
  assert(Array.isArray(seeded.transactions), 'Seeding generates array of transactions');
  assert(seeded.transactions.length >= 80, `Seeding generates 80+ realistic transactions (actual: ${seeded.transactions.length})`);
  assert(seeded.budgets.length >= 4, 'Seeding includes 4+ monthly budgets');
  assert(seeded.goals.length >= 5, 'Seeding includes 5 savings goals');

  // Test Transaction Read/Write
  const initialCount = Storage.getTransactions().length;
  Storage.addTransaction({
    id: 'test_tx_unit_1',
    description: 'Unit Test Expense',
    amount: 99.99,
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString()
  });

  const updatedCount = Storage.getTransactions().length;
  assert(updatedCount === initialCount + 1, 'addTransaction increases transaction count by 1');

  // Test Backup Export
  const backup = Storage.exportFullBackup();
  assert(backup && backup.user && Array.isArray(backup.transactions), 'exportFullBackup returns complete database payload');

  // Cleanup
  Storage.deleteTransaction('test_tx_unit_1');
}
