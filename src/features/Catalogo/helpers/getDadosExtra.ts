import type { Tabela } from "@/features/Catalogo/interfaces/tabela";

type Dado = Tabela["dados"][number];

export const getDadosExtra = (dado: Dado) => {
  return (dado.de, dado.esp, dado.comp, dado.peso);
};
