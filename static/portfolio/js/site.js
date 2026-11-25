const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');
const languageButtons = document.querySelectorAll('.language-toggle');
let typewriterTimer = null;

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
  document.querySelectorAll('[data-placeholder-fr][data-placeholder-en]').forEach((element) => {
    element.placeholder = element.dataset[`placeholder${language === 'fr' ? 'Fr' : 'En'}`];
  });
  const typewriter = document.querySelector('.typewriter-output');
  if (typewriter) {
    clearTimeout(typewriterTimer);
    const typewriterLine = typewriter.closest('.typewriter-line');
    if (typewriterLine?.classList.contains('is-typing')) {
      typewriterLine.classList.remove('is-typing');
      typewriter.dataset.typewriterDone = 'true';
    }
  }
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

document.querySelectorAll('.project-grid .project-card, .daily-tools-list .daily-tool, .timeline-item, .stats-grid .stat, .method-process .method-step').forEach((item) => {
  const siblings = [...item.parentElement.children].filter((sibling) => sibling.matches('.project-card, .daily-tool, .timeline-item, .stat, .method-step'));
  const step = item.matches('.daily-tool') ? 72 : 105;
  item.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(item), 5) * step}ms`);
});
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
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

const typewriterOutput = document.querySelector('.typewriter-output');
const typewriterLine = typewriterOutput?.closest('.typewriter-line');
if (typewriterOutput && typewriterLine) {
  const completeText = typewriterOutput.dataset[document.documentElement.lang === 'en' ? 'en' : 'fr'] || typewriterOutput.textContent;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    typewriterOutput.textContent = completeText;
  } else {
    let typingStarted = false;
    const beginTyping = () => {
      if (typingStarted || typewriterOutput.dataset.typewriterDone === 'true') return;
      typingStarted = true;
      typewriterLine.classList.add('is-typing');
      typewriterOutput.textContent = '';
      const characters = Array.from(completeText);
      let position = 0;
      const writeNext = () => {
        if (position >= characters.length) {
          typewriterLine.classList.remove('is-typing');
          typewriterOutput.dataset.typewriterDone = 'true';
          return;
        }
        const character = characters[position++];
        typewriterOutput.textContent += character;
        typewriterTimer = window.setTimeout(writeNext, /[,.!?]/.test(character) ? 190 : 48);
      };
      typewriterTimer = window.setTimeout(writeNext, 320);
    };
    if ('IntersectionObserver' in window) {
      const typewriterObserver = new IntersectionObserver((entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        beginTyping();
        observer.disconnect();
      }, { threshold: 0.4 });
      typewriterObserver.observe(typewriterLine);
    } else {
      beginTyping();
    }
  }
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
    document.documentElement.dataset.activeSection = entry.target.id;
    document.querySelectorAll('main section.is-in-view').forEach((section) => section.classList.remove('is-in-view'));
    entry.target.classList.add('is-in-view');
    sectionLinks.forEach((link) => {
      const isCurrent = link.hash === `#${entry.target.id}`;
      link.classList.toggle('is-current', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-38% 0px -38% 0px', threshold: 0 });
document.querySelectorAll('main section[id]').forEach((section) => {
  sectionObserver.observe(section);
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
    if (bounds.top < window.innerHeight && bounds.bottom > 0) footerSignature.parentElement.classList.add('signature-entered');
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
const dailySection = document.querySelector('.daily-tools');
const dailyLayout = document.querySelector('.daily-tools-layout');
if (dailyTools.length && dailySection && dailyLayout) {
  const dailyWheel = dailySection.querySelector('.daily-tools-list');
  const brandBackdrop = document.createElement('div');
  brandBackdrop.className = 'daily-brand-backdrop';
  brandBackdrop.setAttribute('aria-hidden', 'true');
  brandBackdrop.innerHTML = '<div class="daily-brand-watermark"><span data-daily-brand-watermark></span><strong data-daily-brand-name></strong></div>';
  dailySection.prepend(brandBackdrop);
  const dailyOrbit = document.createElement('div');
  dailyOrbit.className = 'daily-tools-orbit';
  dailyTools.forEach((tool) => dailyOrbit.append(tool));
  dailyWheel?.prepend(dailyOrbit);
  const wheelCenter = document.createElement('div');
  wheelCenter.className = 'daily-wheel-center';
  wheelCenter.setAttribute('aria-live', 'off');
  wheelCenter.innerHTML = '<span class="daily-wheel-caption" data-fr="LES OUTILS TOURNENT AUTOMATIQUEMENT" data-en="TOOLS ROTATE AUTOMATICALLY">LES OUTILS TOURNENT AUTOMATIQUEMENT</span><span class="daily-wheel-active-mark" data-daily-active-mark></span><strong data-daily-active-label></strong><span class="daily-wheel-active-count" data-daily-active-count></span>';
  dailyWheel?.append(wheelCenter);
  dailySection.classList.add('is-wheel');

  const logoSlugs = [
    { match: 'HTML & CSS', slugs: ['html5', 'css3'] },
    { match: 'JavaScript', slugs: ['javascript'] },
    { match: 'Python', slugs: ['python'] },
    { match: 'Django', slugs: ['django'] },
  ];
  const genericBrandIcons = {
    administration: '<svg viewBox="0 0 64 64"><rect x="10" y="12" width="44" height="16" rx="4"/><rect x="10" y="36" width="44" height="16" rx="4"/><path d="M20 20h.1M29 20h.1M37 20h10M20 44h.1M29 44h.1M37 44h10"/></svg>',
    maintenance: '<svg viewBox="0 0 64 64"><path d="M39 12a18 18 0 0 0-22 22L9 42a7 7 0 0 0 10 10l8-8a18 18 0 0 0 22-22L39 32 30 23z"/><circle cx="17" cy="47" r="2"/></svg>',
  };
  const createToolLogos = (tool, className = '') => {
    const name = tool.querySelector('h3')?.textContent?.trim() ?? '';
    const brand = logoSlugs.find((item) => item.match === name);
    const container = document.createElement('span');
    container.className = `daily-brand-logos ${className}`.trim();
    container.setAttribute('aria-hidden', 'true');
    if (brand) {
      brand.slugs.forEach((slug) => {
        const image = document.createElement('img');
        image.src = `https://cdn.simpleicons.org/${slug}/548b3f`;
        image.alt = '';
        image.width = 64;
        image.height = 64;
        image.decoding = 'async';
        image.referrerPolicy = 'no-referrer';
        image.addEventListener('error', () => {
          const fallback = document.createElement('b');
          fallback.className = 'daily-brand-fallback';
          fallback.textContent = name.includes('HTML') ? '</>' : name === 'JavaScript' ? 'JS' : name === 'Python' ? 'Py' : 'dj';
          image.replaceWith(fallback);
        }, { once: true });
        container.append(image);
      });
    } else {
      const icon = document.createElement('span');
      icon.innerHTML = name.toLowerCase().includes('administration') ? genericBrandIcons.administration : genericBrandIcons.maintenance;
      container.append(icon.firstElementChild);
    }
    return container;
  };

  let wheelStep = 0;
  let autoRotateTimer = 0;
  const setDailyState = (currentIndex, progress = currentIndex / dailyTools.length) => {
    currentIndex = (currentIndex % dailyTools.length + dailyTools.length) % dailyTools.length;
    const activeTool = dailyTools[currentIndex];
    dailyTools.forEach((tool, index) => {
      tool.classList.toggle('is-active', index === currentIndex);
      tool.classList.toggle('is-complete', index < currentIndex);
    });
    if (dailyCurrent) dailyCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
    if (dailyProgress) dailyProgress.style.transform = `scaleX(${(currentIndex + 1) / dailyTools.length})`;
    const activeLabel = wheelCenter?.querySelector('[data-daily-active-label]');
    const activeMark = wheelCenter?.querySelector('[data-daily-active-mark]');
    const activeCount = wheelCenter?.querySelector('[data-daily-active-count]');
    const brandName = brandBackdrop.querySelector('[data-daily-brand-name]');
    const brandWatermark = brandBackdrop.querySelector('[data-daily-brand-watermark]');
    if (activeLabel && activeTool) activeLabel.textContent = activeTool.querySelector('h3')?.textContent ?? '';
    if (activeMark && activeTool) {
      if (activeMark.dataset.index !== String(currentIndex)) {
        activeMark.replaceChildren(createToolLogos(activeTool));
        activeMark.dataset.index = String(currentIndex);
      }
    }
    if (brandName && brandWatermark && activeTool && brandWatermark.dataset.index !== String(currentIndex)) {
      brandBackdrop.classList.remove('is-visible');
      brandWatermark.replaceChildren(createToolLogos(activeTool));
      brandName.textContent = activeTool.querySelector('h3')?.textContent ?? '';
      brandWatermark.dataset.index = String(currentIndex);
      requestAnimationFrame(() => brandBackdrop.classList.add('is-visible'));
    }
    if (activeCount) activeCount.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(dailyTools.length).padStart(2, '0')}`;

    if (dailyWheel) {
      const radius = Math.min(dailyWheel.clientWidth * 0.32, window.innerHeight * 0.24);
      dailyTools.forEach((tool, index) => {
        const angle = -Math.PI / 2 + index * Math.PI * 2 / dailyTools.length;
        tool.style.setProperty('--wheel-x', `${Math.cos(angle) * radius}px`);
        tool.style.setProperty('--wheel-y', `${Math.sin(angle) * radius}px`);
      });
    }
  };
  const rotateDailyWheel = (direction) => {
    wheelStep += direction;
    const index = (wheelStep % dailyTools.length + dailyTools.length) % dailyTools.length;
    setDailyState(index, wheelStep / dailyTools.length);
  };
  const stopAutoRotate = () => {
    window.clearTimeout(autoRotateTimer);
    autoRotateTimer = 0;
  };
  const scheduleAutoRotate = (delay = 4000) => {
    stopAutoRotate();
    autoRotateTimer = window.setTimeout(() => {
      autoRotateTimer = 0;
      if (!dailySection.classList.contains('wheel-is-visible')) return;
      rotateDailyWheel(1);
      scheduleAutoRotate(4000);
    }, delay);
  };
  setDailyState(0, 0);
  if ('IntersectionObserver' in window) {
    const dailyWheelObserver = new IntersectionObserver((entries) => {
      const isVisible = entries.some((entry) => entry.isIntersecting);
      dailySection.classList.toggle('wheel-is-visible', isVisible);
      if (isVisible) scheduleAutoRotate(4000);
      else stopAutoRotate();
    }, { threshold: 0.15 });
    dailyWheelObserver.observe(dailySection);
  } else {
    dailySection.classList.add('wheel-is-visible');
    rotateDailyWheel(1);
    scheduleAutoRotate(4000);
  }
  window.addEventListener('resize', () => {
    const index = (wheelStep % dailyTools.length + dailyTools.length) % dailyTools.length;
    setDailyState(index, wheelStep / dailyTools.length);
  });
}

const backgroundCompareMode = new URLSearchParams(window.location.search).get('fonds') === 'variantes';
if (backgroundCompareMode) {
  const backgroundOptions = [
    { id: 'paper', fr: 'Papier doux', en: 'Soft paper', detailFr: 'Sobre et chaleureux', detailEn: 'Quiet and warm' },
    { id: 'grid', fr: 'Trame fine', en: 'Fine grid', detailFr: 'Précis et technique', detailEn: 'Precise and technical' },
    { id: 'mesh', fr: 'Halo diffus', en: 'Soft mesh', detailFr: 'Profond et organique', detailEn: 'Deep and organic' },
    { id: 'aurora', fr: 'Aurore légère', en: 'Light aurora', detailFr: 'Fluide et vivant', detailEn: 'Fluid and lively' },
  ];
  const panel = document.createElement('aside');
  panel.className = 'background-compare-panel';
  panel.setAttribute('aria-label', 'Comparateur des fonds');
  panel.innerHTML = '<div class="background-compare-heading"><div><span class="background-compare-kicker">PORTFOLIO · LAB</span><strong data-fr="Compare les ambiances" data-en="Compare backgrounds">Compare les ambiances</strong><span class="background-compare-help" data-fr="Choisis un fond : il s’applique à toute la page." data-en="Choose a background to apply it across the page.">Choisis un fond : il s’applique à toute la page.</span></div><button class="background-compare-close" type="button" aria-label="Fermer le comparateur">×</button></div><div class="background-compare-options"></div>';
  document.body.append(panel);
  const optionContainer = panel.querySelector('.background-compare-options');
  backgroundOptions.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'background-compare-option';
    button.dataset.backgroundChoice = option.id;
    button.setAttribute('aria-pressed', String(option.id === 'paper'));
    button.innerHTML = `<span class="background-compare-swatch" data-preview-style="${option.id}" aria-hidden="true"></span><span class="background-compare-option-copy"><strong data-fr="${option.fr}" data-en="${option.en}">${option.fr}</strong><small data-fr="${option.detailFr}" data-en="${option.detailEn}">${option.detailFr}</small></span>`;
    button.addEventListener('click', () => {
      document.documentElement.dataset.backgroundStyle = option.id;
      panel.querySelectorAll('[data-background-choice]').forEach((choice) => {
        choice.setAttribute('aria-pressed', String(choice === button));
      });
    });
    optionContainer.append(button);
  });
  document.documentElement.dataset.backgroundStyle = 'paper';
  panel.querySelector('.background-compare-close')?.addEventListener('click', () => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete('fonds');
    history.replaceState(null, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    document.documentElement.removeAttribute('data-background-style');
    panel.remove();
  });
}

const fontCompareMode = new URLSearchParams(window.location.search).get('police') === 'variantes';
if (fontCompareMode) {
  const fontOptions = [
    { id: 'manrope', fr: 'Manrope', en: 'Manrope', detailFr: 'Actuelle · nette et moderne', detailEn: 'Current · crisp and modern' },
    { id: 'space', fr: 'Space Grotesk + DM Sans', en: 'Space Grotesk + DM Sans', detailFr: 'Technique et affirmée', detailEn: 'Technical and distinctive' },
    { id: 'jakarta', fr: 'Plus Jakarta Sans', en: 'Plus Jakarta Sans', detailFr: 'Doux et contemporain', detailEn: 'Soft and contemporary' },
    { id: 'editorial', fr: 'Lora + Manrope', en: 'Lora + Manrope', detailFr: 'Éditorial et élégant', detailEn: 'Editorial and elegant' },
    { id: 'inter', fr: 'Inter', en: 'Inter', detailFr: 'Sobre et très lisible', detailEn: 'Neutral and highly readable' },
  ];
  const fontStylesheet = document.createElement('link');
  fontStylesheet.rel = 'stylesheet';
  fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&family=Lora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap';
  document.head.append(fontStylesheet);

  const panel = document.createElement('aside');
  panel.className = 'font-compare-panel';
  panel.setAttribute('aria-label', 'Comparateur des polices');
  panel.innerHTML = '<div class="background-compare-heading"><div><span class="background-compare-kicker">PORTFOLIO · TYPOGRAPHIE</span><strong data-fr="Compare les polices" data-en="Compare typefaces">Compare les polices</strong><span class="background-compare-help" data-fr="Chaque choix s’applique aux titres et aux textes du site." data-en="Each choice updates the headings and text across the site.">Chaque choix s’applique aux titres et aux textes du site.</span></div><button class="background-compare-close" type="button" aria-label="Fermer le comparateur de polices">×</button></div><div class="font-compare-options"></div>';
  document.body.append(panel);
  const optionContainer = panel.querySelector('.font-compare-options');
  fontOptions.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'font-compare-option';
    button.dataset.fontChoice = option.id;
    button.setAttribute('aria-pressed', String(option.id === 'space'));
    button.innerHTML = `<span class="font-compare-sample" data-sample-font="${option.id}" aria-hidden="true">Aa</span><span class="font-compare-option-copy"><strong data-fr="${option.fr}" data-en="${option.en}">${option.fr}</strong><small data-fr="${option.detailFr}" data-en="${option.detailEn}">${option.detailFr}</small></span>`;
    button.addEventListener('click', () => {
      document.documentElement.dataset.fontStyle = option.id;
      panel.querySelectorAll('[data-font-choice]').forEach((choice) => {
        choice.setAttribute('aria-pressed', String(choice === button));
      });
    });
    optionContainer.append(button);
  });
  document.documentElement.dataset.fontStyle = 'space';
  panel.querySelector('.background-compare-close')?.addEventListener('click', () => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete('police');
    history.replaceState(null, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    document.documentElement.removeAttribute('data-font-style');
    panel.remove();
  });
}
