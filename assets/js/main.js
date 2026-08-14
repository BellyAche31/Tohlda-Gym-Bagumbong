/* Tohlda Fitness Gym Bagumbong — site behaviour */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Header: shrink on scroll ---------- */
  var header = $('#siteHeader');
  var onScroll = function () {
    header.classList.toggle('stuck', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var nav = $('#nav');
  var toggle = $('#navToggle');

  var closeNav = function () {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Scroll spy ---------- */
  var navLinks = $$('#nav a[href^="#"]').filter(function (a) { return !a.classList.contains('btn'); });
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = $$('.section-head, .about-copy, .about-media, .card, .price-card, .g-item, .visit-panel, .map-panel, .hours-table, .faq, .cta-inner');
  if ('IntersectionObserver' in window) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = Math.min(i * 55, 260) + 'ms';
        el.classList.add('in');
        obs.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- Opening hours: today + open now ---------- */
  // Hours in 24h local gym time (Asia/Manila). index = JS getDay(): 0 = Sunday.
  var HOURS = [
    { open: 7, close: 18 }, // Sun
    { open: 7, close: 22 }, // Mon
    { open: 7, close: 22 },
    { open: 7, close: 22 },
    { open: 7, close: 22 },
    { open: 7, close: 22 },
    { open: 7, close: 22 }  // Sat
  ];

  function manilaNow() {
    // Interpret "now" in Asia/Manila regardless of the visitor's timezone.
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Manila',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
    }).formatToParts(new Date());
    var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var hour = parseInt(get('hour'), 10);
    if (hour === 24) hour = 0;
    return { day: days[get('weekday')], hour: hour, minute: parseInt(get('minute'), 10) };
  }

  function fmt12(h) {
    var suffix = h >= 12 ? 'PM' : 'AM';
    var hr = h % 12 || 12;
    return hr + ':00 ' + suffix;
  }

  try {
    var now = manilaNow();
    var today = HOURS[now.day];
    var mins = now.hour * 60 + now.minute;
    var isOpen = mins >= today.open * 60 && mins < today.close * 60;

    var row = $('.hours-table tr[data-day="' + now.day + '"]');
    if (row) row.classList.add('today');

    var badge = $('#openNow');
    if (badge) {
      badge.classList.add(isOpen ? 'is-open' : 'is-closed');
      if (isOpen) {
        badge.textContent = 'Open now — until ' + fmt12(today.close) + ' today';
      } else if (mins < today.open * 60) {
        badge.textContent = 'Closed — opens ' + fmt12(today.open) + ' today';
      } else {
        var next = HOURS[(now.day + 1) % 7];
        badge.textContent = 'Closed — opens ' + fmt12(next.open) + ' tomorrow';
      }
    }
  } catch (err) {
    /* Non-critical: static hours table still shows everything. */
  }

  /* ---------- Copy address ---------- */
  var copyBtn = $('#copyAddr');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.dataset.address;
      var done = function () {
        var original = copyBtn.textContent;
        copyBtn.textContent = 'Address copied ✓';
        setTimeout(function () { copyBtn.textContent = original; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* ---------- Lightbox ---------- */
  var items = $$('.g-item');
  var lb = $('#lightbox');
  var lbImg = $('#lbImg');
  var lbCap = $('#lbCap');
  var index = 0;
  var lastFocused = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var item = items[index];
    lbImg.src = item.dataset.full;
    lbImg.alt = item.querySelector('img').alt;
    lbCap.textContent = item.dataset.caption || '';
  }

  function openLb(i) {
    lastFocused = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  }

  function closeLb() {
    lb.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { openLb(i); });
  });

  if (lb) {
    $('#lbClose').addEventListener('click', closeLb);
    $('#lbPrev').addEventListener('click', function () { show(index - 1); });
    $('#lbNext').addEventListener('click', function () { show(index + 1); });

    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-figure')) closeLb();
    });

    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        var focusables = $$('button', lb);
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Swipe on touch devices.
    var startX = null;
    lb.addEventListener('touchstart', function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 55) show(dx < 0 ? index + 1 : index - 1);
      startX = null;
    }, { passive: true });
  }

  /* ---------- Footer year ---------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
