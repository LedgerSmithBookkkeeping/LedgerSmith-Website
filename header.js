// Desktop header: shrinks the logo once the page is scrolled and keeps the page padded by the
// header's full height (the header is fixed on desktop, so it overlays the page).
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var root = document.documentElement;
  var scrolled = false;

  // Measure the header at its full (unscrolled) size, without animating.
  function measure() {
    header.classList.add('no-anim');
    var wasScrolled = header.classList.contains('is-scrolled');
    header.classList.remove('is-scrolled');
    root.style.setProperty('--header-h', header.offsetHeight + 'px');
    if (wasScrolled) header.classList.add('is-scrolled');
    void header.offsetHeight; // apply the restored state before re-enabling transitions
    header.classList.remove('no-anim');
  }

  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (!scrolled && y > 40) { scrolled = true; header.classList.add('is-scrolled'); }
    else if (scrolled && y < 20) { scrolled = false; header.classList.remove('is-scrolled'); }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure); // after web fonts settle
  measure();
  update();
})();
