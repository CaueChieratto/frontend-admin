import { LinhaTitle } from "./components/LinhaTitle";
import { LinhaSection } from "./components/LinhaSection";
import { useMenuLinhas } from "./hooks/useMenuLinhas";
import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { useModal } from "@/providers/ModalProvider/useModal";
import { useLinhaModals } from "./hooks/useLinhaModals";

type MenuLinhasProps = {
  linha: Linha;
  reloading?: () => void;
  unselectLinha?: () => void;
  defaultLoad?: boolean;
};

export const MenuLinhas = ({
  linha,
  reloading,
  unselectLinha,
  defaultLoad,
}: MenuLinhasProps) => {
  const modal = useModal();

  const {
    selectedLinha,
    isSaving,
    formatedName,
    updateSelectedLinha,
    fileSelect,
    saveAll,
    deleteLinha,
  } = useMenuLinhas(linha);

  const { confirmDelete, showSaveSuccess, showSaveError } = useLinhaModals(
    modal.openModal,
  );

  const onDelete = () => {
    confirmDelete({
      formatedName,
      onConfirm: async () => {
        await deleteLinha();
        await reloading?.();
      },
    });
  };

  const onSave = async () => {
    try {
      const result = await saveAll();

      showSaveSuccess({
        result,
        onConfirm: async () => {
          await reloading?.();
          unselectLinha?.();
        },
      });
    } catch (error) {
      showSaveError(error);
    }
  };

  return (
    <>
      <LinhaTitle
        key={selectedLinha._id || "nova-linha"}
        linhaName={formatedName}
        deleted={selectedLinha.deletado}
        updateLinha={updateSelectedLinha}
        onDelete={onDelete}
        isSaving={isSaving}
        saveAll={onSave}
        defaultLoad={defaultLoad}
        isNew={!selectedLinha._id}
      />

      <LinhaSection
        linhaName={formatedName}
        imagemLinha={selectedLinha.imagem_linha}
        painelLinha={selectedLinha.painel_linha}
        linhaPdf={selectedLinha.pdf_linha}
        fileSelect={fileSelect}
      />
    </>
  );
};
