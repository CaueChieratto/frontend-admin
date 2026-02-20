import { useLinhaTitle } from "./hooks/useLinhaTitle";
import { LinhaTitleEdit } from "./LinhaTitleEdit";
import { LinhaTitleView } from "./LinhaTitleView";

type LinhaTitleProps = {
  linhaName: string;
  isProduto?: boolean;
  deleted?: boolean;
  updateLinha?: (dados: { linha: string }) => void;
  onDelete?: () => void;
  saveAll?: () => void;
  isSaving?: boolean;
  defaultLoad?: boolean;
  isNew?: boolean;
};

const noop = () => {};

export const LinhaTitle = ({
  linhaName,
  isProduto,
  deleted,
  updateLinha,
  onDelete,
  saveAll,
  isSaving,
  defaultLoad,
  isNew,
}: LinhaTitleProps) => {
  const safeUpdateLinha = updateLinha ?? noop;

  const safeSaveAll = saveAll ?? noop;
  const safeOnDelete = onDelete ?? noop;
  const safeIsSaving = isSaving ?? false;

  const { isEditing, newName, setNewName, confirm, cancel, startEditing } =
    useLinhaTitle({ linhaName, updateLinha: safeUpdateLinha });

  if (isEditing && !isProduto) {
    return (
      <LinhaTitleEdit
        newName={newName}
        setNewName={setNewName}
        confirm={confirm}
        cancel={cancel}
      />
    );
  }

  return (
    <LinhaTitleView
      isProduto={isProduto}
      saveAll={safeSaveAll}
      isSaving={safeIsSaving}
      linhaName={linhaName}
      deleted={deleted}
      onEdit={startEditing}
      onDelete={safeOnDelete}
      defaultLoad={defaultLoad}
      isNew={isNew}
    />
  );
};
