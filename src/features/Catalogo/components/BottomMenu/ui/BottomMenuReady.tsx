import { DefaultLoader } from "@/ui/uiverse/Loaders/DefaultLoader";
import { useModal } from "@/providers/ModalProvider/useModal";
import { Button } from "@/ui/Button";
import Styles from "../BottomMenu.module.css";
import type { Produto } from "@/features/Catalogo/interfaces/produto";
import { ProdutoEditor } from "../components/ProdutoEditor";
import { TabelaEditor } from "../components/TabelaEditor";
import { getProdutoEditorText } from "../helpers/getProdutoEditorText";
import { useInlineTextEdit } from "../hooks/useInlineTextEdit";
import { useProductEditor } from "../hooks/useProductEditor";
import { useProdutoEditorModals } from "../hooks/useProdutoEditorModals";
import { Title } from "./Title";

type BottomMenuReadyProps = {
  produto: Produto;
  nameLinha: string;
  onSaveSuccess: () => void;
};

export const BottomMenuReady = ({
  produto,
  nameLinha,
  onSaveSuccess,
}: BottomMenuReadyProps) => {
  const { openModal } = useModal();

  const {
    productState,
    updateTabela,
    addTabela,
    fileSelect,
    removeFile,
    updateProduct,
    saveProduct,
    deleteProduct,
    removeTabela,
    isSaving,
  } = useProductEditor(produto, nameLinha, openModal, onSaveSuccess);

  const { confirmDeleteTabela, confirmDeleteProduto, saveWithFeedback } =
    useProdutoEditorModals({
      openModal,
      productName: productState.nome_produto ?? "",
      saveProduct,
      deleteProduct,
      removeTabela,
    });

  const text = getProdutoEditorText();

  const nomeEdit = useInlineTextEdit({
    currentValue: productState.nome_produto ?? "",
    onConfirm: (newValue) => updateProduct({ nome_produto: newValue }),
  });

  const descricaoEdit = useInlineTextEdit({
    currentValue: productState.descricao_produto ?? "",
    onConfirm: (newValue) => updateProduct({ descricao_produto: newValue }),
  });

  if (isSaving) {
    return (
      <div className={Styles.loader_container_produto}>
        <DefaultLoader inCard />
      </div>
    );
  }

  return (
    <div className={Styles.container}>
      <ProdutoEditor
        productState={productState}
        fileSelect={fileSelect}
        removeFile={removeFile}
        onSave={saveWithFeedback}
        onDelete={confirmDeleteProduto}
        isSaving={isSaving}
      />

      <div className={Styles.container_tabelas}>
        <div className={Styles.container_description}>
          <Title
            isProdutoTitle
            title={productState.nome_produto}
            emptyTitle={text.emptyProdutoTitle}
            edit={nomeEdit.isEditing}
            onClick={nomeEdit.open}
            confirm={nomeEdit.confirm}
            cancel={nomeEdit.cancel}
            value={nomeEdit.value}
            onChange={nomeEdit.onChange}
            placeholder={text.nomePlaceholder}
          />

          <Title
            title={productState.descricao_produto}
            emptyTitle={text.emptyProdutoDescription}
            edit={descricaoEdit.isEditing}
            onClick={descricaoEdit.open}
            confirm={descricaoEdit.confirm}
            cancel={descricaoEdit.cancel}
            value={descricaoEdit.value}
            onChange={descricaoEdit.onChange}
            placeholder={text.descricaoPlaceholder}
          />
        </div>

        {productState.tabelas_produto
          .filter((tabela) => !tabela.deletado)
          .map((tabela) => (
            <TabelaEditor
              tabela={tabela}
              key={tabela.tabela_id}
              onUpdate={(dados) => updateTabela(tabela.tabela_id, dados)}
              onDeleteTabela={() => confirmDeleteTabela(tabela.tabela_id)}
            />
          ))}

        <Button
          text="Adicionar Nova Tabela"
          color="var(--green)"
          onClick={addTabela}
        />
      </div>
    </div>
  );
};
