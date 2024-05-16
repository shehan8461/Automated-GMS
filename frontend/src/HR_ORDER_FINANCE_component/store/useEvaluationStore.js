import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  evaluations: [],
  selectedEvaluation: null,
  isAddEvaluationModalOpen: false,
  isEditEvaluationModalOpen: false,
  isViewEvaluationModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setEvaluations: (evaluations) => set({ evaluations }),
  setSelectedEvaluation: (evaluation) => set({ selectedEvaluation: evaluation }),
  openAddEvaluationModal: () => set({ isAddEvaluationModalOpen: true }),
  closeAddEvaluationModal: () => set({ isAddEvaluationModalOpen: false }),
  openEditEvaluationModal: () => set({ isEditEvaluationModalOpen: true }),
  closeEditEvaluationModal: () => set({ isEditEvaluationModalOpen: false }),
  openViewEvaluationModal: () => set({ isViewEvaluationModalOpen: true }),
  closeViewEvaluationModal: () => set({ isViewEvaluationModalOpen: false }),
});

export const useEvaluationStore = create(devtools(store, "evaluationStore"));
