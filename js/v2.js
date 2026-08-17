/**
 * NoCo MedSpa & IV Therapy — V2 Controller
 * Scroll Progress Indicator, Intersection Reveal, Bento Tabs, Dialogs
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initRevealOnScroll();
  initConcernTabs();
  initDialogs();
  initFormSubmissions();
});

/* --- 1. Top Reading Scroll Progress Bar --- */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* --- 2. Intersection Observer Reveal On Scroll --- */
function initRevealOnScroll() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    elements.forEach(el => el.classList.add('is-visible'));
  }
}

/* --- 3. Interactive Treatment / Concern Tabs Switcher --- */
function initConcernTabs() {
  const tabPills = document.querySelectorAll('[data-concern-tab]');
  const panels = document.querySelectorAll('.tab-content-panel');
  if (!tabPills.length) return;

  tabPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetTab = pill.getAttribute('data-concern-tab');

      // Update active pill
      tabPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Update panels
      panels.forEach(panel => {
        if (panel.id === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --- 4. Interactive Dialog Modals with Light Dismiss --- */
function initDialogs() {
  const bookingDialog = document.getElementById('bookingDialog');
  const quizDialog = document.getElementById('quizDialog');

  // Booking Triggers
  document.querySelectorAll('[data-open-booking]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'Comprehensive Physician Consultation';
      const select = document.getElementById('bookingService');
      if (select && service) {
        select.value = service;
      }
      if (bookingDialog) bookingDialog.showModal();
    });
  });

  // Quiz Triggers
  document.querySelectorAll('[data-open-quiz]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quizDialog) quizDialog.showModal();
    });
  });

  // Light dismiss on backdrop click
  [bookingDialog, quizDialog].forEach(dialog => {
    if (!dialog) return;

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const inDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!inDialog) {
        dialog.close();
      }
    });

    const closeBtn = dialog.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => dialog.close());
    }
  });

  // Quiz Form Submission
  const quizForm = document.getElementById('quizForm');
  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const res = document.getElementById('quizResult');
      if (res) {
        quizForm.style.display = 'none';
        res.style.display = 'block';
      }
    });
  }
}

/* --- 5. Form Submission Toast Feedback --- */
function initFormSubmissions() {
  document.querySelectorAll('form[data-ajax-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Transmitting...';
      }

      setTimeout(() => {
        const dialog = form.closest('dialog');
        if (dialog) dialog.close();

        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }

        showToastV2('Thank you! Dr. Gillespie’s clinical team will reach out to confirm your consultation.');
      }, 650);
    });
  });
}

function showToastV2(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderColor = '#C5A059';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#C5A059">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
