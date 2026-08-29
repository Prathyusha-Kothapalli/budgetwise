/* BudgetWise Category Budget Planner View */
import { State } from '../state.js';
import { CATEGORIES } from '../config.js';
import { formatCurrency } from '../utils.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { Storage } from '../storage.js';

export function renderBudgetView(container) {
  const currency = State.get('currency');
  const budgets = State.get('budgets') || [];
  const transactions = State.get('transactions') || [];

  // Calculate current month's spending per category
  const now = new Date();
  const currentMonthTxs = transactions.filter(t => {
    if (t.type !== 'expense') return false;
    const d = new Date(t.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  const categorySpent = {};
  currentMonthTxs.forEach(t => {
    categorySpent[t.category] = (categorySpent[t.category] || 0) + Number(t.amount);
  });

  const openSetBudgetModal = (categoryKey, currentLimit = 500) => {
    const catName = CATEGORIES[categoryKey]?.name || categoryKey;

    Modal.open({
      title: `Set Budget Limit: ${catName}`,
      bodyHTML: `
        <form id="budget-modal-form">
          <div class="form-group">
            <label class="form-label">Monthly Target Limit (${currency})</label>
            <input type="number" step="10" id="budget-limit-input" class="form-control font-mono" value="${currentLimit}" required min="10" />
          </div>
          <div class="modal-footer" style="padding-right:0; padding-left:0; margin-bottom:-1rem;">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('global-modal-backdrop').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Target</button>
          </div>
        </form>
      `,
      onOpen: (body) => {
        body.querySelector('#budget-modal-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const newLimit = parseFloat(body.querySelector('#budget-limit-input').value);
          Storage.updateBudget(categoryKey, newLimit);
          State.reloadFromStorage();
          Toast.success(`Monthly budget for ${catName} updated!`);
          Modal.close();
          renderBudgetView(container);
        });
      }
    });
  };

  let totalLimit = 0;
  let totalSpent = 0;

  const categoryCards = Object.keys(CATEGORIES).map(catKey => {
    const catObj = CATEGORIES[catKey];
    const b = budgets.find(item => item.category === catKey);
    const limit = b ? b.limit : 0;
    const spent = categorySpent[catKey] || 0;
    const percentage = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0;
    
    totalLimit += limit;
    totalSpent += spent;

    let statusClass = 'success';
    let statusText = 'On Track';
    if (limit > 0) {
      if (spent >= limit) {
        statusClass = 'danger';
        statusText = 'Exceeded';
      } else if (percentage >= 80) {
        statusClass = 'warning';
        statusText = 'Near Limit';
      }
    }

    return `
      <div class="glass-panel" style="padding:1.5rem; display:flex; flex-direction:column; gap:1rem;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div style="width:40px; height:40px; border-radius:var(--radius-md); background:${catObj.color}15; color:${catObj.color}; display:flex; align-items:center; justify-content:center; font-weight:700;">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m-9-1h18"/></svg>
            </div>
            <div>
              <div style="font-weight:700; font-size:1rem;">${catObj.name}</div>
              <div style="font-size:0.75rem; color:var(--text-secondary);">Spent: ${formatCurrency(spent, currency)}</div>
            </div>
          </div>
          
          <button class="btn btn-secondary btn-sm set-budget-btn" data-category="${catKey}" data-limit="${limit}">
            Edit Target
          </button>
        </div>

        <div>
          <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.85rem; margin-bottom:0.35rem;">
            <span style="color:var(--text-secondary);">${percentage}% of ${formatCurrency(limit, currency)}</span>
            <span class="badge badge-${statusClass}">${statusText}</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill ${statusClass}" style="width: ${percentage}%;"></div>
          </div>
        </div>

        <div style="font-size:0.8rem; color:var(--text-muted); display:flex; justify-content:space-between;">
          <span>Remaining: ${formatCurrency(Math.max(0, limit - spent), currency)}</span>
          ${spent > limit ? `<span style="color:var(--color-expense); font-weight:700;">Over by ${formatCurrency(spent - limit, currency)}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="view-container">
      <!-- Header KPI Summary Card -->
      <div class="glass-panel" style="padding:1.5rem; margin-bottom:2rem; background: linear-gradient(135deg, var(--bg-glass), var(--brand-primary-light));">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1.5rem;">
          <div>
            <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Monthly Budget Overview</h2>
            <p style="font-size:0.875rem; color:var(--text-secondary);">Track target spending caps against real-time current month expenses</p>
          </div>

          <div style="display:flex; gap:2rem;">
            <div>
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Total Budget Cap</div>
              <div class="font-mono" style="font-size:1.5rem; font-weight:800; color:var(--brand-primary);">${formatCurrency(totalLimit, currency)}</div>
            </div>
            <div>
              <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Spent This Month</div>
              <div class="font-mono" style="font-size:1.5rem; font-weight:800; color:${totalSpent > totalLimit ? 'var(--color-expense)' : 'var(--color-income)'};">${formatCurrency(totalSpent, currency)}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:1.25rem;">
        ${categoryCards}
      </div>
    </div>
  `;

  // Attach Event Handlers
  container.querySelectorAll('.set-budget-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      const limit = btn.getAttribute('data-limit');
      openSetBudgetModal(cat, limit);
    });
  });
}
