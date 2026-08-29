/* BudgetWise Auth View (Login / Register / Demo Account) */
import { AuthManager } from '../auth.js';
import { Toast } from '../components/toast.js';

export function renderAuthView(container) {
  let isRegisterMode = false;

  const render = () => {
    container.innerHTML = `
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="auth-header">
            <div style="display:inline-flex; align-items:center; justify-center; gap:0.5rem; color:var(--brand-primary); font-weight:800; font-size:1.5rem; margin-bottom:0.5rem;">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m-9-1h18"/>
              </svg>
              <span>BudgetWise</span>
            </div>
            <h2 class="auth-title">${isRegisterMode ? 'Create Account' : 'Welcome Back'}</h2>
            <p class="auth-subtitle">${isRegisterMode ? 'Start tracking your financial freedom today' : 'Sign in to access your personal dashboard'}</p>
          </div>

          <form id="auth-form">
            ${isRegisterMode ? `
              <div class="form-group">
                <label class="form-label" for="auth-name">Full Name</label>
                <input type="text" id="auth-name" class="form-control" placeholder="Alex Morgan" required />
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label" for="auth-email">Email Address</label>
              <input type="email" id="auth-email" class="form-control" placeholder="demo@budgetwise.com" value="${isRegisterMode ? '' : 'demo@budgetwise.com'}" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="auth-password">Password</label>
              <input type="password" id="auth-password" class="form-control" placeholder="••••••••" value="${isRegisterMode ? '' : 'Demo@123'}" required />
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem; margin-top: 0.5rem;">
              ${isRegisterMode ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div style="position: relative; text-align: center; margin: 0.5rem 0;">
            <hr style="border: 0; border-top: 1px solid var(--border-color);" />
            <span style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--bg-secondary); padding: 0 0.75rem; font-size: 0.75rem; color: var(--text-muted);">OR</span>
          </div>

          <!-- Demo Account 1-Click Shortcut -->
          <button id="demo-login-btn" class="btn btn-secondary" style="width: 100%; padding: 0.75rem; border-color: var(--brand-primary);">
            <svg width="20" height="20" fill="none" stroke="var(--brand-primary)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <span>Explore Demo Account (Auto-Seeded)</span>
          </button>

          <div style="text-align: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">
            ${isRegisterMode ? `Already have an account? <a href="#" id="toggle-auth-mode" style="color:var(--brand-primary); font-weight:700; text-decoration:none;">Sign In</a>` : `Don't have an account? <a href="#" id="toggle-auth-mode" style="color:var(--brand-primary); font-weight:700; text-decoration:none;">Register</a>`}
          </div>
        </div>
      </div>
    `;

    // Event Handlers
    document.getElementById('auth-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email')?.value.trim();
      const password = document.getElementById('auth-password')?.value;

      if (isRegisterMode) {
        const name = document.getElementById('auth-name')?.value.trim();
        const res = AuthManager.register(name, email, password);
        if (res.success) {
          Toast.success(`Welcome to BudgetWise, ${res.user.name}!`);
        } else {
          Toast.error(res.message);
        }
      } else {
        const res = AuthManager.login(email, password);
        if (res.success) {
          Toast.success(`Signed in as ${res.user.email}`);
        } else {
          Toast.error(res.message);
        }
      }
    });

    document.getElementById('demo-login-btn')?.addEventListener('click', () => {
      const res = AuthManager.loginDemoShortcut();
      Toast.success('Demo account loaded with 100+ transactions & 12 months history!', 'Demo Mode');
    });

    document.getElementById('toggle-auth-mode')?.addEventListener('click', (e) => {
      e.preventDefault();
      isRegisterMode = !isRegisterMode;
      render();
    });
  };

  render();
}
