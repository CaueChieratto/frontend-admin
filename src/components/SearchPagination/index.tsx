import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Styles from "./SearchPagination.module.css";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type Block = number | "...";
type Action = "next" | "back";

export const SearchPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: SearchPaginationProps) => {
  const [lastAction, setLastAction] = useState<Action>("next");

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    if (page === currentPage) return;

    const action: Action = page > currentPage ? "next" : "back";
    setLastAction(action);
    onPageChange(page);
  };

  const back = () => {
    if (currentPage > 1) goTo(currentPage - 1);
  };

  const next = () => {
    if (currentPage < totalPages) goTo(currentPage + 1);
  };

  const getBlocks = (): Block[] => {
    if (totalPages === 2) return [1, 2, "..."];
    if (totalPages === 3) return [1, 2, 3];

    if (currentPage === totalPages) return ["...", totalPages - 1, totalPages];

    if (currentPage === totalPages - 1)
      return [totalPages - 2, totalPages - 1, totalPages];

    if (currentPage === 1) return [1, 2, "..."];

    if (lastAction === "next") {
      return [currentPage, currentPage + 1, "..."];
    }

    return [currentPage - 1, currentPage, "..."];
  };

  const blocks = getBlocks();

  return (
    <div className={Styles.pagination}>
      <button
        className={Styles.navButton}
        onClick={back}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <MdKeyboardArrowLeft size={35} />
      </button>

      {blocks.map((b, idx) =>
        b === "..." ? (
          <span key={`ellipsis-${idx}`} className={Styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={b}
            className={`${Styles.pageButton} ${
              currentPage === b ? Styles.activePage : ""
            }`}
            onClick={() => goTo(b)}
          >
            {b}
          </button>
        ),
      )}

      <button
        className={Styles.navButton}
        onClick={next}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <MdKeyboardArrowRight size={35} />
      </button>
    </div>
  );
};
