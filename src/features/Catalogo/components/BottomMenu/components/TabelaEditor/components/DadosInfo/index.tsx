import type { Tabela } from "@/features/Catalogo/interfaces/tabela";
import Styles from "./DadosInfo.module.css";
import { TiDelete } from "react-icons/ti";
import { getDadosExtra } from "@/features/Catalogo/helpers/getDadosExtra";
import type { Dados } from "@/features/Catalogo/interfaces/dados";
import { useEffect, useState } from "react";

type DadosInfoProps = {
  tabela: Tabela;
  onUpdateDados: (dados: Dados[]) => void;
};

const InputCell = ({
  value,
  onSave,
  className,
}: {
  value: string;
  onSave: (val: string) => void;
  className: string;
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <input
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => onSave(localValue)}
      className={className}
    />
  );
};

export const DadosInfo = ({ tabela, onUpdateDados }: DadosInfoProps) => {
  const updateDados = (index: number, field: keyof Dados, newValue: string) => {
    const newDados = [...tabela.dados];
    newDados[index] = { ...newDados[index], [field]: newValue };
    onUpdateDados(newDados);
  };

  const removeDado = (indexToRemove: number) => {
    const newDados = tabela.dados.filter((_, index) => index !== indexToRemove);
    onUpdateDados(newDados);
  };

  return (
    <div className={Styles.container_info}>
      {tabela.dados.map((dado, index) => {
        const dadosExtra = getDadosExtra(dado);
        if (dado.deletado) return null;

        return (
          <div
            key={dado.codigo || index}
            className={
              dadosExtra ? Styles.container_input_extra : Styles.container_input
            }
          >
            <InputCell
              value={dado.dn}
              onSave={(val) => updateDados(index, "dn", val)}
              className={Styles.infos}
            />

            {!dadosExtra && (
              <InputCell
                value={dado.embalagem}
                onSave={(val) => updateDados(index, "embalagem", val)}
                className={Styles.infos}
              />
            )}

            <InputCell
              value={dado.codigo}
              onSave={(val) => updateDados(index, "codigo", val)}
              className={Styles.infos}
            />

            {dadosExtra && (
              <>
                <InputCell
                  value={dado.de}
                  onSave={(val) => updateDados(index, "de", val)}
                  className={Styles.infos}
                />
                <InputCell
                  value={dado.esp}
                  onSave={(val) => updateDados(index, "esp", val)}
                  className={Styles.infos}
                />
                <InputCell
                  value={dado.comp}
                  onSave={(val) => updateDados(index, "comp", val)}
                  className={Styles.infos}
                />
                <InputCell
                  value={dado.peso}
                  onSave={(val) => updateDados(index, "peso", val)}
                  className={Styles.infos}
                />
              </>
            )}
            <div
              className={dadosExtra ? Styles.delete_extra : Styles.delete}
              onClick={() => removeDado(index)}
            >
              <TiDelete size={30} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
