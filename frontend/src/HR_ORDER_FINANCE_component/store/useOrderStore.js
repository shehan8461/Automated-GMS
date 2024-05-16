import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  orders: [],
  selectedOrder: null,
  isAddOrderModalOpen: false,
  isEditOrderModalOpen: false,
  isViewOrderModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (order) => set({ selectedOrder: order }),
  openAddOrderModal: () => set({ isAddOrderModalOpen: true }),
  closeAddOrderModal: () => set({ isAddOrderModalOpen: false }),
  openEditOrderModal: () => set({ isEditOrderModalOpen: true }),
  closeEditOrderModal: () => set({ isEditOrderModalOpen: false }),
  openViewOrderModal: () => set({ isViewOrderModalOpen: true }),
  closeViewOrderModal: () => set({ isViewOrderModalOpen: false }),
});

export const useOrderStore = create(devtools(store, "orderStore"));
