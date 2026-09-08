document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');

  if (!menuBtn || !menu) return;

  function closeMenu() {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});
