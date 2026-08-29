/* Unit Tests for Auth Module */
import { AuthManager } from '../js/auth.js';
import { APP_CONFIG } from '../js/config.js';

export function runAuthTests(assert) {
  // Test Demo Login
  const demoRes = AuthManager.login(APP_CONFIG.DEMO_USER.email, APP_CONFIG.DEMO_USER.password);
  assert(demoRes.success === true, 'Demo account login accepts valid credentials');
  assert(AuthManager.isAuthenticated() === true, 'Session is marked authenticated after login');

  // Test Logout
  AuthManager.logout();
  assert(AuthManager.isAuthenticated() === false, 'Session is unauthenticated after logout');

  // Test Register
  const regRes = AuthManager.register('Jane Doe', 'jane@budgetwise.com', 'SecurePass123');
  assert(regRes.success === true, 'User registration succeeds with valid data');
  assert(AuthManager.getCurrentUser().email === 'jane@budgetwise.com', 'Current user email matches registered user');

  // Cleanup
  AuthManager.logout();
}
