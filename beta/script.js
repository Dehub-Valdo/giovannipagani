/* ========== GIOVANNI PAGANI STUDIO — script.js ========== */
(function () {
  const menuBtns  = document.querySelectorAll('.menu-btn');
  const sections  = document.querySelectorAll('.scroll-section');
  const landing   = document.getElementById('landing');
  const fullscreen = document.getElementById('fullscreen');
  const fsImg     = fullscreen.querySelector('img');

  /* =========================================
     1. NAVIGATION (NO SCROLL - PAGE SWITCH)
  ========================================= */
  function showSection(name) {

    sections.forEach(sec => sec.classList.remove('active'));
    landing.classList.remove('active');
    menuBtns.forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById('section-' + name);
    if (target) target.classList.add('active');

    menuBtns.forEach(btn => {
      if (btn.dataset.section === name) {
        btn.classList.add('active');
      }
    });
  }

  menuBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showSection(btn.dataset.section);
    });
  });

  /* Default = landing */
  landing.classList.add('active');

  /* =========================================
     2. CAROUSEL
  ========================================= */
  document.querySelectorAll('.project-carousel').forEach(carousel => {

    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const btnL   = carousel.querySelector('.arrow.left');
    const btnR   = carousel.querySelector('.arrow.right');

    let idx   = 0;
    let timer = null;

    if (slides.length === 0) return;

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

    resetTimer();

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

    /* FULLSCREEN */
   carousel.addEventListener('click', (e) => {

  /* evita click sulle frecce */
  if (e.target.classList.contains('arrow')) return;

  const activeSlide = carousel.querySelector('.slide.active');
  if (!activeSlide) return;

  fsImg.src = activeSlide.src;
  fullscreen.classList.add('active');
});

  });

  /* =========================================
     3. FULLSCREEN CLOSE
  ========================================= */
  fullscreen.addEventListener('click', () => {
    fullscreen.classList.remove('active');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      fullscreen.classList.remove('active');
    }
  });

})();
document.querySelectorAll(".slide").forEach((img) => {
  img.addEventListener("error", function () {
    // Hide the broken image
    this.style.display = "none";

    // If it's the active slide, move to the next available one
    if (this.classList.contains("active")) {
      let slides = Array.from(this.parentElement.querySelectorAll(".slide"))
        .filter(s => s.style.display !== "none");

      let currentIndex = slides.indexOf(this);
      let nextSlide = slides[currentIndex + 1] || slides[0];

      this.classList.remove("active");
      if (nextSlide) nextSlide.classList.add("active");
    }
  });
});