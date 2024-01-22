import { navLinks } from './selectors.js';
import { setupIntersectionObserver } from './intersectionObserver.js';

const body = document.querySelector('body');
const headerEl = document.querySelector('.header');
const navLogoSpan = document.querySelector('.header__nav-logo span');
const mainHeroContainer = document.querySelector('.main__hero-container');
const mainContentContainer = document.querySelector('.main__content-container');
const homeLink = document.querySelector('.home-link');
const logo = document.querySelector('.header__nav-logo');

const updateMainContent = (opacity, scrollToTop) => {
  mainContentContainer.style.opacity = opacity;

  if (scrollToTop) {
    window.scrollTo(0, 0);
  }
};

const removeAndAddNavClass = () => {
  navLinks.forEach(link => {
    link.classList.remove('active-link');
  });

  homeLink.classList.add('active-link');
};

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetSection = document.getElementById(link.classList[0]);
    if (link.classList.contains('home-link')) {
      updateMainContent('', true);
      history.pushState(null, '', '/');
    } else {
      body.classList.add('scrolled');
      setTimeout(() => {
        targetSection?.scrollIntoView();
      }, 0);
      history.pushState(null, '', `#${link.classList[0]}`);
    }
  });
});

logo.addEventListener('click', e => {
  e.preventDefault();
  updateMainContent('', true);
  history.pushState(null, '', '/');
});

document.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    body.classList.add('scrolled');
    updateMainContent(1, false);
    mainHeroContainer.style.opacity = 1;
    headerEl.classList.add('header__scrolled-bg');
    navLogoSpan.classList.add('scrolled-color');
  } else {
    updateMainContent('', false);
    mainHeroContainer.style.opacity = '';
    headerEl.classList.remove('header__scrolled-bg');
    navLogoSpan.classList.remove('scrolled-color');
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
});

setupIntersectionObserver();
