import { BsPencilSquare } from "react-icons/bs";
import Styles from "../LinhaTitle.module.css";
import { Button } from "@/ui/Button";
import { DefaultLoader } from "@/ui/uiverse/Loaders/DefaultLoader";

type LinhaTitleViewProps = {
  linhaName?: string;
  isProduto?: boolean;
  deleted?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  saveAll: () => void;
  isSaving: boolean;
  defaultLoad?: boolean;
  isNew?: boolean;
};

export function LinhaTitleView({
  linhaName,
  isProduto,
  deleted,
  onEdit,
  onDelete,
  saveAll,
  isSaving,
  defaultLoad,
  isNew,
}: LinhaTitleViewProps) {
  return (
    <div className={Styles.container}>
      {(isSaving || defaultLoad) && (
        <div className={Styles.overlay}>
          <DefaultLoader inCard />
        </div>
      )}
      <div className={Styles.title}>
        {!isProduto ? linhaName : `Produtos da Linha ${linhaName}`}
        {!isProduto && (
          <div onClick={onEdit} style={{ cursor: "pointer" }}>
            <BsPencilSquare size={35} />
          </div>
        )}
      </div>
      <div className={Styles.container_button}>
        {!isProduto && (
          <Button
            text={isSaving ? "Salvando..." : "Salvar Linha"}
            color="var(--green)"
            onClick={saveAll}
          />
        )}
        {linhaName && !isNew && !deleted && !isProduto && (
          <Button text="Deletar Linha" color="var(--red)" onClick={onDelete} />
        )}
      </div>
    </div>
  );
}
