/* BudgetWise LocalStorage Database Engine */
import { APP_CONFIG } from './config.js';
import { generateSeedData } from './seedData.js';

class StorageEngine {
  constructor() {
    this.keys = APP_CONFIG.STORAGE_KEYS;
    this.initStorage();
  }

  initStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        const isSeeded = localStorage.getItem(this.keys.SEEDED);
        if (!isSeeded) {
          this.seedDemoData();
        }
      }
    } catch (e) {
      console.warn('LocalStorage error during init, using memory fallbacks', e);
    }
  }

  seedDemoData() {
    const data = generateSeedData();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.keys.USER, JSON.stringify(data.user));
      localStorage.setItem(this.keys.TRANSACTIONS, JSON.stringify(data.transactions));
      localStorage.setItem(this.keys.BUDGETS, JSON.stringify(data.budgets));
      localStorage.setItem(this.keys.GOALS, JSON.stringify(data.goals));
      localStorage.setItem(this.keys.RECURRING, JSON.stringify(data.recurring));
      localStorage.setItem(this.keys.NOTIFICATIONS, JSON.stringify(data.notifications));
      localStorage.setItem(this.keys.SETTINGS, JSON.stringify(data.settings));
      localStorage.setItem(this.keys.SEEDED, 'true');
    }
    return data;
  }

  getItem(key, defaultValue = null) {
    try {
      if (typeof localStorage !== 'undefined') {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      }
      return defaultValue;
    } catch (e) {
      console.error(`Error reading key ${key} from storage:`, e);
      return defaultValue;
    }
  }

  setItem(key, value) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error(`Error saving key ${key} to storage:`, e);
    }
  }

  // Transactions
  getTransactions() {
    return this.getItem(this.keys.TRANSACTIONS, []);
  }

  saveTransactions(txs) {
    this.setItem(this.keys.TRANSACTIONS, txs);
  }

  addTransaction(tx) {
    const txs = this.getTransactions();
    txs.unshift(tx);
    this.saveTransactions(txs);
    return txs;
  }

  updateTransaction(updatedTx) {
    const txs = this.getTransactions();
    const index = txs.findIndex(t => t.id === updatedTx.id);
    if (index !== -1) {
      txs[index] = { ...txs[index], ...updatedTx };
      this.saveTransactions(txs);
    }
    return txs;
  }

  deleteTransaction(id) {
    const txs = this.getTransactions();
    const filtered = txs.filter(t => t.id !== id);
    this.saveTransactions(filtered);
    return filtered;
  }

  // Budgets
  getBudgets() {
    return this.getItem(this.keys.BUDGETS, []);
  }

  saveBudgets(budgets) {
    this.setItem(this.keys.BUDGETS, budgets);
  }

  updateBudget(category, limit) {
    const budgets = this.getBudgets();
    const index = budgets.findIndex(b => b.category === category);
    if (index !== -1) {
      budgets[index].limit = Number(limit);
    } else {
      budgets.push({ id: `b_${category.toLowerCase()}`, category, limit: Number(limit), period: 'monthly' });
    }
    this.saveBudgets(budgets);
    return budgets;
  }

  // Goals
  getGoals() {
    return this.getItem(this.keys.GOALS, []);
  }

  saveGoals(goals) {
    this.setItem(this.keys.GOALS, goals);
  }

  addGoal(goal) {
    const goals = this.getGoals();
    goals.push(goal);
    this.saveGoals(goals);
    return goals;
  }

  updateGoalDeposit(id, amount) {
    const goals = this.getGoals();
    const goal = goals.find(g => g.id === id);
    if (goal) {
      goal.currentAmount = Math.max(0, (Number(goal.currentAmount) || 0) + Number(amount));
      this.saveGoals(goals);
    }
    return goals;
  }

  // Recurring
  getRecurring() {
    return this.getItem(this.keys.RECURRING, []);
  }

  saveRecurring(recurring) {
    this.setItem(this.keys.RECURRING, recurring);
  }

  // Notifications
  getNotifications() {
    return this.getItem(this.keys.NOTIFICATIONS, []);
  }

  saveNotifications(notifs) {
    this.setItem(this.keys.NOTIFICATIONS, notifs);
  }

  addNotification(notif) {
    const notifs = this.getNotifications();
    notifs.unshift(notif);
    this.saveNotifications(notifs);
    return notifs;
  }

  markNotificationRead(id) {
    const notifs = this.getNotifications();
    const n = notifs.find(item => item.id === id);
    if (n) {
      n.read = true;
      this.saveNotifications(notifs);
    }
    return notifs;
  }

  // User & Settings
  getUser() {
    return this.getItem(this.keys.USER, APP_CONFIG.DEMO_USER);
  }

  setUser(user) {
    this.setItem(this.keys.USER, user);
  }

  getSettings() {
    return this.getItem(this.keys.SETTINGS, { currency: 'USD', theme: 'dark' });
  }

  saveSettings(settings) {
    this.setItem(this.keys.SETTINGS, settings);
  }

  // Data Reset & Backup/Restore
  resetToDemo() {
    return this.seedDemoData();
  }

  exportFullBackup() {
    return {
      version: APP_CONFIG.VERSION,
      exportDate: new Date().toISOString(),
      user: this.getUser(),
      transactions: this.getTransactions(),
      budgets: this.getBudgets(),
      goals: this.getGoals(),
      recurring: this.getRecurring(),
      notifications: this.getNotifications(),
      settings: this.getSettings()
    };
  }

  importFullBackup(jsonData) {
    if (!jsonData || typeof jsonData !== 'object') {
      throw new Error('Invalid JSON backup file');
    }
    if (jsonData.user) this.setUser(jsonData.user);
    if (Array.isArray(jsonData.transactions)) this.saveTransactions(jsonData.transactions);
    if (Array.isArray(jsonData.budgets)) this.saveBudgets(jsonData.budgets);
    if (Array.isArray(jsonData.goals)) this.saveGoals(jsonData.goals);
    if (Array.isArray(jsonData.recurring)) this.saveRecurring(jsonData.recurring);
    if (Array.isArray(jsonData.notifications)) this.saveNotifications(jsonData.notifications);
    if (jsonData.settings) this.saveSettings(jsonData.settings);
    return true;
  }
}

export const Storage = new StorageEngine();
