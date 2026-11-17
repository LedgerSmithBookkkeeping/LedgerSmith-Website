// Shrinks the header logo once the page is scrolled (desktop, where the header is sticky).
// Two thresholds stop it flickering, because shrinking the header shifts the page slightly.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var scrolled = false;
  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (!scrolled && y > 60) { scrolled = true; header.classList.add('is-scrolled'); }
    else if (scrolled && y < 10) { scrolled = false; header.classList.remove('is-scrolled'); }
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
