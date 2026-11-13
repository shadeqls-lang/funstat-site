/* Vaultline soft layer for profile, roadmap and marketplace:
   smooth wheel scrolling (Lenis), eased in-page anchors and fade-up reveals.
   Set window.SOFT_REVEAL = ['selector', ...] before this file to choose what fades in. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L = null;

  if (!reduce && window.Lenis) {
    try {
      L = new Lenis({
        lerp: 0.1, smoothWheel: true, touchMultiplier: 1.4,
        prevent: function (n) { return n && n.closest && n.closest('dialog,[aria-modal="true"],[data-lenis-prevent],.ticket,.modal,.drawer,.sheet'); }
      });
      var frame = 0;
      var tick = function (t) {
        L.raf(t);
        if (++frame % 10 === 0) {
          var b = getComputedStyle(document.body).overflowY, h = getComputedStyle(document.documentElement).overflowY;
          var locked = !!document.querySelector('dialog[open]') || b === 'hidden' || h === 'hidden';
          if (locked && !L.isStopped) L.stop(); else if (!locked && L.isStopped) L.start();
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      window.lenis = L;
    } catch (e) { L = null; }
  }

  /* in-page anchors glide instead of jumping */
  window.addEventListener('click', function (e) {
    if (!L || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var el = id ? document.getElementById(id) : null;
    if (!id) { e.preventDefault(); L.scrollTo(0, { duration: 1.2 }); return; }
    if (!el) return;
    e.preventDefault(); e.stopPropagation();
    L.scrollTo(el, { offset: -88, duration: 1.2 });
    try { history.replaceState(null, '', '#' + id); } catch (_) {}
  }, true);

  /* fade-up reveals */
  var sel = window.SOFT_REVEAL;
  if (reduce || !sel || !sel.length || !('IntersectionObserver' in window)) return;
  var css = document.createElement('style');
  css.textContent = '.soft-in{opacity:0;transform:translateY(22px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform 1.1s cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--sd,0) * 80ms)}.soft-in.soft-on{opacity:1;transform:none}';
  document.head.appendChild(css);
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('soft-on'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  sel.forEach(function (s) {
    var n = 0, prevParent = null;
    document.querySelectorAll(s).forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92 && r.bottom > 0) return;
      if (el.parentElement !== prevParent) { n = 0; prevParent = el.parentElement; }
      el.classList.add('soft-in'); el.style.setProperty('--sd', Math.min(n++, 6)); io.observe(el);
    });
  });
})();
