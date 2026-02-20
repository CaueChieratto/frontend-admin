import type { Produto } from "@/features/Catalogo/interfaces/produto";

export type UploadField = "imagem_produto" | "pdf_produto";

export type PendingUploads = Record<UploadField, File | undefined>;

export type SaveResult = "created" | "updated";

export type ProductState = Produto;
