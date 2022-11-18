import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { TDropdownPosition } from "./useDropdownPosition";

import SiblingUtil from "../components/Sibling/Sibling";

export function useDetectOut(onOutCallback: () => void, shouldListen = false) {
  const [isOut, setOut] = useState(false);
  const onOut = useCallback(() => setOut(true), []);
  const onIn = useCallback(() => setOut(false), []);
  useEffect(() => {
    if (!shouldListen) return;
    const onClickListener = () => {
      if (isOut) {
        onOutCallback();
        setOut(false);
        if (SiblingUtil.isShowing) SiblingUtil.dismiss();
      }
    };
    window.addEventListener("click", onClickListener);
    window.addEventListener("wheel", onClickListener);
    window.addEventListener("mousedown", onClickListener);
    return () => {
      window.removeEventListener("click", onClickListener);
      window.removeEventListener("wheel", onClickListener);
      window.removeEventListener("mousedown", onClickListener);
    };
  }, [isOut, onOutCallback, shouldListen]);
  return { isOut, onOut, onIn };
}

export function useTrigger(defaultValue: boolean, onHideCallback?: () => void) {
  const [open, setOpen] = useState(defaultValue);
  const onShow = useCallback(() => setOpen(true), []);
  const onHide = useCallback(() => {
    if (onHideCallback) onHideCallback();
    setOpen(false);
  }, [onHideCallback]);
  const toggleSelections = useCallback(() => setOpen((v) => !v), []);
  const { onIn, onOut } = useDetectOut(onHide, open);
  return {
    open,
    onHide,
    onShow,
    toggleSelections,
    onIn,
    onOut,
  };
}

export function useDetectDropdownPosition<T = HTMLDivElement>(
  listHeight: number = 300,
  offsetHeight: number = 40,
  persistDown: boolean = false,
  position: TDropdownPosition = "bottom-left",
  itemWidth: number = 0
) {
  const ref = useRef<T>(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(offsetHeight);
  const updateRect = useCallback(
    (data: DOMRect, listHeight: number = 300) => {
      setWidth(data.width);
      if (data.height) setHeight(data.height);
      const optionWidth = itemWidth || data.width;
      const diff = window.innerHeight - data.bottom;
      const shouldPositionRight =
        data.left + optionWidth - window.innerWidth > 0 && optionWidth > 0;
      const isTop = persistDown ? false : diff < listHeight;
      if (data.top !== top && !isTop) setTop((data.top || 0) + height);
      if (isTop && top !== data.top - listHeight) {
        setTop(data.top - listHeight);
      }
      if (data.left !== left) {
        if (position === "bottom-right")
          setLeft(data.left - optionWidth + data.width);
        if (position !== "bottom-right") {
          if (!shouldPositionRight) setLeft(data.left || 0);
          if (shouldPositionRight)
            setLeft(data.left - optionWidth + data.width);
        }
      }
    },
    [persistDown, top, height, left, position, itemWidth]
  );
  const onHoverUpdateRect = useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current) return;
      updateRect(
        (ref.current as unknown as HTMLDivElement).getBoundingClientRect(),
        listHeight
      );
    },
    [listHeight, ref, updateRect]
  );
  useLayoutEffect(() => {
    if (ref.current) {
      updateRect(
        (ref.current as unknown as HTMLDivElement).getBoundingClientRect(),
        listHeight
      );
    }
  }, [ref, updateRect, listHeight]);
  useEffect(() => {
    if (ref.current) {
      updateRect(
        (ref.current as unknown as HTMLDivElement).getBoundingClientRect(),
        listHeight
      );
    }
  }, [listHeight, height, ref, updateRect]);
  return {
    onHoverUpdateRect,
    updateRect,
    top,
    left,
    width,
    ref,
  };
}

export default useDetectOut;
