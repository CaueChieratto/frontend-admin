import { useState } from "react";

type useLinhaTitleProps = {
  linhaName: string;
  updateLinha: (dados: { linha: string }) => void;
};

export function useLinhaTitle({ linhaName, updateLinha }: useLinhaTitleProps) {
  const isNewLinha = !linhaName;

  const [isEditing, setIsEditing] = useState(isNewLinha);
  const [newName, setNewName] = useState(linhaName);

  const startEditing = () => {
    setNewName(linhaName);
    setIsEditing(true);
  };

  const confirm = () => {
    if (!newName.trim()) {
      alert("O nome da linha não pode ser vazio");
      return;
    }

    updateLinha({ linha: newName });
    setIsEditing(false);
  };

  const cancel = () => {
    if (!newName.trim()) {
      return;
    }
    setIsEditing(false);
    setNewName(linhaName);
  };

  return {
    isEditing,
    newName,
    setNewName,
    confirm,
    cancel,
    startEditing,
  };
}
