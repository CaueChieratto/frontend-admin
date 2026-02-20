import { useMemo } from "react";
import type { Produto } from "../../interfaces/produto";
import Styles from "./BottomMenu.module.css";
import { DefaultLoader } from "@/ui/uiverse/Loaders/DefaultLoader";
import { getProdutoParaExibir } from "./helpers/getProdutoParaExibir";
import { useProdutoDetalhes } from "./hooks/useProdutoDetalhes";
import { BottomMenuReady } from "./ui/BottomMenuReady";

type BottomMenuProps = {
  produto: Produto;
  nameLinha: string;
  onSaveSuccess: () => void;
};

export const BottomMenu = ({
  produto,
  nameLinha,
  onSaveSuccess,
}: BottomMenuProps) => {
  const { produto: fetchedProduto, isLoading } = useProdutoDetalhes({
    nameLinha,
    produtoId: produto.produto_id,
  });

  const produtoParaExibir = useMemo(
    () =>
      getProdutoParaExibir({
        produtoBase: produto,
        fetchedProduto,
      }),
    [produto, fetchedProduto],
  );

  if (isLoading) {
    return (
      <div className={Styles.loader_container}>
        <DefaultLoader inCard />
      </div>
    );
  }

  if (!produtoParaExibir) return null;

  return (
    <BottomMenuReady
      produto={produtoParaExibir}
      nameLinha={nameLinha}
      onSaveSuccess={onSaveSuccess}
    />
  );
};
