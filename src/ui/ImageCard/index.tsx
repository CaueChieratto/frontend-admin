import type { ReactNode } from "react";
import Styles from "./ImageCard.module.css";

type ImageCardProps = {
  children: ReactNode;
  isProduto?: boolean;
  onClick: () => void;
};

export const ImageCard = ({ children, isProduto, onClick }: ImageCardProps) => {
  return (
    <div
      className={isProduto ? Styles.image_produto : Styles.image}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
