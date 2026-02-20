import type { Produto } from "@/features/Catalogo/interfaces/produto";

export interface ProdutoPaginado {
  total: number;
  pagina: number;
  total_paginas: number;
  produtos: Produto[];
}
