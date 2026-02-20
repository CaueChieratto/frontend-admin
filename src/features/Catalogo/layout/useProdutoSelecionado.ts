import { useCallback, useMemo, useState } from "react";
import { NOVO_PRODUTO_TEMPLATE } from "../components/MainMenu/Produtos/constants/produtoTemplate";

type Produto = {
  produto_id: number;
};

export const useProdutoSelecionado = <T extends Produto>(produtos: T[]) => {
  const [produtoSelecionadoId, setProdutoSelecionadoId] = useState<
    number | null
  >(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const toggleProduto = useCallback((id: number) => {
    setIsCreatingNew(false);
    setProdutoSelecionadoId((prev) => (prev === id ? null : id));
  }, []);

  const resetProdutoSelecionado = useCallback(() => {
    setIsCreatingNew(false);
    setProdutoSelecionadoId(null);
  }, []);

  const newProduto = useCallback(() => {
    setIsCreatingNew(true);
    setProdutoSelecionadoId(null);
  }, []);

  const produtoSelecionado = useMemo(() => {
    if (isCreatingNew) return NOVO_PRODUTO_TEMPLATE;
    if (produtoSelecionadoId === null) return null;
    return produtos.find((p) => p.produto_id === produtoSelecionadoId) ?? null;
  }, [produtoSelecionadoId, produtos, isCreatingNew]);

  return {
    produtoSelecionadoId,
    produtoSelecionado,
    toggleProduto,
    resetProdutoSelecionado,
    newProduto,
  };
};
