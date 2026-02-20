import Styles from "./MainContent.module.css";
import { MenuLinhas } from "@features/Catalogo/components/MainMenu/Linhas";
import { MenuProdutos } from "@features/Catalogo/components/MainMenu/Produtos";
import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { formatarNomeDaLinha } from "@utils/formatters";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { useMemo } from "react";
import { useProdutos } from "@features/Catalogo/components/MainMenu/Produtos/hooks/useProdutos";
import { useCatalogoSync } from "../hooks/useCatalogoSync";
import { getToggleViewText } from "../helpers/getToggleViewText";
import { useProdutoSelecionado } from "./useProdutoSelecionado";
import { BottomMenu } from "../components/BottomMenu";

type ViewMode = "linha" | "produto";

type MainContentProps = {
  linha: Linha | undefined;
  reloading: () => void;
  viewMode: ViewMode;
  switchView: () => void;
  unselectLinha: () => void;
  defaultLoad?: boolean;
};

export function MainContent({
  linha,
  reloading,
  viewMode,
  switchView,
  unselectLinha,
  defaultLoad,
}: MainContentProps) {
  const linhaKey = useMemo(() => {
    if (!linha) return "";
    return linha._id ? `id:${linha._id}` : `nome:${linha.linha}`;
  }, [linha]);

  const nameLinha = useMemo(() => {
    if (!linha) return "";
    return formatarNomeDaLinha(linha.linha);
  }, [linha]);

  const produtosState = useProdutos();

  const { cardLoading } = useCatalogoSync({
    linhaKey,
    viewMode,
    nameLinha,
    setNomeLinha: produtosState.setNomeLinha,
    setPaginaAtual: produtosState.setPaginaAtual,
    defaultLoad: produtosState.defaultLoad,
  });

  const {
    produtoSelecionadoId,
    produtoSelecionado,
    toggleProduto,
    resetProdutoSelecionado,
    newProduto,
  } = useProdutoSelecionado(produtosState.produtos);

  if (!linha) return null;

  const isNewLinha = !linha._id;

  const switchingView = () => {
    switchView();
    resetProdutoSelecionado();
  };

  const productSaveSuccess = async () => {
    resetProdutoSelecionado();
    await produtosState.reloading();
  };

  const content =
    viewMode === "linha" ? (
      <MenuLinhas
        linha={linha}
        reloading={reloading}
        unselectLinha={unselectLinha}
        defaultLoad={defaultLoad}
      />
    ) : (
      <MenuProdutos
        newProduto={newProduto}
        produtoSelecionadoId={produtoSelecionadoId}
        toggleProduto={toggleProduto}
        nameLinha={nameLinha}
        produtos={isNewLinha ? [] : produtosState.produtos}
        produtosPaginados={isNewLinha ? [] : produtosState.produtosPaginados}
        paginaAtual={produtosState.paginaAtual}
        totalPaginas={produtosState.totalPaginas}
        setPaginaAtual={produtosState.setPaginaAtual}
      />
    );

  return (
    <main className={Styles.container}>
      <Card isProduto={viewMode === "produto"} isLoading={cardLoading}>
        {content}
      </Card>

      <div>
        <Button
          text={getToggleViewText(viewMode, nameLinha)}
          color="var(--green)"
          onClick={switchingView}
        />
      </div>

      {produtoSelecionado && (
        <Card>
          <BottomMenu
            key={produtoSelecionado.produto_id}
            produto={produtoSelecionado}
            nameLinha={nameLinha}
            onSaveSuccess={productSaveSuccess}
          />
        </Card>
      )}
    </main>
  );
}
