import { useState, useEffect, useCallback, useRef } from "react";
import type { Linha } from "@/features/Catalogo/interfaces/linha";
import { LinhaService } from "./linhaService";

export const useLinhas = () => {
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [deletedLinhas, setDeletedLinhas] = useState<Linha[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [defaultLoad, setDefaultLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef(true);
  const firstLoadRef = useRef(true);

  const loadingLinhas = useCallback(async () => {
    try {
      setError(null);

      if (firstLoadRef.current) {
        setInitialLoad(true);
      } else {
        setDefaultLoad(true);
      }

      const [linhasAtivasRaw, deletadasRaw] = await Promise.all([
        LinhaService.listarResumoLinha(),
        LinhaService.listarDeletados(),
      ]);

      const linhasAtivas = linhasAtivasRaw.filter((l) => !l.deletado);
      const deletadas = deletadasRaw.filter((l) => l.deletado);

      if (!mountedRef.current) return;

      setLinhas(linhasAtivas);
      setDeletedLinhas(deletadas);
    } catch (err) {
      console.error("Erro ao carregar catálogo:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setInitialLoad(false);
      setDefaultLoad(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    loadingLinhas();
    return () => {
      mountedRef.current = false;
    };
  }, [loadingLinhas]);
  return {
    linhas,
    deletedLinhas,
    initialLoad,
    defaultLoad,
    error,
    reloading: loadingLinhas,
  };
};
