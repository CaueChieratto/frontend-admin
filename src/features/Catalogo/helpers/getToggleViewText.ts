type ViewMode = "linha" | "produto";

export const getToggleViewText = (viewMode: ViewMode, nameLinha: string) => {
  return viewMode === "linha"
    ? `Ver Produtos da Linha ${nameLinha}`
    : `Ver a Linha ${nameLinha}`;
};
