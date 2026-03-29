/* ========== GIOVANNI PAGANI STUDIO — script.js ========== */
(function () {

  const main      = document.getElementById('main');
  const menuBtns  = document.querySelectorAll('.menu-btn');
  const sections  = document.querySelectorAll('.scroll-section');
  const fullscreen = document.getElementById('fullscreen');
  const fsImg     = fullscreen.querySelector('img');

  /* ------------------------------------------------
     1. SMOOTH SCROLL — nav clicks
  ------------------------------------------------ */
  menuBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = 'section-' + btn.dataset.section;
      const target = document.getElementById(id);
      if (!target) return;

      /* Smooth scroll inside .main */
      main.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    });
  });

  /* ------------------------------------------------
     2. SCROLL SPY — update active nav on scroll
  ------------------------------------------------ */
  const landing = document.getElementById('landing');

  function updateNav() {
    const scrollTop = main.scrollTop;
    const viewH     = main.clientHeight;
    const midPoint  = scrollTop + viewH * 0.4;   /* trigger when 40% through viewport */

    /* If above first section → no active button */
    const firstSection = sections[0];
    if (firstSection && scrollTop < firstSection.offsetTop - 40) {
      menuBtns.forEach(b => b.classList.remove('active'));
      return;
    }

    let current = null;
    sections.forEach(sec => {
      if (sec.offsetTop <= midPoint) {
        current = sec.dataset.section;
      }
    });

    menuBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === current);
    });
  }

  main.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run on load

  /* ------------------------------------------------
     3. CAROUSEL — auto-play + manual arrows
  ------------------------------------------------ */
  document.querySelectorAll('.project-carousel').forEach(carousel => {
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const btnL   = carousel.querySelector('.arrow.left');
    const btnR   = carousel.querySelector('.arrow.right');
    let idx      = 0;
    let timer    = null;

    if (slides.length === 0) return;

    /* Hide arrows if only 1 image */
    if (slides.length === 1) {
      if (btnL) btnL.style.display = 'none';
      if (btnR) btnR.style.display = 'none';
    }

    function goTo(next) {
      slides[idx].classList.remove('active');
      idx = (next + slides.length) % slides.length;
      slides[idx].classList.add('active');
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(() => goTo(idx + 1), 4000);
    }

    /* Start auto-play */
    resetTimer();

    /* Manual arrows */
    if (btnL) {
      btnL.addEventListener('click', e => {
        e.stopPropagation();
        goTo(idx - 1);
        resetTimer();
      });
    }
    if (btnR) {
      btnR.addEventListener('click', e => {
        e.stopPropagation();
        goTo(idx + 1);
        resetTimer();
      });
    }

    /* Click image → fullscreen */
    carousel.addEventListener('click', () => {
      fsImg.src = slides[idx].src;
      fullscreen.classList.add('active');
    });
  });

  /* ------------------------------------------------
     4. FULLSCREEN
  ------------------------------------------------ */
  fullscreen.addEventListener('click', () => fullscreen.classList.remove('active'));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fullscreen.classList.remove('active');
  });

})();
