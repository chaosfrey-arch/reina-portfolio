(() => {
  const header = document.getElementById('site-header');
  const progress = document.getElementById('scroll-progress');
  const year = document.getElementById('year');

  const updateScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header?.classList.toggle('scrolled', y > 24);
    if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  };

  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element));
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (year) year.textContent = String(new Date().getFullYear());
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
})();
