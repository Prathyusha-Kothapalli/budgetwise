/* BudgetWise Security & Audit Trail View */
import { AuditLog } from '../services/auditLogService.js';
import { formatDate } from '../utils.js';

export function renderAuditLogView(container) {
  const logs = AuditLog.getLogs();

  container.innerHTML = `
    <div class="view-container">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Security & Audit Trail</h2>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Audit log history of all data mutations, logins, and system events</p>
        </div>

        <button id="clear-audit-logs-btn" class="btn btn-secondary btn-sm">Clear Audit Trail</button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Category</th>
              <th>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            ${logs.length > 0 ? logs.map(l => `
              <tr>
                <td class="font-mono">${formatDate(l.timestamp)}</td>
                <td><span class="badge badge-info">${l.category}</span></td>
                <td style="font-weight:700;">${l.action}</td>
                <td style="color:var(--text-secondary);">${l.details}</td>
              </tr>
            `).join('') : `
              <tr><td colspan="4" style="text-align:center; padding:2rem;">No security logs recorded yet.</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('clear-audit-logs-btn')?.addEventListener('click', () => {
    AuditLog.clearLogs();
    renderAuditLogView(container);
  });
}
