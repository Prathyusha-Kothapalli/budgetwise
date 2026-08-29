/* BudgetWise Application Entry Point & Router */
import { AuthManager } from './auth.js';
import { State } from './state.js';
import { renderHeader } from './components/header.js';
import { renderSidebar } from './components/sidebar.js';
import { renderNotificationDrawer } from './components/notifications.js';
import { renderAuthView } from './views/authView.js';
import { renderDashboardView } from './views/dashboardView.js';
import { renderTransactionsView } from './views/transactionsView.js';
import { renderBudgetView } from './views/budgetView.js';
import { renderSavingsView } from './views/savingsView.js';
import { renderRecurringView } from './views/recurringView.js';
import { renderReportsView } from './views/reportsView.js';
import { renderSettingsView } from './views/settingsView.js';
import { renderTaxCalculatorView } from './views/taxCalculatorView.js';
import { renderInvestmentView } from './views/investmentView.js';
import { renderDebtView } from './views/debtView.js';
import { renderAuditLogView } from './views/auditLogView.js';

class App {
  constructor() {
    this.rootContainer = document.getElementById('app-root');
    this.init();
  }

  init() {
    // Set initial theme
    const theme = State.get('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);

    // Initial Hash check
    const initialHash = window.location.hash.replace('#', '');
    const validViews = ['dashboard', 'transactions', 'budgets', 'goals', 'recurring', 'tax', 'investment', 'debt', 'reports', 'audit', 'settings'];
    if (initialHash && validViews.includes(initialHash)) {
      State.set('currentView', initialHash);
    }

    // Subscribe to state changes
    State.subscribe('*', () => this.render());

    // Listen to browser hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && validViews.includes(hash)) {
        State.set('currentView', hash);
      }
    });

    this.render();
  }

  render() {
    const isAuth = AuthManager.isAuthenticated();

    if (!isAuth) {
      this.rootContainer.className = '';
      renderAuthView(this.rootContainer);
      return;
    }

    // Render Authenticated Dashboard Shell
    this.rootContainer.innerHTML = `
      <div id="sidebar-mount"></div>
      <main id="main-content">
        <div id="header-mount"></div>
        <div id="view-mount"></div>
      </main>
    `;

    renderSidebar(document.getElementById('sidebar-mount'));
    renderHeader(document.getElementById('header-mount'));
    renderNotificationDrawer();

    const currentView = State.get('currentView');
    const viewMount = document.getElementById('view-mount');

    switch (currentView) {
      case 'transactions':
        renderTransactionsView(viewMount);
        break;
      case 'budgets':
        renderBudgetView(viewMount);
        break;
      case 'goals':
        renderSavingsView(viewMount);
        break;
      case 'recurring':
        renderRecurringView(viewMount);
        break;
      case 'tax':
        renderTaxCalculatorView(viewMount);
        break;
      case 'investment':
        renderInvestmentView(viewMount);
        break;
      case 'debt':
        renderDebtView(viewMount);
        break;
      case 'reports':
        renderReportsView(viewMount);
        break;
      case 'audit':
        renderAuditLogView(viewMount);
        break;
      case 'settings':
        renderSettingsView(viewMount);
        break;
      case 'dashboard':
      default:
        renderDashboardView(viewMount);
        break;
    }
  }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
