// Main interactions for Geetanjali Pandey portfolio

(function () {
  const doc = document;

  function smoothScrollToHash(hash) {
    const target = doc.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function initSmoothScrolling() {
    doc.querySelectorAll('[data-scroll]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const href = el.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScrollToHash(href);
        }
      });
    });
  }

  function initBackToTop() {
    const btn = doc.getElementById('backToTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initYear() {
    const yearEls = doc.querySelectorAll('#currentYear');
    const y = String(new Date().getFullYear());
    yearEls.forEach((el) => (el.textContent = y));
  }

  function initScrollProgress() {
    const bar = doc.getElementById('scrollProgressBar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const docHeight = doc.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = scrolled + '%';
    });
  }

  function initFunCounters() {
    const counters = Array.from(doc.querySelectorAll('.fun-counter'));
    if (!counters.length) return;

    let started = false;
    function start() {
      if (started) return;
      started = true;
      counters.forEach((el) => {
        const target = Number(el.getAttribute('data-target')) || 0;
        const duration = 1200;
        const startTime = performance.now();
        function tick(now) {
          const progress = Math.min(1, (now - startTime) / duration);
          el.textContent = Math.floor(progress * target).toString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }

    const observeTarget = doc.querySelector('#home') || doc.body;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) start();
      });
    }, { threshold: 0.2 });
    observer.observe(observeTarget);
  }

  function initShimmerOnLoad() {
    window.addEventListener('load', () => {
      doc.querySelectorAll('.shimmer-on-load').forEach((card) => {
        card.classList.add('shimmer-on-load-loaded');
      });
    });
  }

  function initGalleryLightbox() {
    const lightbox = doc.getElementById('galleryLightbox');
    if (!lightbox) return;
    const imgEl = doc.getElementById('galleryLightboxImage');
    const captionEl = doc.getElementById('galleryLightboxCaption');
    const modal = new bootstrap.Modal(lightbox);

    doc.querySelectorAll('.gallery-item-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-gallery-src');
        const alt = btn.getAttribute('data-gallery-alt') || '';
        imgEl.src = src || '';
        imgEl.alt = alt;
        captionEl.textContent = alt;
        modal.show();
      });
    });
  }

  function initContactForm() {
    const form = doc.getElementById('contactForm');
    if (!form) return;

    async function handleSubmit(event) {
      event.preventDefault();
      const status = doc.getElementById('contactStatus');
      const data = new FormData(event.target);

      // Basic validation
      const name = data.get('name').trim();
      const email = data.get('email').trim();
      const message = data.get('message').trim();
      const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

      let isValid = true;
      if (!name) {
        event.target.querySelector('[name="name"]').classList.add('is-invalid');
        isValid = false;
      } else {
        event.target.querySelector('[name="name"]').classList.remove('is-invalid');
      }
      if (!email || !emailRegex.test(email)) {
        event.target.querySelector('[name="email"]').classList.add('is-invalid');
        isValid = false;
      } else {
        event.target.querySelector('[name="email"]').classList.remove('is-invalid');
      }
      if (!message) {
        event.target.querySelector('[name="message"]').classList.add('is-invalid');
        isValid = false;
      } else {
        event.target.querySelector('[name="message"]').classList.remove('is-invalid');
      }

      if (!isValid) {
        status.innerHTML = "Please fill out all fields correctly.";
        status.className = 'mt-2 small text-danger';
        return;
      }

      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          status.className = 'mt-2 small text-success';
          form.reset();
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
              status.className = 'mt-2 small text-danger';
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
              status.className = 'mt-2 small text-danger';
            }
          }).catch(() => {
            status.innerHTML = "Oops! There was a problem submitting your form";
            status.className = 'mt-2 small text-danger';
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form";
        status.className = 'mt-2 small text-danger';
      });
    }
    form.addEventListener("submit", handleSubmit)
  }

  function initNavActiveOnScroll() {
    const navLinks = Array.from(doc.querySelectorAll('header .nav-link[href^="#"]'));
    if (!navLinks.length) return;

    const sections = navLinks
      .map((link) => ({ link, section: doc.querySelector(link.getAttribute('href')) }))
      .filter((p) => p.section);

    window.addEventListener('scroll', () => {
      const y = window.scrollY + 120;
      let active = null;
      sections.forEach(({ section, link }) => {
        const top = section.offsetTop;
        if (y >= top) active = link;
      });
      navLinks.forEach((l) => l.classList.remove('active'));
      if (active) active.classList.add('active');
    });
  }

  
  doc.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initBackToTop();
    initYear();
    initScrollProgress();
    initFunCounters();
    initShimmerOnLoad();
    initGalleryLightbox();
    initContactForm();
    initNavActiveOnScroll();
      });
})();
