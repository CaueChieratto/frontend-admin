export const dadosRoutes = {
  porDados: (linhaName: string, produtoId: number, tabelaId: number) =>
    `/catalogo/${encodeURIComponent(linhaName)}/${produtoId}/tabelas/${tabelaId}/dados`,

  porCodigo: (
    linhaName: string,
    produtoId: number,
    tabelaId: number,
    codigo: string,
  ) =>
    `/catalogo/${encodeURIComponent(linhaName)}/${produtoId}/tabelas/${tabelaId}/dados/${codigo}`,

  deletarDados: (
    linhaName: string,
    produtoId: number,
    tabelaId: number,
    codigo: string,
  ) =>
    `/catalogo/${encodeURIComponent(linhaName)}/${produtoId}/tabelas/${tabelaId}/dados/${codigo}/deletar`,

  restaurarDados: (
    linhaName: string,
    produtoId: number,
    tabelaId: number,
    codigo: string,
  ) =>
    `/catalogo/${encodeURIComponent(linhaName)}/${produtoId}/tabelas/${tabelaId}/dados/${codigo}/restaurar`,
};
