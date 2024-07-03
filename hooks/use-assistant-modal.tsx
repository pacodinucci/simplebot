import { create } from "zustand";

interface useAssistantModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAssistantModal = create<useAssistantModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
