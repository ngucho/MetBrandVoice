// src/features/financialPlan.ts

import { FinancialPlanData } from '../types/financialPlan';

// Un exemple initial de plan financier MetBrandVoice (personnalise-le !)
export const financialPlanData: FinancialPlanData = {
  dashboard: {
    revenue: 4200000,
    cost: 1900000,
    net: 2300000,
    roi: 121,
    revenueLabel: "4,2 M€",
    costLabel: "1,9 M€",
    netLabel: "2,3 M€",
    roiLabel: "121%"
  },
  sheets: [
    {
      title: "Hypothèses & Paramètres",
      columns: ["Paramètre", "Valeur", "Source/Justification"],
      rows: [
        { values: ["Nombre d'éditions/an", "1", ""], editable: true, removable: false },
        { values: ["Participants voix-off (total)", "12", ""], editable: true, removable: true },
        { values: ["Nombre de marques", "100", ""], editable: true, removable: true },
        { values: ["Vote public en ligne (%)", "65", ""], editable: true, removable: true },
        // Ajoute d'autres hypothèses ici
      ]
    },
    {
      title: "Revenus (Licences, Partenariats, Digital, Paris…)",
      columns: ["Poste", "Prix unitaire", "Quantité", "Montant (€/an)", "Justification"],
      rows: [
        { values: ["Licences nationales", "800000", "1", "800000", "1 pays"], editable: true, removable: true },
        { values: ["Participation marques", "20000", "100", "2000000", "100 marques x 20 000 €"], editable: true, removable: true },
        { values: ["Votes payants", "2", "125000", "250000", "Votes publics"], editable: true, removable: true },
        { values: ["Sponsoring digital/TV", "350000", "1", "350000", "Annonces médias"], editable: true, removable: true },
        { values: ["Pari & quiz public", "5", "80000", "400000", "Paris sur les vainqueurs"], editable: true, removable: true },
        { values: ["Masterclass, contenus dérivés", "50", "3000", "150000", "Ventes digitales"], editable: true, removable: true },
        { values: ["TOTAL REVENUS", "", "", "", ""], editable: false, removable: false }
      ]
    },
    {
      title: "Coûts (Production, Tech, Communication…)",
      columns: ["Poste", "Prix unitaire", "Quantité", "Montant (€/an)", "Justification"],
      rows: [
        { values: ["Production audiovisuelle", "700000", "1", "700000", "5 épisodes live"], editable: true, removable: true },
        { values: ["Coaching talents", "100000", "1", "100000", "Coachs voix, media training"], editable: true, removable: true },
        { values: ["Equipe technique", "300000", "1", "300000", "Réalisation, diffusion, plateau"], editable: true, removable: true },
        { values: ["Marketing, Communication", "200000", "1", "200000", "Campagnes & réseaux"], editable: true, removable: true },
        { values: ["Juridique & Licences", "60000", "1", "60000", "INPI, contrats"], editable: true, removable: true },
        { values: ["Développement digital", "180000", "1", "180000", "Plateforme votes, apps"], editable: true, removable: true },
        { values: ["Divers & imprévus", "60000", "1", "60000", "Assurances, frais généraux"], editable: true, removable: true },
        { values: ["TOTAL COÛTS", "", "", "", ""], editable: false, removable: false }
      ]
    },
    {
      title: "Scénarios (Optimiste, Réaliste, Pessimiste…)",
      columns: ["Scénario", "Revenus", "Coûts", "Résultat Net", "ROI (%)", "Commentaires"],
      rows: [
        { values: ["Optimiste", "", "", "", "", ""], editable: false, removable: false },
        { values: ["Réaliste", "", "", "", "", ""], editable: false, removable: false },
        { values: ["Pessimiste", "", "", "", "", ""], editable: false, removable: false },
      ]
    }
  ]
};

