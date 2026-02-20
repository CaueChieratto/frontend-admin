import type { Tabela } from "@/features/Catalogo/interfaces/tabela";
import Styles from "./DadosPn.module.css";
import { getPnStyle } from "@/features/Catalogo/helpers/getPnStyle";
import { Button } from "@/ui/Button";
import { useCallback, useState } from "react";

type DadosPnProps = {
  tabela: Tabela;
  onUpdatePn: (pn: string) => void;
  onDeleteTabela: () => void;
};

export const DadosPn = ({
  tabela,
  onUpdatePn,
  onDeleteTabela,
}: DadosPnProps) => {
  const [localPn, setLocalPn] = useState(() => tabela.pn);

  const inputStyle = getPnStyle(localPn);

  const change = useCallback((value: string) => {
    setLocalPn(value.toUpperCase());
  }, []);

  const blur = useCallback(() => {
    if (localPn !== tabela.pn) {
      onUpdatePn(localPn);
    }
  }, [localPn, tabela.pn, onUpdatePn]);

  return (
    <div className={Styles.container}>
      <div className={Styles.container_pn}>
        <input
          key={tabela.pn}
          type="text"
          value={localPn}
          onChange={(e) => change(e.target.value)}
          onBlur={blur}
          className={Styles.input}
          style={inputStyle}
        />
      </div>
      <div className={Styles.container_button}>
        <Button
          text="Deletar Tabela"
          color="var(--red)"
          onClick={onDeleteTabela}
        />
      </div>
    </div>
  );
};
