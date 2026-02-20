import type { Dados } from "./dados";

export interface Tabela {
  tabela_id: number;
  pn: string;
  deletado: boolean;
  dados: Dados[];
  _id: string;
}
