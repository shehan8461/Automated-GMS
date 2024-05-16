import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  expenses: [],
  selectedExpense: null,
  isAddExpenseModalOpen: false,
  isEditExpenseModalOpen: false,
  isViewExpenseModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setExpenses: (expenses) => set({ expenses }),
  setSelectedExpense: (expense) => set({ selectedExpense: expense }),
  openAddExpenseModal: () => set({ isAddExpenseModalOpen: true }),
  closeAddExpenseModal: () => set({ isAddExpenseModalOpen: false }),
  openEditExpenseModal: () => set({ isEditExpenseModalOpen: true }),
  closeEditExpenseModal: () => set({ isEditExpenseModalOpen: false }),
  openViewExpenseModal: () => set({ isViewExpenseModalOpen: true }),
  closeViewExpenseModal: () => set({ isViewExpenseModalOpen: false }),
});

export const useExpenseStore = create(devtools(store, "expenseStore"));
