import { useEffect, useState, useCallback } from "react";

export function useDetectOut(
  onOutCallback: () => void,
  shouldListen = false,
  onScrollCallback?: (e?: WheelEvent) => void
) {
  const [isOut, setOut] = useState(false);
  const onOut = useCallback(() => setOut(true), []);
  const onIn = useCallback(() => setOut(false), []);
  useEffect(() => {
    if (!shouldListen) return;
    const onClickListener = () => {
      if (isOut) {
        onOutCallback();
        setOut(false);
      }
    };
    const onScrollListener = (e: WheelEvent) => {
      if (isOut) {
        onOutCallback();
        setOut(false);
      }
      if (onScrollCallback) onScrollCallback(e);
    };
    window.addEventListener("click", onClickListener);
    window.addEventListener("wheel", onScrollListener);
    window.addEventListener("mousedown", onClickListener);
    return () => {
      window.removeEventListener("click", onClickListener);
      window.removeEventListener("wheel", onScrollListener);
      window.removeEventListener("mousedown", onClickListener);
    };
  }, [isOut, onOutCallback, onScrollCallback, shouldListen]);
  return { isOut, onOut, onIn };
}
