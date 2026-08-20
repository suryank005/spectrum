/**
 * IONITIX - Global Application Controller
 * Page transitions, audio toggles, mobile menu, live countdown clock, and toast alerts
 */

class IonitixApp {
  constructor() {
    this.targetDate = new Date('2026-09-22T09:00:00+05:30'); // Fest launch: Sep 22, 2026 at 9:00 AM IST
    this.init();
  }

  init() {
    this.initNavbar();
    this.initAudioToggle();
    this.initMobileMenu();
    this.initCountdown();
    this.initPageTransitions();
    this.initToasts();
    this.initLivePing();
    this.initHackathonModal();
  }

  // 1. Navigation Scroll Effect
  initNavbar() {
    const nav = document.querySelector('.cyber-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // 2. Audio SFX Toggle
  initAudioToggle() {
    const audioBtns = document.querySelectorAll('.audio-btn');
    if (!audioBtns.length) return;

    const updateAudioIcon = (isMuted) => {
      audioBtns.forEach(btn => {
        if (isMuted) {
          btn.classList.add('muted');
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          `;
          btn.setAttribute('title', 'Cyber Audio SFX: Disabled (Click to Enable)');
        } else {
          btn.classList.remove('muted');
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          `;
          btn.setAttribute('title', 'Cyber Audio SFX: Active (Click to Mute)');
        }
      });
    };

    if (window.CyberAudio) {
      updateAudioIcon(window.CyberAudio.isMuted);
    }

    audioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.CyberAudio) {
          const isMuted = window.CyberAudio.toggleMute();
          updateAudioIcon(isMuted);
          this.showToast(isMuted ? 'AUDIO SFX: MUTED' : 'AUDIO SFX: ACTIVATED', isMuted ? 'info' : 'success');
        }
      });
    });
  }

  // 3. Mobile Drawer Navigation
  initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.mobile-drawer-backdrop');
    const closeBtn = document.querySelector('.mobile-close-btn');

    if (!toggle || !drawer || !backdrop) return;

    const openMenu = () => {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.CyberAudio) window.CyberAudio.playClick();
    };

    const closeMenu = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (window.CyberAudio) window.CyberAudio.playClick();
    };

    toggle.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // 4. Live Fest Countdown HUD
  initCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    const updateTime = () => {
      const now = new Date().getTime();
      const distance = this.targetDate.getTime() - now;

      if (distance < 0) {
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minsEl.innerText = '00';
        secsEl.innerText = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.innerText = String(days).padStart(2, '0');
      hoursEl.innerText = String(hours).padStart(2, '0');
      minsEl.innerText = String(mins).padStart(2, '0');
      secsEl.innerText = String(secs).padStart(2, '0');
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  // 5. Cyber Shutter Page Transitions
  initPageTransitions() {
    // Create shutter curtain DOM if not present
    let curtain = document.querySelector('.page-transition-curtain');
    if (!curtain) {
      curtain = document.createElement('div');
      curtain.className = 'page-transition-curtain';
      curtain.innerHTML = `
        <div class="shutter-stripe"></div>
        <div class="shutter-stripe"></div>
        <div class="shutter-stripe"></div>
        <div class="shutter-stripe"></div>
        <div class="shutter-status">
          <svg style="width:20px;height:20px;animation:rotate-360 2s infinite linear;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          <span>TRANSFERRING TELEMETRY...</span>
        </div>
      `;
      document.body.appendChild(curtain);
    }

    // Handle internal links
    const internalLinks = document.querySelectorAll('a[href$=".html"], a[href^="./"], a[href^="/"]');

    internalLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') {
        return;
      }

      link.addEventListener('click', (e) => {
        // Prevent default navigation for smooth transition
        e.preventDefault();
        if (window.CyberAudio) window.CyberAudio.playClick();

        curtain.classList.remove('revealing');
        curtain.classList.add('active');

        setTimeout(() => {
          window.location.href = href;
        }, 320);
      });
    });

    // Page load reveal
    window.addEventListener('pageshow', () => {
      curtain.classList.add('revealing');
      setTimeout(() => {
        curtain.classList.remove('active');
        curtain.classList.remove('revealing');
      }, 400);
    });
  }

  // 6. Toast Alerts
  initToasts() {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    this.toastContainer = container;
  }

  showToast(message, type = 'info') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type}`;

    const iconSvg = type === 'success' ?
      '<svg style="width:20px;height:20px;flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' :
      '<svg style="width:20px;height:20px;color:var(--neon-cyan);flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 20);

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  // 7. Live Node Ping Simulation in Status Pill
  initLivePing() {
    const pingEl = document.getElementById('live-node-count');
    if (!pingEl) return;

    setInterval(() => {
      const randomNodes = Math.floor(Math.random() * 8) + 124;
      pingEl.innerText = `${randomNodes} NODES ONLINE`;
    }, 4500);
  }

  // 8. Hackathon Details Modal Handler
  initHackathonModal() {
    const modalBackdrop = document.getElementById('hackathon-modal-backdrop');
    const closeBtn = document.getElementById('hackathon-modal-close-btn');

    const openModal = () => {
      if (!modalBackdrop) return;
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.CyberAudio) {
        window.CyberAudio.playModalOpen();
      }
    };

    const closeModal = () => {
      if (!modalBackdrop) return;
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (window.CyberAudio) {
        window.CyberAudio.playClick();
      }
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-hackathon-details-btn');
      if (btn) {
        e.preventDefault();
        openModal();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

// Backward compatibility alias
const IonitixsApp = IonitixApp;

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.App = new IonitixApp();
});
