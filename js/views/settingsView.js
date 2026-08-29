/* BudgetWise Settings & Data Management View */
import { State } from '../state.js';
import { Storage } from '../storage.js';
import { CURRENCIES } from '../config.js';
import { downloadJSON, escapeHTML } from '../utils.js';
import { Toast } from '../components/toast.js';

export function renderSettingsView(container) {
  const user = State.get('user');
  const theme = State.get('theme');
  const currency = State.get('currency');

  container.innerHTML = `
    <div class="view-container">
      <div style="margin-bottom:2rem;">
        <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Settings & Preferences</h2>
        <p style="font-size:0.875rem; color:var(--text-secondary);">Manage account profile, appearance, default currency, and backup/restore</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:1.5rem; max-width:800px;">
        <!-- Account Profile Form -->
        <div class="glass-panel" style="padding:1.5rem;">
          <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1.25rem;">User Profile</h3>
          <form id="settings-profile-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" id="settings-name" class="form-control" value="${user ? escapeHTML(user.name) : ''}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" id="settings-email" class="form-control" value="${user ? escapeHTML(user.email) : ''}" required />
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-sm">Save Profile</button>
          </form>
        </div>

        <!-- Preferences -->
        <div class="glass-panel" style="padding:1.5rem;">
          <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1.25rem;">Preferences</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Theme Mode</label>
              <select id="settings-theme-select" class="form-control">
                <option value="dark" ${theme === 'dark' ? 'selected' : ''}>Dark Mode (Sleek)</option>
                <option value="light" ${theme === 'light' ? 'selected' : ''}>Light Mode (Clean)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Default Currency</label>
              <select id="settings-currency-select" class="form-control">
                ${Object.values(CURRENCIES).map(c => `
                  <option value="${c.code}" ${c.code === currency ? 'selected' : ''}>${c.symbol} - ${c.name} (${c.code})</option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

        <!-- Data Management & Backups -->
        <div class="glass-panel" style="padding:1.5rem; border-color:var(--brand-primary-light);">
          <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;">Data Management</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1.25rem;">
            Export complete financial data as a JSON file or restore from a previous backup.
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:1rem;">
            <button id="settings-export-json-btn" class="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Backup Data (JSON)</span>
            </button>

            <label class="btn btn-outline" style="cursor:pointer; margin:0;">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              <span>Restore Data (JSON)</span>
              <input type="file" id="settings-restore-file" accept=".json" style="display:none;" />
            </label>

            <button id="settings-reset-demo-btn" class="btn btn-danger" style="margin-left:auto;">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>Reset Demo Seed Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Event Handlers
  document.getElementById('settings-profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('settings-name').value.trim();
    const email = document.getElementById('settings-email').value.trim();
    const updatedUser = { ...user, name, email };
    Storage.setUser(updatedUser);
    State.set('user', updatedUser);
    Toast.success('Profile updated successfully');
  });

  document.getElementById('settings-theme-select')?.addEventListener('change', (e) => {
    State.setTheme(e.target.value);
    Toast.info(`Switched to ${e.target.value} theme mode`);
  });

  document.getElementById('settings-currency-select')?.addEventListener('change', (e) => {
    State.setCurrency(e.target.value);
    Toast.info(`Default currency set to ${e.target.value}`);
  });

  document.getElementById('settings-export-json-btn')?.addEventListener('click', () => {
    const backup = Storage.exportFullBackup();
    downloadJSON(`budgetwise_backup_${new Date().toISOString().split('T')[0]}.json`, backup);
    Toast.success('Database backup downloaded');
  });

  document.getElementById('settings-restore-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        Storage.importFullBackup(jsonData);
        State.reloadFromStorage();
        Toast.success('Data restored successfully!');
      } catch (err) {
        Toast.error('Failed to import backup: Invalid JSON file');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('settings-reset-demo-btn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data back to the clean Demo account seed? Any custom changes will be overwritten.')) {
      Storage.resetToDemo();
      State.reloadFromStorage();
      Toast.success('Re-seeded clean demo data with 100+ transactions!');
    }
  });
}
