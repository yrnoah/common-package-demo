import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { useCurrent } from "../../../hooks";
// types
import * as S from "./styles.textArea";
import { textAreaAnimationUpdate } from "../utils";

type overflow =
  | "auto"
  | "inherit"
  | "initial"
  | "hidden"
  | "-moz-initial"
  | "revert"
  | "unset"
  | "scroll"
  | "visible"
  | undefined;

export function useTextareaAutoHeight(defaultHeight = 32, maxHeight = 102) {
  const [height, setHeight] = useState(defaultHeight);
  const onUpdate = useCallback(
    (target: HTMLTextAreaElement) => {
      if (!target) return;
      let to = (target as HTMLTextAreaElement).scrollHeight;
      if (to > maxHeight) to = maxHeight;
      if (to < defaultHeight || !(target as HTMLTextAreaElement).value)
        to = defaultHeight;
      setHeight(to);
    },
    [defaultHeight, maxHeight]
  );
  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!e) return;
      onUpdate(e.target as HTMLTextAreaElement);
    },
    [onUpdate]
  );
  const overflowY: overflow = useMemo(() => {
    if (height < maxHeight) return "hidden";
    return "auto";
  }, [height, maxHeight]);
  return {
    height,
    onKeyUp,
    overflowY,
    onUpdate,
  };
}

export interface TextareaItemProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * set TextArea Default Height
   * Default is 32
   */
  textAreaDefaultHeight?: number;
  /**
   * set TextArea Max Height
   * Default is 448
   */
  textAreaMaxHeight?: number;
  /**
   * if set true, the component will display default styles.
   * Default is true
   */
  defaultUI?: boolean;
}

export const InputTextArea = forwardRef<HTMLTextAreaElement, TextareaItemProps>(
  (
    {
      style = {},
      onChange,
      textAreaDefaultHeight = 32,
      textAreaMaxHeight = 448,
      defaultUI = true,
      ...rest
    },
    ref
  ) => {
    const _onChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
          onChange(event);
        }
        const ele = event.target;
        if (ele.scrollHeight <= textAreaMaxHeight) {
          textAreaAnimationUpdate(ele);
        }
      },
      [onChange, textAreaMaxHeight]
    );

    const {
      onKeyUp,
      overflowY,
      height: TextareaHeight,
      onUpdate,
    } = useTextareaAutoHeight(textAreaDefaultHeight, textAreaMaxHeight);

    const onUpdateRef = useCurrent(onUpdate);
    useEffect(() => {
      if (_inputRef.current) onUpdateRef.current(_inputRef.current);
    }, [onUpdateRef]);

    const _onKeyUp = useCallback(
      (e) => {
        if (rest.onKeyUp) rest.onKeyUp(e);
        onKeyUp(e);
      },
      [onKeyUp, rest]
    );

    const _inputRef = useRef<HTMLTextAreaElement>();
    const onRefCallback = useCallback(
      (el: HTMLTextAreaElement) => {
        if (_inputRef && el) _inputRef.current = el;
        if (ref && el) {
          if (typeof ref === "function") {
            ref(el);
            return;
          }
          ref.current = el;
        }
      },
      [_inputRef, ref]
    );

    return (
      <S.AreaInput
        {...rest}
        ref={onRefCallback}
        onKeyUp={_onKeyUp}
        onChange={_onChange}
        style={{ ...style, height: TextareaHeight, overflowY }}
        rows={1}
        defaultUI={defaultUI}
      />
    );
  }
);

export default InputTextArea;
