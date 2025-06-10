import { renderHome } from './pages/home';
import { renderFinancialPlan } from './pages/financial-plan';
import { renderNotFound } from './pages/page-404';

function main() {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Impossible de trouver l’élément #root dans la page HTML');
    return;
  }

  const hash = window.location.hash;

  if (hash === '#previsionnel') {
    renderFinancialPlan(root);
  } else if (hash === '#contact' || hash === '' || hash === '#/' || hash === '#home') {
    renderHome(root);
    if (hash === '#contact') {
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 0);
    }
  } else {
    renderNotFound(root);
  }
}

window.addEventListener('hashchange', main);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}