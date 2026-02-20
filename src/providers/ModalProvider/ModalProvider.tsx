import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ModalState, OpenModalInput } from "./types";
import { ModalContext } from "./ModalContext";

type Props = { children: ReactNode };

export function ModalProvider({ children }: Props) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    id: null,
    payload: undefined,
  });

  const [isActionLoading, setIsActionLoading] = useState(false);

  const openModal = useCallback(({ id, payload }: OpenModalInput) => {
    setIsActionLoading(false);
    setState({ isOpen: true, id, payload });
  }, []);

  const closeModal = useCallback(() => {
    setIsActionLoading(false);
    setState({ isOpen: false, id: null, payload: undefined });
  }, []);

  const setLoading = useCallback((value: boolean) => {
    setIsActionLoading(value);
  }, []);

  const value = useMemo(
    () => ({ state, openModal, closeModal, setLoading, isActionLoading }),
    [state, openModal, closeModal, setLoading, isActionLoading],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
