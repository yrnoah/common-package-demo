import React, { forwardRef } from "react";
import { PillButtonWrapper } from "./styles.button";
import type { PillButtonProps } from "../typing";

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  (props, ref) => {
    return (
      <PillButtonWrapper {...props} ref={ref}>
        {props.children}
      </PillButtonWrapper>
    );
  }
);

export default PillButton;
