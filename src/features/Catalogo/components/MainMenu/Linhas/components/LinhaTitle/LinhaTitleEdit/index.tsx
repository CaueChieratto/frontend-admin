import { EditInput } from "@/ui/EditInput";
import { ContainerEditInput } from "@/components/ContainerEditInput";

type LinhaTitleEditProps = {
  newName: string;
  setNewName: (value: string) => void;
  confirm: () => void;
  cancel: () => void;
};

export function LinhaTitleEdit({
  newName,
  setNewName,
  confirm,
  cancel,
}: LinhaTitleEditProps) {
  return (
    <ContainerEditInput cancel={cancel} confirm={confirm}>
      <EditInput
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        autoFocus
        placeholder="Nome da Nova Linha"
      />
    </ContainerEditInput>
  );
}
