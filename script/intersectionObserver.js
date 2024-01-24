import { body, contentSections, navLinks } from './selectors.js';

const updateActiveNavLink = activeSectionId => {
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${activeSectionId}`) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
};

const updateUrlOnScroll = activeSectionId => {
  if (window.scrollY > 0 && activeSectionId) {
    history.pushState(null, '', `#${activeSectionId}`);
  }
};

const updateNavBarClass = entry => {
  if (entry.isIntersecting && entry.boundingClientRect.top <= 53) {
    body.classList.add('update-res-nav-bg');
  } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
    body.classList.remove('update-res-nav-bg');
  }
};

const createObserver = (threshold = 0.1, rootMargin = '0px', root = null) => {
  return new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.target.id === 'skills') {
          updateNavBarClass(entry);
        }
        if (entry.isIntersecting) {
          updateActiveNavLink(entry.target.id);
          updateUrlOnScroll(entry.target.id);
        }
      });
    },
    {
      root,
      rootMargin,
      threshold,
    }
  );
};

export const setupIntersectionObserver = () => {
  const projectsContactObserver = createObserver(0.95);
  const generalObserver = createObserver(0.9);
  const skillsObserver = createObserver(0.84);

  contentSections.forEach(section => {
    if (section.id === 'projects' || section.id === 'contact') {
      projectsContactObserver.observe(section);
    } else {
      generalObserver.observe(section);
      skillsObserver.observe(section);
    }
  });
};
