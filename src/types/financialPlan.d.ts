// src/types/financialPlan.d.ts

export interface FinancialRow {
  values: string[];
  editable?: boolean; // false si la ligne n'est pas éditable
  removable?: boolean; // false si la ligne ne peut pas être supprimée
}

export interface FinancialSheet {
  title: string;
  columns: string[];
  rows: FinancialRow[];
}

export interface FinancialPlanData {
  dashboard: {
    revenue: number;
    cost: number;
    net: number;
    roi: number;
    revenueLabel: string;
    costLabel: string;
    netLabel: string;
    roiLabel: string;
  };
  sheets: FinancialSheet[];
}
