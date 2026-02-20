import { useCallback, useEffect, useMemo, useState } from "react";
import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { formatarNomeDaLinha } from "@utils/formatters";
import { UploadService } from "@/services/upload/uploadService";
import { validateLinhaRequiredFields } from "../validators/validateLinhaRequiredFields";
import { uploadPendingFiles } from "../helpers/uploadPendingFiles";
import { LinhaService } from "./linhaService";
import { getLinhaPersistenceAction } from "../helpers/getLinhaPersistenceAction";

type UploadField = "imagem_linha" | "painel_linha" | "pdf_linha";

type PendingUploads = Record<UploadField, File | undefined>;

const createEmptyPendingUploads = (): PendingUploads => ({
  imagem_linha: undefined,
  painel_linha: undefined,
  pdf_linha: undefined,
});

export const useMenuLinhas = (linha: Linha) => {
  const [selectedLinha, setSelectedLinha] = useState<Linha>(linha);
  const [pendingUploads, setPendingUploads] = useState<PendingUploads>(
    createEmptyPendingUploads(),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const formattedName = useMemo(
    () => formatarNomeDaLinha(selectedLinha.linha),
    [selectedLinha.linha],
  );

  const originalFormattedName = useMemo(() => {
    if (!linha._id) return "";
    return formatarNomeDaLinha(linha.linha);
  }, [linha._id, linha.linha]);

  useEffect(() => {
    setSelectedLinha(linha);
    setPendingUploads(createEmptyPendingUploads());
  }, [linha]);

  const updateSelectedLinha = useCallback((updates: Partial<Linha>) => {
    setSelectedLinha((prev) => ({ ...prev, ...updates }));
  }, []);

  const fileSelect = useCallback(
    (file: File, field: UploadField) => {
      const previewUrl = URL.createObjectURL(file);

      setPendingUploads((prev) => ({ ...prev, [field]: file }));
      updateSelectedLinha({ [field]: previewUrl });
    },
    [updateSelectedLinha],
  );

  const saveAll = useCallback(async () => {
    const validation = validateLinhaRequiredFields(selectedLinha);
    if (!validation.ok) {
      throw new Error(validation.message);
    }

    setIsSaving(true);
    try {
      const dadosParaSalvar = await uploadPendingFiles({
        linha: selectedLinha,
        pendingUploads,
        upload: UploadService.upload,
      });

      const action = getLinhaPersistenceAction(dadosParaSalvar);

      if (action === "created") {
        await LinhaService.criar(dadosParaSalvar);
        return "created" as const;
      }

      await LinhaService.atualizar(originalFormattedName, dadosParaSalvar);
      return "updated" as const;
    } finally {
      setIsSaving(false);
    }
  }, [pendingUploads, originalFormattedName, selectedLinha]);

  const deleteLinha = useCallback(async () => {
    if (!selectedLinha._id) return;
    await LinhaService.hardDelete(originalFormattedName);
  }, [originalFormattedName, selectedLinha._id]);

  const restoreLinha = useCallback(async () => {
    if (!selectedLinha._id) return;

    setIsRestoring(true);
    try {
      await LinhaService.restaurar(originalFormattedName);
    } finally {
      setIsRestoring(false);
    }
  }, [originalFormattedName, selectedLinha._id]);

  return {
    selectedLinha,
    isSaving,
    isRestoring,
    formatedName: formattedName,
    updateSelectedLinha,
    saveAll,
    deleteLinha,
    fileSelect,
    restoreLinha,
  };
};
