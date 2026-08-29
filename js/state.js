/* BudgetWise Central State Store & Pub/Sub Event System */
import { Storage } from './storage.js';

class StateStore {
  constructor() {
    this.listeners = {};
    this.state = {
      user: Storage.getUser(),
      settings: Storage.getSettings(),
      transactions: Storage.getTransactions(),
      budgets: Storage.getBudgets(),
      goals: Storage.getGoals(),
      recurring: Storage.getRecurring(),
      notifications: Storage.getNotifications(),
      currentView: 'dashboard',
      searchQuery: '',
      theme: Storage.getSettings().theme || 'dark',
      currency: Storage.getSettings().currency || 'USD'
    };
  }

  // Pub/Sub listener registration
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);

    // Return un-subscribe function
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  }

  // Notify subscribers of key state update
  notify(key) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(this.state[key], this.state));
    }
    // Always notify global listeners
    if (this.listeners['*']) {
      this.listeners['*'].forEach(callback => callback(this.state));
    }
  }

  // State Getters
  get(key) {
    return this.state[key];
  }

  // State Setters
  set(key, value) {
    this.state[key] = value;
    this.notify(key);
  }

  // Reload all state from LocalStorage
  reloadFromStorage() {
    this.state.user = Storage.getUser();
    this.state.settings = Storage.getSettings();
    this.state.transactions = Storage.getTransactions();
    this.state.budgets = Storage.getBudgets();
    this.state.goals = Storage.getGoals();
    this.state.recurring = Storage.getRecurring();
    this.state.notifications = Storage.getNotifications();
    this.state.theme = this.state.settings.theme || 'dark';
    this.state.currency = this.state.settings.currency || 'USD';

    this.notify('*');
  }

  // Specialized State Action Mutators
  addTransaction(tx) {
    const updated = Storage.addTransaction(tx);
    this.state.transactions = updated;
    this.notify('transactions');
    this.checkBudgetAlerts();
  }

  updateTransaction(tx) {
    const updated = Storage.updateTransaction(tx);
    this.state.transactions = updated;
    this.notify('transactions');
    this.checkBudgetAlerts();
  }

  deleteTransaction(id) {
    const updated = Storage.deleteTransaction(id);
    this.state.transactions = updated;
    this.notify('transactions');
  }

  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const settings = { ...this.state.settings, theme };
    Storage.saveSettings(settings);
    this.state.settings = settings;
    this.notify('theme');
  }

  setCurrency(currency) {
    this.state.currency = currency;
    const settings = { ...this.state.settings, currency };
    Storage.saveSettings(settings);
    this.state.settings = settings;
    this.notify('currency');
  }

  checkBudgetAlerts() {
    // Calculate current month's expenses per category
    const now = new Date();
    const currentMonthTxs = this.state.transactions.filter(t => {
      if (t.type !== 'expense') return false;
      const d = new Date(t.date);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });

    const categorySpent = {};
    currentMonthTxs.forEach(t => {
      categorySpent[t.category] = (categorySpent[t.category] || 0) + Number(t.amount);
    });

    // Compare with limits
    this.state.budgets.forEach(b => {
      const spent = categorySpent[b.category] || 0;
      const ratio = spent / b.limit;

      if (ratio >= 0.8 && ratio < 1.0) {
        this.addSystemNotification({
          title: `Budget Alert: ${b.category}`,
          message: `You have spent ${Math.round(ratio * 100)}% of your monthly ${b.category} budget limit.`,
          type: 'warning'
        });
      } else if (ratio >= 1.0) {
        this.addSystemNotification({
          title: `Budget Exceeded: ${b.category}`,
          message: `Over-budget! You have exceeded your monthly ${b.category} limit by ${Math.round((ratio - 1) * 100)}%.`,
          type: 'error'
        });
      }
    });
  }

  addSystemNotification({ title, message, type = 'info' }) {
    // Avoid duplicate unread notifications
    const existing = this.state.notifications.find(n => n.title === title && !n.read);
    if (existing) return;

    const notif = {
      id: 'notif_' + Math.random().toString(36).substring(2, 9),
      title,
      message,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    const updated = Storage.addNotification(notif);
    this.state.notifications = updated;
    this.notify('notifications');
  }
}

export const State = new StateStore();
