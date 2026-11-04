// Shortens long testimonials to the first WORD_LIMIT words with a "…more" button.
// Clicking it darkens and blurs that card and opens the full quote in a panel
// under the row; "less" (on the card or in the panel) closes it again.
// Without JavaScript the full text simply shows.
(function () {
  var WORD_LIMIT = 20;
  var grid = document.querySelector('.quotes');
  if (!grid) return;

  var quotes = Array.prototype.slice.call(grid.querySelectorAll('figure.quote'));
  var fullText = [];

  var panel = document.createElement('figure');
  panel.className = 'quote-panel';
  panel.id = 'quote-panel';
  panel.hidden = true;
  var panelText = document.createElement('blockquote');
  var panelWho = document.createElement('figcaption');
  var panelClose = document.createElement('button');
  panelClose.type = 'button';
  panelClose.className = 'quote-toggle';
  panelClose.textContent = 'less';
  panel.appendChild(panelText);
  panel.appendChild(panelWho);
  panel.appendChild(panelClose);
  grid.appendChild(panel);

  // Single-column layouts open the panel right under the clicked card; otherwise
  // it goes under the whole row, with a pointer aimed at the card when it's in that row.
  function place(card) {
    var last = quotes[quotes.length - 1];
    var singleColumn = quotes[0].offsetLeft === last.offsetLeft;
    if (singleColumn) card.after(panel); else grid.appendChild(panel);

    var pointing = !singleColumn && card.offsetTop === last.offsetTop;
    panel.classList.toggle('has-pointer', pointing);
    if (pointing) panel.style.setProperty('--pointer', (card.offsetLeft + card.offsetWidth / 2) + 'px');
  }

  function setOpen(open, restoreFocus) {
    quotes.forEach(function (quote, index) {
      var toggle = quote.querySelector('.quote-toggle');
      if (!toggle) return;
      var isOpen = quote === open;
      var name = quote.querySelector('.who strong').textContent;

      quote.classList.toggle('is-open', isOpen);
      toggle.textContent = isOpen ? 'less' : '…more';
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', (isOpen ? 'Show less from ' : 'Read more from ') + name);
      // the full text is in the panel while open, so hide the blurred copy from screen readers
      quote.querySelector('.quote-text').setAttribute('aria-hidden', isOpen);
      quote.querySelector('figcaption').setAttribute('aria-hidden', isOpen);
    });

    if (!open) {
      panel.hidden = true;
      if (restoreFocus) restoreFocus.focus();
      return;
    }

    var index = quotes.indexOf(open);
    panelText.textContent = fullText[index];
    panelWho.innerHTML = open.querySelector('figcaption').innerHTML;
    panel.hidden = false;
    place(open);
  }

  quotes.forEach(function (quote, index) {
    var blockquote = quote.querySelector('blockquote');
    var text = blockquote.textContent.trim();
    var words = text.split(/\s+/);
    fullText[index] = text;
    if (words.length <= WORD_LIMIT) return;

    var short = document.createElement('span');
    short.className = 'quote-text';
    short.textContent = words.slice(0, WORD_LIMIT).join(' ');

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'quote-toggle';
    toggle.setAttribute('aria-controls', panel.id);

    blockquote.textContent = '';
    blockquote.appendChild(short);
    blockquote.appendChild(document.createTextNode(' '));
    blockquote.appendChild(toggle);

    toggle.addEventListener('click', function () {
      setOpen(quote.classList.contains('is-open') ? null : quote);
    });
  });

  panelClose.addEventListener('click', function () {
    var open = grid.querySelector('figure.quote.is-open');
    setOpen(null, open && open.querySelector('.quote-toggle'));
  });

  window.addEventListener('resize', function () {
    var open = grid.querySelector('figure.quote.is-open');
    if (open) place(open);
  });

  setOpen(null);
})();
