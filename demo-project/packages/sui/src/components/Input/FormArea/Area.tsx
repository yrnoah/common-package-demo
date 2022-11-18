import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import Label from "../../Label";
import { gridWidths } from "../../Form/constants";
import { InfoBlock } from "../../Form/styles.form";
import TextArea from "../TextArea";
// types
import type { TFormColType } from "../../Form/typings";
import { FlexRowWrapper } from "../../../styles/common";
import * as S from "./style.formArea";
import { textAreaAnimationUpdate } from "../utils";

export interface TextareaItemProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Set the width based on the enumeration value,
   * Default is "3-1-lg"
   */
  colType?: TFormColType;
  /**
   * wrapper Style,
   * Default is {}
   */
  wrapperStyle?: React.CSSProperties;
  /**
   * error Msg,
   * Default is ""
   */
  error?: string;
  /**
   * tip Msg,
   * Default is ""
   */
  tipMsg?: string;
  /**
   * top Title Msg,
   * Default is ""
   */
  label?: string;
  /**
   * if set true, show Top Title,
   * Default is true
   */
  showTopTitle?: boolean;
  /**
   * if set true, show Top Count,
   * Default is true
   */
  showTopCount?: boolean;
  /**
   * if set true, show Bottom Title,
   * Default is true
   */
  showBottomTip?: boolean;
  /**
   * if set true, show Bottom Count,
   * Default is false
   */
  showBottomCount?: boolean;
  /**
   * set textArea Default Height,
   * Default is 32
   */
  textAreaDefaultHeight?: number;
  /**
   * set textArea Max Height,
   * Default is 448
   */
  textAreaMaxHeight?: number;
  /**
   * if textArea is readOnly, and textArea value equal "",
   * So set textArea value Default show "-".
   * Default is true
   */
  showReadOnlyTip?: boolean;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, TextareaItemProps>(
  (
    {
      style = {},
      wrapperStyle = {},
      colType = "3-1-lg",
      error = "",
      tipMsg = "",
      label = "",
      showTopTitle = true,
      showTopCount = true,
      showBottomTip = true,
      showBottomCount = false,
      textAreaDefaultHeight = 32,
      textAreaMaxHeight = 448,
      showReadOnlyTip = true,
      onChange,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const [_value, setInnerValue] = useState(rest.value || rest.defaultValue);
    const [_focused, setFocus] = useState(false);
    const [_hovered, setHover] = useState(false);
    const width = style?.width || gridWidths[colType];
    const _WrapperStyle: React.CSSProperties = useMemo(
      () => ({ width, ...wrapperStyle }),
      [width, wrapperStyle]
    );
    const currentInputLength = useMemo(() => {
      if (!_value || !rest.maxLength) return 0;
      if (typeof _value === "string")
        return Math.min(_value.length, rest.maxLength);
      if (typeof _value === "number")
        return Math.min(`${_value}`.length, rest.maxLength);
    }, [_value, rest.maxLength]);

    const currentValue = useMemo(() => {
      const v = rest.value || _value;
      if (typeof v === "string") return v;
      if (Array.isArray(v)) return v.join("");
      return undefined;
    }, [_value, rest]);

    const isShowTopCount = useMemo(() => {
      if (rest.readOnly || rest.disabled) return false;
      return showTopCount && (_focused || _hovered);
    }, [showTopCount, _focused, _hovered, rest.readOnly, rest.disabled]);

    const isShowBottomCount = useMemo(() => {
      if (rest.readOnly || rest.disabled) return false;
      return showBottomCount && (_focused || _hovered);
    }, [showBottomCount, _focused, _hovered, rest.readOnly, rest.disabled]);

    const _isShowBottomCount = useMemo(() => {
      if (!isShowBottomCount || !rest.maxLength) return false;
      return true;
    }, [rest.maxLength, isShowBottomCount]);

    const showClearButton = useMemo(() => {
      return (
        !!_value && (_hovered || _focused) && !rest.disabled && !rest.readOnly
      );
    }, [_value, _hovered, _focused, rest.disabled, rest.readOnly]);

    const textAreaValue = useMemo(() => {
      if (rest.readOnly && showReadOnlyTip && !currentValue) {
        return "-";
      }
      return currentValue;
    }, [rest, showReadOnlyTip, currentValue]);

    const _onChange = useCallback(
      (event) => {
        if (onChange) {
          onChange(event);
        }
        setInnerValue(event.target.value || "");
      },
      [onChange]
    );

    const onClear = useCallback(() => {
      const event = new Event("onChange", { bubbles: true });
      const el = _inputRef?.current;
      if (el) {
        el.value = "";
        el.dispatchEvent(event);
        textAreaAnimationUpdate(el);
      }
      if (event.target) _onChange(event);
      setInnerValue("");
    }, [_onChange]);

    const _inputRef = useRef<HTMLTextAreaElement>();

    const _getRef = useCallback(
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
      [ref]
    );

    const _onFocus = useCallback(
      (e) => {
        if (onFocus) onFocus(e);
        setFocus(true);
      },
      [onFocus]
    );
    const _onBlur = useCallback(
      (e) => {
        if (onBlur) onBlur(e);
        setFocus(false);
      },
      [onBlur]
    );
    const _onMouseEnter = useCallback(
      (e) => {
        if (onMouseEnter) onMouseEnter(e);
        setHover(true);
      },
      [onMouseEnter]
    );
    const _onMouseLeave = useCallback(
      (e) => {
        if (onMouseLeave) onMouseLeave(e);
        setHover(false);
      },
      [onMouseLeave]
    );

    return (
      <S.Wrapper style={_WrapperStyle}>
        {/* title */}
        {showTopTitle && (
          <Label
            label={label}
            style={{ minHeight: 16 }}
            value={currentValue}
            maxLength={rest.maxLength}
            showCount={isShowTopCount}
            active={_focused || _hovered}
          />
        )}
        {/* input */}
        <S.Container
          focus={_focused}
          onMouseEnter={_onMouseEnter}
          onMouseLeave={_onMouseLeave}
          // onMouseEnter={setHover.bind(null, true)}
          // onMouseLeave={setHover.bind(null, false)}
          disabled={rest.disabled}
          readOnly={rest.readOnly}
          error={!!error}
        >
          <TextArea
            {...rest}
            style={{ ...style, width: "100%" }}
            value={textAreaValue}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            textAreaDefaultHeight={textAreaDefaultHeight}
            textAreaMaxHeight={textAreaMaxHeight}
            defaultUI={false}
            placeholder={rest.disabled || rest.readOnly ? "" : rest.placeholder}
            ref={_getRef}
          />
          {showClearButton ? (
            <S.ClearBtn onClick={onClear}></S.ClearBtn>
          ) : (
            <div style={{ width: 22 }}></div>
          )}
        </S.Container>
        {/* tip & error */}
        {showBottomTip && (
          <FlexRowWrapper align="space-between">
            <InfoBlock error={!!error} disabled={rest.disabled}>
              {error || tipMsg || ""}
            </InfoBlock>
            {_isShowBottomCount && (
              <S.BottomCount>
                {currentInputLength} / {rest.maxLength}
              </S.BottomCount>
            )}
          </FlexRowWrapper>
        )}
      </S.Wrapper>
    );
  }
);

export default FormTextArea;
