import type { Linha } from "@/features/Catalogo/interfaces/linha";

export const validateLinhaRequiredFields = (
  linha: Linha,
): { ok: true } | { ok: false; message: string } => {
  if (
    !linha.linha?.trim() ||
    !linha.imagem_linha ||
    !linha.painel_linha ||
    !linha.pdf_linha
  ) {
    return {
      ok: false,
      message:
        "Preencha os campos: Nome da Linha, Imagem da Linha, Painel da Linha e PDF com o Catálogo da Linha.",
    };
  }

  return { ok: true };
};
