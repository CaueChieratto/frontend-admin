import type { Tabela } from "./tabela";

export interface Produto {
  produto_id: number;
  nome_produto: string;
  imagem_produto: string;
  imagem_patente: string;
  pdf_produto: string;
  descricao_produto: string;
  deletado: boolean;
  tabelas_produto: Tabela[];
  _id: string;
}
