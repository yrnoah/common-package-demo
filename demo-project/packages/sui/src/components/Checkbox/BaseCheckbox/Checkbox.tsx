import React, { memo, forwardRef, useCallback, useMemo, useState } from "react";
import { useCurrent } from "../../../hooks";
import * as S from "./styles.checkbox";
import type { CheckboxProps } from "../typing";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate, size, onChange, style, ...rest }, ref) => {
    // inner status
    // if rest.checked has boolean value, use parent's callback to update status
    const [checked, setChecked] = useState(rest.defaultChecked || rest.checked);
    const curCheckedRef = useCurrent(checked);
    const wrapperStyle = useMemo(() => {
      let s = style ? style : {};
      if (size) return { ...s, width: size, height: size };
      return s;
    }, [size, style]);
    const onInnerChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e) return;
        if (rest.readOnly || rest.disabled) return;
        if (onChange) onChange(e);
        // rest.checked has value, use parent's callback to update status
        if (typeof rest.checked !== "boolean") setChecked(e.target.checked);
      },
      [onChange, rest.checked, rest.disabled, rest.readOnly]
    );
    // update checked from props
    React.useEffect(() => {
      if (
        typeof rest.checked === "boolean" &&
        rest.checked !== curCheckedRef.current
      )
        setChecked(rest.checked);
    }, [curCheckedRef, rest.checked]);
    return (
      <S.Container
        style={wrapperStyle}
        checked={checked}
        disabled={rest.disabled}
        readOnly={rest.readOnly}
        indeterminate={indeterminate}
      >
        <S.InnerBox
          checked={checked}
          disabled={rest.disabled}
          readOnly={rest.readOnly}
          indeterminate={indeterminate}
        >
          {!indeterminate && checked && <S.IconCorrect />}
          {indeterminate && <S.IconIndeterminate />}
        </S.InnerBox>
        <input {...rest} type="checkbox" ref={ref} onChange={onInnerChange} />
      </S.Container>
    );
  }
);
export default memo(Checkbox);
