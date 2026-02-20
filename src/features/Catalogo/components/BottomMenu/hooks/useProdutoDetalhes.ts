import type { Produto } from "@/features/Catalogo/interfaces/produto";
import { useEffect, useState } from "react";
import { ProdutoService } from "../../MainMenu/Produtos/hooks/produtoService";

type UseProdutoDetalhesParams = {
  nameLinha: string;
  produtoId: number | undefined;
};

type UseProdutoDetalhesReturn = {
  produto: Produto | null;
  isLoading: boolean;
};

export const useProdutoDetalhes = ({
  nameLinha,
  produtoId,
}: UseProdutoDetalhesParams): UseProdutoDetalhesReturn => {
  const [fetchedProduto, setFetchedProduto] = useState<Produto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!produtoId || !nameLinha) return;

    let isActive = true;
    setIsLoading(true);

    const fetchFullData = async () => {
      try {
        const data = await ProdutoService.buscarPorId(nameLinha, produtoId);
        if (isActive) setFetchedProduto(data);
      } catch {
        if (isActive) setFetchedProduto(null);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchFullData();

    return () => {
      isActive = false;
    };
  }, [nameLinha, produtoId]);

  return { produto: fetchedProduto, isLoading };
};
