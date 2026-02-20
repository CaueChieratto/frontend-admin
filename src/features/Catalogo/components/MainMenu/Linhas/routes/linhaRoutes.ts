export const linhaRoutes = {
  porNomeLinha: (nome: string) => `/catalogo/${encodeURIComponent(nome)}`,

  paginadaPorLinhas: (pagina: number, limite: number) =>
    `/catalogo/resumo?pagina=${pagina}&limite=${limite}`,

  deletadosLinha: () => "/catalogo/deletados",

  deletarLinha: (nome: string) =>
    `/catalogo/${encodeURIComponent(nome)}/deletar`,

  restaurarLinha: (nome: string) =>
    `/catalogo/${encodeURIComponent(nome)}/restaurar`,
};
