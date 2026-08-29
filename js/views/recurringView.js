/* BudgetWise Recurring Bills & Income View */
import { State } from '../state.js';
import { formatCurrency, formatDate, generateId } from '../utils.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';
import { Storage } from '../storage.js';

export function renderRecurringView(container) {
  const currency = State.get('currency');
  const recurringList = State.get('recurring') || [];

  const openAddRecurringModal = () => {
    Modal.open({
      title: 'Add Recurring Bill or Income',
      bodyHTML: `
        <form id="add-recurring-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Type</label>
              <select id="rec-type" class="form-control">
                <option value="expense">Recurring Expense (Bill)</option>
                <option value="income">Recurring Income (Salary)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Amount (${currency})</label>
              <input type="number" step="0.01" id="rec-amount" class="form-control font-mono" placeholder="50.00" required min="0.01" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <input type="text" id="rec-description" class="form-control" placeholder="e.g. Electricity Bill" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category</label>
              <input type="text" id="rec-category" class="form-control" value="Bills" required />
            </div>
            <div class="form-group">
              <label class="form-label">Day of Month Due</label>
              <input type="number" id="rec-day" class="form-control" value="1" min="1" max="31" required />
            </div>
          </div>

          <div class="modal-footer" style="padding-right:0; padding-left:0; margin-bottom:-1rem;">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('global-modal-backdrop').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Recurring Item</button>
          </div>
        </form>
      `,
      onOpen: (body) => {
        body.querySelector('#add-recurring-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const type = body.querySelector('#rec-type').value;
          const amount = parseFloat(body.querySelector('#rec-amount').value);
          const description = body.querySelector('#rec-description').value.trim();
          const category = body.querySelector('#rec-category').value.trim();
          const dayOfMonth = parseInt(body.querySelector('#rec-day').value, 10);

          const list = Storage.getRecurring();
          list.push({
            id: generateId(),
            description,
            amount,
            type,
            category,
            frequency: 'monthly',
            dayOfMonth,
            nextDueDate: new Date(new Date().getFullYear(), new Date().getMonth(), dayOfMonth).toISOString()
          });

          Storage.saveRecurring(list);
          State.reloadFromStorage();
          Toast.success(`Added recurring ${type}: ${description}`);
          Modal.close();
          renderRecurringView(container);
        });
      }
    });
  };

  const handlePostTransaction = (item) => {
    State.addTransaction({
      id: generateId(),
      type: item.type,
      amount: item.amount,
      description: `[Auto-Post] ${item.description}`,
      category: item.category,
      date: new Date().toISOString(),
      notes: `Recurring ${item.frequency} payment`
    });

    Toast.success(`Posted transaction for ${item.description}!`);
  };

  container.innerHTML = `
    <div class="view-container">
      <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:2rem;">
        <div>
          <h2 style="font-size:1.4rem; font-weight:800; color:var(--text-primary);">Recurring Bills & Income</h2>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Manage automated subscriptions, salaries, and recurring bill schedules</p>
        </div>

        <button id="add-recurring-btn" class="btn btn-primary">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>Add Recurring Schedule</span>
        </button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Schedule</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th style="text-align:right;">Amount</th>
              <th style="text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${recurringList.length > 0 ? recurringList.map(r => `
              <tr>
                <td>
                  <span class="badge badge-info">Monthly (Day ${r.dayOfMonth || 1})</span>
                </td>
                <td style="font-weight:700;">${r.description}</td>
                <td>${r.category}</td>
                <td>
                  <span class="badge ${r.type === 'income' ? 'badge-income' : 'badge-expense'}">${r.type}</span>
                </td>
                <td style="text-align:right;" class="font-mono">
                  <span style="font-weight:700; color:${r.type === 'income' ? 'var(--color-income)' : 'var(--text-primary)'};">
                    ${r.type === 'income' ? '+' : '-'}${formatCurrency(r.amount, currency)}
                  </span>
                </td>
                <td style="text-align:center;">
                  <button class="btn btn-secondary btn-sm post-rec-btn" data-id="${r.id}">
                    Post Payment
                  </button>
                </td>
              </tr>
            `).join('') : `
              <tr><td colspan="6" style="text-align:center; padding:2rem;">No recurring items configured.</td></tr>
            `}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById('add-recurring-btn')?.addEventListener('click', openAddRecurringModal);

  container.querySelectorAll('.post-rec-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = recurringList.find(r => r.id === id);
      if (item) handlePostTransaction(item);
    });
  });
}
