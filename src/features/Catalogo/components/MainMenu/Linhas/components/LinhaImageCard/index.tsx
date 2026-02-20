import Styles from "./LinhaImageCard.module.css";
import { ImagePreview } from "./components/ImagePreview";
import { ImagePickerInput } from "./components/ImagePickerInput";
import { ButtonsPDF } from "@components/ButtonsPDF";
import { ContainerImageCard } from "@/components/ContainerImageCard";

type Variant = "linha" | "painel";

type LinhaImageCardProps = {
  onImageUpload: (file: File) => void;
  title?: string;
  imageSrc?: string;
  pdfUrl?: string;
  onPdfUpload?: (file: File) => void;
  variant?: Variant;
  children?: React.ReactNode;
  isProduto?: boolean;
  imgLinha?: boolean;
};

export const LinhaImageCard = ({
  title,
  imageSrc,
  onImageUpload,
  pdfUrl,
  onPdfUpload,
  variant,
  children,
  isProduto,
  imgLinha,
}: LinhaImageCardProps) => {
  const picker = ImagePickerInput({ onPick: onImageUpload });

  return (
    <ContainerImageCard>
      {picker.input}

      <div>
        <p className={Styles.info}>{title}</p>
        <ImagePreview
          imgLinha={imgLinha}
          isProduto={isProduto}
          title={title}
          imageSrc={imageSrc}
          onClick={picker.trigger}
        />
      </div>

      <ButtonsPDF
        isProduto={isProduto}
        imageSrc={imageSrc}
        pdfUrl={pdfUrl}
        linha={variant === "linha"}
        painel={variant === "painel"}
        onUpload={onPdfUpload}
        onTriggerImage={picker.trigger}
      />

      {children ? (
        <div className={Styles.container_button}>{children}</div>
      ) : null}
    </ContainerImageCard>
  );
};
