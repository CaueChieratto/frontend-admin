import type { Produto } from "@/features/Catalogo/interfaces/produto";

export const validateProdutosRequiredFields = (
  produtos: Produto,
): { ok: true } | { ok: false; message: string } => {
  if (!produtos.nome_produto?.trim() || !produtos.imagem_produto) {
    return {
      ok: false,
      message: "Preencha os campos: Nome do Produto e Imagem do Produto.",
    };
  }

  const tabelas = produtos.tabelas_produto || [];

  const tabelasAtivas = tabelas.filter((tabela) => !tabela.deletado);

  if (tabelasAtivas.length === 0) {
    return {
      ok: false,
      message: "O produto precisa ter pelo menos uma tabela.",
    };
  }

  for (const tabela of tabelasAtivas) {
    if (tabela.deletado) continue;

    if (!tabela.pn?.trim()) {
      return {
        ok: false,
        message: "Todas as tabelas precisam ter o campo PN preenchido.",
      };
    }

    const dados = tabela.dados || [];
    const dadosAtivos = dados.filter((dado) => !dado.deletado);

    if (dadosAtivos.length === 0) {
      return {
        ok: false,
        message: `A tabela precisa ter pelo menos uma linha de dados (campo).`,
      };
    }

    for (const dado of dados) {
      if (dado.deletado) continue;

      if (!dado.codigo?.trim() || !dado.dn?.trim()) {
        return {
          ok: false,
          message: `Preencha os campos obrigatórios nos dados da tabela.`,
        };
      }
    }
  }

  return { ok: true };
};
