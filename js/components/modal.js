/* BudgetWise Reusable Modal Dialog Manager */

class ModalManager {
  constructor() {
    this.backdrop = null;
    this.createBackdrop();
  }

  createBackdrop() {
    let backdrop = document.getElementById('global-modal-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'global-modal-backdrop';
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `
        <div class="modal-dialog" role="dialog" aria-modal="true">
          <div class="modal-header">
            <h3 class="modal-title" id="modal-title-text">Modal Title</h3>
            <button type="button" class="btn-icon" id="modal-close-btn" aria-label="Close modal">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body" id="modal-body-content"></div>
        </div>
      `;
      document.body.appendChild(backdrop);

      // Event listener for close button & backdrop click
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });

      document.getElementById('modal-close-btn').addEventListener('click', () => this.close());
      
      // Escape key handler
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop.classList.contains('active')) {
          this.close();
        }
      });
    }
    this.backdrop = backdrop;
  }

  open({ title, bodyHTML, onOpen }) {
    this.createBackdrop();
    document.getElementById('modal-title-text').textContent = title || 'BudgetWise';
    const bodyContainer = document.getElementById('modal-body-content');
    bodyContainer.innerHTML = bodyHTML || '';

    this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (onOpen && typeof onOpen === 'function') {
      onOpen(bodyContainer);
    }
  }

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

export const Modal = new ModalManager();
