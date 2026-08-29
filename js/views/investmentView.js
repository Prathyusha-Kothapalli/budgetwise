/* BudgetWise Investment & Compound Interest Simulator View */
import { State } from '../state.js';
import { formatCurrency } from '../utils.js';
import { calculateCompoundInterest, runMonteCarloSimulation } from '../math/financialMath.js';
import { renderLineChartSVG } from '../math/chartEngine.js';

export function renderInvestmentView(container) {
  const currency = State.get('currency');
  let principal = 10000;
  let monthlyDeposit = 500;
  let annualRate = 0.08;
  let years = 10;

  const render = () => {
    const result = calculateCompoundInterest({ principal, monthlyContribution: monthlyDeposit, annualRate, years });
    const mcResult = runMonteCarloSimulation({ initialAmount: principal, monthlyDeposit, years, expectedReturn: annualRate, volatility: 0.15, runs: 100 });

    const chartSeries = result.schedule.map(s => ({
      label: `Yr ${s.year}`,
      value: s.balance
    }));

    container.innerHTML = `
      <div class="view-container">
        <div style="margin-bottom:2rem;">
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Investment Growth & Monte Carlo Simulator</h2>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Project wealth accumulation with compound interest and market volatility scenarios</p>
        </div>

        <div class="dashboard-grid">
          <!-- Form Inputs -->
          <div class="glass-panel col-span-4" style="padding:1.5rem;">
            <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1.25rem;">Investment Parameters</h3>

            <div class="form-group">
              <label class="form-label">Initial Balance (${currency})</label>
              <input type="number" step="500" id="inv-principal" class="form-control font-mono" value="${principal}" />
            </div>

            <div class="form-group">
              <label class="form-label">Monthly Contribution (${currency})</label>
              <input type="number" step="50" id="inv-deposit" class="form-control font-mono" value="${monthlyDeposit}" />
            </div>

            <div class="form-group">
              <label class="form-label">Expected Annual Return (%)</label>
              <input type="number" step="0.5" id="inv-rate" class="form-control font-mono" value="${annualRate * 100}" />
            </div>

            <div class="form-group">
              <label class="form-label">Time Horizon (Years)</label>
              <input type="number" id="inv-years" class="form-control font-mono" value="${years}" min="1" max="40" />
            </div>
          </div>

          <!-- Chart & Outcomes -->
          <div class="glass-panel col-span-8" style="padding:1.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
              <h3 style="font-size:1.1rem; font-weight:700;">Projected Wealth Trajectory</h3>
              <div class="font-mono" style="font-size:1.4rem; font-weight:800; color:var(--color-income);">${formatCurrency(result.finalBalance, currency)}</div>
            </div>

            ${renderLineChartSVG(chartSeries, { color: '#10b981', height: 200 })}

            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-top:1.5rem; text-align:center;">
              <div style="padding:0.75rem; background:var(--bg-tertiary); border-radius:var(--radius-md);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Total Deposited</div>
                <div class="font-mono" style="font-weight:700; font-size:1.1rem;">${formatCurrency(result.totalDeposited, currency)}</div>
              </div>

              <div style="padding:0.75rem; background:var(--bg-tertiary); border-radius:var(--radius-md);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Compound Interest</div>
                <div class="font-mono" style="font-weight:700; font-size:1.1rem; color:var(--color-income);">${formatCurrency(result.totalInterestEarned, currency)}</div>
              </div>

              <div style="padding:0.75rem; background:var(--bg-tertiary); border-radius:var(--radius-md);">
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">Monte Carlo Median</div>
                <div class="font-mono" style="font-weight:700; font-size:1.1rem; color:var(--brand-primary);">${formatCurrency(mcResult.medianP50, currency)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('inv-principal')?.addEventListener('input', (e) => {
      principal = parseFloat(e.target.value) || 0;
      render();
    });

    document.getElementById('inv-deposit')?.addEventListener('input', (e) => {
      monthlyDeposit = parseFloat(e.target.value) || 0;
      render();
    });

    document.getElementById('inv-rate')?.addEventListener('input', (e) => {
      annualRate = (parseFloat(e.target.value) || 0) / 100;
      render();
    });

    document.getElementById('inv-years')?.addEventListener('input', (e) => {
      years = parseInt(e.target.value, 10) || 1;
      render();
    });
  };

  render();
}
