type ProdutoEditorText = {
  emptyProdutoTitle: string;
  emptyProdutoDescription: string;
  nomePlaceholder: string;
  descricaoPlaceholder: string;
};

export const getProdutoEditorText = (): ProdutoEditorText => {
  return {
    emptyProdutoTitle: "Adicionar Nome do Produto",
    emptyProdutoDescription: "Adicionar descrição",
    nomePlaceholder: "Nome do Produto",
    descricaoPlaceholder: "Descrição do Produto",
  };
};
