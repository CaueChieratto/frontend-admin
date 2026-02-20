import type { Produto } from "@/features/Catalogo/interfaces/produto";

type UploadField = "imagem_produto" | "pdf_produto";

type Args = {
  produto: Produto;
  pendingUploads: Record<UploadField, File | undefined>;
  upload: (file: File) => Promise<string>;
};

export const uploadProductFiles = async ({
  produto,
  pendingUploads,
  upload,
}: Args) => {
  const dadosParaSalvar: Produto = { ...produto };
  const fields: UploadField[] = ["imagem_produto", "pdf_produto"];

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
