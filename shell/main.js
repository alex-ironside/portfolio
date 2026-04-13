document.addEventListener('DOMContentLoaded', () => {
  const frame = document.getElementById('app-frame');
  const buttons = document.querySelectorAll('header button[data-app]');
  const appUrls = {
    'dark': 'shell-stubs/dark/index.html',
    'dog-tracker': 'https://alex-ironside.github.io/dog-tracker/',
    'magazyn-patryka': 'https://alex-ironside.github.io/magazyn-patryka/',
  };
  const valid = Object.keys(appUrls);
  const STORAGE_KEY = 'portfolio:lastApp';

  function activate(app) {
    if (!valid.includes(app)) app = 'dark';
    frame.src = appUrls[app];
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.app === app)));
    try { localStorage.setItem(STORAGE_KEY, app); } catch (e) {}
  }

  let initial = 'dark';
  try { initial = localStorage.getItem(STORAGE_KEY) || 'dark'; } catch (e) {}
  activate(initial);

  buttons.forEach(b => b.addEventListener('click', () => activate(b.dataset.app)));
});
