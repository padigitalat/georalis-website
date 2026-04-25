/* ================================================
   GEORALIS CONSULTING — MAIN JS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Fade in on load ──
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  }));

  // ── Touch device detection ──
  const isTouch = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch()) document.body.classList.add('touch-device');

  // ── Custom Cursor ──
  if (!isTouch()) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    // Lerp ring
    (function tick() {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(tick);
    })();

    // Hover effect on interactive elements
    const hoverEls = 'a, button, [role="button"], .option-label, .focus-card, .service-card';
    document.querySelectorAll(hoverEls).forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
    });
  }

  // ── Navigation scroll behavior ──
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // White nav text when first section is dark
    const firstSection = document.querySelector('main > section:first-child');
    if (firstSection && (firstSection.classList.contains('hero') || firstSection.classList.contains('lp-hero'))) {
      nav.classList.add('nav--over-dark');
    }
  }

  // ── Mobile Nav ──
  const burger  = document.querySelector('.nav-hamburger');
  const overlay = document.querySelector('.nav-overlay');
  if (burger && overlay) {
    // Inject language switcher into overlay from desktop nav
    const langA = document.querySelector('.nav-links .lang-switch a');
    if (langA) {
      const mobileLang = document.createElement('a');
      mobileLang.href = langA.getAttribute('href');
      mobileLang.textContent = langA.textContent;
      mobileLang.className = 'mobile-lang-link';
      overlay.appendChild(mobileLang);
    }

    const closeOverlay = () => {
      burger.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('active');
      overlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeOverlay);
    });
  }

  // ── GSAP Setup ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    const words    = document.querySelectorAll('.hero-headline .word');
    const subline  = document.querySelector('.hero-subline');
    const heroSvg  = document.querySelector('.hero-svg');
    const scrollInd = document.querySelector('.scroll-indicator');

    if (words.length) {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(words, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out'
      });
      if (subline)   tl.to(subline,   { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
      if (heroSvg)   tl.to(heroSvg,   { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5');
      if (scrollInd) tl.to(scrollInd, { opacity: 1, duration: 0.5 }, '-=0.2');
    }

    // Generic scroll reveals
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
      });
    });

    // Quote word-by-word
    const quoteEl = document.querySelector('.quote-text');
    if (quoteEl) {
      const rawWords = quoteEl.textContent.trim().split(/\s+/);
      quoteEl.innerHTML = rawWords
        .map(w => `<span style="display:inline-block;opacity:0;margin-right:0.22em">${w}</span>`)
        .join('');
      gsap.to(quoteEl.querySelectorAll('span'), {
        scrollTrigger: { trigger: quoteEl, start: 'top 78%' },
        opacity: 1, stagger: 0.045, duration: 0.5, ease: 'power2.out'
      });
    }

    // Counter animations
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target  = parseFloat(el.dataset.count);
      const suffix  = el.dataset.suffix || '';
      const isFloat = !Number.isInteger(target);
      const obj     = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: 'top 80%', once: true,
        onEnter: () => gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: () => {
            el.textContent = (isFloat ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
          }
        })
      });
    });

    // Timeline draw
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
      ScrollTrigger.create({
        trigger: timelineLine.parentElement,
        start: 'top 70%', once: true,
        onEnter: () => timelineLine.classList.add('drawn')
      });
    }

    // Fokus sidebar active tracking
    const fokusLinks    = document.querySelectorAll('.fokus-nav-link');
    const fokusSections = document.querySelectorAll('.fokus-section');
    if (fokusLinks.length && fokusSections.length) {
      const setActive = (i) => {
        fokusLinks.forEach(l => l.classList.remove('active'));
        if (fokusLinks[i]) fokusLinks[i].classList.add('active');
      };
      fokusSections.forEach((sec, i) => {
        ScrollTrigger.create({
          trigger: sec, start: 'top 45%', end: 'bottom 45%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i)
        });
      });
      fokusLinks.forEach((link, i) => {
        link.addEventListener('click', () => {
          fokusSections[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

  } else {
    // GSAP not loaded — show everything immediately
    document.querySelectorAll('.reveal, .hero-headline .word, .hero-subline, .hero-svg, .scroll-indicator')
      .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  }

  // ── Page Transitions ──
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.includes('://')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.transition = 'opacity 0.22s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 230);
    });
  });

  // ── Bedarfsanalyse Multi-Step Form ──
  const stepForms = document.querySelectorAll('.step-form');
  const stepBars  = document.querySelectorAll('.step-bar');
  const stepDots  = document.querySelectorAll('.step-dot-node');
  let current = 0;

  const updateProgress = () => {
    stepBars.forEach((bar, i) => {
      bar.classList.remove('active', 'done');
      if (i < current) bar.classList.add('done');
      else if (i === current) bar.classList.add('active');
    });
    stepDots.forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i < current) dot.classList.add('done');
      else if (i === current) dot.classList.add('active');
    });
  };

  const goToStep = (next) => {
    if (next < 0 || next >= stepForms.length) return;
    const dir = next > current ? -1 : 1;
    const from = stepForms[current];
    const to   = stepForms[next];

    if (typeof gsap !== 'undefined') {
      gsap.to(from, {
        opacity: 0, x: dir * -60, duration: 0.28, ease: 'power2.in',
        onComplete: () => {
          from.classList.remove('active');
          current = next;
          to.classList.add('active');
          gsap.fromTo(to,
            { opacity: 0, x: dir * 60 },
            { opacity: 1, x: 0, duration: 0.32, ease: 'power2.out' }
          );
          updateProgress();
        }
      });
    } else {
      from.classList.remove('active');
      current = next;
      to.classList.add('active');
      updateProgress();
    }
  };

  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next)));
  });
  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.prev)));
  });

  if (stepForms.length) { updateProgress(); }

  // ── Contact Form ──
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = 'Nachricht gesendet ✓';
      btn.disabled = true;
      btn.style.opacity = '0.55';
    });
  }

  // ── Analyse Form ──
  const analyseForm = document.getElementById('analyse-form');
  if (analyseForm) {
    analyseForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = analyseForm.querySelector('[type="submit"]');
      btn.textContent = 'Anfrage erhalten ✓';
      btn.disabled = true;
      btn.style.opacity = '0.55';
    });
  }

});
