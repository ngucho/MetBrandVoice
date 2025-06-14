// src/pages/financial-plan.ts

import { createNavbar } from '../components/Navbar';
import { createFooter } from '../components/Footer';
import { createFinancialDashboard, createFinancialTabs } from '../components/FinancialTable';
import { financialPlanData, updateAllCalculations } from '../features/financialPlan';
import { setupSectionObserver } from '../utils/animations';


export function renderFinancialPlan(root: HTMLElement | null) {
  if (!root) return;
  root.innerHTML = '';

  // Navbar
  root.appendChild(createNavbar());

  // Titre
  const title = document.createElement('section');
  title.className = 'hero';
  title.innerHTML = `
    <h1>Prévisionnel Financier METBrandVoice</h1>
    <h2>Découvrez notre modèle économique</h2>
    <p>Consultez les principales hypothèses, revenus, coûts et scénarios pour comprendre la viabilité du concept. Exportez le tout au format Excel.</p>
  `;
  root.appendChild(title);

  // Résumé visuel/indicateurs
  root.appendChild(createFinancialDashboard(financialPlanData));

  // Tableaux financiers dynamiques sous forme d'onglets
  root.appendChild(createFinancialTabs(financialPlanData.sheets));

  // Calculs initiaux
  updateAllCalculations();

  // Footer
  root.appendChild(createFooter());

  setupSectionObserver();
}
