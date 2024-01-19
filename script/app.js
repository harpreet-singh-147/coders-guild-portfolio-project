const mainEl = document.querySelector('.main');
const scrolledMainEl = document.querySelector('.scrolled');
const mainHeroContainer = document.querySelector('.main__hero-container');
const mainContentContainer = document.querySelector('.main__content-container');
const hero = document.querySelector('.hero');
const navLinks = document.querySelectorAll('.header__nav-list a');
const logo = document.querySelector('.header__nav-logo');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetSection = document.getElementById(link.className);
    if (link.className === 'home-link') {
      mainContentContainer.style.opacity = '';
      window.scrollTo(0, 0);
      history.pushState(null, '', '/');
    } else {
      mainEl.classList.add('scrolled');
      setTimeout(() => {
        targetSection.scrollIntoView();
      }, 0);
      history.pushState(null, '', `#${link.className}`);
    }
  });
});

logo.addEventListener('click', e => {
  e.preventDefault();
  mainContentContainer.style.opacity = '';
  window.scrollTo(0, 0);
  history.pushState(null, '', '/');
});

document.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    mainEl.classList.add('scrolled');
    mainContentContainer.style.opacity = 1;
    mainHeroContainer.style.opacity = 1;
  } else {
    mainContentContainer.style.opacity = '';
    mainHeroContainer.style.opacity = '';
    setTimeout(() => {
      mainEl.classList.remove('scrolled');
    }, 150);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.slice(1);
  const targetSection = hash ? document.getElementById(hash) : null;

  if (targetSection) {
    mainEl.classList.add('scrolled');
    setTimeout(() => {
      targetSection.scrollIntoView();
    }, 500);
  } else {
    mainEl.classList.remove('scrolled');
    window.scrollTo(0, 0);
  }
});
