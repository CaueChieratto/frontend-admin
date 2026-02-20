import { useCallback } from "react";
import type { SaveResult } from "./useProductEditor";

type ModalPayloadBase = {
  title: string;
  content: string;
  confirmText: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  closeOnBackdrop?: boolean;
};

export type ModalConfig = {
  id: "confirm" | "success" | "error" | "restore";
  payload: ModalPayloadBase;
};

type OpenModalFn = (config: ModalConfig) => void;

type UseProdutoEditorModalsParams = {
  openModal: OpenModalFn;
  productName: string;
  saveProduct: () => Promise<SaveResult | null | undefined>;
  deleteProduct: () => Promise<boolean | undefined>;
  removeTabela: (tabelaId: number) => void;
};

type UseProdutoEditorModalsResult = {
  confirmDeleteTabela: (tabelaId: number) => void;
  confirmDeleteProduto: () => void;
  saveWithFeedback: () => Promise<void>;
};

export const useProdutoEditorModals = ({
  openModal,
  productName,
  saveProduct,
  deleteProduct,
  removeTabela,
}: UseProdutoEditorModalsParams): UseProdutoEditorModalsResult => {
  const showSaveSuccess = useCallback(
    (result: SaveResult): void => {
      openModal({
        id: "success",
        payload: {
          title: "Sucesso",
          content:
            result === "created"
              ? "Novo produto criado com sucesso!"
              : "Alterações salvas com sucesso!",
          confirmText: "Ok",
          cancelText: "",
          closeOnBackdrop: false,
          onConfirm: () => {},
        },
      });
    },
    [openModal],
  );

  const saveWithFeedback = useCallback(async (): Promise<void> => {
    const result = await saveProduct();
    if (!result) return;

    showSaveSuccess(result);
  }, [saveProduct, showSaveSuccess]);

  const confirmDeleteTabela = useCallback(
    (tabelaId: number): void => {
      openModal({
        id: "confirm",
        payload: {
          title: "Deletar Tabela?",
          content: "Tem certeza que deseja excluir esta tabela?",
          confirmText: "Deletar",
          cancelText: "Cancelar",
          onConfirm: () => {
            removeTabela(tabelaId);
          },
        },
      });
    },
    [openModal, removeTabela],
  );

  const confirmDeleteProduto = useCallback((): void => {
    openModal({
      id: "confirm",
      payload: {
        title: "Deletar Produto?",
        content: `Deseja deletar o produto ${productName}?`,
        confirmText: "Deletar",
        cancelText: "Cancelar",
        closeOnBackdrop: false,
        onConfirm: async () => {
          const success = await deleteProduct();
          if (!success) return;
        },
      },
    });
  }, [openModal, productName, deleteProduct]);

  return {
    confirmDeleteTabela,
    confirmDeleteProduto,
    saveWithFeedback,
  };
};
