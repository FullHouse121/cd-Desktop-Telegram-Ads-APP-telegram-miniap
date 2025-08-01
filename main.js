document.addEventListener('DOMContentLoaded', () => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();

  const fallbackBackground = '#0e0e0e';
  const themeBg = tg.themeParams?.bg_color || fallbackBackground;
  document.body.style.backgroundColor = themeBg;

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

  const user = tg.initDataUnsafe?.user;
  const usernameOutput = document.getElementById('username-output');
  if (user && usernameOutput) {
    usernameOutput.textContent = user.username ? `@${user.username}` : user.first_name || 'Ziyaretçi';
  }

   fetch('/static/config.json')
  .then(res => {
    if (!res.ok) throw new Error("Config not found");
    return res.json();
  })
  .then(data => {
    console.log(data.app_name, data.features);
  })
  .catch(err => console.warn("Config fetch failed:", err));

  const backBtn = document.getElementById("back-btn");
  backBtn?.addEventListener("click", () => {
    if (tg.close) tg.close();
    else window.history.back();
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
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
    link.addEventListener('click', e => {
      e.preventDefault();
      tg.openLink(href, { try_instant_view: true });
    });
  });

  document.querySelectorAll('button.cta-button, .play-btn').forEach(button => {
    button.addEventListener('click', () => {
      const loader = document.createElement('div');
      loader.className = 'sophisticated-loader';
      document.body.appendChild(loader);
      tg.HapticFeedback?.impactOccurred?.("light");
      setTimeout(() => loader.remove(), 1500);
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
    el.addEventListener('click', e => {
      e.preventDefault();
      alert('Bu özellik yakında aktif olacak!');
    });
  });

  tg.onEvent('themeChanged', () => {
    document.body.style.backgroundColor = tg.themeParams?.bg_color || fallbackBackground;
  });

  tg.onEvent('viewportChanged', () => {
    console.log('Viewport changed:', tg.viewportHeight);
  });

  if (tg.platform === 'android' && tg.isExpanded) {
    const prompt = document.createElement('div');
    prompt.innerText = '➕ Ana ekrana ekle';
    prompt.style.cssText = `
      position:fixed;bottom:10px;left:10px;background:#fff;padding:10px;
      border-radius:10px;z-index:1000;font-weight:bold;color:#111;
      box-shadow:0 2px 6px rgba(0,0,0,0.15)
    `;
    document.body.appendChild(prompt);
    setTimeout(() => prompt.remove(), 5000);
  }
});

const messaging = firebase.messaging();

Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    messaging.getToken({
      vapidKey: "BL788cXu6kCb29erZdv2xpiuHoCoLz_x1E0mlTIQzraNBAOf4Bk8dIrwEp-YxtnDT1qM9qzcT8fzmuMzOZ_WvM0"
    }).then((currentToken) => {
      if (currentToken) {
        console.log("Your FCM Token:", currentToken);
        // ✅ OPTIONAL: send token to your server here
        // fetch('/save-token', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token: currentToken })
        // });
      }
    }).catch((err) => {
      console.error('Token error:', err);
    });
  } else {
    console.warn('Notification permission not granted');
  }
});