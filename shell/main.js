document.addEventListener('DOMContentLoaded', () => {
  const frame = document.getElementById('app-frame');
  const buttons = document.querySelectorAll('header button[data-app]');
  const valid = ['dark', 'dog-tracker', 'magazyn-patryka'];
  const STORAGE_KEY = 'portfolio:lastApp';

  function activate(app) {
    if (!valid.includes(app)) app = 'dark';
    frame.src = `shell-stubs/${app}/index.html`;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.app === app)));
    try { localStorage.setItem(STORAGE_KEY, app); } catch (e) {}
  }

  let initial = 'dark';
  try { initial = localStorage.getItem(STORAGE_KEY) || 'dark'; } catch (e) {}
  activate(initial);

  buttons.forEach(b => b.addEventListener('click', () => activate(b.dataset.app)));
});
