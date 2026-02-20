import type { Linha } from "@/features/Catalogo/interfaces/linha";

export type LinhaPersistenceAction = "created" | "updated";

export const getLinhaPersistenceAction = (
  linha: Linha,
): LinhaPersistenceAction => {
  return linha._id ? "updated" : "created";
};
