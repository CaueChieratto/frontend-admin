import type { Produto } from "@/features/Catalogo/interfaces/produto";
import Styles from "./MainProdutos.module.css";

type MainProdutosProps = {
  produtosPaginados: Produto[];
  produtoSelecionadoId: number | null;
  toggleProduto: (id: number) => void;
};

export const MainProdutos = ({
  produtosPaginados,
  produtoSelecionadoId,
  toggleProduto,
}: MainProdutosProps) => {
  return (
    <main className={Styles.container}>
      {produtosPaginados.map((produto) => {
        const isSelected = Number(produtoSelecionadoId) === produto.produto_id;
        if (produto.deletado === true) return null;

        return (
          <button
            className={`${Styles.container_produto} ${isSelected ? Styles.selected : ""}`}
            onClick={() => toggleProduto(produto.produto_id)}
            key={produto.produto_id}
          >
            <div className={Styles.container_image}>
              <img src={produto.imagem_produto} className={Styles.image} />
            </div>
            <h1 className={Styles.name}>{produto.nome_produto}</h1>
          </button>
        );
      })}
    </main>
  );
};
