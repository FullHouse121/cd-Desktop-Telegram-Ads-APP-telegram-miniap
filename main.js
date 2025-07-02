document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();

  console.log("Telegram WebApp initialized", tg.initDataUnsafe); 

  
  const loaderStyle = document.createElement('style');
  loaderStyle.innerHTML = `
    .sophisticated-loader {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 48px;
        height: 48px;
        border: 4px solid #FFD700;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 9999;
    }
    @keyframes spin {
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
  `;
  document.head.appendChild(loaderStyle);

  
  const defaultBg = '#0e0e0e'; 
  const isInTelegram = window.Telegram.WebApp.initDataUnsafe?.user;

   if (isInTelegram && tg.themeParams.bg_color) {
   document.body.style.backgroundColor = tg.themeParams.bg_color;
   } else {
   document.body.style.backgroundColor = defaultBg;
   }

  
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
      if (tg && tg.close) tg.close();
      else window.history.back();
    });
  }

  
  document.querySelectorAll('a[href^="#"]').forEach(link => {
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

  
  document.querySelectorAll('a[href^="https://"]').forEach(link => {
    const href = link.getAttribute('href');
    link.removeAttribute('href');
    link.style.cursor = 'pointer';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      tg.openLink(href, { try_instant_view: true });
    });
  });

  // Loader on button click
  document.querySelectorAll('button.cta-button, .play-btn').forEach(button => {
    button.addEventListener('click', () => {
      const loader = document.createElement('div');
      loader.className = 'sophisticated-loader';
      document.body.appendChild(loader);

      tg.HapticFeedback?.impactOccurred?.("light");

      setTimeout(() => {
        loader.remove();
      }, 1500);
    });
  });

  
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

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));

  
  document.querySelectorAll('[data-soon]').forEach(el => {
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