export function buildLinhaLabels(params: {
  linhaName: string;
  imagemLinha?: string;
  painelLinha?: string;
}) {
  const { linhaName, imagemLinha, painelLinha } = params;

  const imagemPrefix = imagemLinha ? "" : "Adicionar";
  const painelPrefix = painelLinha ? "" : "Adicionar";

  return {
    imagemLabel: `${imagemPrefix} Imagem da linha ${linhaName}`,
    painelLabel: `${painelPrefix} Painel da linha ${linhaName}`,
  };
}
