import { httpClient } from "@/services/http/httpClient";
import { produtoRoutes } from "../routes/produtoRoutes";
import type { Produto } from "@/features/Catalogo/interfaces/produto";
import type { ProdutoPaginado } from "../interface/produtoPaginado";

export const ProdutoService = {
  buscarProdutosLinha: async (nomeLinha: string) => {
    return httpClient.get<Produto[]>(produtoRoutes.porProdutosLinha(nomeLinha));
  },

  buscarPorId: async (nomeLinha: string, produtoId: number) => {
    return httpClient.get<Produto>(
      produtoRoutes.porProdutosID(nomeLinha, produtoId),
    );
  },

  listarProdutosPaginados: async (
    nomeLinha: string,
    pagina = 1,
    limite = 10,
  ) => {
    return httpClient.get<ProdutoPaginado>(
      produtoRoutes.porProdutosPaginados(nomeLinha, pagina, limite),
    );
  },

  criar: async (nomeLinha: string, novoProduto: Partial<Produto>) => {
    return httpClient.post<Produto>(
      produtoRoutes.porNomeLinha(nomeLinha),
      novoProduto,
    );
  },

  salvarCompleto: async (nomeLinha: string, produtoCompleto: Produto) => {
    return httpClient.put<Produto>(
      produtoRoutes.produtosCompleto(nomeLinha),
      produtoCompleto,
    );
  },

  atualizar: async (
    nomeOriginal: string,
    produtoId: number,
    dadosAtualizados: Partial<Produto>,
  ) => {
    return httpClient.patch<Produto>(
      produtoRoutes.porProdutosID(nomeOriginal, produtoId),
      dadosAtualizados,
    );
  },

  deletar: async (nomeLinha: string, produtoId: number) => {
    return httpClient.delete<{ message: string }>(
      produtoRoutes.porProdutosID(nomeLinha, produtoId),
    );
  },

  restaurar: async (nomeLinha: string, produtoId: number) => {
    return httpClient.patch<{ message: string }>(
      produtoRoutes.restaurarProduto(nomeLinha, produtoId),
    );
  },
};
