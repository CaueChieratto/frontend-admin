import { BsCheckSquare, BsXSquare } from "react-icons/bs";
import Styles from "./ContainerEditInput.module.css";
import type { ReactNode } from "react";

type ContainerEditInputProps = {
  children: ReactNode;
  confirm: () => void;
  cancel: () => void;
  isProduto?: boolean;
};

export const ContainerEditInput = ({
  children,
  cancel,
  confirm,
  isProduto,
}: ContainerEditInputProps) => {
  return (
    <div
      className={
        isProduto ? Styles.container_input_produto : Styles.container_input
      }
    >
      {children}
      <div className={Styles.icons}>
        <BsCheckSquare
          size={38}
          color="var(--green)"
          cursor="pointer"
          onClick={confirm}
        />
        <BsXSquare
          size={38}
          color="var(--red)"
          cursor="pointer"
          onClick={cancel}
        />
      </div>
    </div>
  );
};
