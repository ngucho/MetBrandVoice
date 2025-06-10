// src/components/FinancialTable.ts

import { FinancialSheet, FinancialPlanData } from '../types/financialPlan';
import { updateAllCalculations, downloadFinancialExcel } from '../features/financialPlan';

export function createFinancialDashboard(data: FinancialPlanData): HTMLElement {
  const dash = document.createElement('section');
  dash.className = 'section';
  dash.style.marginTop = '2rem';

  dash.innerHTML = `
    <div class="summary-cards grid">
      <div class="card">
        <h3>Recettes Totales</h3>
        <div class="value" id="total-revenue">${data.dashboard.revenueLabel}</div>
      </div>
      <div class="card">
        <h3>Coûts Totaux</h3>
        <div class="value" id="total-costs">${data.dashboard.costLabel}</div>
      </div>
      <div class="card">
        <h3>Résultat Net</h3>
        <div class="value" id="net-result">${data.dashboard.netLabel}</div>
      </div>
      <div class="card">
        <h3>ROI</h3>
        <div class="value" id="roi">${data.dashboard.roiLabel}</div>
      </div>
    </div>
    <button class="cta" id="btn-excel" style="margin: 2rem auto; display: block;">Exporter en Excel</button>
  `;

  dash.querySelector('#btn-excel')?.addEventListener('click', () => {
    downloadFinancialExcel(data);
  });

  return dash;
}

export function createFinancialSheet(sheet: FinancialSheet): HTMLElement {
  const container = document.createElement('div');
  container.className = 'sheet-container section';

  // Titre
  const title = document.createElement('div');
  title.className = 'sheet-title';
  title.innerText = sheet.title;
  container.appendChild(title);

  // Tableau
  const table = document.createElement('table');
  table.className = 'financial-table';

  // Head
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  sheet.columns.forEach(col => {
    const th = document.createElement('th');
    th.innerText = col;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  sheet.rows.forEach(row => {
    const tr = document.createElement('tr');
    row.values.forEach((val, colIndex) => {
      const td = document.createElement('td');
      td.textContent = val;
      td.className = colIndex > 0 ? 'number' : '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  container.appendChild(table);

  return container;
}
