import { MdDelete, MdRestore } from "react-icons/md";
import Styles from "./LinhaItem.module.css";
import type { Linha } from "@/features/Catalogo/interfaces/linha";

interface LinhaItemProps {
  linha: Linha;
  linhaName: string;
  ativo: boolean;
  onClick: () => void;
  isDeleted?: boolean;
  onRestore?: () => void;
  onPermanentlyDelete?: () => void;
}

export const LinhaItem = ({
  ativo,
  onClick,
  linhaName,
  isDeleted,
  onRestore,
  onPermanentlyDelete,
}: LinhaItemProps) => {
  return (
    <div className={Styles.container}>
      <button
        className={`${Styles.titulo} ${ativo ? Styles.ativo : ""}`}
        onClick={onClick}
      >
        {linhaName}
      </button>

      {isDeleted && (
        <div className={Styles.container_icons}>
          <MdRestore size={35} color="var(--green)" onClick={onRestore} />
          <MdDelete
            size={35}
            color="var(--red)"
            onClick={onPermanentlyDelete}
          />
        </div>
      )}
    </div>
  );
};
