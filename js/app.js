// js/app.js — VoteMate Main App Controller

// ── State ──────────────────────────────────────────────
window.currentLang     = localStorage.getItem('vm_lang') || 'en';
window.currentElection = localStorage.getItem('vm_election') || 'loksabha';
let chatOpen = false;
let isSending = false;

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // 1. Hide splash as soon as possible (after short delay for aesthetic)
  checkOnboarding();
  
  // 2. Try-catch initialization to prevent one failure from breaking the whole app
  try { initParticles(); } catch(e) { console.warn('Particles failed:', e); }
  try { renderAll(); } catch(e) { console.warn('Render failed:', e); }
  try { initGSAP(); } catch(e) { console.warn('GSAP failed:', e); }

  
  setupNavScroll();
  setupScrollTop();
  document.addEventListener('click', outsideClickHandler);
});

function checkOnboarding() {
  const onboarded = localStorage.getItem('vm_onboarded');
  const splash = document.getElementById('splashScreen');
  
  // Real-time data: Detect browser language
  const browserLang = navigator.language.split('-')[0];
  const supported = window.LANGUAGES.find(l => l.code === browserLang);
  if (supported && !localStorage.getItem('vm_lang')) {
    window.currentLang = supported.code;
  }

  setTimeout(() => {
    if (splash) splash.classList.add('hidden');
    
    if (!onboarded) {
      const overlay = document.getElementById('onboardingOverlay');
      if (overlay) {
        overlay.classList.add('active');
        renderOnboardingLangs();
        // Pre-select if detected
        if (supported) selectOnboardingLang(supported.code);
      }
    } else {
      showWelcomeChat();
      revealChatbot();
    }
  }, 1500);
}

function revealChatbot() {
  const wrap = document.getElementById('chatbotWrap');
  if (wrap) wrap.classList.remove('initial-hide');
}

function selectOnboardingLang(code) {
  window.currentLang = code;
  document.querySelectorAll('.lang-card').forEach(c => c.classList.remove('active'));
  document.getElementById(`onboarding-${code}`)?.classList.add('active');
  document.getElementById('btnEnterApp').disabled = false;
  // Temporary apply to see preview if needed, but we do it on enterApp
}

function enterApp() {
  localStorage.setItem('vm_onboarded', 'true');
  localStorage.setItem('vm_lang', window.currentLang);
  document.getElementById('onboardingOverlay')?.classList.remove('active');
  renderAll();
  revealChatbot();
  showWelcomeChat();
}

function renderAll() {
  renderProcessCards(window.currentElection);
  renderTimeline(window.currentElection);
  renderEligibility();
  renderRegSteps();
  renderDocuments();
  renderFAQ();
  renderGuide();
  renderPhotoStrip();
  renderLangMenu();
  updateElectionBanner(window.currentElection);
  applyTranslations(window.currentLang);
  renderSuggestions(window.currentLang);
  updateLangButton();
  updateElectionToggle();
}

// ── GSAP Scroll Animations ─────────────────────────────
function initGSAP() {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    setupGSAPAnimations();
    setupParallax();
    setup3DTilt();
  } else {
    console.warn('GSAP or ScrollTrigger not loaded');
  }
}

