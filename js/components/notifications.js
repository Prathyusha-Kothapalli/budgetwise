/* BudgetWise Notification Drawer Component */
import { State } from '../state.js';
import { Storage } from '../storage.js';
import { formatDate } from '../utils.js';

export function renderNotificationDrawer() {
  let drawer = document.getElementById('notification-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'notification-drawer';
    drawer.className = 'notification-drawer';
    document.body.appendChild(drawer);
  }

  const notifications = State.get('notifications') || [];

  drawer.innerHTML = `
    <div class="drawer-header">
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <svg width="20" height="20" fill="none" stroke="var(--brand-primary)" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
        <h3 style="font-size:1.1rem; font-weight:700;">Notifications</h3>
      </div>
      <button id="close-drawer-btn" class="btn-icon">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="drawer-content">
      ${notifications.length > 0 ? notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span style="font-weight:700; font-size:0.875rem;">${n.title}</span>
            <span style="font-size:0.7rem; color:var(--text-muted);">${formatDate(n.timestamp, 'short')}</span>
          </div>
          <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">${n.message}</p>
        </div>
      `).join('') : `
        <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
          No new notifications.
        </div>
      `}
    </div>
  `;

  document.getElementById('close-drawer-btn')?.addEventListener('click', () => {
    drawer.classList.remove('open');
  });

  drawer.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      Storage.markNotificationRead(id);
      State.reloadFromStorage();
    });
  });
}
