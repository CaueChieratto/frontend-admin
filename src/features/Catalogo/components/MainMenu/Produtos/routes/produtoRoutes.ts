export const produtoRoutes = {
  porNomeLinha: (linhaName: string) =>
    `/catalogo/${encodeURIComponent(linhaName)}`,

  porProdutosLinha: (linhaName: string) =>
    `/catalogo/${encodeURIComponent(linhaName)}/produtos`,
  produtosCompleto: (linhaName: string) =>
    `/catalogo/${encodeURIComponent(linhaName)}/produtos/completo`,

  porProdutosPaginados: (linhaName: string, pagina: number, limite: number) =>
    `/catalogo/${encodeURIComponent(linhaName)}/produtos/paginados?pagina=${pagina}&limite=${limite}`,

  porProdutosID: (linhaName: string, id: number) =>
    `/catalogo/${encodeURIComponent(linhaName)}/${id}`,
  deletarProduto: (linhaName: string, id: number) =>
    `/catalogo/${encodeURIComponent(linhaName)}/${id}/deletar`,
  restaurarProduto: (linhaName: string, id: number) =>
    `/catalogo/${encodeURIComponent(linhaName)}/${id}/restaurar`,
};
