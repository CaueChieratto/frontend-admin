import { httpClient } from "@/services/http/httpClient";
import { dadosRoutes } from "../routes/dadosRoutes";
import type { Dados } from "@/features/Catalogo/interfaces/dados";

export const DadosService = {
  listar: async (nomeLinha: string, produtoId: number, tabelaId: number) => {
    return httpClient.get<Dados[]>(
      dadosRoutes.porDados(nomeLinha, produtoId, tabelaId),
    );
  },

  adicionar: async (
    nomeLinha: string,
    produtoId: number,
    tabelaId: number,
    novosDados: Dados,
  ) => {
    return httpClient.put<Dados>(
      dadosRoutes.porDados(nomeLinha, produtoId, tabelaId),
      novosDados,
    );
  },

  atualizar: async (
    nomeLinha: string,
    produtoId: number,
    tabelaId: number,
    codigoOriginal: string,
    dadosAtualizados: Partial<Dados>,
  ) => {
    return httpClient.patch<Dados>(
      dadosRoutes.porCodigo(nomeLinha, produtoId, tabelaId, codigoOriginal),
      dadosAtualizados,
    );
  },

  deletar: async (
    nomeLinha: string,
    produtoId: number,
    tabelaId: number,
    codigo: string,
  ) => {
    return httpClient.patch<{ message: string }>(
      dadosRoutes.deletarDados(nomeLinha, produtoId, tabelaId, codigo),
    );
  },

  restaurar: async (
    nomeLinha: string,
    produtoId: number,
    tabelaId: number,
    codigo: string,
  ) => {
    return httpClient.patch<{ message: string }>(
      dadosRoutes.restaurarDados(nomeLinha, produtoId, tabelaId, codigo),
    );
  },
};
