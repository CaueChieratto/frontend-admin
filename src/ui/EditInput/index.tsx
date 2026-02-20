import Styles from "./EditInput.module.css";
import type { ChangeEvent } from "react";

type EditInputProps = {
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
  isProduto?: boolean;
};

export const EditInput = ({
  type = "text",
  value,
  onChange,
  autoFocus,
  placeholder,
  isProduto,
}: EditInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={isProduto ? Styles.inputEditProduto : Styles.inputEdit}
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
  );
};
