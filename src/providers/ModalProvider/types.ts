import type { ReactNode } from "react";

export type KnownModalId = "confirm" | "success" | "error";

export type ModalId = KnownModalId | (string & {});

export type ModalPayload = {
  title?: string;
  content?: ReactNode;

  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;

  closeOnBackdrop?: boolean;
};

export type OpenModalInput = {
  id: ModalId;
  payload?: ModalPayload;
};

export type ModalState = {
  isOpen: boolean;
  id: ModalId | null;
  payload?: ModalPayload;
};

export type OpenModal = (input: OpenModalInput) => void;
