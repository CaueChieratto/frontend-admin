import type { OpenModal } from "@/providers/ModalProvider/types";

type SaveResult = "created" | "updated";

export const useLinhaModals = (openModal: OpenModal) => {
  const confirmDelete = ({
    formatedName,
    onConfirm,
  }: {
    formatedName: string;
    onConfirm: () => Promise<void> | void;
  }) => {
    openModal({
      id: "confirm",
      payload: {
        title: "Deletar Linha?",
        content: <>Isso excluirá {formatedName}.</>,
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        onConfirm,
      },
    });
  };

  const showSaveSuccess = ({
    result,
    onConfirm,
  }: {
    result: SaveResult;
    onConfirm: () => Promise<void> | void;
  }) => {
    openModal({
      id: "success",
      payload: {
        title: "Sucesso",
        content:
          result === "created"
            ? "Nova linha criada com sucesso!"
            : "Alterações salvas com sucesso!",
        confirmText: "Ok",
        cancelText: "",
        onConfirm,
        closeOnBackdrop: false,
      },
    });
  };

  const showSaveError = (error: unknown) => {
    openModal({
      id: "error",
      payload: {
        title: "Erro",
        content:
          error instanceof Error ? error.message : "Erro ao salvar alterações.",
        confirmText: "Ok",
        cancelText: "",
        closeOnBackdrop: true,
      },
    });
  };

  return { confirmDelete, showSaveSuccess, showSaveError };
};
