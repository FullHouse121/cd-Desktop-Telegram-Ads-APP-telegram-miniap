document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();

  const user = tg.initDataUnsafe?.user;
  const usernameOutput = document.getElementById('username-output');

  if (user && usernameOutput) {
    const displayName = user.username
      ? `@${user.username}`
      : user.first_name || 'Ziyaretçi';
    usernameOutput.textContent = displayName;
  }

  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (tg && tg.close) {
        tg.close();
      } else {
        window.history.back();
      }
    });
  }

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

  
  const externalLinks = document.querySelectorAll('a[href^="https://"]');
  externalLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.removeAttribute('href');
    link.style.cursor = 'pointer';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      tg.openLink(href);
    });
  });

  const buttons = document.querySelectorAll('button.cta-button, .play-btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => button.classList.add('hovered'));
    button.addEventListener('mouseleave', () => button.classList.remove('hovered'));
    button.addEventListener('click', () => {
      document.body.classList.add('loading');
      setTimeout(() => {
        document.body.classList.remove('loading');
      }, 2000);
    });
  });

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

  const comingSoon = document.querySelectorAll('[data-soon]');
  comingSoon.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Bu özellik yakında aktif olacak!');
    });
  });

  
  tg.onEvent('viewportChanged', () => {
    console.log('Viewport changed:', tg.viewportHeight);
  });

  tg.onEvent('themeChanged', () => {
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
  });

  
  if (tg.platform === 'android' && tg.isExpanded) {
    const addToHomePrompt = document.createElement('div');
    addToHomePrompt.innerText = '➕ Ana ekrana ekle';
    addToHomePrompt.style.cssText = 'position:fixed;bottom:10px;left:10px;background:#fff;padding:10px;border-radius:10px;z-index:1000;font-weight:bold;color:#111;box-shadow:0 2px 6px rgba(0,0,0,0.15)';
    document.body.appendChild(addToHomePrompt);
    setTimeout(() => {
      addToHomePrompt.remove();
    }, 5000);
  }
});
