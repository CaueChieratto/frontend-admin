import { HeaderProdutos } from "./components/HeaderProdutos";
import { MainProdutos } from "./components/MainProdutos";
import { BottomProdutos } from "./components/BottomProdutos";
import type { Produto } from "@/features/Catalogo/interfaces/produto";
import { type Dispatch, type SetStateAction } from "react";

type MenuProdutosProps = {
  nameLinha: string;
  produtos: Produto[];
  produtosPaginados: Produto[];
  paginaAtual: number;
  totalPaginas: number;
  setPaginaAtual: Dispatch<SetStateAction<number>>;
  produtoSelecionadoId: number | null;
  toggleProduto: (id: number) => void;
  newProduto: () => void;
};

export const MenuProdutos = ({
  nameLinha,
  produtos,
  produtosPaginados,
  paginaAtual,
  totalPaginas,
  setPaginaAtual,
  produtoSelecionadoId,
  toggleProduto,
  newProduto,
}: MenuProdutosProps) => {
  return (
    <>
      <HeaderProdutos nameLinha={nameLinha} produtos={produtos} />
      <MainProdutos
        produtosPaginados={produtosPaginados}
        produtoSelecionadoId={produtoSelecionadoId}
        toggleProduto={toggleProduto}
      />
      <BottomProdutos
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        setPaginaAtual={setPaginaAtual}
        newProduto={newProduto}
      />
    </>
  );
};
