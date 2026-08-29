/* BudgetWise Savings Goals Tracker View */
import { State } from '../state.js';
import { formatCurrency, formatDate, generateId } from '../utils.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { Storage } from '../storage.js';

export function renderSavingsView(container) {
  const currency = State.get('currency');
  const goals = State.get('goals') || [];

  const openAddGoalModal = () => {
    Modal.open({
      title: 'Create Savings Goal',
      bodyHTML: `
        <form id="add-goal-form">
          <div class="form-group">
            <label class="form-label">Goal Name</label>
            <input type="text" id="goal-name" class="form-control" placeholder="e.g. Dream House Fund" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Target Amount (${currency})</label>
              <input type="number" step="100" id="goal-target" class="form-control font-mono" placeholder="5000" required min="10" />
            </div>

            <div class="form-group">
              <label class="form-label">Current Saved</label>
              <input type="number" step="10" id="goal-current" class="form-control font-mono" placeholder="0" value="0" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Target Date</label>
              <input type="date" id="goal-date" class="form-control" value="${formatDate(new Date(Date.now() + 86400000 * 180), 'iso')}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Category</label>
              <input type="text" id="goal-category" class="form-control" placeholder="e.g. Travel, Safety" value="General" />
            </div>
          </div>

          <div class="modal-footer" style="padding-right:0; padding-left:0; margin-bottom:-1rem;">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('global-modal-backdrop').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Goal</button>
          </div>
        </form>
      `,
      onOpen: (body) => {
        body.querySelector('#add-goal-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const name = body.querySelector('#goal-name').value.trim();
          const targetAmount = parseFloat(body.querySelector('#goal-target').value);
          const currentAmount = parseFloat(body.querySelector('#goal-current').value) || 0;
          const targetDate = body.querySelector('#goal-date').value;
          const category = body.querySelector('#goal-category').value.trim() || 'General';

          Storage.addGoal({
            id: generateId(),
            name,
            targetAmount,
            currentAmount,
            targetDate,
            category
          });

          State.reloadFromStorage();
          Toast.success(`New savings goal "${name}" created!`);
          Modal.close();
          renderSavingsView(container);
        });
      }
    });
  };

  const openDepositModal = (goal) => {
    Modal.open({
      title: `Deposit to ${goal.name}`,
      bodyHTML: `
        <form id="deposit-form">
          <div style="margin-bottom:1rem; font-size:0.9rem; color:var(--text-secondary);">
            Target: ${formatCurrency(goal.targetAmount, currency)} | Current: ${formatCurrency(goal.currentAmount, currency)}
          </div>

          <div class="form-group">
            <label class="form-label">Deposit Amount (${currency})</label>
            <input type="number" step="10" id="deposit-amount" class="form-control font-mono" placeholder="100.00" required min="1" />
          </div>

          <div class="modal-footer" style="padding-right:0; padding-left:0; margin-bottom:-1rem;">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('global-modal-backdrop').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Confirm Deposit</button>
          </div>
        </form>
      `,
      onOpen: (body) => {
        body.querySelector('#deposit-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const amount = parseFloat(body.querySelector('#deposit-amount').value);
          Storage.updateGoalDeposit(goal.id, amount);

          // Add transaction record
          State.addTransaction({
            id: generateId(),
            type: 'expense',
            amount,
            description: `Savings Deposit: ${goal.name}`,
            category: 'Shopping',
            date: new Date().toISOString(),
            notes: 'Goal transfer'
          });

          State.reloadFromStorage();
          Toast.success(`Added ${formatCurrency(amount, currency)} to ${goal.name}!`);
          Modal.close();
          renderSavingsView(container);
        });
      }
    });
  };

  let totalTarget = 0;
  let totalSaved = 0;

  const goalCards = goals.map(g => {
    totalTarget += Number(g.targetAmount) || 0;
    totalSaved += Number(g.currentAmount) || 0;

    const percentage = Math.min(100, Math.round(((g.currentAmount || 0) / (g.targetAmount || 1)) * 100));

    return `
      <div class="glass-panel" style="padding:1.5rem; display:flex; flex-direction:column; gap:1.25rem;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <div>
            <div style="font-weight:800; font-size:1.1rem;">${g.name}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">Target Date: ${formatDate(g.targetDate)}</div>
          </div>
          <span class="badge badge-info">${g.category || 'Goal'}</span>
        </div>

        <div style="display:flex; align-items:baseline; justify-content:space-between;">
          <div class="font-mono" style="font-size:1.4rem; font-weight:800; color:var(--brand-primary);">${formatCurrency(g.currentAmount, currency)}</div>
          <div class="font-mono" style="font-size:0.875rem; color:var(--text-secondary);">of ${formatCurrency(g.targetAmount, currency)}</div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.35rem; font-weight:700; color:var(--text-secondary);">
            <span>Progress</span>
            <span>${percentage}%</span>
          </div>
          <div class="progress-bar-container" style="height:10px;">
            <div class="progress-bar-fill success" style="width:${percentage}%;"></div>
          </div>
        </div>

        <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
          <button class="btn btn-primary btn-sm goal-deposit-btn" data-id="${g.id}" style="flex:1;">
            + Deposit
          </button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="view-container">
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:2rem;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Savings Goals</h2>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Track progress towards your long term financial milestones</p>
        </div>

        <button id="add-goal-btn" class="btn btn-primary">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>New Savings Goal</span>
        </button>
      </div>

      <!-- KPI Card -->
      <div class="glass-panel" style="padding:1.5rem; margin-bottom:2rem; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), var(--bg-glass));">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-around; gap:1.5rem; text-align:center;">
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Total Saved Across Goals</div>
            <div class="font-mono" style="font-size:1.75rem; font-weight:800; color:var(--color-income);">${formatCurrency(totalSaved, currency)}</div>
          </div>
          <div style="border-left: 1px solid var(--border-color); height: 40px;"></div>
          <div>
            <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Combined Target Goal</div>
            <div class="font-mono" style="font-size:1.75rem; font-weight:800; color:var(--brand-primary);">${formatCurrency(totalTarget, currency)}</div>
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:1.25rem;">
        ${goalCards}
      </div>
    </div>
  `;

  // Bind Listeners
  document.getElementById('add-goal-btn')?.addEventListener('click', openAddGoalModal);

  container.querySelectorAll('.goal-deposit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const goal = goals.find(g => g.id === id);
      if (goal) openDepositModal(goal);
    });
  });
}
