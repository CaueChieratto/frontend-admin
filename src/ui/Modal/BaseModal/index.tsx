import Styles from "./BaseModal.module.css";
import { useModal } from "@/providers/ModalProvider/useModal";

type Props = {
  children: React.ReactNode;
};

export function BaseModal({ children }: Props) {
  const { state, closeModal } = useModal();
  const closeOnBackdrop = state.payload?.closeOnBackdrop ?? true;

  const onBackdropClick = () => {
    if (closeOnBackdrop) closeModal();
  };

  return (
    <div className={Styles.backdrop} onClick={onBackdropClick}>
      <div className={Styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
