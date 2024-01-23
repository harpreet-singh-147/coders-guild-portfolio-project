import { body, homeLink } from './selectors.js';
import { setupIntersectionObserver } from './intersectionObserver.js';
import { navigation } from './navigation.js';
import { updateMainContent, removeAndAddNavClass } from './utils.js';

const headerEl = document.querySelector('.header');
const navLogoSpan = document.querySelector('.header__nav-logo span');
const mainHeroContainer = document.querySelector('.main__hero-container');

document.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    body.classList.add('scrolled');
    updateMainContent(1, false);
    mainHeroContainer.style.opacity = 1;
    if (window.innerWidth >= 1000) {
      headerEl.classList.add('header__scrolled-bg');
      navLogoSpan.classList.add('scrolled-color');
    }
  } else {
    updateMainContent('', false);
    mainHeroContainer.style.opacity = '';
    if (window.innerWidth >= 1000) {
      headerEl.classList.remove('header__scrolled-bg');
      navLogoSpan.classList.remove('scrolled-color');
    }
    removeAndAddNavClass();
    setTimeout(() => {
      body.classList.remove('scrolled');
    }, 150);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.slice(1);
  const targetSection = hash ? document.getElementById(hash) : null;

  if (targetSection) {
    body.classList.add('scrolled');
    setTimeout(() => {
      targetSection.scrollIntoView();
    }, 500);
  } else {
    body.classList.remove('scrolled');
    window.scrollTo(0, 0);
    homeLink.classList.add('active-link');
  }

  navigation();
  setupIntersectionObserver();
});
