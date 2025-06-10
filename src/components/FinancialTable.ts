// src/components/FinancialTable.ts

import { FinancialSheet, FinancialRow, FinancialPlanData } from '../types/financialPlan';
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
  headerRow.appendChild(document.createElement('th')).innerText = ""; // Pour le bouton "Supprimer"
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  function renderRows() {
    tbody.innerHTML = '';
    sheet.rows.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      sheet.columns.forEach((col, colIndex) => {
        const td = document.createElement('td');
        td.contentEditable = (row.editable !== false).toString();
        td.innerText = row.values[colIndex] ?? '';
        td.className = colIndex > 0 ? 'number' : '';
        td.addEventListener('input', () => {
          row.values[colIndex] = td.innerText;
          updateAllCalculations();
        });
        tr.appendChild(td);
      });
      // Bouton supprimer
      const tdDel = document.createElement('td');
      if (row.removable !== false) {
        const btnDel = document.createElement('button');
        btnDel.textContent = "❌";
        btnDel.style.fontSize = "1rem";
        btnDel.style.background = "none";
        btnDel.style.border = "none";
        btnDel.style.cursor = "pointer";
        btnDel.onclick = () => {
          sheet.rows.splice(rowIndex, 1);
          renderRows();
          updateAllCalculations();
        };
        tdDel.appendChild(btnDel);
      }
      tr.appendChild(tdDel);
      tbody.appendChild(tr);
    });
  }
  renderRows();

  // Bouton Ajouter
  const addBtn = document.createElement('button');
  addBtn.className = 'cta';
  addBtn.textContent = "+ Ajouter une ligne";
  addBtn.style.margin = "0.6rem 0";
  addBtn.onclick = () => {
    sheet.rows.push({
      values: Array(sheet.columns.length).fill(""),
      editable: true,
      removable: true,
    });
    renderRows();
  };

  container.appendChild(table);
  container.appendChild(addBtn);

  return container;
}
