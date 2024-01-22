import { contentSections, navLinks } from './selectors.js';

function updateActiveNavLink(activeSectionId) {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${activeSectionId}`) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}

export function setupIntersectionObserver() {
  const projectsContactObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.925,
  };

  const projectsContactObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNavLink(entry.target.id);
      }
    });
  }, projectsContactObserverOptions);

  const generalObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9,
  };

  const generalObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveNavLink(entry.target.id);
      }
    });
  }, generalObserverOptions);

  contentSections.forEach(section => {
    if (section.id === 'projects' || section.id === 'contact') {
      projectsContactObserver.observe(section);
    } else {
      generalObserver.observe(section);
    }
  });
}
