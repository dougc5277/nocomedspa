/**
 * NoCo MedSpa & IV Therapy - Interactive Frontend Controller
 * Optimized for lightweight, zero-dependency performance
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initBookingModal();
  initQuizModal();
  initFormSubmissions();
});

/* --- Header Scroll Effect --- */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Mobile Navigation Drawer --- */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', openDrawer);
  overlay.addEventListener('click', closeDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --- Interactive Booking Dialog Modal --- */
function initBookingModal() {
  const dialog = document.getElementById('bookingDialog');
  if (!dialog) return;

  // Open modal triggers
  const triggers = document.querySelectorAll('[data-open-booking]');
  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      const serviceSelect = document.getElementById('bookingService');
      if (serviceSelect && service) {
        serviceSelect.value = service;
      }
      dialog.showModal();
    });
  });

  // Close modal button
  const closeBtn = dialog.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  // Backdrop click light-dismiss
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      dialog.close();
    }
  });
}

/* --- Weight Loss Qualification Quiz Modal --- */
function initQuizModal() {
  const dialog = document.getElementById('quizDialog');
  if (!dialog) return;

  const triggers = document.querySelectorAll('[data-open-quiz]');
  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      dialog.showModal();
    });
  });

  const closeBtn = dialog.querySelector('.quiz-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      dialog.close();
    }
  });

  const quizForm = document.getElementById('quizForm');
  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const resultArea = document.getElementById('quizResult');
      if (resultArea) {
        resultArea.style.display = 'block';
        quizForm.style.display = 'none';
      }
    });
  }
}

/* --- Form Submissions & Toast Alerts --- */
function initFormSubmissions() {
  const forms = document.querySelectorAll('form[data-ajax-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
      }

      setTimeout(() => {
        // Close modal if inside one
        const parentDialog = form.closest('dialog');
        if (parentDialog) {
          parentDialog.close();
        }

        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }

        showToast('Thank you! Your appointment request has been received. Our team will contact you shortly.');
      }, 700);
    });
  });
}

/* --- Toast Notification Helper --- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#a37c52">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
