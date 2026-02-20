import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { useMemo, useState } from "react";
import { NOVA_LINHA_TEMPLATE } from "../components/MainMenu/Linhas/constants/linhaTemplate";

export function useSelection(catalogo: Linha[], deletedLinhas: Linha[]) {
  const [selectedLinhaId, setSelectedLinhaId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isDeletedInternal, setIsDeletedInternal] = useState(false);

  const hasDeleted = deletedLinhas.length > 0;

  const isDeleted = isDeletedInternal && hasDeleted;

  const resetSelection = () => {
    setIsCreatingNew(false);
    setSelectedLinhaId(null);
  };

  const selectLinha = (id: string) => {
    setIsCreatingNew(false);
    setSelectedLinhaId((prev) => (prev === id ? null : id));
  };

  const unselectLinha = () => {
    resetSelection();
  };

  const startCreateLinha = () => {
    setIsCreatingNew(true);
    setSelectedLinhaId(null);
  };

  const toggleDeletedMode = () => {
    if (!hasDeleted && !isDeletedInternal) return;

    setIsDeletedInternal((prev) => !prev);
    resetSelection();
  };

  const linhaSelect = useMemo(() => {
    if (isCreatingNew) return NOVA_LINHA_TEMPLATE;
    return catalogo.find((linha) => linha._id === selectedLinhaId);
  }, [catalogo, selectedLinhaId, isCreatingNew]);

  return {
    linhaSelect,
    selectedLinhaId,
    isDeleted,
    selectLinha,
    unselectLinha,
    startCreateLinha,
    toggleDeletedMode,
  };
}
