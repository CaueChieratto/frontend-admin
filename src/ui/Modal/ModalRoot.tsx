import { createPortal } from "react-dom";
import { useModal } from "@/providers/ModalProvider/useModal";
import { ConfirmModal } from "./ConfirmModal";

function getRoot() {
  const el = document.getElementById("modal-root");
  if (el) return el;

  const created = document.createElement("div");
  created.id = "modal-root";
  document.body.appendChild(created);
  return created;
}

export function ModalRoot() {
  const { state } = useModal();

  if (!state.isOpen || !state.id) return null;

  const node = (() => {
    switch (state.id) {
      case "confirm":
        return <ConfirmModal />;
      case "success":
        return <ConfirmModal success />;
      case "error":
        return <ConfirmModal error />;
      case "restore":
        return <ConfirmModal restore />;
      case "permanently":
        return <ConfirmModal permanently />;
      default:
        return null;
    }
  })();

  if (!node) return null;

  return createPortal(node, getRoot());
}
