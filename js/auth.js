/* BudgetWise Authentication & Session Manager */
import { Storage } from './storage.js';
import { State } from './state.js';
import { APP_CONFIG } from './config.js';

export class AuthManager {
  static isAuthenticated() {
    const user = Storage.getUser();
    return !!(user && user.email);
  }

  static getCurrentUser() {
    return Storage.getUser();
  }

  static login(email, password) {
    const demo = APP_CONFIG.DEMO_USER;
    
    // Check demo credentials or accept valid email
    if (email === demo.email && password === demo.password) {
      const user = { ...demo };
      Storage.setUser(user);
      State.set('user', user);
      return { success: true, user };
    }

    if (email && password && password.length >= 6) {
      const user = {
        name: email.split('@')[0],
        email: email,
        currency: 'USD',
        theme: 'dark'
      };
      Storage.setUser(user);
      State.set('user', user);
      return { success: true, user };
    }

    return { success: false, message: 'Invalid credentials. Use demo@budgetwise.com / Demo@123' };
  }

  static loginDemoShortcut() {
    const demo = APP_CONFIG.DEMO_USER;
    Storage.resetToDemo();
    Storage.setUser(demo);
    State.reloadFromStorage();
    return { success: true, user: demo };
  }

  static register(name, email, password) {
    if (!name || !email || !password) {
      return { success: false, message: 'Please fill in all required fields.' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    const user = {
      name,
      email,
      currency: 'USD',
      theme: 'dark'
    };

    Storage.setUser(user);
    State.set('user', user);
    return { success: true, user };
  }

  static logout() {
    Storage.setItem(APP_CONFIG.STORAGE_KEYS.USER, null);
    State.set('user', null);
  }
}