// Calculs automatiques
export function updateAllCalculations() {
  // Calcule les totaux pour chaque feuille si ligne "TOTAL"
  let totalRevenus = 0;
  let totalCouts = 0;

  financialPlanData.sheets.forEach((sheet, sIndex) => {
    if (sheet.title.startsWith("Revenus")) {
      const nbMarquesRow = financialPlanData.sheets[0].rows.find(r => r.values[0].includes('Nombre de marques'));
      const nbMarques = parseInt(nbMarquesRow?.values[1] || '0', 10);
      let total = 0;
      sheet.rows.forEach((row, rIndex) => {
        if (row.values[0].includes('Participation marques')) {
          row.values[2] = nbMarques.toString();
          const qtyCell = document.querySelector<HTMLTableCellElement>(`table[data-sheet-index="${sIndex}"] tbody tr[data-row-index="${rIndex}"] td[data-col-index="2"]`);
          if (qtyCell) qtyCell.textContent = row.values[2];
        }
        if (row.editable !== false) {
          const price = parseFloat(row.values[1].replace(/\s/g, '').replace(',', '.')) || 0;
          const qty = parseFloat(row.values[2].replace(/\s/g, '').replace(',', '.')) || 0;
          const amount = price * qty;
          row.values[3] = amount ? amount.toLocaleString('fr-FR') : '';
          const amountCell = document.querySelector<HTMLTableCellElement>(`table[data-sheet-index="${sIndex}"] tbody tr[data-row-index="${rIndex}"] td[data-col-index="3"]`);
          if (amountCell) amountCell.textContent = row.values[3];
          total += amount;
        }
      });
      const totalRow = sheet.rows.find(row => row.values[0].toLowerCase().includes('total'));
      if (totalRow) {
        totalRow.values[3] = total.toLocaleString('fr-FR');
        const rowIndex = sheet.rows.indexOf(totalRow);
        const td = document.querySelector<HTMLTableCellElement>(`table[data-sheet-index="${sIndex}"] tbody tr[data-row-index="${rowIndex}"] td[data-col-index="3"]`);
        if (td) td.textContent = totalRow.values[3];
      }
      totalRevenus = total;
    }
    if (sheet.title.startsWith("Coûts")) {
      let total = 0;
      sheet.rows.forEach((row, rIndex) => {
        if (row.editable !== false) {
          const price = parseFloat(row.values[1].replace(/\s/g, '').replace(',', '.')) || 0;
          const qty = parseFloat(row.values[2].replace(/\s/g, '').replace(',', '.')) || 0;
          const amount = price * qty;
          row.values[3] = amount ? amount.toLocaleString('fr-FR') : '';
          const amountCell = document.querySelector<HTMLTableCellElement>(`table[data-sheet-index="${sIndex}"] tbody tr[data-row-index="${rIndex}"] td[data-col-index="3"]`);
          if (amountCell) amountCell.textContent = row.values[3];
          total += amount;
        }
      });
      const totalRow = sheet.rows.find(row => row.values[0].toLowerCase().includes('total'));
      if (totalRow) {
        totalRow.values[3] = total.toLocaleString('fr-FR');
        const rowIndex = sheet.rows.indexOf(totalRow);
        const td = document.querySelector<HTMLTableCellElement>(`table[data-sheet-index="${sIndex}"] tbody tr[data-row-index="${rowIndex}"] td[data-col-index="3"]`);
        if (td) td.textContent = totalRow.values[3];
      }
      totalCouts = total;
    }
    if (sheet.title.startsWith("Scénarios")) {
      sheet.rows.forEach((row, rIndex) => {
        let revenus = totalRevenus;
        let couts = totalCouts;
        if (row.values[0].includes('Pessimiste')) {
          revenus = Math.round(totalRevenus * 0.75);
          couts = Math.round(totalCouts * 1.25);
        } else if (row.values[0].includes('Optimiste')) {
          revenus = Math.round(totalRevenus * 1.25);
          couts = Math.round(totalCouts * 0.75);
        }
        row.values[1] = revenus.toLocaleString('fr-FR');
        row.values[2] = couts.toLocaleString('fr-FR');
        const net = revenus - couts;
        const roi = couts > 0 ? Math.round((net / couts) * 100) : 0;
        row.values[3] = net.toLocaleString('fr-FR');
        row.values[4] = roi.toString();
        const tr = document.querySelector<HTMLTableRowElement>(`table[data-sheet-index="${sIndex}"] tbody tr[data-row-index="${rIndex}"]`);
        if (tr) {
          const cells = tr.querySelectorAll<HTMLTableCellElement>('td');
          if (cells[1]) cells[1].textContent = row.values[1];
          if (cells[2]) cells[2].textContent = row.values[2];
          if (cells[3]) cells[3].textContent = row.values[3];
          if (cells[4]) cells[4].textContent = row.values[4];
        }
      });
    }
  });

  // MAJ dashboard
  let revenus = totalRevenus;
  let couts = totalCouts;
  const net = revenus - couts;
  const roi = couts > 0 ? Math.round((net / couts) * 100) : 0;

  financialPlanData.dashboard.revenue = revenus;
  financialPlanData.dashboard.cost = couts;
  financialPlanData.dashboard.net = net;
  financialPlanData.dashboard.roi = roi;
  financialPlanData.dashboard.revenueLabel = `${(revenus / 1000000).toFixed(1)} M€`;
  financialPlanData.dashboard.costLabel = `${(couts / 1000000).toFixed(1)} M€`;
  financialPlanData.dashboard.netLabel = `${(net / 1000000).toFixed(1)} M€`;
  financialPlanData.dashboard.roiLabel = `${roi}%`;

  // MAJ DOM
  const byId = (id: string) => document.getElementById(id);
  if (byId('total-revenue')) byId('total-revenue')!.textContent = financialPlanData.dashboard.revenueLabel;
  if (byId('total-costs')) byId('total-costs')!.textContent = financialPlanData.dashboard.costLabel;
  if (byId('net-result')) byId('net-result')!.textContent = financialPlanData.dashboard.netLabel;
  if (byId('roi')) byId('roi')!.textContent = financialPlanData.dashboard.roiLabel;
}

// Export Excel
export function downloadFinancialExcel(data: FinancialPlanData) {
  // @ts-ignore
  if (typeof XLSX === 'undefined') {
    alert("La librairie XLSX (SheetJS) n'est pas chargée !");
    return;
  }
  // @ts-ignore
  const wb = XLSX.utils.book_new();
  data.sheets.forEach(sheet => {
    const ws_data = [sheet.columns, ...sheet.rows.map(r => r.values)];
    // @ts-ignore
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    // @ts-ignore
    XLSX.utils.book_append_sheet(wb, ws, sheet.title.substring(0, 30));
  });
  // @ts-ignore
  XLSX.writeFile(wb, "Previsionnel_MetBrandVoice.xlsx");
}
