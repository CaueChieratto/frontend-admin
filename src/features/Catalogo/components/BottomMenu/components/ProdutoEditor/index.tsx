import Styles from "./ProdutoEditor.module.css";
import { ButtonsPDF } from "@/components/ButtonsPDF";
import { ContainerImageCard } from "@/components/ContainerImageCard";
import type { Produto } from "@/features/Catalogo/interfaces/produto";
import { ImageCard } from "@/ui/ImageCard";
import { Button } from "@/ui/Button";
import { ImagePickerInput } from "../../../MainMenu/Linhas/components/LinhaImageCard/components/ImagePickerInput";

type UploadField = "imagem_produto" | "pdf_produto";

type ProdutoEditorProps = {
  productState: Produto;
  fileSelect: (file: File, field: UploadField) => void;
  removeFile: (field: UploadField) => void;
  onSave: () => void;
  onDelete: () => void;
  isSaving: boolean;
};

export const ProdutoEditor = ({
  productState,
  fileSelect,
  removeFile,
  onSave,
  onDelete,
  isSaving,
}: ProdutoEditorProps) => {
  const isNewProduct = !productState._id;
  const picker = ImagePickerInput({
    onPick: (file) => fileSelect(file, "imagem_produto"),
  });

  const imageToShow = productState.imagem_produto || undefined;

  return (
    <div className={Styles.container}>
      {picker.input}
      <div className={Styles.container_produto}>
        <ContainerImageCard isProduto>
          <ImageCard isProduto onClick={picker.trigger}>
            <img
              src={imageToShow}
              style={{ borderRadius: "8px", maxWidth: "240px" }}
            />
          </ImageCard>
        </ContainerImageCard>

        <ButtonsPDF
          isProduto
          imageSrc={productState.imagem_produto}
          pdfUrl={productState.pdf_produto}
          onUpload={(file) => fileSelect(file, "pdf_produto")}
          onTriggerImage={picker.trigger}
          onDeletePdf={() => removeFile("pdf_produto")}
        />
      </div>
      <div className={Styles.container_buttons}>
        <Button
          color="var(--green)"
          text={isSaving ? "Salvando..." : "Salvar Produto"}
          onClick={onSave}
        />

        {!isNewProduct && (
          <Button
            color="var(--red)"
            text="Deletar Produto"
            onClick={onDelete}
          />
        )}
      </div>
    </div>
  );
};
