import React, { useCallback, forwardRef, useState, useEffect } from "react";
import { TextWrapper } from "./styles.button";
import type { TextProps } from "../typing";

const Text = forwardRef<HTMLButtonElement, TextProps>((props, ref) => {
  const [width, setWidth] = useState(0);
  const onRefCallback = useCallback(
    (el: HTMLButtonElement) => {
      // set inner width state
      if (el) {
        if (el.getBoundingClientRect()?.width) {
          setWidth(el.getBoundingClientRect()?.width);
        }
      }
      // deal with ref from props
      if (ref && el) {
        if (typeof ref === "function") {
          ref(el);
          return;
        }
        ref.current = el;
      }
    },
    [ref]
  );
  useEffect(() => {
    return () => setWidth(0);
  }, []);
  return (
    <TextWrapper
      {...props}
      ref={onRefCallback}
      style={{
        ...(props.style || {}),
        width: width || "auto",
        padding: width ? 0 : undefined,
      }}
    >
      {props.children}
    </TextWrapper>
  );
});

export default Text;
