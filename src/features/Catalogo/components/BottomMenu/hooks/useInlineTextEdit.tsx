import { useCallback, useState } from "react";

type UseInlineTextEditParams = {
  currentValue: string;
  onConfirm: (value: string) => void;
};

type UseInlineTextEditResult = {
  isEditing: boolean;
  value: string;
  open: () => void;
  cancel: () => void;
  confirm: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export const useInlineTextEdit = ({
  currentValue,
  onConfirm,
}: UseInlineTextEditParams): UseInlineTextEditResult => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  const open = useCallback(() => {
    setValue(currentValue);
    setIsEditing(true);
  }, [currentValue]);

  const cancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const confirm = useCallback(() => {
    onConfirm(value);
    setIsEditing(false);
  }, [onConfirm, value]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return {
    isEditing,
    value,
    open,
    cancel,
    confirm,
    onChange,
  };
};
