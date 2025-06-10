// src/components/FinancialTable.ts

import { FinancialSheet, FinancialPlanData } from '../types/financialPlan';
import { updateAllCalculations, downloadFinancialExcel } from '../features/financialPlan';

export function createFinancialTabs(sheets: FinancialSheet[]): HTMLElement {
  const wrapper = document.createElement('section');
  wrapper.className = 'section tabs';

  const buttons = document.createElement('div');
  buttons.className = 'tab-buttons';
  wrapper.appendChild(buttons);

  const panels = document.createElement('div');
  panels.className = 'tab-panels';
  wrapper.appendChild(panels);

  sheets.forEach((sheet, i) => {
    const btn = document.createElement('button');
    btn.textContent = sheet.title;
    btn.className = i === 0 ? 'active' : '';
    btn.addEventListener('click', () => {
      Array.from(panels.children).forEach((p, idx) => {
        (p as HTMLElement).style.display = idx === i ? 'block' : 'none';
      });
      Array.from(buttons.children).forEach((b, idx) => {
        b.classList.toggle('active', idx === i);
      });
      updateAllCalculations();
    });
    buttons.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    if (i !== 0) panel.style.display = 'none';
    panel.appendChild(createFinancialSheet(sheet, i));
    panels.appendChild(panel);
  });

  return wrapper;
}

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

export function createFinancialSheet(sheet: FinancialSheet, index = 0): HTMLElement {
  const container = document.createElement('div');
  container.className = 'sheet-container section';
  container.dataset.sheetIndex = String(index);

  // Titre
  const title = document.createElement('div');
  title.className = 'sheet-title';
  title.innerText = sheet.title;
  container.appendChild(title);

  // Tableau
  const table = document.createElement('table');
  table.className = 'financial-table';
  table.dataset.sheetIndex = String(index);

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

  sheet.rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    tr.dataset.rowIndex = String(rowIndex);
    row.values.forEach((val, colIndex) => {
      const td = document.createElement('td');
      td.dataset.colIndex = String(colIndex);
      td.textContent = val;
      if (row.editable !== false && colIndex > 0) {
        let editable = true;
        if (sheet.title.startsWith('Scénarios') && colIndex === 4) editable = false;
        if (editable) {
          td.contentEditable = 'true';
          td.classList.add('editable');
          td.addEventListener('input', () => {
            row.values[colIndex] = td.textContent || '';
            updateAllCalculations();
          });
        }
      }
      if (colIndex > 0) td.classList.add('number');
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  container.appendChild(table);

  return container;
}
