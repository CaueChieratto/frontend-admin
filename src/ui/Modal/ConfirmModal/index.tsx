import Styles from "./ConfirmModal.module.css";
import { useModal } from "@/providers/ModalProvider/useModal";
import { Button } from "@/ui/Button";
import { BaseModal } from "../BaseModal";

type ConfirmModalProps = {
  success?: boolean;
  restore?: boolean;
  error?: boolean;
  permanently?: boolean;
};

export function ConfirmModal({ success, error, restore }: ConfirmModalProps) {
  const { state, closeModal, setLoading, isActionLoading } = useModal();

  const title = state.payload?.title ?? "Confirmar ação";
  const content = state.payload?.content ?? null;
  const confirmText = state.payload?.confirmText ?? "Confirmar";
  const cancelText = state.payload?.cancelText ?? "Cancelar";

  const onConfirm = async () => {
    try {
      setLoading(true);
      await state.payload?.onConfirm?.();
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    state.payload?.onCancel?.();
    closeModal();
  };

  return (
    <BaseModal>
      <div className={Styles.container}>
        <h2 className={Styles.title}>{title}</h2>

        <div className={Styles.container_content}>
          {content && <div className={Styles.content}>{content}</div>}

          <div className={Styles.actions}>
            {!success && !error && (
              <Button
                text={cancelText}
                color="transparent"
                border="1px solid var(--background)"
                fontColor="var(--background)"
                onClick={onCancel}
              />
            )}
            <Button
              text={isActionLoading ? "Aguarde..." : confirmText}
              color={success || restore ? "var(--green)" : "var(--red)"}
              border={
                success || restore
                  ? "1px solid var(--green)"
                  : "1px solid var(--red)"
              }
              fontColor={
                success || restore ? "var(--background)" : "var(--text)"
              }
              onClick={onConfirm}
              minWidth="80px"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
