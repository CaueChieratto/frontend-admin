import type { ReactNode } from "react";
import Styles from "./ContainerImageCard.module.css";

type ContainerImageCardProps = {
  children: ReactNode;
  isProduto?: boolean;
};

export const ContainerImageCard = ({
  children,
  isProduto,
}: ContainerImageCardProps) => {
  return (
    <div className={isProduto ? Styles.container_produto : Styles.container}>
      {children}
    </div>
  );
};
