import { useCallback, useState } from "react";

type ToggleReturn = readonly [boolean, () => void];

export const useBooleanToggle = (initialValue: boolean): ToggleReturn => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle] as const;
};
