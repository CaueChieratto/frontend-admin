import type { Produto } from "@interfaces/produto";

type Params = {
  produtoBase: Produto;
  fetchedProduto: Produto | null;
};

export const getProdutoParaExibir = ({
  produtoBase,
  fetchedProduto,
}: Params): Produto | null => {
  if (!produtoBase.produto_id) return produtoBase;

  if (fetchedProduto?.produto_id === produtoBase.produto_id) {
    return fetchedProduto;
  }

  return null;
};
