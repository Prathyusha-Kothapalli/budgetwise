/* BudgetWise Zero-Dependency Node.js Test Runner */
import { runAuthTests } from './test_auth.js';
import { runStorageTests } from './test_storage.js';
import { runAnalyticsTests } from './test_analytics.js';
import { runTransactionsTests } from './test_transactions.js';
import { runBudgetsTests } from './test_budgets.js';

// Setup in-memory LocalStorage mock for Node.js test environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

global.localStorage = new LocalStorageMock();
global.document = {
  documentElement: {
    setAttribute: () => {}
  }
};

let passed = 0;
let failed = 0;

export function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function executeTestSuite() {
  console.log('\n======================================================');
  console.log('       RUNNING BUDGETWISE AUTOMATED TEST SUITE        ');
  console.log('======================================================\n');

  console.log('📦 1. Auth Module Unit Tests...');
  runAuthTests(assert);

  console.log('\n💾 2. LocalStorage Storage Engine Tests...');
  runStorageTests(assert);

  console.log('\n📊 3. Financial Analytics & Math Tests...');
  runAnalyticsTests(assert);

  console.log('\n💸 4. Transactions CRUD & Filter Tests...');
  runTransactionsTests(assert);

  console.log('\n🎯 5. Budget Planner & Limits Tests...');
  runBudgetsTests(assert);

  console.log('\n======================================================');
  console.log(` SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

executeTestSuite();
