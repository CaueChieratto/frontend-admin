import { useEffect } from "react";

export const useMenuProdutos = (
  nameLinha: string,
  setNomeLinha: (nameLinha: string) => void,
) => {
  useEffect(() => {
    if (nameLinha) {
      setNomeLinha(nameLinha);
    }
  }, [setNomeLinha, nameLinha]);
};
