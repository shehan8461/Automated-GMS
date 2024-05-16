import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  users: [],
  selectedUser: null,
  isAddUserModalOpen: false,
  isEditUserModalOpen: false,
  isViewUserModalOpen: false,
  isAddTrainingModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  openAddUserModal: () => set({ isAddUserModalOpen: true }),
  closeAddUserModal: () => set({ isAddUserModalOpen: false }),
  openEditUserModal: () => set({ isEditUserModalOpen: true }),
  closeEditUserModal: () => set({ isEditUserModalOpen: false }),
  openViewUserModal: () => set({ isViewUserModalOpen: true }),
  closeViewUserModal: () => set({ isViewUserModalOpen: false }),
  openAddTrainingModal: () => set({ isAddTrainingModalOpen: true }),
  closeAddTrainingModal: () => set({ isAddTrainingModalOpen: false }),
});

export const useUserStore = create(devtools(store, "userStore"));
