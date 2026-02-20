import type { Produto } from "@/features/Catalogo/interfaces/produto";
import type { Tabela } from "@/features/Catalogo/interfaces/tabela";
import { useCallback, useMemo, useState } from "react";
import { ProdutoService } from "../../MainMenu/Produtos/hooks/produtoService";
import { validateProdutosRequiredFields } from "../../MainMenu/Produtos/validators/validateProdutosRequiredFields";
import { validateDuplicateCodes } from "../helpers/validateTabelaCodes";
import type { ModalConfig } from "./useProdutoEditorModals";
import { CodigoExistenteError } from "../components/ProdutoEditor/errors/CodigoExistenteError";
import { saveProductWithRelations } from "../components/ProdutoEditor/services/productPersistenceService";

type UploadField = "imagem_produto" | "pdf_produto";
type PendingUploads = Record<UploadField, File | undefined>;
export type SaveResult = "created" | "updated";

export const useProductEditor = (
  produto: Produto,
  nameLinha: string,
  openModal?: (config: ModalConfig) => void,
  onSuccess?: () => void,
) => {
  const [draft, setDraft] = useState<Partial<Produto>>({});
  const [pendingUploads, setPendingUploads] = useState<PendingUploads>({
    imagem_produto: undefined,
    pdf_produto: undefined,
  });
  const [isSaving, setIsSaving] = useState(false);

  const productState = useMemo<Produto>(
    () => ({ ...produto, ...draft }),
    [produto, draft],
  );

  const updateProduct = useCallback((updates: Partial<Produto>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const addTabela = useCallback(() => {
    const novaTabela: Tabela = {
      tabela_id: Date.now(),
      pn: "",
      deletado: false,
      dados: [],
      _id: "",
    };

    setDraft((prev) => {
      const tabelasAtuais =
        prev.tabelas_produto || produto.tabelas_produto || [];
      return {
        ...prev,
        tabelas_produto: [...tabelasAtuais, novaTabela],
      };
    });
  }, [produto.tabelas_produto]);

  const updateTabela = (
    tabelaId: number,
    dadosAtualizados: Partial<Tabela>,
  ) => {
    const novasTabelas = productState.tabelas_produto.map((t) =>
      t.tabela_id === tabelaId ? { ...t, ...dadosAtualizados } : t,
    );
    updateProduct({ tabelas_produto: novasTabelas });
  };

  const resetEditor = useCallback(() => {
    setDraft({});
    setPendingUploads({
      imagem_produto: undefined,
      pdf_produto: undefined,
    });
  }, []);

  const removeTabela = useCallback(
    (tabelaId: number) => {
      setDraft((prev) => {
        const tabelasAtuais =
          prev.tabelas_produto || produto.tabelas_produto || [];

        const novasTabelas = tabelasAtuais.filter(
          (t) => t.tabela_id !== tabelaId,
        );

        return {
          ...prev,
          tabelas_produto: novasTabelas,
        };
      });
    },
    [produto.tabelas_produto],
  );

  const fileSelect = useCallback(
    (file: File, field: UploadField) => {
      const previewUrl = URL.createObjectURL(file);

      setPendingUploads((prev) => ({ ...prev, [field]: file }));
      updateProduct({ [field]: previewUrl } as Partial<Produto>);
    },
    [updateProduct],
  );

  const removeFile = useCallback(
    (field: UploadField) => {
      setPendingUploads((prev) => ({ ...prev, [field]: undefined }));
      updateProduct({ [field]: "" } as Partial<Produto>);
    },
    [updateProduct],
  );

  const showErrorModal = useCallback(
    (title: string, content: string) => {
      openModal?.({
        id: "error",
        payload: {
          title,
          content,
          confirmText: "Ok",
          cancelText: "",
        },
      });
    },
    [openModal],
  );

  const saveProduct = useCallback(async () => {
    const result: "created" | "updated" = productState._id
      ? "updated"
      : "created";

    const validation = validateProdutosRequiredFields(productState);
    if (!validation.ok) {
      showErrorModal("Atenção", validation.message);
      return;
    }

    const duplicated = validateDuplicateCodes(
      productState.tabelas_produto ?? [],
    );

    if (duplicated) {
      showErrorModal(
        "Código Duplicado!",
        `Código duplicado dentro do produto: ${productState.nome_produto}`,
      );
      return;
    }

    setIsSaving(true);

    try {
      await saveProductWithRelations({
        produtoOriginal: produto,
        produtoAtualizado: productState,
        pendingUploads,
        nameLinha,
      });

      setPendingUploads({
        imagem_produto: undefined,
        pdf_produto: undefined,
      });

      onSuccess?.();
      return result;
    } catch (error) {
      if (error instanceof CodigoExistenteError) {
        showErrorModal(
          "Erro ao salvar",
          `O produto não foi salvo pois o campo "código" já está sendo utilizado em outro produto.`,
        );
        return null;
      }

      showErrorModal("Erro", "Ocorreu um erro ao salvar o produto.");
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [
    productState,
    pendingUploads,
    nameLinha,
    onSuccess,
    produto,
    showErrorModal,
  ]);

  const deleteProduct = useCallback(async () => {
    if (!productState.produto_id) return;

    setIsSaving(true);
    try {
      await ProdutoService.deletar(nameLinha, productState.produto_id);

      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      console.error(error);
      showErrorModal("Erro", "Ocorreu um erro ao deletar o produto.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [productState, nameLinha, onSuccess, showErrorModal]);

  return {
    productState,
    updateTabela,
    addTabela,
    removeTabela,
    updateProduct,
    fileSelect,
    pendingUploads,
    resetEditor,
    removeFile,
    saveProduct,
    deleteProduct,
    isSaving,
  };
};
