/* BudgetWise Top Navigation Header Component */
import { State } from '../state.js';
import { AuthManager } from '../auth.js';
import { CURRENCIES } from '../config.js';

export function renderHeader(container) {
  const user = State.get('user');
  const currentView = State.get('currentView');
  const theme = State.get('theme');
  const currency = State.get('currency');
  const notifications = State.get('notifications') || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  const viewTitles = {
    dashboard: 'Financial Overview',
    transactions: 'Transactions & Cash Flow',
    budgets: 'Category Budgets',
    goals: 'Savings Goals Tracker',
    recurring: 'Recurring Bills & Income',
    reports: 'Reports & Analytics',
    settings: 'Settings & Data Backup'
  };

  const title = viewTitles[currentView] || 'BudgetWise';

  container.innerHTML = `
    <header class="app-header">
      <div class="header-left">
        <button id="mobile-sidebar-toggle" class="btn-icon" aria-label="Toggle Navigation">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <h1 class="header-title">${title}</h1>
      </div>

      <div class="header-right">
        <!-- Currency Selector -->
        <select id="header-currency-select" class="form-control" style="width: auto; padding: 0.35rem 2rem 0.35rem 0.75rem; font-size: 0.85rem; font-weight: 600;">
          ${Object.values(CURRENCIES).map(c => `
            <option value="${c.code}" ${c.code === currency ? 'selected' : ''}>${c.symbol} (${c.code})</option>
          `).join('')}
        </select>

        <!-- Theme Toggle Button -->
        <button id="theme-toggle-btn" class="btn-icon" title="Toggle Theme (${theme === 'dark' ? 'Light' : 'Dark'})">
          ${theme === 'dark' ? `
            <svg width="20" height="20" fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          ` : `
            <svg width="20" height="20" fill="none" stroke="#4f46e5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          `}
        </button>

        <!-- Notifications Bell -->
        <button id="notifications-btn" class="btn-icon" style="position: relative;" title="Notifications">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          ${unreadCount > 0 ? `<span class="badge badge-expense" style="position: absolute; top: 0; right: 0; font-size: 0.65rem; padding: 2px 5px;">${unreadCount}</span>` : ''}
        </button>

        <!-- User Profile Avatar & Logout -->
        <div class="header-user-profile" id="user-profile-btn" title="${user ? user.email : 'User'}">
          <div class="user-avatar">${user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}</div>
          <span style="font-size: 0.85rem; font-weight: 600; display: none; @media(min-width: 768px){display:inline}">${user ? user.name : 'Guest'}</span>
          <button id="logout-btn" class="btn-icon" style="padding: 2px;" title="Logout">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;

  // Attach Event Handlers
  document.getElementById('mobile-sidebar-toggle')?.addEventListener('click', () => {
    const sidebar = document.querySelector('.app-sidebar');
    sidebar?.classList.toggle('mobile-open');
  });

  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    const currentTheme = State.get('theme');
    State.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  document.getElementById('header-currency-select')?.addEventListener('change', (e) => {
    State.setCurrency(e.target.value);
  });

  document.getElementById('notifications-btn')?.addEventListener('click', () => {
    const drawer = document.getElementById('notification-drawer');
    drawer?.classList.toggle('open');
  });

  document.getElementById('logout-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    AuthManager.logout();
  });
}