function setupGSAPAnimations() {
  const ease = 'power2.inOut';

  // Section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.7, ease,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // Process cards stagger
  gsap.utils.toArray('.process-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.94 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.55, ease, delay: i * 0.07,
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity: 0, x: -40 }, {
      opacity: 1, x: 0, duration: 0.6, ease, delay: i * 0.05,
      scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Registration cards
  gsap.utils.toArray('.reg-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.55, ease, delay: i * 0.1,
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // FAQ items
  gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.fromTo(item, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.45, ease, delay: i * 0.05,
      scrollTrigger: { trigger: item, start: 'top 92%', toggleActions: 'play none none none' }
    });
  });

  // Guide steps
  gsap.utils.toArray('.guide-step').forEach((step, i) => {
    gsap.fromTo(step, { opacity: 0, y: 60, scale: 0.88 }, {
      opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.inOut(1.4)', delay: i * 0.09,
      scrollTrigger: { trigger: step, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Guide features
  gsap.utils.toArray('.guide-feature').forEach((f, i) => {
    gsap.fromTo(f, { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.5, ease, delay: i * 0.08,
      scrollTrigger: { trigger: f, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Photo cards stagger
  const photoCards = gsap.utils.toArray('.photo-card');
  if (photoCards.length > 0) {
    photoCards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.55, ease, delay: i * 0.12,
        scrollTrigger: { trigger: '.photo-gallery-section', start: 'top 90%', toggleActions: 'play none none none' }
      });
    });
  }


  // Election banner
  gsap.fromTo('.election-banner', { opacity: 0, y: -20 }, {
    opacity: 1, y: 0, duration: 0.6, ease,
    scrollTrigger: { trigger: '.election-banner', start: 'top 95%' }
  });

  // Stats counter
  gsap.utils.toArray('.stat-num').forEach(el => {
    gsap.fromTo(el, { opacity: 0, scale: 0.5 }, {
      opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.3,
      scrollTrigger: { trigger: el, start: 'top 95%' }
    });
  });
}

function setupParallax() {
  if (!window.gsap || !window.ScrollTrigger) return;
  
  // Parallax horizontal rows
  const pCards = gsap.utils.toArray('.photo-card');
  if (pCards.length > 0) {
    gsap.to(pCards, {
      x: (i) => i % 2 === 0 ? -40 : 40,
      scrollTrigger: {
        trigger: '.photo-gallery',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  }


  // Floating blobs parallax
  gsap.to('.hero-blob', {
    y: -60,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}

function setup3DTilt() {
  const cards = document.querySelectorAll('.process-card, .guide-step, .photo-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// ── Particles Canvas ───────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['rgba(255,153,51,', 'rgba(19,136,8,', 'rgba(255,255,255,'];
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * 1200, y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      c: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * 0.4 + 0.1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c + p.a + ')';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ── Election Switch ────────────────────────────────────
function switchElection(type) {
  window.currentElection = type;
  localStorage.setItem('vm_election', type);
  updateElectionToggle();
  updateElectionBanner(type);
  renderProcessCards(type);
  renderTimeline(type);
  // Re-run GSAP on new elements after a tick
  setTimeout(() => { if (window.ScrollTrigger) ScrollTrigger.refresh(); }, 100);
}

function updateElectionToggle() {
  document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
  const active = document.getElementById(`btn-${window.currentElection}`);
  if (active) active.classList.add('active');
}

// ── Language ───────────────────────────────────────────
function setLanguage(code) {
  window.currentLang = code;
  localStorage.setItem('vm_lang', code);
  renderAll();
  toggleLangMenu(true); // close
}

function updateLangButton() {
  const lang = window.LANGUAGES.find(l => l.code === window.currentLang);
  if (!lang) return;
  const flagEl = document.getElementById('currentLangFlag');
  const nameEl = document.getElementById('currentLangName');
  if (flagEl) flagEl.textContent = lang.flag;
  if (nameEl) nameEl.textContent = lang.code.toUpperCase();
}

function toggleLangMenu(forceClose = false) {
  const menu = document.getElementById('langMenu');
  const btn  = document.getElementById('langBtn');
  if (!menu) return;
  if (forceClose || menu.classList.contains('open')) {
    menu.classList.remove('open');
    btn?.setAttribute('aria-expanded', 'false');
  } else {
    menu.classList.add('open');
    btn?.setAttribute('aria-expanded', 'true');
  }
}

// ── Mobile Menu ────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn  = document.getElementById('mobileMenuBtn');
  if (!menu) return;
  menu.classList.toggle('open');
  btn.textContent = menu.classList.contains('open') ? '✕' : '☰';
}

// ── Chat ───────────────────────────────────────────────
function showWelcomeChat() {
  const t = window.TRANSLATIONS[window.currentLang] || window.TRANSLATIONS.en;
  const msgs = document.getElementById('chatMessages');
  // Only add welcome once on first load
  if (msgs && msgs.children.length === 0) {
    setTimeout(() => addBotMessage(t.chat_welcome), 500);
  }
  // Show badge after 3s
  setTimeout(() => {
    const badge = document.getElementById('fabBadge');
    if (badge && !chatOpen) badge.style.display = 'flex';
  }, 3000);
}

function toggleChat() {
  chatOpen = !chatOpen;
  const win   = document.getElementById('chatWindow');
  const badge = document.getElementById('fabBadge');
  const wrap  = document.getElementById('chatbotWrap');
  
  win?.classList.toggle('open', chatOpen);
  if (wrap) wrap.classList.toggle('chat-open', chatOpen);
  
  if (badge) badge.style.display = 'none';
  if (chatOpen) {
    setTimeout(() => document.getElementById('chatInput')?.focus(), 300);
  }
}

function openChat() {
  if (!chatOpen) toggleChat();
  setTimeout(() => document.getElementById('chatInput')?.focus(), 350);
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const text = input?.value?.trim();
  if (!text || isSending) return;

  isSending = true;
  input.value = '';
  if (sendBtn) sendBtn.disabled = true;

  addUserMessage(text);
  showTyping();

  // Hide suggestions after first message
  const sugWrap = document.getElementById('chatSuggestions');
  if (sugWrap) sugWrap.style.display = 'none';

  const { text: response } = await window.getResponse(text, window.currentLang);
  hideTyping();
  addBotMessage(response);

  isSending = false;
  if (sendBtn) sendBtn.disabled = false;
  input?.focus();
}

function sendSuggestion(text) {
  const input = document.getElementById('chatInput');
  if (input) input.value = text;
  sendMessage();
}

function handleChatKey(event) {
  if (event.key === 'Enter') sendMessage();
}



// ── Nav scroll effect ──────────────────────────────────
function setupNavScroll() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── Scroll to top ──────────────────────────────────────
function setupScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    btn?.classList.toggle('visible', st > 400);
  }, { passive: true });
  
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Outside click handler ──────────────────────────────
function outsideClickHandler(e) {
  const langMenu = document.getElementById('langMenu');
  const langBtn  = document.getElementById('langBtn');
  if (langMenu?.classList.contains('open') && !langBtn?.contains(e.target) && !langMenu.contains(e.target)) {
    toggleLangMenu(true);
  }
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

window.switchElection   = switchElection;
window.setLanguage      = setLanguage;
window.toggleLangMenu   = toggleLangMenu;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleChat       = toggleChat;
window.openChat         = openChat;
window.sendMessage      = sendMessage;
window.sendSuggestion   = sendSuggestion;
window.handleChatKey    = handleChatKey;
window.scrollToSection  = scrollToSection;
window.selectOnboardingLang = selectOnboardingLang;
window.enterApp = enterApp;
window.checkOnboarding = checkOnboarding;
