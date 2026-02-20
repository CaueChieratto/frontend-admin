import type { Produto } from "@/features/Catalogo/interfaces/produto";
import { LinhaTitle } from "../../../Linhas/components/LinhaTitle";
import Styles from "./HeaderProdutos.module.css";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

type HeaderProdutosProps = {
  nameLinha: string;
  produtos: Produto[];
  isDeletedMode?: Produto[];
  onToggle?: () => void;
};

export const HeaderProdutos = ({
  nameLinha,
  produtos,
  isDeletedMode,
  onToggle,
}: HeaderProdutosProps) => {
  const label = !isDeletedMode ? "Produtos Disponíveis" : "Produtos Deletados";

  const produtosToShow = produtos ? produtos.length : isDeletedMode?.length;

  return (
    <div className={Styles.container_title}>
      <LinhaTitle isProduto linhaName={nameLinha} />
      <div className={Styles.produto_quantity_container}>
        <p
          className={Styles.produto_quantity}
          style={
            !isDeletedMode ? { color: "var(--green)" } : { color: "var(--red)" }
          }
        >
          {produtosToShow} {label}
        </p>
        <div
          className={Styles.icon}
          style={
            !isDeletedMode ? { color: "var(--green)" } : { color: "var(--red)" }
          }
          onClick={onToggle}
        >
          <HiOutlineSwitchHorizontal size={30} />
        </div>
      </div>
    </div>
  );
};
