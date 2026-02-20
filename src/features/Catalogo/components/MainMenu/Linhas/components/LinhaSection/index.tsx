import Styles from "./LinhaSection.module.css";
import { LinhaImageCard } from "../LinhaImageCard";
import { buildLinhaLabels } from "./utils/buildLinhaLabels";

type LinhaSectionProps = {
  linhaName: string;
  linhaPdf: string;
  imagemLinha: string;
  painelLinha: string;
  fileSelect: (
    file: File,
    field: "imagem_linha" | "painel_linha" | "pdf_linha",
  ) => void;
};

export const LinhaSection = ({
  linhaName,
  imagemLinha,
  painelLinha,
  linhaPdf,
  fileSelect,
}: LinhaSectionProps) => {
  const { imagemLabel, painelLabel } = buildLinhaLabels({
    linhaName,
    imagemLinha,
    painelLinha,
  });

  return (
    <section className={Styles.section}>
      <div className={Styles.container_items}>
        <LinhaImageCard
          imgLinha
          title={imagemLabel}
          imageSrc={imagemLinha}
          onImageUpload={(file) => fileSelect(file, "imagem_linha")}
          pdfUrl={linhaPdf}
          onPdfUpload={(file) => fileSelect(file, "pdf_linha")}
          variant="linha"
        />

        <LinhaImageCard
          title={painelLabel}
          imageSrc={painelLinha}
          onImageUpload={(file) => fileSelect(file, "painel_linha")}
          variant="painel"
        ></LinhaImageCard>
      </div>
    </section>
  );
};
