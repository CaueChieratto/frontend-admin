import { useState, useEffect } from "react";

export const useMinimumLoading = (
  loading: boolean,
  minDuration: number = 2000,
): boolean => {
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  return loading || !minTimeElapsed;
};
