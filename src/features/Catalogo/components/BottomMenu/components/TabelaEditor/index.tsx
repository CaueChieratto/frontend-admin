import type { Tabela } from "@/features/Catalogo/interfaces/tabela";
import Styles from "./TabelaEditor.module.css";
import { DadosTitle } from "./components/DadosTitle";
import { DadosInfo } from "./components/DadosInfo";
import { DadosPn } from "./components/DadosPn";
import { LuListPlus } from "react-icons/lu";
import type { Dados } from "@/features/Catalogo/interfaces/dados";

type TabelaEditorProps = {
  tabela: Tabela;
  onUpdate: (dados: Partial<Tabela>) => void;
  onDeleteTabela: () => void;
};

export const TabelaEditor = ({
  tabela,
  onUpdate,
  onDeleteTabela,
}: TabelaEditorProps) => {
  const AddDados = () => {
    const novoDado: Dados = {
      codigo: "",
      dn: "",
      embalagem: "",
      comp: "",
      de: "",
      esp: "",
      peso: "",
      _id: "",
      deletado: false,
    };

    onUpdate({ dados: [...tabela.dados, novoDado] });
  };

  return (
    <div className={Styles.container_tabela}>
      <DadosPn
        tabela={tabela}
        onUpdatePn={(newPn) => onUpdate({ pn: newPn })}
        onDeleteTabela={onDeleteTabela}
      />

      <div className={Styles.container_dados}>
        <DadosTitle tabela={tabela} />
        <DadosInfo
          tabela={tabela}
          onUpdateDados={(newDados) => onUpdate({ dados: newDados })}
        />
      </div>
      <div className={Styles.container_icon}>
        <div className={Styles.add} onClick={AddDados}>
          <p className={Styles.add_text}>Adicionar campo</p>
          <LuListPlus size={35} />
        </div>
      </div>
    </div>
  );
};
