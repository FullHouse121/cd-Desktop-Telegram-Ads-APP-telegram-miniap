const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

document.addEventListener('DOMContentLoaded', () => {

  const user = tg.initDataUnsafe?.user;
  const usernameOutput = document.getElementById('username-output');
  if (user && usernameOutput) {
    const username = user.username ? `@${user.username}` : user.first_name || 'Ziyaretçi';
    usernameOutput.textContent = username;
  }


  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });

 
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => button.classList.add('hovered'));
    button.addEventListener('mouseleave', () => button.classList.remove('hovered'));
  });


  const images = document.querySelectorAll('img[data-src]');
  const config = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        self.unobserve(img);
      }
    });
  }, config);
  images.forEach(img => observer.observe(img));

  
  const comingSoonElements = document.querySelectorAll('[data-soon]');
  comingSoonElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Bu özellik yakında aktif olacak!');
    });
  });
});