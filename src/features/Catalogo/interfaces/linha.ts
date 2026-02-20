import type { Produto } from "./produto";

export interface Linha {
  _id: string;
  linha: string;
  painel_linha: string;
  imagem_linha: string;
  pdf_linha: string;
  deletado: boolean;
  produtos_linha: Produto[];
  __v?: number;
}
