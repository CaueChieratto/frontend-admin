import Styles from "./Catalogo.module.css";
import { AsideMenu } from "./components/AsideMenu";
import { MainContent } from "./layout/MainContent";
import { DefaultLoader } from "@/ui/uiverse/Loaders/DefaultLoader";
import { useState } from "react";
import { useSelection } from "./hooks/useSelection";
import type { Linha } from "@/features/Catalogo/interfaces/linha";

type ViewMode = "linha" | "produto";

type CatalogoProps = {
  linhas: Linha[];
  deletedLinhas: Linha[];
  defaultLoad: boolean;
  reloading: () => Promise<void> | void;
  error: string | null;
};

export const Catalogo = ({
  linhas,
  deletedLinhas,
  defaultLoad,
  reloading,
}: CatalogoProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("linha");

  const {
    linhaSelect,
    selectedLinhaId,
    selectLinha,
    unselectLinha,
    startCreateLinha,
    toggleDeletedMode,
    isDeleted,
  } = useSelection(linhas, deletedLinhas);

  const switchView = () => {
    setViewMode((viewMode) => (viewMode === "linha" ? "produto" : "linha"));
  };

  const resetView = () => {
    setViewMode("linha");
  };

  if (defaultLoad) {
    return <DefaultLoader />;
  }

  return (
    <div className={Styles.container}>
      <AsideMenu
        reloading={reloading}
        linhas={linhas}
        deletedLinhas={deletedLinhas}
        linhaSelecionada={selectedLinhaId}
        onSelecionarLinha={selectLinha}
        addNewLinha={startCreateLinha}
        toggleDeletedMode={toggleDeletedMode}
        isDeleted={isDeleted}
        resetView={resetView}
      />

      <MainContent
        linha={linhaSelect}
        reloading={reloading}
        viewMode={viewMode}
        switchView={switchView}
        unselectLinha={unselectLinha}
        defaultLoad={defaultLoad}
      />
    </div>
  );
};
