// Kyle Connolly — Portfolio interactions
// Tabs, carousel buttons, timeline show more, mobile nav.

(function(){
  // Smooth scroll for internal links with data-scroll
  document.querySelectorAll('[data-scroll]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu if open
      closeMobile();
    });
  });

  // Mobile menu
  const menuBtn = document.querySelector('.menu');
  const mobile = document.querySelector('.mobile');

  function openMobile(){
    if (!menuBtn || !mobile) return;
    mobile.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMobile(){
    if (!menuBtn || !mobile) return;
    mobile.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn && mobile){
    closeMobile();
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      expanded ? closeMobile() : openMobile();
    });
    mobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMobile());
    });
  }

  // Tabs
  const tabsRoot = document.querySelector('[data-tabs]');
  if (tabsRoot){
    const tabs = Array.from(tabsRoot.querySelectorAll('.tab'));
    const panels = Array.from(tabsRoot.querySelectorAll('.panel'));

    function activate(tab){
      tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        t.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach(p => {
        const isMatch = p.id === tab.getAttribute('aria-controls');
        p.classList.toggle('is-active', isMatch);
        p.hidden = !isMatch;
      });
    }

    tabs.forEach(t => {
      t.addEventListener('click', () => activate(t));
      t.addEventListener('keydown', (e) => {
        const idx = tabs.indexOf(t);
        if (e.key === 'ArrowRight'){
          e.preventDefault();
          activate(tabs[(idx + 1) % tabs.length]);
          tabs[(idx + 1) % tabs.length].focus();
        }
        if (e.key === 'ArrowLeft'){
          e.preventDefault();
          activate(tabs[(idx - 1 + tabs.length) % tabs.length]);
          tabs[(idx - 1 + tabs.length) % tabs.length].focus();
        }
      });
    });
  }

  // Carousel controls
  const carousel = document.querySelector('[data-carousel]');
  const btnPrev = document.querySelector('[data-carousel-prev]');
  const btnNext = document.querySelector('[data-carousel-next]');
  if (carousel && btnPrev && btnNext){
    const scrollByAmount = () => Math.min(carousel.clientWidth * 0.9, 520);

    btnPrev.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
    });
    btnNext.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
    });
  }

  // Timeline show more
  const toggle = document.querySelector('[data-timeline-toggle]');
  const timeline = document.querySelector('[data-timeline]');
  if (toggle && timeline){
    const collapsed = Array.from(timeline.querySelectorAll('[data-collapsible]'));

    function setExpanded(expanded){
      collapsed.forEach(li => li.classList.toggle('is-collapsed', !expanded));
      toggle.textContent = expanded ? 'Show less' : 'Show more';
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    // start collapsed
    setExpanded(false);

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });
  }
})();
