/* BudgetWise Debt Payoff Snowball vs Avalanche View */
import { State } from '../state.js';
import { formatCurrency } from '../utils.js';
import { calculateDebtPayoffSchedule } from '../math/financialMath.js';

export function renderDebtView(container) {
  const currency = State.get('currency');
  let extraBudget = 250;
  let strategy = 'avalanche';

  const debts = [
    { name: 'Credit Card A', balance: 4500, rate: 21.99, minPayment: 135 },
    { name: 'Car Auto Loan', balance: 12500, rate: 5.49, minPayment: 285 },
    { name: 'Personal Student Loan', balance: 8200, rate: 6.80, minPayment: 110 }
  ];

  const render = () => {
    const result = calculateDebtPayoffSchedule(debts, extraBudget, strategy);

    container.innerHTML = `
      <div class="view-container">
        <div style="margin-bottom:2rem;">
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Debt Payoff Accelerator</h2>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Compare Debt Avalanche (highest interest rate first) vs Debt Snowball (lowest balance first)</p>
        </div>

        <div class="dashboard-grid">
          <div class="glass-panel col-span-5" style="padding:1.5rem;">
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1.25rem;">Payoff Strategy Settings</h3>

            <div class="form-group">
              <label class="form-label">Strategy Method</label>
              <select id="debt-strategy-select" class="form-control">
                <option value="avalanche" ${strategy === 'avalanche' ? 'selected' : ''}>Debt Avalanche (Save Most Interest)</option>
                <option value="snowball" ${strategy === 'snowball' ? 'selected' : ''}>Debt Snowball (Quickest Wins)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Monthly Extra Paydown (${currency})</label>
              <input type="number" step="50" id="debt-extra-input" class="form-control font-mono" value="${extraBudget}" />
            </div>

            <div style="margin-top:1.5rem;">
              <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:0.75rem;">Active Debts</h4>
              ${debts.map(d => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem; background:var(--bg-tertiary); border-radius:var(--radius-md); margin-bottom:0.5rem; font-size:0.85rem;">
                  <div>
                    <div style="font-weight:700;">${d.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${d.rate}% APR | Min: ${formatCurrency(d.minPayment, currency)}</div>
                  </div>
                  <div class="font-mono" style="font-weight:800; color:var(--color-expense);">${formatCurrency(d.balance, currency)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="glass-panel col-span-7" style="padding:1.5rem; background: linear-gradient(135deg, var(--bg-glass), var(--brand-primary-light));">
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1.25rem;">Payoff Plan Results</h3>

            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem; margin-bottom:1.5rem; text-align:center;">
              <div style="padding:1rem; background:var(--bg-secondary); border-radius:var(--radius-md);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Total Debt Freedom Time</div>
                <div class="font-mono" style="font-weight:800; font-size:1.5rem; color:var(--brand-primary);">${result.yearsToPayoff} Years</div>
                <div style="font-size:0.75rem; color:var(--text-secondary);">${result.monthsToPayoff} monthly payments</div>
              </div>

              <div style="padding:1rem; background:var(--bg-secondary); border-radius:var(--radius-md);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Total Interest Paid</div>
                <div class="font-mono" style="font-weight:800; font-size:1.5rem; color:var(--color-expense);">${formatCurrency(result.totalInterestPaid, currency)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('debt-strategy-select')?.addEventListener('change', (e) => {
      strategy = e.target.value;
      render();
    });

    document.getElementById('debt-extra-input')?.addEventListener('input', (e) => {
      extraBudget = parseFloat(e.target.value) || 0;
      render();
    });
  };

  render();
}
