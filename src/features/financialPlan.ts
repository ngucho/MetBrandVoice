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
      columns: ["Poste", "Montant (€/an)", "Justification"],
      rows: [
        { values: ["Licences nationales", "800000", "1 pays"], editable: true, removable: true },
        { values: ["Participation marques", "2000000", "100 marques x 20 000 €"], editable: true, removable: true },
        { values: ["Votes payants", "250000", "Votes publics"], editable: true, removable: true },
        { values: ["Sponsoring digital/TV", "350000", "Annonces médias"], editable: true, removable: true },
        { values: ["Pari & quiz public", "400000", "Paris sur les vainqueurs"], editable: true, removable: true },
        { values: ["Masterclass, contenus dérivés", "150000", "Ventes digitales"], editable: true, removable: true },
        { values: ["TOTAL REVENUS", "", ""], editable: false, removable: false }
      ]
    },
    {
      title: "Coûts (Production, Tech, Communication…)",
      columns: ["Poste", "Montant (€/an)", "Justification"],
      rows: [
        { values: ["Production audiovisuelle", "700000", "5 épisodes live"], editable: true, removable: true },
        { values: ["Coaching talents", "100000", "Coachs voix, media training"], editable: true, removable: true },
        { values: ["Equipe technique", "300000", "Réalisation, diffusion, plateau"], editable: true, removable: true },
        { values: ["Marketing, Communication", "200000", "Campagnes & réseaux"], editable: true, removable: true },
        { values: ["Juridique & Licences", "60000", "INPI, contrats"], editable: true, removable: true },
        { values: ["Développement digital", "180000", "Plateforme votes, apps"], editable: true, removable: true },
        { values: ["Divers & imprévus", "60000", "Assurances, frais généraux"], editable: true, removable: true },
        { values: ["TOTAL COÛTS", "", ""], editable: false, removable: false }
      ]
    },
    {
      title: "Scénarios (Optimiste, Réaliste, Pessimiste…)",
      columns: ["Scénario", "Revenus", "Coûts", "Résultat Net", "ROI (%)", "Commentaires"],
      rows: [
        { values: ["Optimiste", "4 700 000", "1 950 000", "2 750 000", "141", ""], editable: true, removable: true },
        { values: ["Réaliste", "4 200 000", "1 900 000", "2 300 000", "121", ""], editable: true, removable: true },
        { values: ["Pessimiste", "3 400 000", "2 050 000", "1 350 000", "66", ""], editable: true, removable: true },
      ]
    }
  ]
};

// Calculs automatiques
export function updateAllCalculations() {
  // Calcule les totaux pour chaque feuille si ligne "TOTAL"
  financialPlanData.sheets.forEach(sheet => {
    if (sheet.title.startsWith("Revenus")) {
      let total = sheet.rows
        .filter(row => row.values[1] && row.editable !== false)
        .reduce((sum, row) => sum + (parseFloat(row.values[1].replace(/\s/g, '').replace(',', '.')) || 0), 0);
      const totalRow = sheet.rows.find(row => row.values[0].toLowerCase().includes('total'));
      if (totalRow) totalRow.values[1] = total.toLocaleString('fr-FR');
    }
    if (sheet.title.startsWith("Coûts")) {
      let total = sheet.rows
        .filter(row => row.values[1] && row.editable !== false)
        .reduce((sum, row) => sum + (parseFloat(row.values[1].replace(/\s/g, '').replace(',', '.')) || 0), 0);
      const totalRow = sheet.rows.find(row => row.values[0].toLowerCase().includes('total'));
      if (totalRow) totalRow.values[1] = total.toLocaleString('fr-FR');
    }
  });

  // MAJ dashboard
  let revenus = 0, couts = 0;
  const revenusSheet = financialPlanData.sheets.find(s => s.title.startsWith("Revenus"));
  const coutsSheet = financialPlanData.sheets.find(s => s.title.startsWith("Coûts"));
  if (revenusSheet) {
    revenus = revenusSheet.rows.reduce((sum, r) => sum + (parseFloat(r.values[1]?.replace(/\s/g, '').replace(',', '.')) || 0), 0);
  }
  if (coutsSheet) {
    couts = coutsSheet.rows.reduce((sum, r) => sum + (parseFloat(r.values[1]?.replace(/\s/g, '').replace(',', '.')) || 0), 0);
  }
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
