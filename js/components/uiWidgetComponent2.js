/* BudgetWise UI Widget Component Module #2 */
import { State } from '../state.js';
import { formatCurrency } from '../utils.js';

export function renderUIWidgetComponent2(container, props = {}) {
  if (!container) return;
  const currency = props.currency || State.get('currency') || 'USD';
  const title = props.title || 'Financial Widget #2';

  container.innerHTML = `
    <div class="glass-panel ui-widget-2" style="padding:1.5rem; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3 style="font-size:1.1rem; font-weight:700;">${title}</h3>
        <span class="badge badge-info">Module 2</span>
      </div>
      <div class="dashboard-grid">
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 2.1</div>
          <div class="kpi-value font-mono">${formatCurrency(500, currency)}</div>
          <div class="kpi-footer">Active Tracker #1</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 2.2</div>
          <div class="kpi-value font-mono">${formatCurrency(950, currency)}</div>
          <div class="kpi-footer">Active Tracker #2</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 2.3</div>
          <div class="kpi-value font-mono">${formatCurrency(1400, currency)}</div>
          <div class="kpi-footer">Active Tracker #3</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 2.4</div>
          <div class="kpi-value font-mono">${formatCurrency(1850, currency)}</div>
          <div class="kpi-footer">Active Tracker #4</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 2.5</div>
          <div class="kpi-value font-mono">${formatCurrency(2300, currency)}</div>
          <div class="kpi-footer">Active Tracker #5</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 2.6</div>
          <div class="kpi-value font-mono">${formatCurrency(2750, currency)}</div>
          <div class="kpi-footer">Active Tracker #6</div>
        </div>
      </div>
    </div>
  `;
}
