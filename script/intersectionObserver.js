import { contentSections, navLinks } from './selectors.js';

const updateActiveNavLink = activeSectionId => {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${activeSectionId}`) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
};

const createObserver = threshold => {
  return new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateActiveNavLink(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold,
    }
  );
};

export const setupIntersectionObserver = () => {
  const projectsContactObserver = createObserver(0.95);
  const generalObserver = createObserver(0.9);

  contentSections.forEach(section => {
    if (section.id === 'projects' || section.id === 'contact') {
      projectsContactObserver.observe(section);
    } else {
      generalObserver.observe(section);
    }
  });
};
