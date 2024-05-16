import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  products: [],
  selectedProduct: null,
  isAddProductModalOpen: false,
  isEditProductModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  openAddProductModal: () => set({ isAddProductModalOpen: true }),
  closeAddProductModal: () => set({ isAddProductModalOpen: false }),
  openEditProductModal: () => set({ isEditProductModalOpen: true }),
  closeEditProductModal: () => set({ isEditProductModalOpen: false }),
});

export const useProductStore = create(devtools(store, "productStore"));
