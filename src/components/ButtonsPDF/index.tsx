import { useRef } from "react";
import { Button } from "../../ui/Button";
import Styles from "./pdfButtons.module.css";

type ButtonsPDFProps = {
  pdfUrl?: string;
  imageSrc?: string;
  linha?: boolean;
  painel?: boolean;
  onUpload?: (file: File) => void;
  onTriggerImage?: () => void;
  isProduto?: boolean;
  onDeletePdf?: () => void;
};

export const ButtonsPDF = ({
  pdfUrl,
  imageSrc,
  linha,
  painel,
  onUpload,
  onTriggerImage,
  isProduto,
  onDeletePdf,
}: ButtonsPDFProps) => {
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const label = `${imageSrc ? "Alterar" : "Adicionar"} ${
    painel ? "Painel" : "Imagem"
  }`;

  const labelIsProduto = `${imageSrc ? "Alterar" : "Adicionar"} Imagem do Produto`;

  return (
    <div className={Styles.container_pdf}>
      <Button
        text={isProduto ? labelIsProduto : label}
        color="transparent"
        border="1px solid var(--grey)"
        fontColor="var(--grey)"
        onClick={onTriggerImage}
      />

      {!painel && (
        <div className={Styles.container_buttons_pdf}>
          <input
            type="file"
            ref={pdfInputRef}
            hidden
            accept="application/pdf"
            onChange={(e) =>
              e.target.files?.[0] && onUpload?.(e.target.files[0])
            }
          />
          <Button
            text={pdfUrl ? `Alterar PDF` : `Adicionar PDF`}
            color="var(--green)"
            onClick={() => pdfInputRef.current?.click()}
          />

          {pdfUrl && (
            <>
              {linha ? (
                <Button
                  text="Ver PDF"
                  color="transparent"
                  border="1px solid var(--green)"
                  fontColor="var(--green)"
                  onClick={() => pdfUrl && window.open(pdfUrl, "_blank")}
                />
              ) : (
                <Button
                  text="Deletar PDF"
                  color="var(--red)"
                  onClick={onDeletePdf}
                />
              )}
              {isProduto && (
                <Button
                  text="Ver PDF"
                  color="transparent"
                  border="1px solid var(--grey)"
                  fontColor="var(--grey)"
                  gridColumn="span 2"
                  onClick={() => pdfUrl && window.open(pdfUrl, "_blank")}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
