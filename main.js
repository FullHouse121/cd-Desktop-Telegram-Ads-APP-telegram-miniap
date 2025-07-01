const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

document.addEventListener('DOMContentLoaded', () => {
  const user = tg.initDataUnsafe?.user;
  const usernameOutput = document.getElementById('username-output');

  if (user && usernameOutput) {
    const displayName = user.username
      ? `@${user.username}`
      : user.first_name || 'Ziyaretçi';
    usernameOutput.textContent = displayName;
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => button.classList.add('hovered'));
    button.addEventListener('mouseleave', () => button.classList.remove('hovered'));
  });

  // Lazy load images
  const lazyImages = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        self.unobserve(img);
      }
    });
  }, { rootMargin: '50px 0px', threshold: 0.01 });

  lazyImages.forEach(img => observer.observe(img));

  // Feature notice placeholder
  const comingSoon = document.querySelectorAll('[data-soon]');
  comingSoon.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Bu özellik yakında aktif olacak!');
    });
  });
});