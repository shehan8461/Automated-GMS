import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  bankCommunications: [],
  selectedBankCommunication: null,
  isAddBankCommunicationModalOpen: false,
  isEditBankCommunicationModalOpen: false,
  isViewBankCommunicationModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setBankCommunications: (bankCommunications) => set({ bankCommunications }),
  setSelectedBankCommunication: (bankCommunication) =>
    set({ selectedBankCommunication: bankCommunication }),
  openAddBankCommunicationModal: () =>
    set({ isAddBankCommunicationModalOpen: true }),
  closeAddBankCommunicationModal: () =>
    set({ isAddBankCommunicationModalOpen: false }),
  openEditBankCommunicationModal: () =>
    set({ isEditBankCommunicationModalOpen: true }),
  closeEditBankCommunicationModal: () =>
    set({ isEditBankCommunicationModalOpen: false }),
  openViewBankCommunicationModal: () =>
    set({ isViewBankCommunicationModalOpen: true }),
  closeViewBankCommunicationModal: () =>
    set({ isViewBankCommunicationModalOpen: false }),
});

export const useBankCommunicationStore = create(
  devtools(store, "bankCommunicationStore")
);
