// Department missions data
const departmentMissions = {
    creative: [
      'Visual Brand Development & Consistency',
      'Social Media Content Creation & Strategy',
      'Video Production & Motion Graphics',
      'Photography & Visual Documentation',
      'Website & Digital Asset Design',
      'Marketing Campaign Creative Direction'
    ],
    people: [
      'Member Onboarding & Experience Design',
      'Community Engagement Programs',
      'Team Culture Development',
      'Feedback Systems & Member Satisfaction',
      'Diversity & Inclusion Initiatives',
      'Member Growth & Development Paths'
    ],
    events: [
      'Event Concept Development & Planning',
      'Venue Research & Logistics Coordination',
      'Registration & Attendee Management',
      'Sponsor & Partner Event Integration',
      'Live Event Production & Management',
      'Post-Event Analysis & Optimization'
    ],
    partnerships: [
      'Strategic Partnership Identification',
      'Sponsor Relationship Management',
      'Collaboration Opportunity Development',
      'Industry Network Expansion',
      'Resource & Funding Acquisition',
      'External Communication & Representation'
    ],
    content: [
      'Educational Content Strategy & Planning',
      'Tutorial & Guide Development',
      'Podcast & Video Series Production',
      'Technical Writing & Documentation',
      'Community-Generated Content Curation',
      'Content Performance Analysis & Optimization'
    ],
    operations: [
      'Project Management & Coordination',
      'Budget Planning & Resource Allocation',
      'Process Documentation & Optimization',
      'Performance Metrics & Analytics',
      'Cross-Departmental Communication',
      'Strategic Planning Support'
    ]
  };
  
  class OperationsApp {
    constructor() {
      this.init();
    }
  
    init() {
      this.setupEventListeners();
      this.initializeAnimations();
      this.setupTiltEffect();
      this.createParticleSystem();
      this.setupStackedCards();
      this.setupCapabilitiesDeck();
    }
  
    setupEventListeners() {
      // Modal close buttons
      document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeModal(e.target.closest('.modal'));
        });
      });
  
      // Department action buttons
      document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const action = btn.dataset.action;
          const dept = btn.dataset.dept;
          
          if (action === 'missions') {
            this.openMissionsModal(dept);
          } else if (action === 'apply') {
            this.openApplicationModal(dept);
          }
        });
      });
  
      // Form submission
      const applicationForm = document.getElementById('application-form');
      if (applicationForm) {
        applicationForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleFormSubmission(e.target);
        });
      }
  
      // Smooth scroll for hero scroll indicator
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
          document.querySelector('.philosophy').scrollIntoView({ 
            behavior: 'smooth' 
          });
        });
      }
  
      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllModals();
          this.closeExpandedCard();
        }
      });
    }
  
    setupStackedCards() {
      const cards = document.querySelectorAll('.stack-card');
      const expanded = document.getElementById('expanded-card');
      const title = document.getElementById('expanded-title');
      const desc = document.getElementById('expanded-description');
      const close = document.querySelector('.close-expanded');
      const joinBtn = document.querySelector('.expanded-card .join-btn');
  
      cards.forEach(card => {
        card.addEventListener('click', () => {
          title.textContent = card.dataset.title;
          desc.textContent = card.dataset.description;
          expanded.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });
  
      close.addEventListener('click', () => {
        this.closeExpandedCard();
      });
  
      joinBtn.addEventListener('click', () => {
        const position = title.textContent;
        this.closeExpandedCard();
        setTimeout(() => {
          this.openApplicationModal(position);
        }, 300);
      });
  
      // Close expanded card when clicking outside
      expanded.addEventListener('click', (e) => {
        if (e.target === expanded) {
          this.closeExpandedCard();
        }
      });
    }
  
    closeExpandedCard() {
      const expanded = document.getElementById('expanded-card');
      expanded.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    setupCapabilitiesDeck() {
      const cards = document.querySelectorAll(".capability-card-layer");
      const prevBtn = document.querySelector(".deck-nav.prev");
      const nextBtn = document.querySelector(".deck-nav.next");
  
      let current = 0;
  
      const updateDeck = () => {
        cards.forEach((card, idx) => {
          card.classList.remove("active", "previous");
          if (idx === current) {
            card.classList.add("active");
          } else if (idx === current - 1) {
            card.classList.add("previous");
          }
        });
      };
  
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        current = (current - 1 + cards.length) % cards.length;
        updateDeck();
      });
  
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        current = (current + 1) % cards.length;
        updateDeck();
      });
  
      // Auto-advance cards
      setInterval(() => {
        current = (current + 1) % cards.length;
        updateDeck();
      }, 4000);
  
      updateDeck(); // Initial state
    }
  
    initializeAnimations() {
      // Intersection Observer for scroll animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Stagger animations for grid items
            if (entry.target.matches('.capabilities-grid, .departments-grid')) {
              this.staggerChildAnimations(entry.target);
            }
          }
        });
      }, observerOptions);
  
      // Observe elements for animation
      document.querySelectorAll('.philosophy-card, .capabilities-grid, .departments-grid, .capability-card, .department-card, .department-stack').forEach(el => {
        observer.observe(el);
      });
  
      // Title word animation
      this.animateTitleWords();
    }
  
    animateTitleWords() {
      const titleWords = document.querySelectorAll('.title-word');
      titleWords.forEach((word, index) => {
        word.style.animationDelay = `${index * 0.2}s`;
      });
    }
  
    staggerChildAnimations(container) {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('animate-in');
        }, index * 100);
      });
    }
  
    setupTiltEffect() {
      const tiltElements = document.querySelectorAll('[data-tilt]');
      
      tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = (e.clientX - centerX) / (rect.width / 2);
          const deltaY = (e.clientY - centerY) / (rect.height / 2);
          
          const rotateX = deltaY * -10;
          const rotateY = deltaX * 10;
          
          element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        element.addEventListener('mouseleave', () => {
          element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
      });
    }
  
    createParticleSystem() {
      const particleContainer = document.createElement('div');
      particleContainer.className = 'particle-system';
      particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
      `;
      document.body.appendChild(particleContainer);
  
      // Create floating particles
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          this.createParticle(particleContainer);
        }, i * 200);
      }
  
      // Continuously create new particles
      setInterval(() => {
        this.createParticle(particleContainer);
      }, 3000);
    }
  
    createParticle(container) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 15 + 10;
      const startX = Math.random() * window.innerWidth;
      const colors = ['#8b5cf6', '#3b82f6', '#ec4899', '#10b981', '#f59e0b'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${startX}px;
        top: 100vh;
        opacity: 0.6;
        filter: blur(1px);
        animation: floatUp ${duration}s linear forwards;
      `;
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration * 1000);
    }
  
    openMissionsModal(department) {
      const modal = document.getElementById('missions-modal');
      const title = document.getElementById('missions-title');
      const list = document.getElementById('missions-list');
      
      const deptNames = {
        creative: 'Creative & Media',
        people: 'People & Culture',
        events: 'Events & Experiences',
        partnerships: 'Partnerships & Growth',
        content: 'Content & Education',
        operations: 'Operations & Strategy'
      };
      
      title.textContent = `${deptNames[department]} Missions`;
      
      const missions = departmentMissions[department] || [];
      list.innerHTML = missions.map(mission => 
        `<div class="mission-item glass-card">
          <div class="mission-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9,11 12,14 22,4"></polyline>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
            </svg>
          </div>
          <span>${mission}</span>
        </div>`
      ).join('');
      
      this.showModal(modal);
    }
  
    openApplicationModal(position) {
      const modal = document.getElementById('application-modal');
      const positionSpan = document.getElementById('application-position');
      
      positionSpan.textContent = position;
      this.showModal(modal);
    }
  
    showModal(modal) {
      modal.style.display = 'flex';
      modal.offsetHeight; // Force reflow
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const firstInput = modal.querySelector('input, textarea, select, button');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  
    closeModal(modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  
    closeAllModals() {
      document.querySelectorAll('.modal.show').forEach(modal => {
        this.closeModal(modal);
      });
    }
  
    async handleFormSubmission(form) {
      const submitBtn = form.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      
      // Start loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      btnText.textContent = 'Submitting...';
      btnLoader.style.display = 'block';
      
      try {
        // Simulate API call
        await this.simulateFormSubmission(new FormData(form));
        
        // Success state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        btnText.textContent = 'Application Sent!';
        btnLoader.style.display = 'none';
        
        // Show success notification
        this.showNotification('Application submitted successfully! We\'ll be in touch soon.', 'success');
        
        // Reset and close modal after delay
        setTimeout(() => {
          form.reset();
          this.closeModal(form.closest('.modal'));
          this.resetSubmitButton(submitBtn, btnText, btnLoader);
        }, 2000);
        
      } catch (error) {
        // Error state
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('error');
        btnText.textContent = 'Error - Try Again';
        btnLoader.style.display = 'none';
        
        this.showNotification('Something went wrong. Please try again.', 'error');
        
        setTimeout(() => {
          this.resetSubmitButton(submitBtn, btnText, btnLoader);
        }, 3000);
      }
    }
  
    simulateFormSubmission(formData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 95% success rate
          if (Math.random() > 0.05) {
            resolve();
          } else {
            reject(new Error('Simulated server error'));
          }
        }, 2000);
      });
    }
  
    resetSubmitButton(btn, textEl, loaderEl) {
      btn.classList.remove('loading', 'success', 'error');
      btn.disabled = false;
      textEl.textContent = 'Submit Application';
      loaderEl.style.display = 'none';
    }
  
    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `notification glass-card notification-${type}`;
      notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        color: var(--text-primary);
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(20px);
      `;
      
      if (type === 'success') {
        notification.style.borderLeft = '4px solid var(--creator-green)';
      } else if (type === 'error') {
        notification.style.borderLeft = '4px solid var(--creator-pink)';
      }
      
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0;">
            ${type === 'success' 
              ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline>'
              : type === 'error'
              ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
              : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
            }
          </svg>
          <span>${message}</span>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Slide in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Slide out and remove
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }, 5000);
    }
  }
  
  // Additional CSS animations injected via JavaScript
  const additionalStyles = `
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    @keyframes expandWidth {
      from {
        width: 0;
      }
      to {
        width: 100px;
      }
    }
  
    @keyframes floatUp {
      from {
        transform: translateY(0px);
        opacity: 0.6;
      }
      to {
        transform: translateY(-100vh);
        opacity: 0;
      }
    }
  
    .animate-in {
      animation: slideInUp 0.8s ease-out forwards;
    }
  
    .capability-card,
    .department-card,
    .department-stack {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }
  
    .capability-card.animate-in,
    .department-card.animate-in,
    .department-stack.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  
    .modal {
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
  
    .modal.show {
      opacity: 1;
      visibility: visible;
    }
  
    .modal-content {
      transform: scale(0.95) translateY(20px);
      transition: all 0.3s ease;
    }
  
    .modal.show .modal-content {
      transform: scale(1) translateY(0);
    }
  
    .submit-btn {
      position: relative;
      overflow: hidden;
    }
  
    .btn-loader {
      display: none;
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  
    .submit-btn.loading .btn-loader {
      display: block;
    }
  
    @keyframes spin {
      0% { transform: translateY(-50%) rotate(0deg); }
      100% { transform: translateY(-50%) rotate(360deg); }
    }
  
    .mission-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      margin-bottom: 0.75rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }
  
    .mission-item:hover {
      transform: translateX(8px);
      background: var(--surface-hover);
    }
  
    .mission-icon {
      width: 24px;
      height: 24px;
      color: var(--creator-green);
      flex-shrink: 0;
    }
  
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .philosophy-stats {
        flex-direction: column;
        gap: 2rem;
      }
      
      .capabilities-grid,
      .departments-grid {
        grid-template-columns: 1fr;
      }
      
      .notification {
        top: 1rem !important;
        right: 1rem !important;
        left: 1rem !important;
        max-width: none !important;
      }
    }
  `;
  
  // Initialize the app when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Inject additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize the operations app
    new OperationsApp();
  });
  
  // Export for potential module usage
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = OperationsApp;
  }
  document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll('.dept-stage .dept-card'));
    const leftBtn  = document.querySelector('.dept-stage .dept-arrow.left');
    const rightBtn = document.querySelector('.dept-stage .dept-arrow.right');
  
    // Modal elements
    const modal        = document.getElementById('dept-modal');
    const modalClose   = document.getElementById('dept-modal-close');
    const modalBackdrop= document.getElementById('dept-modal-backdrop');
    const modalTitle   = document.getElementById('dept-modal-title');
    const modalDesc    = document.getElementById('dept-modal-desc');
    const joinBtn      = document.getElementById('dept-join-btn');
  
    let current = 0;
  
    function render() {
      cards.forEach((card, i) => {
        card.classList.remove('center', 'left', 'right', 'hidden-left', 'hidden-right');
        if (i === current) {
          card.classList.add('center');
          card.style.pointerEvents = 'auto';
          card.style.opacity = '1';
        } else if (i === current - 1) {
          card.classList.add('left');
        } else if (i === current + 1) {
          card.classList.add('right');
        } else if (i < current - 1) {
          card.classList.add('hidden-left');
        } else if (i > current + 1) {
          card.classList.add('hidden-right');
        }
      });
    }
  
    function prev() {
      current = Math.max(0, current - 1);
      render();
    }
  
    function next() {
      current = Math.min(cards.length - 1, current + 1);
      render();
    }
  
    leftBtn && leftBtn.addEventListener('click', prev);
    rightBtn && rightBtn.addEventListener('click', next);
  
    // keyboard arrows (optional)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    });
  
    // open modal on clicking the center card
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('center')) return;
        modalTitle.textContent = card.dataset.title || card.textContent.trim();
        modalDesc.textContent  = card.dataset.description || '';
        modal.classList.add('active');
      });
    });
  
    [modalClose, modalBackdrop].forEach(el => {
      el && el.addEventListener('click', () => modal.classList.remove('active'));
    });
  
    joinBtn && joinBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      // Hook this to your existing "Apply Now" modal if you want.
      // document.querySelector('[data-action="apply"][data-dept="..."]').click()
    });
  
    // first paint
    render();
  });
const joinBtn = document.getElementById("dept-join-btn");
const joinModal = document.getElementById("join-form-modal");
const closeJoinModal = document.querySelector(".join-modal-close");

joinBtn.addEventListener("click", () => {
  joinModal.classList.add("active");
});

closeJoinModal.addEventListener("click", () => {
  joinModal.classList.remove("active");
});
document.querySelectorAll('.deck-nav').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('clicked');
      setTimeout(() => {
        button.classList.remove('clicked');
      }, 200); // match animation duration
    });
  });
  