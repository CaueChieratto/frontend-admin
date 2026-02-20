import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { httpClient } from "@/services/http/httpClient";
import { catalogoRoutes } from "../routes/catalogoRoutes";

export const CatalogoService = {
  listarCatalogo: async () => {
    return httpClient.get<Linha[]>(catalogoRoutes.tudo());
  },
};
