import { createContext } from "react";
import type { ModalState, OpenModalInput } from "./types";

export type ModalContextValue = {
  state: ModalState;
  openModal: (input: OpenModalInput) => void;
  closeModal: () => void;
  setLoading: (value: boolean) => void;
  isActionLoading: boolean;
};

export const ModalContext = createContext<ModalContextValue | null>(null);
