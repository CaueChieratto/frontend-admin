import type { CSSProperties } from "react";

const PN_COLOR_MAP: Record<string, string> = {
  PN80: "var(--green_tabela)",
  PN125: "var(--blue_tabela)",
};

const DEFAULT_COLOR = "var(--brown_tabela)";
const EMPTY_COLOR = "var(--text)";

export const getPnStyle = (pn: string): CSSProperties => {
  if (pn === "") {
    return {
      color: EMPTY_COLOR,
      borderColor: EMPTY_COLOR,
    };
  }

  const mappedColor = PN_COLOR_MAP[pn] ?? DEFAULT_COLOR;

  return {
    color: mappedColor,
    borderColor: mappedColor,
  };
};
