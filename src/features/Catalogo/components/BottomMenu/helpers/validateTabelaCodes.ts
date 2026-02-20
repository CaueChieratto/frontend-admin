import type { Tabela } from "@/features/Catalogo/interfaces/tabela";

export function validateDuplicateCodes(tabelas: Tabela[]): string | null {
  const codes = new Set<string>();

  for (const tabela of tabelas ?? []) {
    for (const dado of tabela.dados ?? []) {
      if (!dado.codigo) continue;

      if (codes.has(dado.codigo)) {
        return dado.codigo;
      }

      codes.add(dado.codigo);
    }
  }

  return null;
}
