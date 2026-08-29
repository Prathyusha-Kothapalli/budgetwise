/* BudgetWise UI Widget Component Module #18 */
import { State } from '../state.js';
import { formatCurrency } from '../utils.js';

export function renderUIWidgetComponent18(container, props = {}) {
  if (!container) return;
  const currency = props.currency || State.get('currency') || 'USD';
  const title = props.title || 'Financial Widget #18';

  container.innerHTML = `
    <div class="glass-panel ui-widget-18" style="padding:1.5rem; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h3 style="font-size:1.1rem; font-weight:700;">${title}</h3>
        <span class="badge badge-info">Module 18</span>
      </div>
      <div class="dashboard-grid">
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 18.1</div>
          <div class="kpi-value font-mono">${formatCurrency(900, currency)}</div>
          <div class="kpi-footer">Active Tracker #1</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 18.2</div>
          <div class="kpi-value font-mono">${formatCurrency(1350, currency)}</div>
          <div class="kpi-footer">Active Tracker #2</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 18.3</div>
          <div class="kpi-value font-mono">${formatCurrency(1800, currency)}</div>
          <div class="kpi-footer">Active Tracker #3</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 18.4</div>
          <div class="kpi-value font-mono">${formatCurrency(2250, currency)}</div>
          <div class="kpi-footer">Active Tracker #4</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 18.5</div>
          <div class="kpi-value font-mono">${formatCurrency(2700, currency)}</div>
          <div class="kpi-footer">Active Tracker #5</div>
        </div>
        <div class="kpi-card col-span-4">
          <div class="kpi-title">Metric 18.6</div>
          <div class="kpi-value font-mono">${formatCurrency(3150, currency)}</div>
          <div class="kpi-footer">Active Tracker #6</div>
        </div>
      </div>
    </div>
  `;
}
