/* ============================================
   MOHAN MANJHI — PORTFOLIO v3 SCRIPTS
   Light/Dark Theme + Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    localStorage.setItem('portfolio-theme', theme);
    // Re-render Lucide icons (so sun/moon visibility updates)
    lucide.createIcons();
    // Update particles color
    updateParticles(theme);
  }

  function getTheme() {
    return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  themeToggle.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });

  // Listen for system theme change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('portfolio-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ===== PARTICLES.JS =====
  function initParticles(theme) {
    const isDark = theme === 'dark';
    if (window.particlesJS) {
      particlesJS('particles-js', {
        particles: {
          number: { value: 40, density: { enable: true, value_area: 1200 } },
          color: { value: isDark ? ['#6366F1', '#22D3EE', '#A78BFA'] : ['#6366F1', '#0EA5E9', '#7C3AED'] },
          shape: { type: 'circle' },
          opacity: { value: isDark ? 0.12 : 0.06, random: true, anim: { enable: true, speed: 0.4, opacity_min: 0.02 } },
          size: { value: 2, random: true, anim: { enable: true, speed: 0.8, size_min: 0.4 } },
          line_linked: {
            enable: true, distance: 150, color: '#6366F1', opacity: isDark ? 0.04 : 0.03, width: 1
          },
          move: {
            enable: true, speed: 0.5, direction: 'none', random: true,
            straight: false, out_mode: 'out', bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
          modes: { grab: { distance: 140, line_linked: { opacity: 0.12 } } }
        },
        retina_detect: true
      });
    }
  }

  function updateParticles(theme) {
    // Destroy and re-init particles for theme change
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }
    initParticles(theme);
  }

  initParticles(getTheme());

  // ===== TYPED.JS =====
  if (window.Typed) {
    new Typed('#typed-output', {
      strings: [
        'Full Stack Engineer',
        'Founder &amp; CEO — Vynorix',
        'Building Products at Scale',
        'AI / LLM Enthusiast',
        'Microsoft Hackathon Winner',
        '400+ DSA Problems Solved'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 2200,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('.section[id]');

  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });
  navLinksContainer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ===== STAT COUNTER ANIMATION =====
  const statVals = document.querySelectorAll('.stat-val');
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const txt = el.textContent;
        const match = txt.match(/(\d+)/);
        if (match) {
          const end = parseInt(match[1]);
          const suffix = txt.replace(match[1], '');
          animateNum(el, 0, end, suffix, 1500);
        }
        statObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statVals.forEach(el => statObs.observe(el));
  document.querySelectorAll('.gh-stat .num').forEach(el => statObs.observe(el));

  function animateNum(el, start, end, suffix, duration) {
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(start + (end - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ===== RESUME DOWNLOAD COUNTER =====
  const KEY = 'mohan_portfolio_downloads';
  const navCountEl = document.getElementById('navCount');
  const mainCountEl = document.getElementById('mainCount');
  let count = Math.max(parseInt(localStorage.getItem(KEY) || '0'), 47);

  function showCount(n) {
    const s = n.toLocaleString();
    if (navCountEl) navCountEl.textContent = s;
    if (mainCountEl) mainCountEl.textContent = s;
  }
  showCount(count);

  function bumpCount() {
    count++;
    localStorage.setItem(KEY, count.toString());
    showCount(count);
    document.querySelectorAll('.badge, #mainCount').forEach(el => {
      el.style.transform = 'scale(1.35)';
      el.style.transition = 'transform 0.3s';
      setTimeout(() => el.style.transform = 'scale(1)', 300);
    });
  }

  document.querySelectorAll('#navResumeBtn, #heroResumeBtn, #mainResumeBtn').forEach(btn => {
    btn.addEventListener('click', bumpCount);
  });

  // ===== CURSOR GLOW (desktop) =====
  if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:fixed; width:350px; height:350px; border-radius:50%;
      background:radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%);
      pointer-events:none; z-index:0; transform:translate(-50%,-50%);
      transition:left 0.08s linear,top 0.08s linear;
    `;
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ===== 3D TILT ON PROJECT CARDS (desktop) =====
  if (window.innerWidth > 768) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = (e.clientY - r.top - r.height / 2) / 30;
        const ry = (r.width / 2 - (e.clientX - r.left)) / 30;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.transition = 'transform 0.5s ease';
      });
      card.addEventListener('mouseenter', () => { card.style.transition = 'transform 0.1s ease'; });
    });
  }
});
