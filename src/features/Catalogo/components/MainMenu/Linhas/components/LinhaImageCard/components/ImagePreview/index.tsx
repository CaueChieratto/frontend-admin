import { ImageCard } from "@/ui/ImageCard";
import Styles from "../../LinhaImageCard.module.css";

type Props = {
  title?: string;
  imageSrc?: string;
  onClick: () => void;
  isProduto?: boolean;
  imgLinha?: boolean;
};

export function ImagePreview({
  title,
  imageSrc,
  onClick,
  isProduto,
  imgLinha,
}: Props) {
  return (
    <ImageCard onClick={onClick}>
      {imageSrc ? (
        <img
          className={isProduto ? Styles.image_produto : Styles.image}
          src={imageSrc}
          alt={title}
          style={imgLinha ? { maxWidth: "350px" } : {}}
        />
      ) : null}
    </ImageCard>
  );
}
