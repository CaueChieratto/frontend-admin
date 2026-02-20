import { Button } from "@/ui/Button";
import { SearchPagination } from "@/components/SearchPagination";
import Styles from "./BottomProdutos.module.css";
import type { Dispatch, SetStateAction } from "react";

type BottomProdutosProps = {
  paginaAtual: number;
  totalPaginas: number;
  setPaginaAtual: Dispatch<SetStateAction<number>>;
  newProduto: () => void;
};

export const BottomProdutos = ({
  paginaAtual,
  setPaginaAtual,
  totalPaginas,
  newProduto,
}: BottomProdutosProps) => {
  return (
    <div className={Styles.buttons}>
      <SearchPagination
        currentPage={paginaAtual}
        totalPages={totalPaginas}
        onPageChange={setPaginaAtual}
      />
      <div className={Styles.container_button}>
        <Button
          text="Adicionar Novo Produto"
          color="var(--green)"
          onClick={newProduto}
        />
      </div>
    </div>
  );
};
