/* BudgetWise Tax Calculator View */
import { State } from '../state.js';
import { formatCurrency } from '../utils.js';
import { estimateTaxLiability } from '../math/financialMath.js';

export function renderTaxCalculatorView(container) {
  const currency = State.get('currency');
  let grossIncome = 85000;
  let filingStatus = 'single';

  const render = () => {
    const taxRes = estimateTaxLiability(grossIncome, filingStatus);

    container.innerHTML = `
      <div class="view-container">
        <div style="margin-bottom:2rem;">
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Income Tax Estimator</h2>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Estimate your federal tax liability, effective rate, and net paycheck</p>
        </div>

        <div class="dashboard-grid">
          <div class="glass-panel col-span-6" style="padding:1.5rem;">
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1.25rem;">Income & Filing Details</h3>
            
            <div class="form-group">
              <label class="form-label">Gross Annual Income (${currency})</label>
              <input type="number" step="1000" id="tax-gross-input" class="form-control font-mono" value="${grossIncome}" />
            </div>

            <div class="form-group">
              <label class="form-label">Filing Status</label>
              <select id="tax-status-select" class="form-control">
                <option value="single" ${filingStatus === 'single' ? 'selected' : ''}>Single</option>
                <option value="joint" ${filingStatus === 'joint' ? 'selected' : ''}>Married Filing Jointly</option>
              </select>
            </div>
          </div>

          <div class="glass-panel col-span-6" style="padding:1.5rem; background: linear-gradient(135deg, var(--bg-glass), var(--brand-primary-light));">
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1.25rem;">Estimated Tax Summary</h3>

            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                <span>Estimated Federal Tax:</span>
                <span class="font-mono" style="font-weight:700; color:var(--color-expense);">${formatCurrency(taxRes.estimatedTax, currency)}</span>
              </div>

              <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
                <span>Effective Tax Rate:</span>
                <span class="font-mono" style="font-weight:700;">${taxRes.effectiveTaxRate}%</span>
              </div>

              <hr style="border:0; border-top:1px solid var(--border-color);" />

              <div style="display:flex; justify-content:space-between; font-size:1.1rem; font-weight:800;">
                <span>Net Annual Take-Home:</span>
                <span class="font-mono" style="color:var(--color-income);">${formatCurrency(taxRes.netTakeHome, currency)}</span>
              </div>

              <div style="display:flex; justify-content:space-between; font-size:0.95rem; color:var(--text-secondary);">
                <span>Estimated Monthly Paycheck:</span>
                <span class="font-mono" style="font-weight:700;">${formatCurrency(taxRes.netTakeHome / 12, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('tax-gross-input')?.addEventListener('input', (e) => {
      grossIncome = parseFloat(e.target.value) || 0;
      render();
    });

    document.getElementById('tax-status-select')?.addEventListener('change', (e) => {
      filingStatus = e.target.value;
      render();
    });
  };

  render();
}
