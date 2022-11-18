import React, { forwardRef } from "react";
import Loading from "../../Loading";
import type { PrimaryButtonProps } from "../typing";
import * as S from "./styles.button";

const defaultFunc = () => null;

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    { loading, disabled, onClick, prefixEl, suffixEl, children, ...rest },
    ref
  ) => {
    const _disabled = loading || disabled;
    const showPrefixMargin = !!loading || !!prefixEl;
    const showSuffixMargin = !!suffixEl;
    return (
      <S.ButtonWrapper
        {...rest}
        ref={ref}
        onClick={_disabled ? defaultFunc : onClick}
        disabled={_disabled}
      >
        {/* prefixEl & loading */}
        {loading && <Loading size={16} loading />}
        {!loading && !!prefixEl && prefixEl}
        {showPrefixMargin && <div style={{ width: 4 }} />}
        {/* children */}
        {children}
        {/* suffixEl */}
        {showSuffixMargin && <div style={{ width: 4 }} />}
        {!!suffixEl && suffixEl}
      </S.ButtonWrapper>
    );
  }
);

export default PrimaryButton;
