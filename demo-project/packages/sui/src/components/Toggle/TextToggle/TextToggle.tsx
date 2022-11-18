import React, { forwardRef, useState, useCallback, useEffect } from "react";
import type { TextToggleProps } from "../typing";
import TextButton from "../Text";
import { DivWrapper } from "../styles.toggle";

const TextToggle = forwardRef<HTMLDivElement, TextToggleProps>(
  ({ options, selectItem, containerStyles, buttonStyles, onChange }, ref) => {
    const [_selected, setSelected] = useState(selectItem);

    const _onClick = useCallback(
      (item) => {
        setSelected(item);
        if (onChange) onChange(item);
      },
      [onChange]
    );

    useEffect(() => {
      setSelected((v) => {
        return v?.key === selectItem?.key ? v : selectItem;
      });
    }, [selectItem]);

    return (
      <DivWrapper ref={ref} style={containerStyles}>
        {options?.map((option) => {
          return (
            <TextButton
              id={option.key}
              style={buttonStyles}
              selected={_selected?.key === option.key}
              onClick={() => {
                _onClick(option);
              }}
              key={option.key}
            >
              {option.title}
            </TextButton>
          );
        })}
      </DivWrapper>
    );
  }
);

export default TextToggle;
