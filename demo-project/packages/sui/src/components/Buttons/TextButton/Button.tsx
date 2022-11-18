import React, { forwardRef, useCallback } from "react";
import Loading from "../../Loading";
import type { TextButtonProps } from "../typing";
import * as S from "./styles.button";

const Button = forwardRef<HTMLAnchorElement, TextButtonProps>(
  (
    { loading, disabled, onClick, prefixEl, suffixEl, children, ...rest },
    ref
  ) => {
    const _disabled = loading || disabled;
    const showPrefixMargin = !!loading || !!prefixEl;
    const showSuffixMargin = !!suffixEl;
    const _onClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (_disabled) return;
        if (e) e.preventDefault();
        if (onClick) onClick(e);
      },
      [onClick, _disabled]
    );
    return (
      <S.ButtonWrapper
        {...rest}
        ref={ref}
        onClick={_onClick}
        disabled={_disabled}
      >
        <S.Content>
          {/* prefixEl & loading */}
          {loading && <Loading size={16} loading />}
          {!loading && !!prefixEl && prefixEl}
          {showPrefixMargin && <div style={{ width: 4 }} />}
          {/* children */}
          {children}
          {/* suffixEl */}
          {showSuffixMargin && <div style={{ width: 4 }} />}
          {!!suffixEl && suffixEl}
        </S.Content>
      </S.ButtonWrapper>
    );
  }
);

export default Button;
