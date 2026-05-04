/* Ana Celeste PhD — main.js */

// ── Nav: scroll state ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Nav: mobile toggle ─────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  });
});

// ── Blog: tab filter ───────────────────────────────────────────
const tabs  = document.querySelectorAll('.blog__tab');
const posts = document.querySelectorAll('.post-card[data-category]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    posts.forEach(post => {
      const match = filter === 'todos' || post.dataset.category === filter;
      post.classList.toggle('hidden', !match);
    });
  });
});

// ── Scroll reveal ──────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── Número animado (counter) ───────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  const isNumeric = /^\d+$/.test(target);
  if (!isNumeric) {
    el.classList.add('popped');
    return;
  }
  const start    = 0;
  const end      = parseInt(target, 10);
  const startTs  = performance.now();

  function step(ts) {
    const elapsed  = ts - startTs;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out-cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (end - start) * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = end;
      el.classList.add('popped');
    }
  }
  requestAnimationFrame(step);
}

// Observa os valores dos stats quando entram na tela
const statVals = document.querySelectorAll('.sobre__stat-val');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = el.dataset.target || el.textContent.trim();
      el.dataset.target = target;
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statVals.forEach(el => counterObserver.observe(el));

// ── Parallax suave no hero ─────────────────────────────────────
const heroSection = document.querySelector('.hero');
const heroImg     = document.querySelector('.hero__image');

if (heroSection && heroImg && window.matchMedia('(min-width: 1024px)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const rate     = scrolled * 0.12;
    heroImg.style.transform = `translateY(${rate}px)`;
  }, { passive: true });
}

// ── Magnetic hover nos botões principais ──────────────────────
document.querySelectorAll('.btn--primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect   = btn.getBoundingClientRect();
    const x      = e.clientX - rect.left - rect.width  / 2;
    const y      = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.20}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ── Cursor: link underline animado ───────────────────────────
document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.letterSpacing = '0.01em';
  });
  link.addEventListener('mouseleave', () => {
    link.style.letterSpacing = '';
  });
});

// ── Contact form ───────────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Mensagem enviada ✓';
    btn.disabled    = true;
    btn.style.background = 'var(--c-sage-light)';
  });
}
