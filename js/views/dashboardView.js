/* BudgetWise Financial Overview Dashboard View */
import { State } from '../state.js';
import { CATEGORIES } from '../config.js';
import { formatCurrency, formatDate, calculateSummary, calculateCategoryTotals, calculateMonthlyTrends, calculateHealthScore, escapeHTML } from '../utils.js';

export function renderDashboardView(container) {
  const currency = State.get('currency');
  const transactions = State.get('transactions') || [];
  const budgets = State.get('budgets') || [];
  const user = State.get('user');

  // Summary calculations
  const summary = calculateSummary(transactions);

  // Current month totals
  const now = new Date();
  const currentMonthTxs = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  const monthSummary = calculateSummary(currentMonthTxs);

  // Health Score Calculation
  const healthScore = calculateHealthScore(monthSummary);

  // Category Breakdown for current month
  const categoryTotals = calculateCategoryTotals(currentMonthTxs, 'expense');

  // 6 Month Trend Data
  const trendData = calculateMonthlyTrends(transactions, 6);

  // Recent 5 transactions
  const recentTxs = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  container.innerHTML = `
    <div class="view-container">
      <!-- Welcome Header -->
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:1.75rem;">
        <div>
          <h2 style="font-size:1.6rem; font-weight:800; color:var(--text-primary);">Hello, ${user ? user.name : 'Alex'}! 👋</h2>
          <p style="font-size:0.9rem; color:var(--text-secondary);">Here is your financial pulse and real-time spending insights</p>
        </div>

        <button id="dash-add-tx-btn" class="btn btn-primary">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Quick Transaction</span>
        </button>
      </div>

      <!-- KPI Stats Grid -->
      <div class="dashboard-grid">
        <!-- Net Balance -->
        <div class="kpi-card col-span-3">
          <div class="kpi-header">
            <span class="kpi-title">Total Net Balance</span>
            <div class="kpi-icon" style="background:var(--brand-primary-light); color:var(--brand-primary);">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m-9-1h18"/></svg>
            </div>
          </div>
          <div class="kpi-value font-mono">${formatCurrency(summary.netBalance, currency)}</div>
          <div class="kpi-footer">
            <span class="kpi-trend positive">↑ All time</span>
            <span>cumulative savings</span>
          </div>
        </div>

        <!-- Monthly Income -->
        <div class="kpi-card col-span-3">
          <div class="kpi-header">
            <span class="kpi-title">Monthly Income</span>
            <div class="kpi-icon" style="background:var(--color-income-bg); color:var(--color-income);">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/></svg>
            </div>
          </div>
          <div class="kpi-value font-mono" style="color:var(--color-income);">${formatCurrency(monthSummary.totalIncome, currency)}</div>
          <div class="kpi-footer">
            <span class="kpi-trend positive">↑ Paycheck</span>
            <span>this month</span>
          </div>
        </div>

        <!-- Monthly Expense -->
        <div class="kpi-card col-span-3">
          <div class="kpi-header">
            <span class="kpi-title">Monthly Expenses</span>
            <div class="kpi-icon" style="background:var(--color-expense-bg); color:var(--color-expense);">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"/></svg>
            </div>
          </div>
          <div class="kpi-value font-mono" style="color:var(--color-expense);">${formatCurrency(monthSummary.totalExpense, currency)}</div>
          <div class="kpi-footer">
            <span class="kpi-trend negative">↓ Outflow</span>
            <span>this month</span>
          </div>
        </div>

        <!-- Savings Rate & Health Score -->
        <div class="kpi-card col-span-3">
          <div class="kpi-header">
            <span class="kpi-title">Savings Rate</span>
            <div class="kpi-icon" style="background:var(--color-info-bg); color:var(--color-info);">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
          <div class="kpi-value font-mono">${monthSummary.savingsRate}%</div>
          <div class="kpi-footer">
            <span style="font-weight:700; color:var(--brand-primary);">Financial Health: ${healthScore}/100</span>
          </div>
        </div>
      </div>

      <!-- Main Analytics Row -->
      <div class="dashboard-grid">
        <!-- Cash Flow Bar Chart -->
        <div class="chart-card col-span-8">
          <div class="chart-header">
            <h3 class="chart-title">Cash Flow & Monthly Trends</h3>
            <span style="font-size:0.8rem; color:var(--text-muted);">Last 6 Months</span>
          </div>
          <div class="chart-wrapper" style="display:flex; align-items:flex-end; justify-content:space-around; padding-top:2rem; min-height:240px;">
            ${trendData.map(d => {
              const maxVal = Math.max(...trendData.map(t => Math.max(t.income, t.expense))) || 1;
              const incHeight = Math.max(12, Math.round((d.income / maxVal) * 180));
              const expHeight = Math.max(12, Math.round((d.expense / maxVal) * 180));

              return `
                <div style="display:flex; flex-direction:column; align-items:center; gap:0.5rem; flex:1;">
                  <div style="display:flex; align-items:flex-end; gap:6px;">
                    <div title="Income: ${formatCurrency(d.income, currency)}" style="width:18px; height:${incHeight}px; background:var(--color-income); border-radius:4px 4px 0 0; transition:height 300ms ease;"></div>
                    <div title="Expense: ${formatCurrency(d.expense, currency)}" style="width:18px; height:${expHeight}px; background:var(--color-expense); border-radius:4px 4px 0 0; transition:height 300ms ease;"></div>
                  </div>
                  <span style="font-size:0.75rem; font-weight:700; color:var(--text-secondary);">${d.label}</span>
                </div>
              `;
            }).join('')}
          </div>
          <div style="display:flex; justify-content:center; gap:2rem; font-size:0.8rem; margin-top:1rem;">
            <div style="display:flex; align-items:center; gap:0.5rem;"><div style="width:12px; height:12px; background:var(--color-income); border-radius:3px;"></div><span>Income</span></div>
            <div style="display:flex; align-items:center; gap:0.5rem;"><div style="width:12px; height:12px; background:var(--color-expense); border-radius:3px;"></div><span>Expenses</span></div>
          </div>
        </div>

        <!-- Financial Health Score & Category Breakdown -->
        <div class="chart-card col-span-4" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div class="chart-header">
            <h3 class="chart-title">Financial Health Index</h3>
          </div>

          <div class="health-score-container">
            <div class="health-gauge-ring">
              <svg width="100" height="100" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--bg-tertiary)" stroke-width="3.5" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--brand-primary)" stroke-dasharray="${healthScore}, 100" stroke-width="3.5" />
              </svg>
              <div class="health-gauge-score">${healthScore}</div>
            </div>
            <div>
              <div style="font-weight:800; font-size:1.1rem; color:var(--brand-primary);">
                ${healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Healthy' : 'Needs Review'}
              </div>
              <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">
                Based on your ${monthSummary.savingsRate}% savings rate & active budgets.
              </p>
            </div>
          </div>

          <div style="margin-top:1rem;">
            <h4 style="font-size:0.9rem; font-weight:700; margin-bottom:0.75rem;">Top Category Outflows</h4>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${Object.keys(categoryTotals).slice(0, 3).map(catKey => {
                const amt = categoryTotals[catKey];
                const catObj = CATEGORIES[catKey] || { name: catKey, color: '#6366f1' };
                return `
                  <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.85rem;">
                    <span style="display:flex; align-items:center; gap:0.5rem;">
                      <span style="width:8px; height:8px; border-radius:50%; background:${catObj.color};"></span>
                      ${catObj.name}
                    </span>
                    <span class="font-mono" style="font-weight:700;">${formatCurrency(amt, currency)}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions Table -->
      <div class="chart-card col-span-12" style="margin-top:0.5rem;">
        <div class="chart-header" style="margin-bottom:1rem;">
          <h3 class="chart-title">Recent Transactions</h3>
          <a href="#transactions" id="view-all-tx-link" style="color:var(--brand-primary); font-weight:700; font-size:0.85rem; text-decoration:none;">View All Transactions →</a>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th style="text-align:right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${recentTxs.map(t => `
                <tr>
                  <td class="font-mono">${formatDate(t.date)}</td>
                  <td style="font-weight:600;">${escapeHTML(t.description)}</td>
                  <td><span class="badge" style="background:${CATEGORIES[t.category]?.color || '#6366f1'}15; color:${CATEGORIES[t.category]?.color || '#6366f1'};">${t.category}</span></td>
                  <td><span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">${t.type}</span></td>
                  <td style="text-align:right;" class="font-mono"><span style="font-weight:700; color:${t.type === 'income' ? 'var(--color-income)' : 'var(--text-primary)'};">${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount, currency)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Handlers
  document.getElementById('dash-add-tx-btn')?.addEventListener('click', () => {
    State.set('currentView', 'transactions');
  });

  document.getElementById('view-all-tx-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    State.set('currentView', 'transactions');
  });
}
