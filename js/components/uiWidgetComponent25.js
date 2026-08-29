/* BudgetWise UI Widget Component Module #25 */
import { State } from '../state.js';
import { formatCurrency } from '../utils.js';

export function renderUIWidgetComponent25(container, props = {}) {
  if (!container) return;
  const currency = props.currency || State.get('currency') || 'USD';
  const title = props.title || 'Financial Widget #25';

  container.innerHTML = `
    <div class="glass-panel ui-widget-25" style="padding:1.5rem; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3 style="font-size:1.1rem; font-weight:700;">${title}</h3>
        <span class="badge badge-info">Module 25</span>
      </div>
      <div class="dashboard-grid">
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 25.1</div>
          <div class="kpi-value font-mono">${formatCurrency(1075, currency)}</div>
          <div class="kpi-footer">Active Tracker #1</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 25.2</div>
          <div class="kpi-value font-mono">${formatCurrency(1525, currency)}</div>
          <div class="kpi-footer">Active Tracker #2</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 25.3</div>
          <div class="kpi-value font-mono">${formatCurrency(1975, currency)}</div>
          <div class="kpi-footer">Active Tracker #3</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 25.4</div>
          <div class="kpi-value font-mono">${formatCurrency(2425, currency)}</div>
          <div class="kpi-footer">Active Tracker #4</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 25.5</div>
          <div class="kpi-value font-mono">${formatCurrency(2875, currency)}</div>
          <div class="kpi-footer">Active Tracker #5</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 25.6</div>
          <div class="kpi-value font-mono">${formatCurrency(3325, currency)}</div>
          <div class="kpi-footer">Active Tracker #6</div>
        </div>
      </div>
    </div>
  `;
}
