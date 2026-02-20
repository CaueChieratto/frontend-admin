export const tabelaRoutes = {
  porTabela: (linha: string, produtoId: number) =>
    `/catalogo/${encodeURIComponent(linha)}/${produtoId}/tabelas`,

  porTabelaId: (linha: string, produtoId: number, tabelaId: number) =>
    `/catalogo/${encodeURIComponent(linha)}/${produtoId}/tabelas/${tabelaId}`,

  deletarTabela: (linha: string, produtoId: number, tabelaId: number) =>
    `/catalogo/${encodeURIComponent(linha)}/${produtoId}/tabelas/${tabelaId}/deletar`,

  restaurarTabela: (linha: string, produtoId: number, tabelaId: number) =>
    `/catalogo/${encodeURIComponent(linha)}/${produtoId}/tabelas/${tabelaId}/restaurar`,
};
