import React, { forwardRef } from "react";
import Loading from "../../Loading";
import Tooltip from "../../Tooltip";
import type { IconButtonProps } from "../typing";
import * as S from "./styles.button";

const defaultFunc = () => null;

const Button = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ tooltip, ...props }, ref) => {
    if (tooltip)
      return (
        <Tooltip text={tooltip}>
          <ButtonContent {...props} ref={ref} />
        </Tooltip>
      );
    return <ButtonContent {...props} ref={ref} />;
  }
);

export default Button;

const ButtonContent = forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "tooltip">
>(({ loading, disabled, onClick, children, ...rest }, ref) => {
  const _disabled = loading || disabled;
  return (
    <S.ButtonWrapper
      {...rest}
      ref={ref}
      onClick={_disabled ? defaultFunc : onClick}
      disabled={_disabled}
    >
      {loading ? <Loading size={16} loading /> : children}
    </S.ButtonWrapper>
  );
});
