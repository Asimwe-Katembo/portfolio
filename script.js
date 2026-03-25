const yearEl = document.getElementById('year');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Prefer saved user choice
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  body.classList.remove('light', 'dark');
  body.classList.add(storedTheme);
  themeToggle.textContent = storedTheme === 'dark' ? '☀️' : '🌙';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    const nextTheme = isDark ? 'light' : 'dark';
    body.classList.remove('light', 'dark');
    body.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);
    themeToggle.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
  });
}

// Smooth animate fade-in for key sections
const fadeIns = document.querySelectorAll('.hero, .projects-section, .about-section, .contact-section');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeIns.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
  obs.observe(el);
});
