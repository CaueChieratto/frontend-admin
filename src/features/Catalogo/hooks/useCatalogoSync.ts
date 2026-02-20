import { useEffect, useMemo, useRef, useState } from "react";

type ViewMode = "linha" | "produto";

type Args = {
  linhaKey: string;
  viewMode: ViewMode;
  nameLinha: string;
  setNomeLinha: (nome: string) => void;
  setPaginaAtual: (page: number) => void;
  defaultLoad: boolean;
};

export const useCatalogoSync = ({
  linhaKey,
  viewMode,
  nameLinha,
  setNomeLinha,
  setPaginaAtual,
  defaultLoad,
}: Args) => {
  const lastNameLinhaRef = useRef<string>("");
  const [transitionLoading, setTransitionLoading] = useState(false);

  useEffect(() => {
    if (!linhaKey) return;
    if (viewMode !== "produto") return;
    if (!nameLinha) return;

    if (lastNameLinhaRef.current === nameLinha) return;
    lastNameLinhaRef.current = nameLinha;

    const id = requestAnimationFrame(() => setTransitionLoading(true));
    setNomeLinha(nameLinha);
    setPaginaAtual(1);

    return () => cancelAnimationFrame(id);
  }, [linhaKey, viewMode, nameLinha, setNomeLinha, setPaginaAtual]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (viewMode !== "produto" || !defaultLoad) {
        setTransitionLoading(false);
      }
    });

    return () => cancelAnimationFrame(id);
  }, [viewMode, defaultLoad]);

  const cardLoading = useMemo(() => {
    if (viewMode !== "produto") return false;
    return transitionLoading || !!defaultLoad;
  }, [viewMode, transitionLoading, defaultLoad]);

  return { cardLoading };
};
