import { body, navLinks, navList, logo, hamburger } from './selectors.js';
import { updateMainContent } from './utils.js';

const visuallyHiddenSpan = hamburger.querySelector('.visually-hidden');

export const navigation = () => {
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

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    visuallyHiddenSpan.textContent = expanded ? 'Open menu' : 'Close menu';
    navList.classList.toggle('show-nav');
  });

  const mediaQuery = window.matchMedia('(min-width: 768px)');

  function handleMediaChange(e) {
    if (e.matches) {
      if (navList.classList.contains('show-nav')) {
        navList.classList.remove('show-nav');
        hamburger.setAttribute('aria-expanded', 'false');
        visuallyHiddenSpan.textContent = 'Open menu';
      }
    }
  }

  mediaQuery.addEventListener('change', handleMediaChange);
  handleMediaChange(mediaQuery);
};
