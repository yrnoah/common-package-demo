import React, {
  forwardRef,
  useCallback,
  useMemo,
  useState,
  useRef,
} from "react";
import styled, { css } from "styled-components";
import BaseInput, { commonInputStyle } from "../BaseInput";
import Label from "../../Label";
import { gridWidths } from "../../Form/constants";
import { InfoBlock } from "../../Form/styles.form";
import { Body2CSS } from "../../../styles/fonts";
import { FlexRow } from "../../../styles/common";
import { Neutral6, Neutral13 } from "../../../styles/colors";
import { IconCircleClose } from "../../../icons";
// types
import type { TFormColType } from "../../Form/typings";

export interface IFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  tipMsg?: string;
  colType?: TFormColType;
  wrapperStyle?: React.CSSProperties;
  hideCount?: boolean;
  prefixEl?: React.ReactNode;
  suffixEl?: React.ReactNode;
  canClear?: boolean;
  // tooltip config
  explanation?: React.ReactNode;
  explanationStyle?: React.CSSProperties; // tooltip wrapper style
  explanationIconSize?: number;
  // label props
  labelRightDes?: React.ReactNode;
  label?: string;
  labelNode?: React.ReactNode; // replace entire label element
}

const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  (
    {
      wrapperStyle = {},
      tipMsg,
      error,
      colType = "3-1-lg",
      style = {},
      onChange,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      hideCount,
      // tooltip config
      explanation,
      explanationStyle,
      explanationIconSize,
      // label props
      labelRightDes,
      label,
      labelNode,
      prefixEl,
      suffixEl,
      canClear = true,
      ...rest
    },
    ref
  ) => {
    const [_value, setInnerValue] = useState(rest.value || rest.defaultValue);
    const [_focused, setFocus] = useState(false);
    const [_hovered, setHover] = useState(false);
    const _inputRef = useRef<HTMLInputElement>(null);
    const isNumberInput = useMemo(() => rest.type === "number", [rest.type]);
    const width = style?.width || gridWidths[colType];
    const innerStyle: React.CSSProperties = useMemo(
      () => ({
        ...style,
        padding: 0,
        border: "none",
        height: "100%",
        flex: 1,
        backgroundColor: "transparent",
      }),
      [style]
    );
    const _WrapperStyle: React.CSSProperties = useMemo(
      () => ({ width, ...wrapperStyle }),
      [width, wrapperStyle]
    );
    const _onChange = useCallback(
      (e) => {
        if (!e) return;
        if (onChange) onChange(e);
        setInnerValue(e.target.value || "");
      },
      [onChange]
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
    const onClear = useCallback(() => {
      const event = new Event("onChange", { bubbles: true });
      const el =
        (ref as React.RefObject<HTMLInputElement>)?.current ||
        _inputRef?.current;
      if (el) {
        el.value = "";
        el.dispatchEvent(event);
        el.dispatchEvent(new Event("blur", { bubbles: true }));
      }
      if (event.target) _onChange(event);
      setInnerValue("");
    }, [_onChange, ref]);
    const showClearButton = useMemo(
      () =>
        canClear && _hovered && !!_value && !rest.disabled && !rest.readOnly,
      [_hovered, _value, canClear, rest.disabled, rest.readOnly]
    );
    return (
      <Wrapper style={_WrapperStyle}>
        {/* header (label) */}
        {!!labelNode && labelNode}
        {!labelNode && (
          <Label
            name={rest.name}
            label={label}
            required={rest.required}
            value={_value as string}
            maxLength={rest.maxLength}
            showCount={
              hideCount || rest.disabled || rest.readOnly
                ? false
                : _focused || _hovered
            }
            active={_focused || _hovered}
            explanation={explanation}
            explanationStyle={explanationStyle}
            explanationIconSize={explanationIconSize}
            rightDes={labelRightDes}
          />
        )}
        {/* input */}
        <Container
          focus={_focused}
          disabled={rest.disabled}
          readOnly={rest.readOnly}
          error={!!error}
          onMouseEnter={_onMouseEnter}
          onMouseLeave={_onMouseLeave}
          isForm
        >
          <PrefixWrapper disabled={rest.disabled}>
            {prefixEl}
            {!!prefixEl && <div style={{ width: 2 }} />}
          </PrefixWrapper>
          <BaseInput
            autoComplete="new-password"
            step={isNumberInput ? "any" : rest.step} // fix FF & Safari cannot accept decimal and float numbers
            {...rest}
            ref={ref || _inputRef}
            style={innerStyle}
            error={!!error}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            placeholder={rest.disabled || rest.readOnly ? "" : rest.placeholder}
          />
          <SuffixWrapper disabled={rest.disabled}>
            {showClearButton && <ClearBtn onClick={onClear} />}
            {!!suffixEl && <div style={{ width: 2 }} />}
            {suffixEl}
          </SuffixWrapper>
        </Container>
        {/* tip & error */}
        <InfoBlock error={!!error} disabled={rest.disabled}>
          {error || tipMsg || ""}
        </InfoBlock>
      </Wrapper>
    );
  }
);

export default FormInput;

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div<{
  focus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isForm?: boolean;
  error?: boolean;
}>`
  position: relative;
  width: 100%;
  ${FlexRow}
  ${commonInputStyle}
`;

const commonCoverWrapperStyle = css<{ disabled?: boolean }>`
  ${Body2CSS}
  ${FlexRow}
  align-items: center;
  box-sizing: border-box;
  color: ${(p) => (p.disabled ? Neutral6 : Neutral13)};
`;

const PrefixWrapper = styled.div`
  ${commonCoverWrapperStyle}
  padding-left: 8px;
`;
const SuffixWrapper = styled.div`
  ${commonCoverWrapperStyle}
  padding-right: 8px;
`;
const ClearBtn = styled(IconCircleClose)`
  width: 14px;
  height: 14px;
  margin-left: 2px;
  color: ${Neutral6};
  cursor: pointer;
`;
