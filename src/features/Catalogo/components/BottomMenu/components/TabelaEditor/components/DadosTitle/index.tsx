import { hasTabelaDadosExtra } from "@/features/Catalogo/helpers/hasTabelaDadosExtra";
import Styles from "./DadosTitle.module.css";
import type { Tabela } from "@/features/Catalogo/interfaces/tabela";

type DadosTitleProps = {
  tabela: Tabela;
};

export const DadosTitle = ({ tabela }: DadosTitleProps) => {
  const shouldHiddenDadoExtra = hasTabelaDadosExtra(tabela);

  return (
    <div
      className={
        shouldHiddenDadoExtra
          ? Styles.container_dados_extra
          : Styles.container_dados
      }
    >
      <h1 className={Styles.dados}>DN</h1>
      {!shouldHiddenDadoExtra && <h1 className={Styles.dados}>EMBALAGEM</h1>}
      <h1 className={Styles.dados}>CÓDIGO</h1>
      {shouldHiddenDadoExtra && (
        <>
          <h1 className={Styles.dados}>DE</h1>
          <h1 className={Styles.dados}>ESP</h1>
          <h1 className={Styles.dados}>COMP</h1>
          <h1 className={Styles.dados}>PESO</h1>
        </>
      )}
    </div>
  );
};
