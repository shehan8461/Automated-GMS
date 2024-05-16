import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  payrolls: [],
  selectedPayroll: null,
  isAddPayrollModalOpen: false,
  isEditPayrollModalOpen: false,
  isViewPayrollModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setPayrolls: (payrolls) => set({ payrolls }),
  setSelectedPayroll: (payroll) => set({ selectedPayroll: payroll }),
  openAddPayrollModal: () => set({ isAddPayrollModalOpen: true }),
  closeAddPayrollModal: () => set({ isAddPayrollModalOpen: false }),
  openEditPayrollModal: () => set({ isEditPayrollModalOpen: true }),
  closeEditPayrollModal: () => set({ isEditPayrollModalOpen: false }),
  openViewPayrollModal: () => set({ isViewPayrollModalOpen: true }),
  closeViewPayrollModal: () => set({ isViewPayrollModalOpen: false }),
});

export const usePayrollStore = create(devtools(store, "payrollStore"));
