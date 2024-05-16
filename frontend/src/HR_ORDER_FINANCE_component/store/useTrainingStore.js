import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  trainings: [],
  selectedTraining: null,
  isAddTrainingModalOpen: false,
  isEditTrainingModalOpen: false,
  isViewTrainingModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setTrainings: (trainings) => set({ trainings }),
  setSelectedTraining: (training) => set({ selectedTraining: training }),
  openAddTrainingModal: () => set({ isAddTrainingModalOpen: true }),
  closeAddTrainingModal: () => set({ isAddTrainingModalOpen: false }),
  openEditTrainingModal: () => set({ isEditTrainingModalOpen: true }),
  closeEditTrainingModal: () => set({ isEditTrainingModalOpen: false }),
  openViewTrainingModal: () => set({ isViewTrainingModalOpen: true }),
  closeViewTrainingModal: () => set({ isViewTrainingModalOpen: false }),
});

export const useTrainingStore = create(devtools(store, "trainingStore"));
