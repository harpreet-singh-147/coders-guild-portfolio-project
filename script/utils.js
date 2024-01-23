import {
  mainContentContainer,
  navLinks,
  homeLink,
  spaceInUpAnimationClassNames,
} from './selectors.js';

export const updateMainContent = (opacity, scrollToTop) => {
  mainContentContainer.style.opacity = opacity;

  if (scrollToTop) {
    window.scrollTo(0, 0);
  }
};

export const removeAndAddNavClass = () => {
  navLinks.forEach(link => {
    link.classList.remove('active-link');
  });

  homeLink.classList.add('active-link');
};

export const removeAnimationsOnLoad = () => {
  setTimeout(() => {
    spaceInUpAnimationClassNames.forEach(animation => {
      animation.classList.remove('spaceInUp');
    });
  }, 500);
};
