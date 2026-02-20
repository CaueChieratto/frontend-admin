import type { Linha } from "@/features/Catalogo/interfaces/linha";

type UploadField = "imagem_linha" | "painel_linha" | "pdf_linha";

type Args = {
  linha: Linha;
  pendingUploads: Record<UploadField, File | undefined>;
  upload: (file: File) => Promise<string>;
};

export const uploadPendingFiles = async ({
  linha,
  pendingUploads,
  upload,
}: Args) => {
  const dadosParaSalvar: Linha = { ...linha };

  const fields: UploadField[] = ["imagem_linha", "painel_linha", "pdf_linha"];

  await Promise.all(
    fields.map(async (field) => {
      const file = pendingUploads[field];
      if (!file) return;

      const url = await upload(file);
      dadosParaSalvar[field] = url;
    }),
  );

  return dadosParaSalvar;
};
