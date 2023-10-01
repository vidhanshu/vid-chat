import { TMessage } from "@/src/home/types";
import { create } from "zustand";

export type ModalType = "DELETE_MESSAGE" | "EDIT_MESSAGE" | "SEND_FILE" | "VIEW_IMAGE";

interface ModalData {
  message?: TMessage;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
