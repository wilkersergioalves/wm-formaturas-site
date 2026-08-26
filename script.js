const SITE_LINKS = {
  instagram: "https://www.instagram.com/wmformaturaseeventos/",
  whatsapp: "https://wa.me/553171556356?text=Ol%C3%A1%21%20Conheci%20o%20trabalho%20da%20WM%20Formaturas%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento."
};

document.querySelectorAll('.js-instagram').forEach(a => {
  a.href = SITE_LINKS.instagram;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

document.querySelectorAll('.js-whatsapp').forEach(a => {
  a.href = SITE_LINKS.whatsapp;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = [...document.querySelectorAll('.nav a')];

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
});

navLinks.forEach(a => a.addEventListener('click', (event) => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');

  // INÍCIO sempre volta ao topo real da página/hero.
  if (a.getAttribute('href') === '#inicio') {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}));

// Barra dourada única que desliza sob a opção apontada pelo mouse.
if (nav && navLinks.length) {
  const indicator = document.createElement('span');
  indicator.className = 'nav-indicator';
  nav.appendChild(indicator);

  let activeLink = navLinks.find(a => a.classList.contains('active')) || navLinks[0];

  const moveIndicator = (link, animate = true) => {
    if (!link) return;
    if (!animate) indicator.style.transition = 'none';
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    indicator.style.left = `${linkRect.left - navRect.left}px`;
    indicator.style.width = `${linkRect.width}px`;
    indicator.style.opacity = '1';
    if (!animate) requestAnimationFrame(() => indicator.style.transition = '');
  };

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => moveIndicator(link));
    link.addEventListener('focus', () => moveIndicator(link));
  });

  nav.addEventListener('mouseleave', () => moveIndicator(activeLink));

  const sections = [
    { id: 'inicio', el: document.querySelector('#inicio'), link: navLinks.find(a => a.getAttribute('href') === '#inicio') },
    { id: 'trabalho', el: document.querySelector('#trabalho'), link: navLinks.find(a => a.getAttribute('href') === '#trabalho') },
    { id: 'contato', el: document.querySelector('#contato'), link: navLinks.find(a => a.getAttribute('href') === '#contato') }
  ].filter(x => x.el && x.link);

  const setActive = link => {
    activeLink = link;
    navLinks.forEach(a => a.classList.toggle('active', a === link));
    moveIndicator(activeLink);
  };

  const updateActiveSection = () => {
    const y = window.scrollY + window.innerHeight * 0.42;
    let current = sections[0];
    for (const section of sections) {
      if (section.el.offsetTop <= y) current = section;
    }
    setActive(current.link);
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', () => moveIndicator(activeLink, false));
  requestAnimationFrame(() => {
    updateActiveSection();
    moveIndicator(activeLink, false);
  });
}
