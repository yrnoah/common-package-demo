import { useEffect, useState, useCallback, useRef } from "react";
import { useRafState } from "react-use";
import useCurrent from "./useCurrent";

export type TDropdownPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top"
  | "bottom"
  | undefined;

export function useDropdownPosition<T = HTMLDivElement>(
  overlayHeight: number = 300,
  overlayWidth: number = 0,
  offsetHeight: number = 40,
  persistDown: boolean = false,
  position?: TDropdownPosition
) {
  const ref = useRef<T>(null);
  const [top, setTop] = useRafState(0);
  const [left, setLeft] = useRafState(0);
  const [width, setWidth] = useState(120);
  const [height, setHeight] = useState(offsetHeight);
  const updateRect = useCallback(
    (data: DOMRect, targetHeight: number = 300) => {
      setWidth(data.width);
      if (data.height) setHeight(data.height);
      const optionWidth = overlayWidth || data.width;
      const diff = window.innerHeight - data.bottom;
      const shouldPositionRight =
        data.left + optionWidth - window.innerWidth > 0 && optionWidth > 0;
      let shouldTop = diff < targetHeight;
      if (
        persistDown ||
        position === "bottom" ||
        position === "bottom-left" ||
        position === "bottom-right"
      ) {
        shouldTop = false;
      }
      if (
        position === "top" ||
        position === "top-left" ||
        position === "top-right"
      ) {
        shouldTop = true;
      }
      if (data.top < targetHeight) shouldTop = false;
      // set to bottom
      if (data.top !== top && !shouldTop) setTop((data.top || 0) + height);
      // set to top
      if (shouldTop && top !== data.top - targetHeight) {
        setTop(data.top - targetHeight);
      }
      // align to right
      if (position === "bottom-right" || position === "top-right") {
        setLeft(data.left - optionWidth + data.width);
        return;
      }
      // align to center
      if (position === "bottom" || position === "top") {
        // can not count scroll bar width
        setLeft(data.left - (optionWidth - data.width) * 0.5);
        return;
      }
      // align to left
      if (position === "bottom-left" || position === "top-left") {
        setLeft(data.left || 0);
        return;
      }
      // auto align
      if (!shouldPositionRight) setLeft(data.left || 0);
      if (shouldPositionRight) setLeft(data.left - optionWidth + data.width);
    },
    [overlayWidth, persistDown, position, top, setTop, height, setLeft]
  );
  const onHoverUpdateRect = useCallback(() => {
    const target = ref.current as unknown as HTMLDivElement;
    if (!(target && target.getBoundingClientRect)) return;
    updateRect(target.getBoundingClientRect(), overlayHeight);
  }, [overlayHeight, ref, updateRect]);
  const updateFuncRef = useCurrent(onHoverUpdateRect);
  useEffect(() => {
    updateFuncRef.current();
  }, [updateFuncRef, overlayHeight, ref]);
  return {
    onHoverUpdateRect,
    updateRect,
    top: Math.max(top, 0),
    left,
    width,
    height,
    ref,
  };
}
