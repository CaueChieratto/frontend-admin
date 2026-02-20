import { useState, useEffect, useCallback, useRef } from "react";
import { ProdutoService } from "./produtoService";
import type { Produto } from "@/features/Catalogo/interfaces/produto";

export const useProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosPaginados, setProdutosPaginadas] = useState<Produto[]>([]);
  const [nomeLinha, setNomeLinha] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [defaultLoad, setDefaultLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef(true);

  const loadingProdutos = useCallback(async () => {
    if (!nomeLinha) {
      setProdutosPaginadas([]);
      setProdutos([]);
      setDefaultLoad(false);
      return;
    }

    try {
      setDefaultLoad(true);
      setError(null);

      const respostaApi = await ProdutoService.listarProdutosPaginados(
        nomeLinha,
        paginaAtual,
      );

      const produtosLinha = await ProdutoService.buscarProdutosLinha(nomeLinha);

      if (!mountedRef.current) return;

      setProdutosPaginadas(respostaApi.produtos);
      setProdutos(produtosLinha);
      setTotalPaginas(respostaApi.total_paginas);
    } catch (err) {
      console.error("Erro ao carregar catálogo:", err);

      if (!mountedRef.current) return;

      setError(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado.",
      );
    } finally {
      if (mountedRef.current) setDefaultLoad(false);
    }
  }, [nomeLinha, paginaAtual]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [nomeLinha]);

  useEffect(() => {
    mountedRef.current = true;
    loadingProdutos();

    return () => {
      mountedRef.current = false;
    };
  }, [loadingProdutos]);

  return {
    produtos,
    produtosPaginados,
    setNomeLinha,
    paginaAtual,
    totalPaginas,
    setPaginaAtual,
    defaultLoad,
    error,
    reloading: loadingProdutos,
  };
};
