// ============================================
// NatureSurvi — Animations & interactions UI
// Adapté des composants 21st.dev :
//  - "Atlas Stat Band" (compteurs au scroll, IntersectionObserver + rAF)
//  - "Testimonial Slider" (carrousel autoplay, swipe, points)
// Vanilla JS, aucune dépendance. Respecte prefers-reduced-motion.
// ============================================
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Styles injectés ----------
  var CSS = [
    '/* Compteurs animés */',
    '[data-count] { font-variant-numeric: tabular-nums; }',
    '.stat, .hero-stat { transition: transform 0.25s ease; }',
    '.stat:hover, .hero-stat:hover { transform: translateY(-4px); }',
    '',
    '/* Apparition au scroll */',
    '.ns-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }',
    '.ns-reveal.ns-visible { opacity: 1; transform: none; }',
    '@media (prefers-reduced-motion: reduce) { .ns-reveal { opacity: 1; transform: none; transition: none; } }',
    '',
    '/* Carrousel avis */',
    '.ns-slider { position: relative; }',
    '.ns-slider-viewport { overflow: hidden; }',
    '.ns-slider-track { display: flex; transition: transform 0.55s cubic-bezier(0.22,1,0.36,1); will-change: transform; }',
    '.ns-slider-track.ns-dragging { transition: none; cursor: grabbing; }',
    '.ns-slide { flex-shrink: 0; padding: 8px; box-sizing: border-box; }',
    '.ns-slide .avis-card { height: 100%; margin: 0; transition: transform 0.3s ease, box-shadow 0.3s ease; }',
    '.ns-slide .avis-card:hover { transform: translateY(-5px); box-shadow: 0 14px 34px rgba(45,80,22,0.12); }',
    '.ns-slider-nav { display: flex; justify-content: center; gap: 10px; margin-top: 18px; align-items: center; }',
    '.ns-slider-btn { background: #fff; border: 1px solid #e0e8e0; color: #2d5016; width: 38px; height: 38px; border-radius: 50%; font-size: 1.05rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 0.2s, background 0.2s, opacity 0.2s; line-height: 1; }',
    '.ns-slider-btn:hover:not(:disabled) { transform: scale(1.12); background: #e8f4e8; }',
    '.ns-slider-btn:disabled { opacity: 0.35; cursor: default; }',
    '.ns-slider-dots { display: flex; gap: 8px; }',
    '.ns-dot { width: 9px; height: 9px; border-radius: 50%; border: none; padding: 0; background: #d5e2d5; cursor: pointer; transition: transform 0.25s, background 0.25s; }',
    '.ns-dot.ns-active { background: #2d5016; transform: scale(1.35); animation: ns-dot-pulse 1.6s ease-in-out infinite; }',
    '@keyframes ns-dot-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(45,80,22,0.35); } 50% { box-shadow: 0 0 0 6px rgba(45,80,22,0); } }',
    '@media (prefers-reduced-motion: reduce) { .ns-slider-track { transition: none; } .ns-dot.ns-active { animation: none; } }'
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // ---------- 1. Compteurs animés au scroll (adapté d'Atlas Stat Band) ----------
  function formatNumber(value, decimals) {
    var s = value.toFixed(decimals);
    var parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // espace fine insécable
    return decimals > 0 ? parts[0] + ',' + parts[1] : parts[0];
  }

  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = REDUCED ? 0 : parseInt(el.getAttribute('data-duration') || '1500', 10);
      var start = 0;

      function tick(t) {
        if (!start) start = t;
        var p = duration > 0 ? Math.min(1, (t - start) / duration) : 1;
        var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        el.textContent = prefix + formatNumber(target * eased, decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach ? els.forEach(function (el) { animate(el); }) : null;
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  // ---------- 2. Apparition douce au scroll ----------
  function initReveal() {
    var selectors = '.section-title, .section-label, .section-subtitle, .engagement-card, .univers-card, .categorie-card, .product-card, .jard-card, .filter-box, .newsletter-band';
    var els = document.querySelectorAll(selectors);
    if (!els.length || !('IntersectionObserver' in window) || REDUCED) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('ns-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    Array.prototype.forEach.call(els, function (el, i) {
      el.classList.add('ns-reveal');
      el.style.transitionDelay = Math.min((i % 6) * 0.07, 0.4) + 's';
      io.observe(el);
    });
  }

  // ---------- 3. Carrousel d'avis (adapté de Testimonial Slider) ----------
  function initAvisSlider() {
    var grid = document.querySelector('.avis-grid');
    if (!grid || grid.children.length < 2) return;

    var cards = Array.prototype.slice.call(grid.children);

    // Structure : viewport > track > slides
    var slider = document.createElement('div');
    slider.className = 'ns-slider';
    var viewport = document.createElement('div');
    viewport.className = 'ns-slider-viewport';
    var track = document.createElement('div');
    track.className = 'ns-slider-track';
    cards.forEach(function (card) {
      var slide = document.createElement('div');
      slide.className = 'ns-slide';
      slide.appendChild(card);
      track.appendChild(slide);
    });
    viewport.appendChild(track);
    slider.appendChild(viewport);

    var nav = document.createElement('div');
    nav.className = 'ns-slider-nav';
    var prevBtn = document.createElement('button');
    prevBtn.className = 'ns-slider-btn';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Avis précédent');
    var dots = document.createElement('div');
    dots.className = 'ns-slider-dots';
    var nextBtn = document.createElement('button');
    nextBtn.className = 'ns-slider-btn';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Avis suivant');
    nav.appendChild(prevBtn);
    nav.appendChild(dots);
    nav.appendChild(nextBtn);
    slider.appendChild(nav);

    grid.parentNode.replaceChild(slider, grid);

    var index = 0;
    var autoTimer = null;
    var resumeTimer = null;
    var direction = 1;

    function visibleCount() {
      var w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    }

    function maxIndex() { return Math.max(0, cards.length - visibleCount()); }

    function layout() {
      var vc = visibleCount();
      Array.prototype.forEach.call(track.children, function (slide) {
        slide.style.width = (100 / vc) + '%';
      });
      if (index > maxIndex()) index = maxIndex();
      update(false);
      buildDots();
    }

    function update() {
      var vc = visibleCount();
      track.style.transform = 'translateX(-' + (index * (100 / vc)) + '%)';
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= maxIndex();
      Array.prototype.forEach.call(dots.children, function (dot, i) {
        dot.classList.toggle('ns-active', i === index);
      });
    }

    function buildDots() {
      dots.innerHTML = '';
      for (var i = 0; i <= maxIndex(); i++) {
        (function (i) {
          var dot = document.createElement('button');
          dot.className = 'ns-dot' + (i === index ? ' ns-active' : '');
          dot.setAttribute('aria-label', 'Aller à l’avis ' + (i + 1));
          dot.addEventListener('click', function () { index = i; update(); pause(); });
          dots.appendChild(dot);
        })(i);
      }
    }

    function goNext(userAction) {
      if (index < maxIndex()) { index++; } else { direction = -1; index--; }
      update();
      if (userAction) pause();
    }
    function goPrev(userAction) {
      if (index > 0) { index--; } else { direction = 1; index++; }
      update();
      if (userAction) pause();
    }

    // Autoplay : avance toutes les 4 s, rebondit aux extrémités,
    // pause 8 s après toute interaction (comme le composant 21st)
    function play() {
      if (REDUCED) return;
      stop();
      autoTimer = setInterval(function () {
        if (index >= maxIndex()) direction = -1;
        else if (index <= 0) direction = 1;
        index += direction;
        update();
      }, 4000);
    }
    function stop() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function pause() {
      stop();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(play, 8000);
    }

    prevBtn.addEventListener('click', function () { goPrev(true); });
    nextBtn.addEventListener('click', function () { goNext(true); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', function () { if (!resumeTimer) play(); });

    // Swipe tactile / drag souris
    var startX = null;
    var SWIPE_THRESHOLD = 30;
    viewport.addEventListener('pointerdown', function (e) {
      startX = e.clientX;
      track.classList.add('ns-dragging');
    });
    window.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      track.classList.remove('ns-dragging');
      startX = null;
      if (dx < -SWIPE_THRESHOLD) goNext(true);
      else if (dx > SWIPE_THRESHOLD) goPrev(true);
      else update();
    });

    var resizeT = null;
    window.addEventListener('resize', function () {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(layout, 150);
    });

    layout();
    play();
  }

  // ---------- Init ----------
  function init() {
    initCounters();
    initReveal();
    initAvisSlider();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
