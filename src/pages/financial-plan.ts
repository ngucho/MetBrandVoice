// src/pages/financial-plan.ts

import { createNavbar } from '../components/Navbar';
import { createFooter } from '../components/Footer';
import { createFinancialDashboard, createFinancialSheet } from '../components/FinancialTable';
import { financialPlanData } from '../features/financialPlan';

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
    <h2>Étudiez, modifiez, exportez votre business model en temps réel</h2>
    <p>Interagissez avec toutes les hypothèses, revenus, coûts, scénarios, et bien plus. Ajoutez ou supprimez des postes pour coller à votre réalité, exportez votre modèle personnalisé au format Excel.</p>
  `;
  root.appendChild(title);

  // Résumé visuel/indicateurs
  root.appendChild(createFinancialDashboard(financialPlanData));

  // Tableaux financiers dynamiques
  financialPlanData.sheets.forEach(sheet =>
    root.appendChild(createFinancialSheet(sheet))
  );

  // Footer
  root.appendChild(createFooter());
}
