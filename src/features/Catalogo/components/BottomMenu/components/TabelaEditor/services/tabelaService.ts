import { httpClient } from "@/services/http/httpClient";
import { tabelaRoutes } from "../routes/tabelaRoutes";
import type { Tabela } from "@/features/Catalogo/interfaces/tabela";

export const TabelaService = {
  listar: async (nomeLinha: string, produtoId: number) => {
    return httpClient.get<Tabela[]>(
      tabelaRoutes.porTabela(nomeLinha, produtoId),
    );
  },

  buscarPorId: async (
    nomeLinha: string,
    produtoId: number,
    tabelaId: number,
  ) => {
    return httpClient.get<Tabela>(
      tabelaRoutes.porTabelaId(nomeLinha, produtoId, tabelaId),
    );
  },

  criar: async (nomeLinha: string, produtoId: number, pn: string) => {
    return httpClient.post<Tabela>(
      tabelaRoutes.porTabela(nomeLinha, produtoId),
      { pn },
    );
  },

  atualizar: async (
    nomeLinha: string,
    produtoId: number,
    tabelaId: number,
    dadosAtualizados: Partial<Tabela>,
  ) => {
    return httpClient.patch<Tabela>(
      tabelaRoutes.porTabelaId(nomeLinha, produtoId, tabelaId),
      dadosAtualizados,
    );
  },

  deletar: async (nomeLinha: string, produtoId: number, tabelaId: number) => {
    return httpClient.patch<{ message: string }>(
      tabelaRoutes.deletarTabela(nomeLinha, produtoId, tabelaId),
    );
  },

  restaurar: async (nomeLinha: string, produtoId: number, tabelaId: number) => {
    return httpClient.patch<{ message: string }>(
      tabelaRoutes.restaurarTabela(nomeLinha, produtoId, tabelaId),
    );
  },
};
