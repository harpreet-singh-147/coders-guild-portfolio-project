import { body, navLinks, navList, logo, hamburger } from './selectors.js';
import { updateMainContent } from './utils.js';

const visuallyHiddenSpan = hamburger.querySelector('.visually-hidden');

const setupNavLinkClickEvents = () => {
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      handleNavLinkClick(link);
    });
  });
};

const handleNavLinkClick = link => {
  const targetSection = document.getElementById(link.classList[0]);
  if (link.classList.contains('home-link')) {
    updateMainContent('', true);
    history.pushState(null, '', '/');
  } else {
    body.classList.add('scrolled');
    setTimeout(() => {
      targetSection.scrollIntoView();
    }, 0);
    history.pushState(null, '', `#${link.classList[0]}`);
  }
  if (hamburger.getAttribute('aria-expanded') === 'true') {
    toggleHamburger();
  }
};

const setupLogoClickEvent = () => {
  logo.addEventListener('click', e => {
    e.preventDefault();
    updateMainContent('', true);
    history.pushState(null, '', '/');
  });
};

const setupHamburgerClickEvent = () => {
  hamburger.addEventListener('click', () => {
    toggleHamburger();
  });
};

const toggleHamburger = () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
  visuallyHiddenSpan.textContent = expanded ? 'Open menu' : 'Close menu';
  navList.classList.toggle('show-nav');
};

const setupMediaQueryListener = () => {
  const mediaQuery = window.matchMedia('(min-width: 769px)');
  mediaQuery.addEventListener('change', handleMediaChange);
  handleMediaChange(mediaQuery);
};

const handleMediaChange = e => {
  if (e.matches && navList.classList.contains('show-nav')) {
    navList.classList.remove('show-nav');
    hamburger.setAttribute('aria-expanded', 'false');
    visuallyHiddenSpan.textContent = 'Open menu';
  }
};

export const navigation = () => {
  setupNavLinkClickEvents();
  setupLogoClickEvent();
  setupHamburgerClickEvent();
  setupMediaQueryListener();
};
