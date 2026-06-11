// BUCA Manual — TOC scroll-spy + smooth section highlighting
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.doc-toc a'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var map = {};
  var targets = [];
  links.forEach(function (a) {
    var id = a.getAttribute('href');
    if (!id || id.charAt(0) !== '#') return;
    var el = document.querySelector(id);
    if (el) { map[id.slice(1)] = a; targets.push(el); }
  });

  var current = null;
  function setActive(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) { a.classList.remove('active'); });
    if (map[id]) map[id].classList.add('active');
  }

  var io = new IntersectionObserver(function (entries) {
    var visible = entries.filter(function (e) { return e.isIntersecting; });
    if (visible.length) {
      visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      setActive(visible[0].target.id);
    }
  }, { rootMargin: '-80px 0px -65% 0px', threshold: 0 });

  targets.forEach(function (t) { io.observe(t); });
})();
