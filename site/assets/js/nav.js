/* Mobile nav disclosure — progressive enhancement.
   Links are visible by default; at small widths base.css collapses them
   behind the .nav-burger button that this script toggles. With JS off,
   desktop nav is unaffected and the burger never shows. */
(function () {
  const nav = document.querySelector('nav');
  const burger = nav && nav.querySelector('.nav-burger');
  const links = nav && nav.querySelector('.nlinks');
  if (!burger || !links) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  burger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));

  // Close after picking a destination, or on Escape.
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
})();
