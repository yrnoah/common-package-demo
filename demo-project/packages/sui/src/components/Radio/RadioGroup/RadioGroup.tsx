import React, {
  useCallback,
  useState,
  forwardRef,
  memo,
  useEffect,
} from "react";
import Radio from "../BaseRadio";
import styled from "styled-components";
import { Checkbox } from "../../Checkbox";
import { useCurrent } from "../../../hooks";
// styles
import { Text, Wrapper as RadioWrapper } from "../BaseRadio/styles.radio";
import { FlexRow } from "../../../styles/common";

interface IRadioGroupOption {
  disabled?: boolean;
  text?: string;
  key: string;
}

interface RadioGroupProps {
  options?: IRadioGroupOption[];
  disabled?: boolean;
  checked?: string;
  defaultChecked?: string;
  onChange?: (key: string, checked: boolean) => void;
  name?: string;
  wrapperStyle?: React.CSSProperties;
  textAddonBefore?: string;
  textAddonBeforeWidth?: number;
  canClear?: boolean;
  readOnly?: boolean;
  isVertical?: boolean;
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      options,
      disabled,
      defaultChecked,
      checked,
      onChange,
      name,
      wrapperStyle,
      textAddonBefore,
      textAddonBeforeWidth,
      canClear,
      readOnly,
      isVertical,
    },
    ref
  ) => {
    const [_checked, setChecked] = useState(defaultChecked || checked);
    const curActiveRef = useCurrent(_checked);
    const onGroupChange = useCallback(
      (targetKey, targetChecked) => {
        if (targetChecked) {
          if (typeof checked !== "string") setChecked(targetKey);
          if (onChange) onChange(targetKey, targetChecked);
        }
      },
      [checked, onChange]
    );
    // update active from props
    useEffect(() => {
      if (typeof checked === "string" && checked !== curActiveRef.current)
        setChecked(checked);
    }, [curActiveRef, checked]);
    return (
      <>
        {!!name && !!ref && (
          <input value={_checked || ""} ref={ref} name={name} type="hidden" />
        )}
        <Wrapper isVertical={isVertical} style={wrapperStyle}>
          {canClear && !!options?.length && (
            <Checkbox
              checked={!!_checked}
              readOnly={readOnly}
              style={{ marginRight: 8 }}
              onChange={(e) =>
                !_checked
                  ? onGroupChange(options[0].key, true)
                  : onGroupChange("", true)
              }
            />
          )}
          {!!textAddonBefore && (
            <Text
              style={{
                width: textAddonBeforeWidth || 120,
                position: "relative",
                top: 2,
                marginLeft: 0,
              }}
            >
              {textAddonBefore}
            </Text>
          )}
          {options?.map((i) => (
            <Radio
              text={i.text}
              key={i.key}
              radioKey={i.key}
              checked={_checked === i.key}
              onChange={onGroupChange}
              isGroup={true}
              disabled={disabled || i.disabled}
              readOnly={readOnly}
            />
          ))}
        </Wrapper>
      </>
    );
  }
);
export default memo(RadioGroup);

const Wrapper = styled.div<{ isVertical?: boolean }>`
  ${FlexRow}
  flex-wrap: wrap;
  justify-content: flex-start;
  ${(p) => (p.isVertical ? "display: block;" : "")}
  ${RadioWrapper} {
    &:not(:last-child) {
      margin-right: 4px;
      ${(p) => (p.isVertical ? "margin-bottom: 4px;" : "")}
    }
  }
`;
