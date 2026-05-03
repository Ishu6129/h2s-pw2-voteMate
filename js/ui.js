// js/ui.js — VoteMate UI rendering functions

function renderProcessCards(type) {
  const grid = document.getElementById('processGrid');
  if (!grid) return;
  const lang = window.currentLang || 'en';
  const data = window.PROCESS_CARDS[lang] || window.PROCESS_CARDS.en;
  const cards = data[type] || [];
  
  grid.innerHTML = cards.map((c, i) => `
    <div class="process-card gsap-fade-up" style="--card-accent:${c.accent}; animation-delay:${i * 0.08}s;">
      <span class="process-card-icon">${c.icon}</span>
      <div class="process-card-num">${lang === 'hi' ? 'चरण' : 'Step'} ${c.num}</div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
    </div>
  `).join('');
}

function renderTimeline(type) {
  const wrap = document.getElementById('timelineContainer');
  if (!wrap) return;
  const lang = window.currentLang || 'en';
  const data = window.TIMELINE_STEPS[lang] || window.TIMELINE_STEPS.en;
  const steps = data[type] || [];
  
  wrap.innerHTML = steps.map((s, i) => `
    <div class="timeline-item gsap-fade-up" style="animation-delay:${i * 0.07}s;">
      <div class="timeline-dot">${s.icon}</div>
      <div class="timeline-content">
        <div class="timeline-tag">${s.tag}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join('');
}

function renderEligibility() {
  const list = document.getElementById('eligibilityList');
  if (!list) return;
  const lang = window.currentLang || 'en';
  const data = window.ELIGIBILITY[lang] || window.ELIGIBILITY.en;
  list.innerHTML = data.map(e => `<li>${e}</li>`).join('');
}

function renderRegSteps() {
  const wrap = document.getElementById('regSteps');
  if (!wrap) return;
  const lang = window.currentLang || 'en';
  const data = window.REG_STEPS[lang] || window.REG_STEPS.en;
  wrap.innerHTML = data.map((s, i) => `
    <div class="step-item">
      <div class="step-num">${s.num}</div>
      <div class="step-text"><strong>${s.title}</strong>${s.desc}</div>
    </div>
  `).join('');
}

function renderDocuments() {
  const list = document.getElementById('docsList');
  if (!list) return;
  const lang = window.currentLang || 'en';
  const data = window.DOCS[lang] || window.DOCS.en;
  list.innerHTML = data.map(d => `<li>${d}</li>`).join('');
}

function renderFAQ() {
  const wrap = document.getElementById('faqContainer');
  if (!wrap) return;
  const lang = window.currentLang || 'en';
  const data = window.FAQ_DATA[lang] || window.FAQ_DATA.en;
  wrap.innerHTML = data.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="toggleFAQ(${i})" role="button" aria-expanded="false">
        <span>${f.q}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const item = document.getElementById(`faq-${index}`);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

function renderGuide() {
  const stepsWrap = document.getElementById('guideSteps');
  const lang = window.currentLang || 'en';
  
  if (stepsWrap) {
    const dataSteps = window.GUIDE_STEPS[lang] || window.GUIDE_STEPS.en;
    stepsWrap.innerHTML = dataSteps.map((s, i) => `
      <div class="guide-step gsap-fade-up" style="animation-delay:${i * 0.1}s;">
        <div class="guide-step-num">${s.num}</div>
        <span class="guide-step-icon">${s.icon}</span>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  const featWrap = document.getElementById('guideFeatures');
  if (featWrap) {
    const dataFeats = window.GUIDE_FEATURES[lang] || window.GUIDE_FEATURES.en;
    featWrap.innerHTML = dataFeats.map(f => `
      <div class="guide-feature gsap-fade-up">
        <div class="guide-feature-icon">${f.icon}</div>
        <div>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>
      </div>
    `).join('');
  }
}

function renderPhotoStrip() {
  const gallery = document.getElementById('photoStrip');
  if (!gallery) return;
  
  // Create double set for seamless loop
  const doubleSet = [...window.PHOTO_STRIP, ...window.PHOTO_STRIP];
  
  gallery.innerHTML = `
    <div class="photo-strip-inner">
      ${doubleSet.map((p, i) => `
        <div class="photo-card" data-index="${i}">
          <img src="${p.url}"
               alt="${p.caption}"
               title="${p.caption}"
               class="photo-card-img"
               loading="lazy" />
          <div class="photo-card-overlay"></div>
          <div class="photo-card-caption">${p.caption}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderLangMenu() {
  const menu = document.getElementById('langMenu');
  if (!menu) return;
  menu.innerHTML = window.LANGUAGES.map(l => `
    <button class="lang-option ${l.code === window.currentLang ? 'active' : ''}"
      onclick="setLanguage('${l.code}')" role="menuitem">
      <span>${l.flag}</span>
      <span>${l.nativeName}</span>
      <span style="font-size:11px;color:var(--text-3);margin-left:auto;">${l.name}</span>
    </button>
  `).join('');
}

function renderOnboardingLangs() {
  const grid = document.getElementById('onboardingLangGrid');
  if (!grid) return;
  grid.innerHTML = window.LANGUAGES.map(l => `
    <div class="lang-card" id="onboarding-${l.code}" onclick="selectOnboardingLang('${l.code}')">
      <div class="lang-flag">${l.flag}</div>
      <div class="lang-name">${l.nativeName}</div>
      <div style="font-size:12px; opacity:0.7">${l.name}</div>
    </div>
  `).join('');
}

function updateElectionBanner(type) {
  const title = document.getElementById('bannerTitle');
  const sub   = document.getElementById('bannerSub');
  const icon  = document.getElementById('bannerIcon');
  if (!title) return;
  
  const lang = window.currentLang || 'en';
  const t = window.TRANSLATIONS[lang] || window.TRANSLATIONS.en;
  
  if (type === 'loksabha') {
    icon.textContent  = '🏛️';
    title.textContent = t.banner_ls_title || 'Lok Sabha (General) Election';
    sub.textContent   = t.banner_ls_sub || 'Lower House of Parliament — elections held every 5 years';
  } else {
    icon.textContent  = '🗳️';
    title.textContent = t.banner_sa_title || 'State Legislative Assembly Election';
    sub.textContent   = t.banner_sa_sub || 'Vidhan Sabha — elections held every 5 years per state';
  }
}

function applyTranslations(lang) {
  const t = window.TRANSLATIONS[lang] || window.TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  // Note: chat welcome is handled by showWelcomeChat() in app.js to avoid duplicates
}

// Chat UI helpers
function addBotMessage(text) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'msg bot';
  
  // Basic XSS protection: Escape HTML but allow <br>
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, '<br>');

  div.innerHTML = `
    <div class="msg-avatar">🗳️</div>
    <div class="msg-bubble">${escapedText}</div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addUserMessage(text) {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'msg user';
  
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;
  
  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = '👤';
  
  div.appendChild(bubble);
  div.appendChild(avatar);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}


function showTyping() {
  const msgs = document.getElementById('chatMessages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="msg-avatar">🗳️</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function renderSuggestions(lang) {
  const wrap = document.getElementById('chatSuggestions');
  if (!wrap) return;
  const suggestions = window.SUGGESTIONS[lang] || window.SUGGESTIONS.en;
  wrap.innerHTML = suggestions.map(s => `
    <button class="suggestion-chip" onclick="sendSuggestion('${s.replace(/'/g, "\\'")}')">${s}</button>
  `).join('');
}

window.renderProcessCards = renderProcessCards;
window.renderTimeline = renderTimeline;
window.renderEligibility = renderEligibility;
window.renderRegSteps = renderRegSteps;
window.renderDocuments = renderDocuments;
window.renderFAQ = renderFAQ;
window.toggleFAQ = toggleFAQ;
window.renderGuide = renderGuide;
window.renderPhotoStrip = renderPhotoStrip;
window.renderLangMenu = renderLangMenu;
window.updateElectionBanner = updateElectionBanner;
window.applyTranslations = applyTranslations;
window.addBotMessage = addBotMessage;
window.addUserMessage = addUserMessage;
window.showTyping = showTyping;
window.hideTyping = hideTyping;
window.renderSuggestions = renderSuggestions;
window.renderOnboardingLangs = renderOnboardingLangs;
