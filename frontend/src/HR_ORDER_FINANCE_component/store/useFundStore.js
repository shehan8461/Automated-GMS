import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  funds: [],
  selectedFund: null,
  isAddFundModalOpen: false,
  isEditFundModalOpen: false,
  isViewFundModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setFunds: (funds) => set({ funds }),
  setSelectedFund: (fund) => set({ selectedFund: fund }),
  openAddFundModal: () => set({ isAddFundModalOpen: true }),
  closeAddFundModal: () => set({ isAddFundModalOpen: false }),
  openEditFundModal: () => set({ isEditFundModalOpen: true }),
  closeEditFundModal: () => set({ isEditFundModalOpen: false }),
  openViewFundModal: () => set({ isViewFundModalOpen: true }),
  closeViewFundModal: () => set({ isViewFundModalOpen: false }),
});

export const useFundStore = create(devtools(store, "fundStore"));
