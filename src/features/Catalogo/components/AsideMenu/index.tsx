import { LinhaItem } from "./components/LinhaItem";
import Styles from "./asideMenu.module.css";
import { SideBarHeader } from "./components/SidebarHeader";
import { Button } from "@/ui/Button";
import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { formatarNomeDaLinha } from "@utils/formatters";
import { Card } from "@ui/Card";
import { SearchPagination } from "@/components/SearchPagination";
import { useState } from "react";
import { useModal } from "@/providers/ModalProvider/useModal";
import { useMenuLinhas } from "../MainMenu/Linhas/hooks/useMenuLinhas";

const LINHA_VAZIA = {} as Linha;
interface AsideMenuProps {
  linhas: Linha[];
  deletedLinhas: Linha[];
  linhaSelecionada: string | null;
  onSelecionarLinha: (id: string) => void;
  addNewLinha: () => void;
  toggleDeletedMode: () => void;
  isDeleted: boolean;
  reloading: () => void;
  resetView: () => void;
}

export const AsideMenu = ({
  linhas,
  deletedLinhas,
  linhaSelecionada,
  onSelecionarLinha,
  addNewLinha,
  // toggleDeletedMode,
  isDeleted,
  reloading,
  resetView,
}: AsideMenuProps) => {
  const { openModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const linhasToShow = isDeleted ? deletedLinhas : linhas;

  const totalPages = Math.ceil(linhasToShow.length / ITEMS_PER_PAGE);

  const currentLinhas = linhasToShow.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const newLinha = () => {
    resetView();
    addNewLinha();
  };

  const linhaBase = currentLinhas[0] ?? (linhasToShow[0] as Linha | undefined);

  const { updateSelectedLinha, restoreLinha } = useMenuLinhas(
    linhaBase ?? LINHA_VAZIA,
  );

  // const deletedMode = () => {
  //   setCurrentPage(1);
  //   toggleDeletedMode();
  // };

  const onPermanentlyDelete = (linha: Linha) => {
    const formatedName = formatarNomeDaLinha(linha.linha);

    openModal({
      id: "permanently",
      payload: {
        title: "Excluir Permanentemente?",
        content: <>Deseja excluir permanentemente {formatedName}?</>,
        confirmText: "Excluir",
        cancelText: "Cancelar",
        closeOnBackdrop: false,
        onConfirm: async () => {
          updateSelectedLinha(linha);
          await console.log("oi");
          await reloading();
        },
      },
    });
  };

  const onRestore = (linha: Linha) => {
    const formatedName = formatarNomeDaLinha(linha.linha);

    openModal({
      id: "restore",
      payload: {
        title: "Restaurar Linha?",
        content: <>Deseja restaurar {formatedName}?</>,
        confirmText: "Restaurar",
        cancelText: "Cancelar",
        closeOnBackdrop: false,
        onConfirm: async () => {
          updateSelectedLinha(linha);
          await restoreLinha();
          await reloading();
        },
      },
    });
  };

  return (
    <Card aside>
      <SideBarHeader />

      {!isDeleted ? (
        <h1 className={Styles.title}>Linhas Disponíveis</h1>
      ) : (
        <h1 className={Styles.title}>Linhas Deletadas</h1>
      )}

      <div className={Styles.listaLinhas}>
        {currentLinhas.map((linha) => {
          const formatedName = formatarNomeDaLinha(linha.linha);

          return (
            <LinhaItem
              onRestore={isDeleted ? () => onRestore(linha) : undefined}
              onPermanentlyDelete={
                isDeleted ? () => onPermanentlyDelete(linha) : undefined
              }
              linha={linha}
              isDeleted={isDeleted}
              key={linha._id}
              linhaName={formatedName}
              ativo={linhaSelecionada === linha._id}
              onClick={() => onSelecionarLinha(linha._id)}
            />
          );
        })}
      </div>
      <SearchPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <div className={Styles.container_buttons}>
        {!isDeleted && (
          <Button
            text="Adicionar Linha"
            color="var(--green)"
            onClick={newLinha}
          />
        )}

        {/* {deletedLinhas.length > 0 && (
          <Button
            text={!isDeleted ? "Ver Linhas Deletadas" : "Ver Linhas"}
            color={!isDeleted ? "transparent" : "var(--green)"}
            border={!isDeleted ? "1px solid var(--red)" : ""}
            fontColor={!isDeleted ? "var(--red)" : ""}
            onClick={deletedMode}
          />
        )} */}
      </div>
    </Card>
  );
};
