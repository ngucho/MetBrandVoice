import { renderHome } from './pages/home';
import { renderFinancialPlan } from './pages/financial-plan';
import { renderNotFound } from './pages/page-404';

function main() {
  const root = document.getElementById('root');
  if (!root) {
    console.error('Impossible de trouver l’élément #root dans la page HTML');
    return;
  }

  // Simple hash-based routing
  if (window.location.hash === '' || window.location.hash === '#/' || window.location.hash === '#home') {
    renderHome(root);
  } 
  else if (window.location.hash === '#previsionnel') {
      renderFinancialPlan(root);
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