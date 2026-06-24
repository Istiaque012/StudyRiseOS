/* =============================================================
   studyrise-chrome.js  —  shared site behaviour
   Load on EVERY page, just before </body>:
     <script src="/assets/studyrise-chrome.js"></script>
   Every block is feature-detected, so it runs only where the
   relevant elements exist. Safe on marketing, blog, and article pages.
   No dependencies.
   ============================================================= */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- nav: frosted border/shadow after a small scroll --- */
  var nav = $('#nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('sc', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- mobile menu toggle --- */
  var mobBtn = $('#mobBtn'), mobMenu = $('#mobMenu');
  if (mobBtn && mobMenu) {
    mobBtn.addEventListener('click', function () {
      var open = mobMenu.classList.toggle('open');
      mobBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('#mobMenu a').forEach(function (a) {
      a.addEventListener('click', function () { mobMenu.classList.remove('open'); });
    });
  }

  /* --- scroll reveal (.rev) --- */
  var revs = $$('.rev');
  if (revs.length) {
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revs.forEach(function (el) { io.observe(el); });
    } else {
      revs.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* --- article: reading-progress bar (#progress) --- */
  var bar = $('#progress');
  if (bar) {
    var upd = function () {
      var h = document.documentElement;
      var sc = h.scrollTop || document.body.scrollTop;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      bar.style.width = Math.min(100, (sc / max) * 100) + '%';
    };
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  }

  /* --- article: table-of-contents active highlight (#toc) --- */
  var tocLinks = $$('#toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var t = document.getElementById(id);
      if (t) map[id] = a;
    });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          var a = map[e.target.id];
          if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) {
      var t = document.getElementById(id);
      if (t) tio.observe(t);
    });
  }

  /* --- article: share buttons (#shareX/#shareFb/#shareLi/#copyLink) --- */
  var url = encodeURIComponent(location.href), title = encodeURIComponent(document.title);
  var sx = $('#shareX'), sf = $('#shareFb'), sl = $('#shareLi');
  if (sx) sx.href = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title;
  if (sf) sf.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
  if (sl) sl.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
  var cp = $('#copyLink');
  if (cp) {
    cp.addEventListener('click', function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(function () {
          var orig = cp.innerHTML;
          cp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
          setTimeout(function () { cp.innerHTML = orig; }, 1500);
        });
      }
    });
  }

  /* --- blog: get-notified form (#notifyForm) — front-end only --- */
  var form = $('#notifyForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = $('#notifyEmail'), ok = $('#notifyOk');
      var v = (email.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { email.focus(); email.style.borderColor = '#E63946'; return; }
      /* TODO(wire-up): POST `v` to your email provider here. */
      form.style.display = 'none';
      if (ok) ok.classList.add('show');
    });
  }
})();
