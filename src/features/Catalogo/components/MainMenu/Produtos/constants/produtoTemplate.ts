import type { Produto } from "@/features/Catalogo/interfaces/produto";

export const NOVO_PRODUTO_TEMPLATE: Produto = {
  produto_id: 0,
  _id: "",
  nome_produto: "",
  imagem_produto: "",
  imagem_patente: "",
  pdf_produto: "",
  descricao_produto: "",
  deletado: false,
  tabelas_produto: [
    {
      tabela_id: 0,
      pn: "",
      deletado: false,
      dados: [],
      _id: "",
    },
  ],
};
