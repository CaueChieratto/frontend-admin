import type { Produto } from "@/features/Catalogo/interfaces/produto";
import { UploadService } from "@/services/upload/uploadService";
import { CodigoExistenteError } from "../errors/CodigoExistenteError";
import { ProdutoService } from "@/features/Catalogo/components/MainMenu/Produtos/hooks/produtoService";
import { uploadProductFiles } from "../../../helpers/uploadProductFiles";
import type { PendingUploads } from "../types/useProductEditor";

type SaveProductWithRelationsParams = {
  produtoOriginal: Produto;
  produtoAtualizado: Produto;
  pendingUploads: PendingUploads;
  nameLinha: string;
};

type ApiErrorShape = {
  message?: string;
  response?: {
    data?: {
      erro?: string;
      codigo?: string;
    };
  };
};

const extractApiErrorInfo = (
  error: unknown,
): { errorMessage: string; codigoDuplicado?: string } => {
  if (typeof error === "object" && error !== null) {
    const typedError = error as ApiErrorShape;

    const errorMessageFromApi = typedError.response?.data?.erro;
    const codigoDuplicado = typedError.response?.data?.codigo;

    if (errorMessageFromApi) {
      return { errorMessage: errorMessageFromApi, codigoDuplicado };
    }

    if (typeof typedError.message === "string") {
      return { errorMessage: typedError.message, codigoDuplicado };
    }
  }

  return {
    errorMessage: String(error),
    codigoDuplicado: undefined,
  };
};

export const saveProductWithRelations = async ({
  produtoAtualizado,
  pendingUploads,
  nameLinha,
}: SaveProductWithRelationsParams): Promise<void> => {
  const dadosParaSalvar = await uploadProductFiles({
    produto: produtoAtualizado,
    pendingUploads,
    upload: UploadService.upload,
  });

  try {
    await ProdutoService.salvarCompleto(nameLinha, dadosParaSalvar);
  } catch (error: unknown) {
    const { errorMessage, codigoDuplicado } = extractApiErrorInfo(error);

    if (
      errorMessage === "Esse código está sendo utilizado!" ||
      errorMessage.includes("CODIGO_JA_EXISTENTE")
    ) {
      throw new CodigoExistenteError(codigoDuplicado ?? "desconhecido");
    }

    throw error;
  }
};
