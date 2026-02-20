import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { httpClient } from "@/services/http/httpClient";
import { linhaRoutes } from "../routes/linhaRoutes";
import { catalogoRoutes } from "@/features/Catalogo/routes/catalogoRoutes";

export const LinhaService = {
  listarResumoLinha: async (pagina = 1, limite = 10) => {
    return httpClient.get<Linha[]>(
      linhaRoutes.paginadaPorLinhas(pagina, limite),
    );
  },

  buscarPorNome: async (nomeLinha: string) => {
    return httpClient.get<Linha>(linhaRoutes.porNomeLinha(nomeLinha));
  },

  listarDeletados: async () => {
    return httpClient.get<Linha[]>(linhaRoutes.deletadosLinha());
  },

  criar: async (novaLinha: Partial<Linha>) => {
    return httpClient.post<Linha>(catalogoRoutes.tudo(), novaLinha);
  },

  atualizar: async (nomeOriginal: string, dadosAtualizados: Partial<Linha>) => {
    return httpClient.patch<Linha>(
      linhaRoutes.porNomeLinha(nomeOriginal),
      dadosAtualizados,
    );
  },

  deletar: async (nomeLinha: string) => {
    return httpClient.patch<{ message: string }>(
      linhaRoutes.deletarLinha(nomeLinha),
    );
  },

  hardDelete: async (nomeLinha: string) => {
    return httpClient.delete<{ message: string }>(
      linhaRoutes.porNomeLinha(nomeLinha),
    );
  },

  restaurar: async (nomeLinha: string) => {
    return httpClient.patch<{ message: string }>(
      linhaRoutes.restaurarLinha(nomeLinha),
    );
  },
};
