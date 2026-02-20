import type { Tabela } from "@/features/Catalogo/interfaces/tabela";
import { getDadosExtra } from "@/features/Catalogo/helpers/getDadosExtra";

export const hasTabelaDadosExtra = (tabela: Tabela): boolean => {
  return tabela.dados.some((dado) => Boolean(getDadosExtra(dado)));
};
