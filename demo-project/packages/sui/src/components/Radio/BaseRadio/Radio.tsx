import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  memo,
} from "react";
import { useCurrent } from "../../../hooks";
import * as S from "./styles.radio";

interface RadioProps {
  disabled?: boolean;
  readOnly?: boolean;
  wrapperStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  defaultChecked?: boolean;
  checked?: boolean;
  radioKey?: string;
  isGroup?: boolean;
  text?: React.ReactNode;
  onChange?: (key: string, checked: boolean) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

const Radio = forwardRef<HTMLDivElement, RadioProps>(
  (
    {
      defaultChecked,
      checked,
      radioKey,
      wrapperStyle,
      style,
      disabled,
      onChange,
      onMouseEnter,
      onMouseLeave,
      text,
      readOnly,
      isGroup,
    },
    ref
  ) => {
    // inner status
    // if rest.checked has boolean value, use parent's callback to update status
    const [active, setActive] = useState(defaultChecked || checked);
    const curActiveRef = useCurrent(active);
    const [hover, setHover] = useState(false);
    const onSetCur = useCallback(() => {
      if (disabled || readOnly) return;
      if (isGroup && active) return;
      if (onChange) onChange(radioKey || "", !active);
      // if checked has value, use parent's callback to update status
      if (typeof checked !== "boolean") setActive(!active);
    }, [disabled, readOnly, isGroup, active, onChange, radioKey, checked]);
    const onEnter = useCallback(
      (e: React.MouseEvent) => {
        if (onMouseEnter) onMouseEnter(e);
        if (!readOnly) setHover(true);
      },
      [onMouseEnter, readOnly]
    );
    const onLeave = useCallback(
      (e: React.MouseEvent) => {
        if (onMouseLeave) onMouseLeave(e);
        if (!readOnly) setHover(false);
      },
      [onMouseLeave, readOnly]
    );
    // update active from props
    useEffect(() => {
      if (typeof checked === "boolean" && checked !== curActiveRef.current)
        setActive(checked);
    }, [curActiveRef, checked]);
    return (
      <S.Wrapper
        ref={ref}
        style={wrapperStyle}
        onClick={onSetCur}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        disabled={disabled}
        readOnly={readOnly}
        checked={active}
        hover={hover}
      >
        <S.DotWrapper style={style} />
        {!!text && typeof text === "string" && <S.Text>{text}</S.Text>}
        {!!text && typeof text !== "string" && text}
      </S.Wrapper>
    );
  }
);

export default memo(Radio);
