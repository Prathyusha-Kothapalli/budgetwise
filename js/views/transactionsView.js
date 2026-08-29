/* BudgetWise Income & Expense Transactions CRUD View */
import { State } from '../state.js';
import { CATEGORIES, INCOME_SOURCES } from '../config.js';
import { formatCurrency, formatDate, generateId, exportToCSV, escapeHTML } from '../utils.js';
import { Modal } from '../components/modal.js';
import { Toast } from '../components/toast.js';

export function renderTransactionsView(container) {
  let searchFilter = '';
  let typeFilter = 'all';
  let categoryFilter = 'all';
  let sortBy = 'date_desc';
  let currentPage = 1;
  let pageSize = 15;

  const getFilteredTransactions = () => {
    const txs = State.get('transactions') || [];
    return txs.filter(t => {
      // Type filter
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      
      // Category filter
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;

      // Search filter
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const matchDesc = t.description && t.description.toLowerCase().includes(q);
        const matchCategory = t.category && t.category.toLowerCase().includes(q);
        const matchNotes = t.notes && t.notes.toLowerCase().includes(q);
        const matchAmount = String(t.amount).includes(q);
        if (!matchDesc && !matchCategory && !matchNotes && !matchAmount) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'date_desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date_asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount_desc') return Number(b.amount) - Number(a.amount);
      if (sortBy === 'amount_asc') return Number(a.amount) - Number(b.amount);
      if (sortBy === 'category') return (a.category || '').localeCompare(b.category || '');
      return 0;
    });
  };

  const openAddEditModal = (existingTx = null) => {
    const isEdit = !!existingTx;
    const currency = State.get('currency');

    Modal.open({
      title: isEdit ? 'Edit Transaction' : 'Add New Transaction',
      bodyHTML: `
        <form id="tx-modal-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Transaction Type</label>
              <select id="tx-type" class="form-control" ${isEdit ? 'disabled' : ''}>
                <option value="expense" ${existingTx?.type === 'expense' ? 'selected' : ''}>Expense</option>
                <option value="income" ${existingTx?.type === 'income' ? 'selected' : ''}>Income</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Amount</label>
              <input type="number" step="0.01" id="tx-amount" class="form-control font-mono" placeholder="0.00" value="${existingTx ? existingTx.amount : ''}" required min="0.01" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <input type="text" id="tx-description" class="form-control" placeholder="e.g. Whole Foods Groceries" value="${existingTx ? escapeHTML(existingTx.description) : ''}" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Category / Source</label>
              <select id="tx-category" class="form-control">
                ${Object.keys(CATEGORIES).map(catKey => `
                  <option value="${catKey}" ${existingTx?.category === catKey ? 'selected' : ''}>${CATEGORIES[catKey].name}</option>
                `).join('')}
                ${INCOME_SOURCES.map(src => `
                  <option value="${src}" ${existingTx?.category === src ? 'selected' : ''}>${src}</option>
                `).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" id="tx-date" class="form-control" value="${existingTx ? formatDate(existingTx.date, 'iso') : formatDate(new Date(), 'iso')}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notes (Optional)</label>
            <textarea id="tx-notes" class="form-control" rows="2" placeholder="Additional details or receipt ref...">${existingTx && existingTx.notes ? escapeHTML(existingTx.notes) : ''}</textarea>
          </div>

          <div class="modal-footer" style="padding-right:0; padding-left:0; margin-bottom:-1rem;">
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('global-modal-backdrop').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Add Transaction'}</button>
          </div>
        </form>
      `,
      onOpen: (body) => {
        const form = body.querySelector('#tx-modal-form');
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const type = body.querySelector('#tx-type').value;
          const amount = parseFloat(body.querySelector('#tx-amount').value);
          const description = body.querySelector('#tx-description').value.trim();
          const category = body.querySelector('#tx-category').value;
          const date = body.querySelector('#tx-date').value;
          const notes = body.querySelector('#tx-notes').value.trim();

          if (isEdit) {
            State.updateTransaction({
              ...existingTx,
              amount,
              description,
              category,
              date: new Date(date).toISOString(),
              notes
            });
            Toast.success('Transaction updated successfully');
          } else {
            State.addTransaction({
              id: generateId(),
              type,
              amount,
              description,
              category,
              date: new Date(date).toISOString(),
              notes
            });
            Toast.success('New transaction recorded!');
          }

          Modal.close();
          renderView();
        });
      }
    });
  };

  const renderView = () => {
    const currency = State.get('currency');
    const filtered = getFilteredTransactions();
    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * pageSize;
    const pageTxs = filtered.slice(startIndex, startIndex + pageSize);

    container.innerHTML = `
      <div class="view-container">
        <!-- Top Toolbar -->
        <div style="display:flex; flex-wrap:wrap; items-center; justify-content:space-between; gap:1rem; margin-bottom:1.5rem;">
          <!-- Filter Controls -->
          <div style="display:flex; flex-wrap:wrap; items-center; gap:0.75rem; flex:1; min-width:300px;">
            <div class="input-icon-wrapper" style="min-width:240px; flex:1;">
              <svg class="input-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input type="text" id="tx-search-input" class="form-control" placeholder="Search transactions..." value="${escapeHTML(searchFilter)}" />
            </div>

            <select id="tx-type-filter" class="form-control" style="width:auto;">
              <option value="all" ${typeFilter === 'all' ? 'selected' : ''}>All Types</option>
              <option value="expense" ${typeFilter === 'expense' ? 'selected' : ''}>Expenses Only</option>
              <option value="income" ${typeFilter === 'income' ? 'selected' : ''}>Income Only</option>
            </select>

            <select id="tx-category-filter" class="form-control" style="width:auto;">
              <option value="all" ${categoryFilter === 'all' ? 'selected' : ''}>All Categories</option>
              ${Object.keys(CATEGORIES).map(k => `
                <option value="${k}" ${categoryFilter === k ? 'selected' : ''}>${CATEGORIES[k].name}</option>
              `).join('')}
            </select>

            <select id="tx-sort-select" class="form-control" style="width:auto;">
              <option value="date_desc" ${sortBy === 'date_desc' ? 'selected' : ''}>Newest First</option>
              <option value="date_asc" ${sortBy === 'date_asc' ? 'selected' : ''}>Oldest First</option>
              <option value="amount_desc" ${sortBy === 'amount_desc' ? 'selected' : ''}>Highest Amount</option>
              <option value="amount_asc" ${sortBy === 'amount_asc' ? 'selected' : ''}>Lowest Amount</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; items-center; gap:0.75rem;">
            <button id="tx-export-csv-btn" class="btn btn-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span>Export CSV</span>
            </button>

            <button id="tx-add-btn" class="btn btn-primary">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>Add Transaction</span>
            </button>
          </div>
        </div>

        <!-- Table Container -->
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th style="text-align:right;">Amount</th>
                <th style="text-align:center;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${pageTxs.length > 0 ? pageTxs.map(t => {
                const catObj = CATEGORIES[t.category];
                const catColor = catObj ? catObj.color : '#6366f1';
                return `
                  <tr>
                    <td class="font-mono" style="white-space:nowrap;">${formatDate(t.date)}</td>
                    <td>
                      <div style="font-weight:600;">${escapeHTML(t.description)}</div>
                      ${t.notes ? `<div style="font-size:0.75rem; color:var(--text-muted);">${escapeHTML(t.notes)}</div>` : ''}
                    </td>
                    <td>
                      <span class="badge" style="background:${catColor}15; color:${catColor};">
                        ${escapeHTML(t.category)}
                      </span>
                    </td>
                    <td>
                      <span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">
                        ${t.type}
                      </span>
                    </td>
                    <td style="text-align:right;" class="font-mono">
                      <span style="font-weight:700; color:${t.type === 'income' ? 'var(--color-income)' : 'var(--text-primary)'};">
                        ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount, currency)}
                      </span>
                    </td>
                    <td style="text-align:center; white-space:nowrap;">
                      <button class="btn-icon tx-edit-btn" data-id="${t.id}" title="Edit">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button class="btn-icon tx-delete-btn" data-id="${t.id}" title="Delete" style="color:var(--color-expense);">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="6" style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom:0.5rem; opacity:0.5;">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"/>
                    </svg>
                    <div>No transactions found matching your filter criteria.</div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>

        <!-- Pagination Bar -->
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; margin-top:1.25rem; font-size:0.85rem; color:var(--text-secondary);">
          <div>
            Showing ${totalCount > 0 ? startIndex + 1 : 0} to ${Math.min(startIndex + pageSize, totalCount)} of ${totalCount} transactions
          </div>

          <div style="display:flex; align-items:center; gap:0.5rem;">
            <button id="tx-prev-page" class="btn btn-secondary btn-sm" ${currentPage <= 1 ? 'disabled' : ''}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button id="tx-next-page" class="btn btn-secondary btn-sm" ${currentPage >= totalPages ? 'disabled' : ''}>Next</button>
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    document.getElementById('tx-search-input')?.addEventListener('input', (e) => {
      searchFilter = e.target.value;
      currentPage = 1;
      renderView();
    });

    document.getElementById('tx-type-filter')?.addEventListener('change', (e) => {
      typeFilter = e.target.value;
      currentPage = 1;
      renderView();
    });

    document.getElementById('tx-category-filter')?.addEventListener('change', (e) => {
      categoryFilter = e.target.value;
      currentPage = 1;
      renderView();
    });

    document.getElementById('tx-sort-select')?.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderView();
    });

    document.getElementById('tx-add-btn')?.addEventListener('click', () => {
      openAddEditModal();
    });

    document.getElementById('tx-export-csv-btn')?.addEventListener('click', () => {
      const rows = filtered.map(t => ({
        Date: formatDate(t.date, 'iso'),
        Description: t.description,
        Category: t.category,
        Type: t.type,
        Amount: t.amount,
        Notes: t.notes || ''
      }));
      exportToCSV('budgetwise_transactions.csv', rows);
      Toast.success('Exported transactions to CSV file');
    });

    document.getElementById('tx-prev-page')?.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderView();
      }
    });

    document.getElementById('tx-next-page')?.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderView();
      }
    });

    // Row Action Listeners
    container.querySelectorAll('.tx-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const txs = State.get('transactions') || [];
        const target = txs.find(t => t.id === id);
        if (target) openAddEditModal(target);
      });
    });

    container.querySelectorAll('.tx-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this transaction?')) {
          State.deleteTransaction(id);
          Toast.info('Transaction deleted');
          renderView();
        }
      });
    });
  };

  renderView();
}
