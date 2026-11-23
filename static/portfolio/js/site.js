const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const languageButtons = document.querySelectorAll('.language-toggle');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

languageButtons.forEach((languageButton) => languageButton.addEventListener('click', () => {
  const language = document.documentElement.lang === 'fr' ? 'en' : 'fr';
  document.documentElement.lang = language;
  document.querySelectorAll('[data-fr][data-en]').forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageButtons.forEach((button) => {
    button.textContent = language === 'fr' ? 'EN' : 'FR';
    button.setAttribute('aria-label', language === 'fr' ? 'Passer en anglais' : 'Switch to French');
  });
  document.title = language === 'fr'
    ? 'Steve Varrel — Développeur Full Stack'
    : 'Steve Varrel — Full Stack Developer';
  localStorage.setItem('portfolio-language', language);
}));

const savedLanguage = localStorage.getItem('portfolio-language');
if (savedLanguage && savedLanguage !== document.documentElement.lang) languageButtons[0]?.click();

document.querySelectorAll('.project-grid .project-card, .timeline-item, .stats-grid .stat, .method-process .method-step').forEach((item) => {
  const siblings = [...item.parentElement.children].filter((sibling) => sibling.matches('.project-card, .timeline-item, .stat, .method-step'));
  item.style.setProperty('--reveal-delay', `${siblings.indexOf(item) * 130}ms`);
});
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

// Add the cover entrance only after the document is ready, so content remains
// readable if JavaScript is disabled or delayed.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  requestAnimationFrame(() => document.documentElement.classList.add('motion-ready'));
}

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      counter.textContent = String(target);
      observer.unobserve(counter);
      return;
    }
    const startedAt = performance.now();
    const duration = 850;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      counter.textContent = String(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    observer.unobserve(counter);
  });
}, { threshold: 0.65 });
document.querySelectorAll('[data-count]').forEach((counter) => counterObserver.observe(counter));

const heroArt = document.querySelector('.hero-art');
if (heroArt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroArt.addEventListener('pointermove', (event) => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.setProperty('--move-x', `${x * 8}px`);
    heroArt.style.setProperty('--move-y', `${y * 8}px`);
  });
  heroArt.addEventListener('pointerleave', () => {
    heroArt.style.setProperty('--move-x', '0px');
    heroArt.style.setProperty('--move-y', '0px');
  });
}

const themeButtons = document.querySelectorAll('[data-theme-choice]');
const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
  });
  localStorage.setItem('portfolio-theme', theme);
};
themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.dataset.themeChoice));
});
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) applyTheme(savedTheme);

const progressBar = document.querySelector('.scroll-progress');
const backdrop = document.querySelector('.ambient-backdrop');
const coverPage = document.querySelector('.cover-page');
const siteHeader = document.querySelector('.site-header');
let pageMotionFrame = 0;
const updatePageMotion = () => {
  cancelAnimationFrame(pageMotionFrame);
  pageMotionFrame = requestAnimationFrame(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    const percent = Math.round(progress * 100);
    progressBar?.style.setProperty('--progress', String(progress));
    progressBar?.setAttribute('aria-valuenow', String(percent));
    backdrop?.style.setProperty('--scroll-depth', `${progress * 22}px`);
    if (coverPage) {
      const coverProgress = Math.min(1, Math.max(0, window.scrollY / (coverPage.offsetHeight * 0.9)));
      const enteredPortfolio = window.scrollY >= coverPage.offsetHeight * 0.82;
      coverPage.style.setProperty('--cover-exit', String(coverProgress));
      coverPage.style.setProperty('--cover-blur', `${coverProgress * 12}px`);
      coverPage.style.setProperty('--cover-opacity', String(1 - coverProgress * 0.82));
      coverPage.style.setProperty('--cover-y', `${coverProgress * -16}px`);
      siteHeader?.classList.toggle('is-entered', enteredPortfolio);
      document.body.classList.toggle('portfolio-entered', enteredPortfolio);
    } else {
      siteHeader?.classList.add('is-entered');
      document.body.classList.add('portfolio-entered');
    }
  });
};
window.addEventListener('scroll', updatePageMotion, { passive: true });
window.addEventListener('resize', updatePageMotion, { passive: true });
updatePageMotion();

const sectionLinks = document.querySelectorAll('.nav-links a[href*="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('main section.is-in-view').forEach((section) => section.classList.remove('is-in-view'));
    entry.target.classList.add('is-in-view');
    sectionLinks.forEach((link) => {
      const isCurrent = link.hash === `#${entry.target.id}`;
      link.classList.toggle('is-current', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach((section) => {
  if ([...sectionLinks].some((link) => link.hash === `#${section.id}`)) sectionObserver.observe(section);
});

const ambientBackdrop = document.querySelector('.ambient-backdrop');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (ambientBackdrop && !reducedMotion.matches) {
  let ambientFrame = 0;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    cancelAnimationFrame(ambientFrame);
    ambientFrame = requestAnimationFrame(() => {
      ambientBackdrop.style.setProperty('--pointer-x', `${(event.clientX / window.innerWidth) * 100}%`);
      ambientBackdrop.style.setProperty('--pointer-y', `${(event.clientY / window.innerHeight) * 100}%`);
    });
  }, { passive: true });
}

if (!reducedMotion.matches) {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty('--tilt-x', `${-y * 3}deg`);
      card.style.setProperty('--tilt-y', `${x * 3}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

const footerSignature = document.querySelector('.footer-signature-track');
let footerFrame = 0;
const moveFooterSignature = () => {
  if (!footerSignature || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  cancelAnimationFrame(footerFrame);
  footerFrame = requestAnimationFrame(() => {
    const bounds = footerSignature.parentElement.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
    const offset = (0.5 - progress) * 110;
    footerSignature.style.setProperty('--signature-shift', `${offset}px`);
    footerSignature.style.opacity = String(0.45 + progress * 0.35);
  });
};
window.addEventListener('scroll', moveFooterSignature, { passive: true });
window.addEventListener('resize', moveFooterSignature);
moveFooterSignature();

const dailyTools = document.querySelectorAll('[data-daily-tool]');
const dailyCurrent = document.querySelector('[data-daily-current]');
const dailyProgress = document.querySelector('.daily-tools-progress-line i');
if (dailyTools.length && 'IntersectionObserver' in window) {
  const dailyToolsObserver = new IntersectionObserver((entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visibleEntry) return;
    const currentIndex = Number(visibleEntry.target.dataset.dailyIndex);
    dailyTools.forEach((tool) => tool.classList.toggle('is-active', tool === visibleEntry.target));
    if (dailyCurrent) dailyCurrent.textContent = String(currentIndex).padStart(2, '0');
    if (dailyProgress) dailyProgress.style.transform = `scaleX(${currentIndex / dailyTools.length})`;
  }, { rootMargin: '-38% 0px -38% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
  dailyTools.forEach((tool) => dailyToolsObserver.observe(tool));
}
