/**
 * IONITIX - Animation & Interactivity Engine
 * Handles 3D tilt effects, magnetic buttons, text scramble glitch, and scroll reveal triggers
 */

class TechnocoreAnimations {
  constructor() {
    this.initScrollReveals();
    this.init3DTilt();
    this.initTextScramblers();
    this.initMagnetButtons();
  }

  // 1. Scroll-triggered entrance animations
  initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-fade-up, .reveal-scale-in');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      reveals.forEach(el => observer.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-revealed'));
    }
  }

  // 2. 3D Tilt and Cursor Light Effect on Cards
  init3DTilt() {
    const cards = document.querySelectorAll('.pillar-card, .event-card, .stat-card, .cyber-box');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      card.addEventListener('mouseenter', () => {
        if (window.CyberAudio) {
          window.CyberAudio.playHover();
        }
      });
    });
  }

  // 3. Matrix / Cyber Text Scramble Effect
  initTextScramblers() {
    const scrambleElements = document.querySelectorAll('[data-scramble]');

    scrambleElements.forEach(el => {
      const originalText = el.getAttribute('data-scramble') || el.innerText;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#________';
      
      let isScrambling = false;

      const runScramble = () => {
        if (isScrambling) return;
        isScrambling = true;
        let iteration = 0;

        const interval = setInterval(() => {
          el.innerText = originalText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return originalText[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          if (iteration >= originalText.length) {
            clearInterval(interval);
            el.innerText = originalText;
            isScrambling = false;
          }

          iteration += 1 / 2;
        }, 30);
      };

      // Auto-run once on load and on hover
      runScramble();
      el.addEventListener('mouseenter', runScramble);
    });
  }

  // 4. Magnetic button hover feel
  initMagnetButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });

      btn.addEventListener('mouseenter', () => {
        if (window.CyberAudio) {
          window.CyberAudio.playHover();
        }
      });
    });
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.AppAnimations = new TechnocoreAnimations();
});
