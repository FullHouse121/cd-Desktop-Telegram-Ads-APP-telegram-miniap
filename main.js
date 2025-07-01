const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

const user = tg.initDataUnsafe.user;

if (user) {
  const username = user.username || 'Anonim';
  const firstName = user.first_name || '';
  const lastName = user.last_name || '';
  const userId = user.id;

  const output = document.getElementById('username-output');
  if (output) {
    output.textContent = `Hoş geldin, @${username}`;
  }
}

const smoothScroll = (targetId) => {
  const element = document.querySelector(targetId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 20,
      behavior: 'smooth'
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });
});

const animateButtons = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('hovered');
    });
    button.addEventListener('mouseleave', () => {
      button.classList.remove('hovered');
    });
  });
};

const lazyLoadImages = () => {
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
  images.forEach(image => {
    observer.observe(image);
  });
};

const futureFeatureNotice = () => {
  const comingSoonElements = document.querySelectorAll('[data-soon]');
  comingSoonElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Bu özellik yakında aktif olacak!');
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  animateButtons();
  lazyLoadImages();
  futureFeatureNotice();
});