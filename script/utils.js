import {
  mainContentContainer,
  navLinks,
  homeLink,
  spaceInUpAnimationClassNames,
  headerEl,
  navLogoSpan,
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
  history.pushState(null, '', '/');
  homeLink.classList.add('active-link');
};

export const removeAnimationsOnLoad = () => {
  setTimeout(() => {
    spaceInUpAnimationClassNames.forEach(animation => {
      animation.classList.remove('spaceInUp');
    });
  }, 500);
};

export const updateClassesBasedOnScrollAndWidth = () => {
  const hasScrolled = window.scrollY > 0;
  const isNarrowScreen = window.matchMedia('(max-width: 1000px)').matches;

  if (hasScrolled && isNarrowScreen) {
    headerEl.classList.remove('header__scrolled-bg');
    navLogoSpan.classList.remove('scrolled-color');
  }
};
