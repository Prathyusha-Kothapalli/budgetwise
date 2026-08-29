/* BudgetWise Visual Reports & Analytics View */
import { State } from '../state.js';
import { CATEGORIES } from '../config.js';
import { formatCurrency, calculateMonthlyTrends, calculateCategoryTotals, exportToCSV } from '../utils.js';

export function renderReportsView(container) {
  const currency = State.get('currency');
  const transactions = State.get('transactions') || [];

  const trendData12 = calculateMonthlyTrends(transactions, 12);
  const categoryTotals = calculateCategoryTotals(transactions, 'expense');

  // Compute average monthly net savings for forecast
  const totalNet = trendData12.reduce((acc, curr) => acc + curr.net, 0);
  const avgMonthlySavings = Math.round(totalNet / (trendData12.length || 1));

  container.innerHTML = `
    <div class="view-container">
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:2rem;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Reports & Interactive Analytics</h2>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Deep dive into 12 months financial trends and trajectory forecasts</p>
        </div>

        <button id="reports-export-btn" class="btn btn-secondary">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          <span>Export Analytics Report</span>
        </button>
      </div>

      <!-- 12 Month Trend Chart -->
      <div class="chart-card" style="margin-bottom:2rem;">
        <div class="chart-header">
          <h3 class="chart-title">12-Month Financial History (Income vs Expense)</h3>
        </div>
        
        <div style="display:flex; align-items:flex-end; justify-content:space-between; gap:8px; padding-top:2rem; min-height:280px; overflow-x:auto;">
          ${trendData12.map(d => {
            const maxVal = Math.max(...trendData12.map(t => Math.max(t.income, t.expense))) || 1;
            const incH = Math.max(10, Math.round((d.income / maxVal) * 200));
            const expH = Math.max(10, Math.round((d.expense / maxVal) * 200));

            return `
              <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem; flex:1; min-width:40px;">
                <div style="display:flex; align-items:flex-end; gap:4px;">
                  <div title="Income: ${formatCurrency(d.income, currency)}" style="width:14px; height:${incH}px; background:var(--color-income); border-radius:3px 3px 0 0;"></div>
                  <div title="Expense: ${formatCurrency(d.expense, currency)}" style="width:14px; height:${expH}px; background:var(--color-expense); border-radius:3px 3px 0 0;"></div>
                </div>
                <span style="font-size:0.7rem; font-weight:700; color:var(--text-muted);">${d.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Category Outflow Breakdown Table -->
      <div class="dashboard-grid">
        <div class="chart-card col-span-6">
          <h3 class="chart-title" style="margin-bottom:1rem;">Historical Spending Distribution</h3>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${Object.keys(CATEGORIES).map(catKey => {
              const catObj = CATEGORIES[catKey];
              const spent = categoryTotals[catKey] || 0;
              const totalExp = Object.values(categoryTotals).reduce((a,b)=>a+b, 0) || 1;
              const pct = Math.round((spent / totalExp) * 100);

              return `
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:0.25rem;">
                    <span>${catObj.name}</span>
                    <span class="font-mono">${formatCurrency(spent, currency)} (${pct}%)</span>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width:${pct}%; background:${catObj.color};"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Net Worth Projection -->
        <div class="chart-card col-span-6" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <h3 class="chart-title">6-Month Net Worth Trajectory</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.5rem;">
              Based on your current average monthly savings of <strong class="font-mono">${formatCurrency(avgMonthlySavings, currency)}/mo</strong>, here is your projected net worth growth:
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.75rem; margin:1.5rem 0;">
            ${[1, 2, 3, 4, 5, 6].map(monthOffset => {
              const projectedDate = new Date(new Date().getFullYear(), new Date().getMonth() + monthOffset, 1);
              const dateStr = projectedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
              const projectedAmount = (trendData12.reduce((acc, curr) => acc + curr.net, 0)) + (avgMonthlySavings * monthOffset);

              return `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:var(--bg-tertiary); border-radius:var(--radius-md);">
                  <span style="font-weight:700; font-size:0.85rem;">+${monthOffset} Month (${dateStr})</span>
                  <span class="font-mono" style="font-weight:800; color:var(--brand-primary);">${formatCurrency(projectedAmount, currency)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('reports-export-btn')?.addEventListener('click', () => {
    const rows = trendData12.map(t => ({
      Month: t.label,
      Income: t.income,
      Expense: t.expense,
      NetSavings: t.net
    }));
    exportToCSV('budgetwise_monthly_analytics.csv', rows);
  });
}
