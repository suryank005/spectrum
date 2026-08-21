/**
 * IONITIXS - Program Page Controller
 * Category switching, search/filter, dynamic card rendering, and Registration Pass Modal
 */

class ProgramController {
  constructor() {
    this.currentCategory = 'tech'; // 'tech' | 'non-tech'
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.currentEvent = null;

    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.renderFilterPills();
    this.renderEvents();
    this.checkUrlParams();
  }

  checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('event');
    const tab = params.get('tab');
    const action = params.get('action');

    if (tab && (tab === 'tech' || tab === 'non-tech' || tab === 'special')) {
      this.switchCategory(tab);
    }

    if (eventId) {
      setTimeout(() => {
        this.openModal(eventId);
      }, 250);
    } else if (action === 'register') {
      setTimeout(() => {
        this.openModal('hack-o-nova');
      }, 250);
    }
  }

  cacheElements() {
    this.eventsGrid = document.getElementById('events-grid');
    this.tabTech = document.getElementById('tab-tech');
    this.tabNonTech = document.getElementById('tab-non-tech');
    this.tabSpecial = document.getElementById('tab-special');
    this.searchInput = document.getElementById('event-search');
    this.filterPillsContainer = document.getElementById('filter-pills-container');
    
    // Modal elements
    this.modalBackdrop = document.getElementById('event-modal-backdrop');
    this.modalCloseBtn = document.getElementById('modal-close-btn');
    this.modalTitle = document.getElementById('modal-title');
    this.modalTagline = document.getElementById('modal-tagline');
    this.modalCategoryBadge = document.getElementById('modal-category-badge');
    this.modalDesc = document.getElementById('modal-desc');
    this.modalVenue = document.getElementById('modal-venue');
    this.modalTiming = document.getElementById('modal-timing');
    this.modalTeam = document.getElementById('modal-team');
    this.modalPrize = document.getElementById('modal-prize');
    this.modalRulesList = document.getElementById('modal-rules-list');
    this.modalCoordinators = document.getElementById('modal-coordinators');
    this.modalImgContainer = document.getElementById('modal-image-container');
    this.modalBannerImg = document.getElementById('modal-banner-img');

    // Registration Form & Ticket
    this.regForm = document.getElementById('event-registration-form');
    this.ticketPass = document.getElementById('cyber-ticket-pass');
    this.ticketEventTitle = document.getElementById('ticket-event-title');
    this.ticketId = document.getElementById('ticket-id-val');
    this.ticketUserName = document.getElementById('ticket-user-name');
    this.ticketUserCollege = document.getElementById('ticket-user-college');
    this.ticketUserTeam = document.getElementById('ticket-user-team');
    this.printTicketBtn = document.getElementById('print-ticket-btn');
    this.newRegBtn = document.getElementById('new-reg-btn');
  }

  bindEvents() {
    // Tab switching
    if (this.tabTech) {
      this.tabTech.addEventListener('click', () => this.switchCategory('tech'));
    }
    if (this.tabNonTech) {
      this.tabNonTech.addEventListener('click', () => this.switchCategory('non-tech'));
    }
    if (this.tabSpecial) {
      this.tabSpecial.addEventListener('click', () => this.switchCategory('special'));
    }

    // Global event detail button bindings (including showcase cards)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.open-details-btn');
      if (btn) {
        const id = btn.getAttribute('data-event-id');
        if (id) this.openModal(id);
      }
    });

    // Search filter
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderEvents();
      });
    }

    // Modal close events
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }
    const csCloseBtn = document.getElementById('modal-cs-close-btn');
    if (csCloseBtn) {
      csCloseBtn.addEventListener('click', () => this.closeModal());
    }
    const csTopCloseBtn = document.getElementById('modal-cs-top-close-btn');
    if (csTopCloseBtn) {
      csTopCloseBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) this.closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop?.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Form submission
    if (this.regForm) {
      this.regForm.addEventListener('submit', (e) => this.handleRegistration(e));
    }

    // Print / Save ticket
    if (this.printTicketBtn) {
      this.printTicketBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Register another participant button
    if (this.newRegBtn) {
      this.newRegBtn.addEventListener('click', () => {
        this.ticketPass.classList.remove('active');
        this.regForm.style.display = 'grid';
        this.regForm.reset();
      });
    }
  }

  renderFilterPills() {
    if (!this.filterPillsContainer) return;

    const techPills = [
      { label: 'ALL TECHNICAL', filter: 'all' },
      { label: 'BUGGY CODE', filter: 'buggy-code' },
      { label: 'UI / UX', filter: 'ui-ux' },
      { label: 'CAPTURE THE FLAG', filter: 'capture-the-flag' }
    ];

    const nonTechPills = [
      { label: 'ALL NON-TECHNICAL', filter: 'all' },
      { label: 'TECH AUCTION', filter: 'tech-auction' },
      { label: 'MEME WARRIORS', filter: 'meme-contest' },
      { label: 'TREASURE HUNT', filter: 'treasure-hunt' },
      { label: 'FREE FIRE', filter: 'free-fire' },
      { label: 'MINI MILITIA', filter: 'mini-militia' },
      { label: 'E FOOTBALL', filter: 'e-football' }
    ];

    const specialPills = [
      { label: 'ALL SPECIAL', filter: 'all' },
      { label: 'REEL MAKING', filter: 'reel-making' }
    ];

    const pills = this.currentCategory === 'tech' ? techPills : 
                  this.currentCategory === 'non-tech' ? nonTechPills : specialPills;

    this.filterPillsContainer.innerHTML = pills.map(p => `
      <button class="filter-pill ${p.filter === this.activeFilter ? 'active' : ''}" data-filter="${p.filter}">
        ${p.label}
      </button>
    `).join('');

    // Rebind pill clicks
    const renderedPills = this.filterPillsContainer.querySelectorAll('.filter-pill');
    renderedPills.forEach(pill => {
      pill.addEventListener('click', () => {
        renderedPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter || 'all';
        if (window.CyberAudio) window.CyberAudio.playClick();
        this.renderEvents();
      });
    });
  }

  switchCategory(category) {
    if (this.currentCategory === category) return;
    this.currentCategory = category;
    this.activeFilter = 'all';

    if (window.CyberAudio) {
      window.CyberAudio.playTabSwitch();
    }

    [this.tabTech, this.tabNonTech, this.tabSpecial].forEach(tab => {
      if (tab) tab.classList.remove('active');
    });

    if (category === 'tech' && this.tabTech) this.tabTech.classList.add('active');
    if (category === 'non-tech' && this.tabNonTech) this.tabNonTech.classList.add('active');
    if (category === 'special' && this.tabSpecial) this.tabSpecial.classList.add('active');

    this.renderFilterPills();

    // Smooth transition
    if (this.eventsGrid) {
      this.eventsGrid.style.opacity = '0';
      this.eventsGrid.style.transform = 'translateY(10px)';
      setTimeout(() => {
        this.renderEvents();
        this.eventsGrid.style.opacity = '1';
        this.eventsGrid.style.transform = 'translateY(0)';
      }, 150);
    } else {
      this.renderEvents();
    }
  }

  renderEvents() {
    const eventsList = (typeof IONITIX_EVENTS !== 'undefined') ? IONITIX_EVENTS : (typeof IONITIXS_EVENTS !== 'undefined' ? IONITIXS_EVENTS : []);
    if (!this.eventsGrid || !eventsList.length) return;

    const specialShowcase = document.getElementById('special-event-showcase');

    if (this.currentCategory === 'special') {
      if (specialShowcase) specialShowcase.style.display = 'none';

      const filtered = eventsList.filter(event => {
        const matchCat = event.category === 'special';
        const matchSearch = !this.searchQuery || 
          event.title.toLowerCase().includes(this.searchQuery) ||
          event.shortDesc.toLowerCase().includes(this.searchQuery) ||
          event.typeTag.toLowerCase().includes(this.searchQuery);
        const matchPill = this.activeFilter === 'all' || event.id === this.activeFilter;
        return matchCat && matchSearch && matchPill;
      });

      if (filtered.length === 0) {
        this.eventsGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
            <svg style="width: 48px; height: 48px; color: #ffbd2e; margin-bottom: 1rem; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h3 style="font-family: var(--font-display); color: #fff; margin-bottom: 0.5rem;">NO SIGNALS DETECTED</h3>
            <p style="font-family: var(--font-mono); font-size: 0.9rem;">No special events match your current search query.</p>
          </div>
        `;
        return;
      }

      this.eventsGrid.innerHTML = filtered.map(ev => `
        <div class="cyber-box special-event-card reveal-fade-up is-revealed" data-event-id="${ev.id}" style="grid-column: 1 / -1; width: 100%;">
          ${ev.isComingSoon !== false ? `
            <div class="coming-soon-overlay" data-event-id="${ev.id}">
              <div class="coming-soon-badge">COMING SOON....!!</div>
              <div class="coming-soon-subtext">
                <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <span>Click to View Event Brief &amp; Details</span>
              </div>
            </div>
          ` : ''}
          ${ev.cardImage ? `
            <div style="position: relative; width: 100%; height: 240px; margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; border: 1px solid rgba(255, 189, 46, 0.4); background: #000;">
              <div style="position: absolute; inset: 0; background-image: url('${ev.cardImage}'); background-size: cover; background-position: center; filter: blur(16px) brightness(0.45); opacity: 0.85; transform: scale(1.15);"></div>
              <img src="${ev.cardImage}" alt="${ev.title}" style="position: relative; z-index: 2; width: 100%; height: 100%; object-fit: contain; display: block; margin: 0 auto; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));">
            </div>
          ` : ''}
          <div class="special-event-grid">
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
                <span class="event-category-tag special">SPECIAL EVENT</span>
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #ffbd2e;">Day 3</span>
              </div>
              <h3 style="font-size: 1.75rem; color: #ffffff; margin-bottom: 0.5rem; font-family: var(--font-display);">${ev.title}</h3>
              <p style="font-family: var(--font-mono); font-size: 0.85rem; color: #ffbd2e; margin-bottom: 1rem;">${ev.tagline}</p>
              <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
                ${ev.fullDesc}
              </p>
              
              <!-- Coordinator info -->
              <div class="special-coord-box">
                <div><span style="color: #ffbd2e;">Faculty Coordinator:</span> <strong style="color: #fff;">${ev.facultyCoordinator || 'Prof. Allwin Jacob'}</strong></div>
                <div><span style="color: #ffbd2e;">Student Coordinator:</span> <strong style="color: #fff;">${ev.studentCoordinator || 'Adnan Ashraf'}</strong></div>
                <div><span style="color: #ffbd2e;">Student Sub-coordinators:</span> <span style="color: var(--text-secondary);">${(ev.studentSubCoordinators || []).join(', ') || 'Muhammed Razi, Razik'}</span></div>
              </div>
            </div>

            <div class="special-event-side">
              <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase;">Team Size</span>
                <span style="font-family: var(--font-mono); font-size: 0.95rem; color: #fff;">${ev.teamSize}</span>
              </div>

              <button class="btn btn-cyber-primary open-details-btn" data-event-id="${ev.id}" style="background: linear-gradient(135deg, #ffbd2e, #f59e0b); color: #000; border-color: #ffbd2e; font-weight: 700; width: 100%; justify-content: center;">
                <span>View Details &amp; Register</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      this.eventsGrid.querySelectorAll('.open-details-btn, .coming-soon-overlay, .special-event-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const card = btn.closest('[data-event-id]');
          const id = card ? card.getAttribute('data-event-id') : btn.getAttribute('data-event-id');
          if (id) {
            e.preventDefault();
            this.openModal(id);
          }
        });
      });
      return;
    }

    if (specialShowcase) specialShowcase.style.display = 'block';

    const filtered = eventsList.filter(event => {
      // Category match
      const matchCat = event.category === this.currentCategory;
      
      // Search match
      const matchSearch = !this.searchQuery || 
        event.title.toLowerCase().includes(this.searchQuery) ||
        event.shortDesc.toLowerCase().includes(this.searchQuery) ||
        event.typeTag.toLowerCase().includes(this.searchQuery);

      // Pill filter match
      const matchPill = this.activeFilter === 'all' || 
        event.id === this.activeFilter ||
        event.typeTag.toLowerCase() === this.activeFilter.toLowerCase();

      return matchCat && matchSearch && matchPill;
    });

    if (filtered.length === 0) {
      this.eventsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <svg style="width: 48px; height: 48px; color: var(--neon-cyan); margin-bottom: 1rem; opacity: 0.5;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 style="font-family: var(--font-display); color: #fff; margin-bottom: 0.5rem;">NO SIGNALS DETECTED</h3>
          <p style="font-family: var(--font-mono); font-size: 0.9rem;">No events match your current query or category filters.</p>
        </div>
      `;
      return;
    }

    this.eventsGrid.innerHTML = filtered.map(ev => `
      <div class="event-card reveal-fade-up is-revealed" data-event-id="${ev.id}">
        ${ev.isComingSoon !== false ? `
          <div class="coming-soon-overlay" data-event-id="${ev.id}">
            <div class="coming-soon-badge">COMING SOON....!!</div>
            <div class="coming-soon-subtext">
              <svg style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Click to View Event Brief &amp; Details</span>
            </div>
          </div>
        ` : ''}
        ${ev.cardImage ? `
          <div class="event-card-banner">
            <div class="banner-bg-blur" style="background-image: url('${ev.cardImage}');"></div>
            <img src="${ev.cardImage}" alt="${ev.title}">
          </div>
        ` : ''}
        <div class="event-card-header">
          <div class="event-icon-box">
            ${this.getIconSvg(ev.icon)}
          </div>
          <span class="event-category-tag ${ev.category}">${ev.typeTag}</span>
        </div>

        <h3 class="event-title">${ev.title}</h3>
        <p class="event-tagline">${ev.tagline}</p>
        <p class="event-description">${ev.shortDesc}</p>

        <div class="event-meta-grid">
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span><strong>Team:</strong> ${ev.teamSize}</span>
          </div>
          <div class="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span><strong>Time:</strong> ${ev.timing.split(',')[0]}</span>
          </div>
        </div>

        <div class="event-card-footer" style="justify-content: flex-end;">
          <button class="btn btn-cyber-primary btn-sm open-details-btn" data-event-id="${ev.id}">
            <span>Details / Register</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    `).join('');

    // Re-bind click handlers
    this.eventsGrid.querySelectorAll('.event-card, .open-details-btn, .coming-soon-overlay').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('[data-event-id]');
        const id = card ? card.getAttribute('data-event-id') : btn.getAttribute('data-event-id');
        if (id) {
          e.preventDefault();
          this.openModal(id);
        }
      });
    });

    // Re-initialize 3D tilts for new cards
    if (window.AppAnimations) {
      window.AppAnimations.init3DTilt();
      window.AppAnimations.initMagnetButtons();
    }
  }

  openModal(eventId) {
    const event = getEventById(eventId);
    if (!event) return;
    this.currentEvent = event;

    if (window.CyberAudio) {
      window.CyberAudio.playModalOpen();
    }

    // Guarantee 2nd image container inside modal body
    const modalBody = document.querySelector('.cyber-modal .modal-body');
    let container = document.getElementById('modal-image-container');
    
    if (!container && modalBody) {
      container = document.createElement('div');
      container.id = 'modal-image-container';
      modalBody.insertBefore(container, modalBody.firstChild);
    }

    if (container) {
      if (event.modalImage) {
        container.style.cssText = 'display: block; position: relative; width: 100%; height: 280px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-cyan); box-shadow: 0 4px 25px rgba(0,0,0,0.7); margin-bottom: 0.5rem; flex-shrink: 0; background: #000;';
        container.innerHTML = `
          <div style="position: absolute; inset: 0; background-image: url('${event.modalImage}'); background-size: cover; background-position: center; filter: blur(20px) brightness(0.45); opacity: 0.85; transform: scale(1.15);"></div>
          <img src="${event.modalImage}" alt="${event.title}" style="position: relative; z-index: 2; width: 100%; height: 100%; object-fit: contain; display: block; margin: 0 auto; filter: drop-shadow(0 6px 15px rgba(0,0,0,0.7));">
        `;
      } else {
        container.style.display = 'none';
        container.innerHTML = '';
      }
    }

    // Populate modal data
    if (this.modalTitle) this.modalTitle.innerText = event.title;
    if (this.modalTagline) this.modalTagline.innerText = event.tagline;
    if (this.modalCategoryBadge) {
      this.modalCategoryBadge.innerText = `${event.category.toUpperCase()} • ${event.typeTag}`;
      this.modalCategoryBadge.className = `section-tag ${event.category}`;
    }
    if (this.modalDesc) this.modalDesc.innerText = event.fullDesc;
    if (this.modalVenue) this.modalVenue.innerText = event.venue;
    if (this.modalTiming) this.modalTiming.innerText = event.timing;
    if (this.modalTeam) this.modalTeam.innerText = event.teamSize;

    // Rules
    if (this.modalRulesList) {
      this.modalRulesList.innerHTML = event.rules.map(r => `<li>${r}</li>`).join('');
    }

    // Coordinators
    if (this.modalCoordinators) {
      let html = '';
      if (event.technicalCoordinator) {
        html += `
          <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid var(--border-cyan); border-radius: var(--radius-sm); padding: 0.6rem 0.85rem; margin-bottom: 0.75rem; font-family: var(--font-mono); font-size: 0.85rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="color: var(--neon-cyan); font-weight: 700;">OVERALL TECHNICAL COORDINATOR:</span>
            <strong style="color: #ffffff;">${event.technicalCoordinator}</strong>
          </div>
        `;
      } else if (event.nonTechnicalCoordinator) {
        html += `
          <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid var(--border-purple); border-radius: var(--radius-sm); padding: 0.6rem 0.85rem; margin-bottom: 0.75rem; font-family: var(--font-mono); font-size: 0.85rem; display: flex; align-items: center; justify-content: space-between;">
            <span style="color: var(--neon-purple); font-weight: 700;">OVERALL NON-TECHNICAL COORDINATOR:</span>
            <strong style="color: #ffffff;">${event.nonTechnicalCoordinator}</strong>
          </div>
        `;
      }
      html += event.coordinators.map(c => `
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem; display: flex; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">
          <span style="color: var(--neon-cyan); min-width: 175px;">${c.role || 'Coordinator'}:</span>
          <strong style="color: #fff;">${c.name}</strong>
          ${c.contact && c.contact !== 'Coordinators' && c.contact !== 'Overall Tech Head' && c.contact !== 'Overall Non-Tech Head' ? `<span style="color: var(--text-muted); font-size: 0.8rem;">(${c.contact})</span>` : ''}
        </div>
      `).join('');
      this.modalCoordinators.innerHTML = html;
    }

    // Set registration link & button state
    const regBtn = document.getElementById('modal-register-btn');
    if (regBtn) {
      const isHackathonEvent = (event.id === 'hack-o-nova' || event.id === 'hackspectra' || event.isHackathon);
      
      if (event.registrationUrl) {
        regBtn.href = event.registrationUrl;
        regBtn.target = '_blank';
        regBtn.style.opacity = '1';
        regBtn.style.cursor = 'pointer';
        regBtn.innerHTML = `
          <span>REGISTER FOR EVENT</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"><polyline points="9 18 15 12 9 6"></polyline></svg>
        `;
        regBtn.onclick = null;
      } else if (isHackathonEvent) {
        regBtn.href = 'https://spectrum24h-hackathon.fillout.com/registration';
        regBtn.target = '_blank';
        regBtn.style.opacity = '1';
        regBtn.style.cursor = 'pointer';
        regBtn.innerHTML = `
          <span>REGISTER FOR HACKATHON</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"><polyline points="9 18 15 12 9 6"></polyline></svg>
        `;
        regBtn.onclick = null;
      } else {
        regBtn.href = 'javascript:void(0)';
        regBtn.removeAttribute('target');
        regBtn.style.opacity = '0.85';
        regBtn.style.cursor = 'pointer';
        regBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; color: #ffbd2e;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>REGISTRATION LINK COMING SOON</span>
        `;
        regBtn.onclick = (e) => {
          e.preventDefault();
          if (window.App && typeof window.App.showToast === 'function') {
            window.App.showToast('Registration link for this event will be available soon!', 'info');
          }
        };
      }
    }

    // Modal Coming Soon Blurred Screen handling
    const modalCsOverlay = document.getElementById('modal-coming-soon-overlay');
    if (modalCsOverlay) {
      const isHackathonEvent = (event.id === 'hack-o-nova' || event.id === 'hackspectra' || event.isHackathon);
      if (event.isComingSoon === false || isHackathonEvent) {
        modalCsOverlay.style.display = 'none';
      } else {
        modalCsOverlay.style.display = 'flex';
      }
    }

    // Show modal
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      if (window.CyberAudio) window.CyberAudio.playClick();
    }
  }

  handleRegistration(e) {
    e.preventDefault();
    if (!this.currentEvent) return;

    const leadName = document.getElementById('reg-name')?.value || 'Guest Participant';
    const email = document.getElementById('reg-email')?.value || 'user@example.com';
    const college = document.getElementById('reg-college')?.value || 'Engineering Institute';
    const teamName = document.getElementById('reg-team')?.value || `${leadName}'s Team`;

    // Generate unique Cyber Pass ID
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const passCode = `ION-26-${this.currentEvent.typeTag.substring(0, 3).toUpperCase()}-${randomHex}`;

    // Fill ticket pass
    if (this.ticketEventTitle) this.ticketEventTitle.innerText = this.currentEvent.title;
    if (this.ticketId) this.ticketId.innerText = passCode;
    if (this.ticketUserName) this.ticketUserName.innerText = leadName;
    if (this.ticketUserCollege) this.ticketUserCollege.innerText = college;
    if (this.ticketUserTeam) this.ticketUserTeam.innerText = teamName;

    // Switch view in modal
    if (this.regForm) this.regForm.style.display = 'none';
    if (this.ticketPass) this.ticketPass.classList.add('active');

    // Play celebration audio and toast
    if (window.CyberAudio) {
      window.CyberAudio.playSuccess();
    }

    if (window.App) {
      window.App.showToast(`ACCESS GRANTED: Registered for ${this.currentEvent.title}!`, 'success');
    }
  }

  getIconSvg(type) {
    switch (type) {
      case 'cpu':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>';
      case 'zap':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>';
      case 'terminal':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>';
      case 'bot':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>';
      case 'file-text':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
      case 'shield-alert':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
      case 'compass':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>';
      case 'gamepad-2':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>';
      case 'help-circle':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
      case 'palette':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>';
      case 'camera':
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>';
      default:
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 6 12 12 16 14"></polygon></svg>';
    }
  }
}

// Initialize on DOM load if we are on program page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('events-grid')) {
    window.ProgramApp = new ProgramController();
  }
});
