import { BsPencilSquare } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import Styles from "./Title.module.css";
import { ContainerEditInput } from "@/components/ContainerEditInput";
import { EditInput } from "@/ui/EditInput";

type TitleProps = {
  onClick: () => void;
  confirm: () => void;
  cancel: () => void;
  title?: string;
  emptyTitle: string;
  isProdutoTitle?: boolean;
  edit?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const Title = ({
  onClick,
  confirm,
  cancel,
  emptyTitle,
  title,
  isProdutoTitle,
  edit,
  onChange,
  placeholder,
  value,
}: TitleProps) => {
  return (
    <>
      {!edit ? (
        <div
          className={
            isProdutoTitle
              ? Styles.container_icons_produto
              : Styles.container_icons
          }
          onClick={onClick}
        >
          <h1
            className={
              isProdutoTitle ? Styles.description_produto : Styles.description
            }
          >
            {title || emptyTitle}
          </h1>

          {title ? <BsPencilSquare size={35} /> : <CiSquarePlus size={45} />}
        </div>
      ) : (
        <ContainerEditInput isProduto cancel={cancel} confirm={confirm}>
          <EditInput
            isProduto
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoFocus
          />
        </ContainerEditInput>
      )}
    </>
  );
};
