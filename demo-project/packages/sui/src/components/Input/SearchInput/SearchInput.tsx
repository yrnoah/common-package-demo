import React, {
  useCallback,
  useMemo,
  useState,
  forwardRef,
  memo,
  useRef,
} from "react";
import * as S from "./styles.searchinput";
import { isKeyEnter } from "../../../utils/keyCode";
import { debounce } from "lodash";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * search layout size
   */
  wrapperSize?: "standard" | "large";
  /**
   * search layout style
   */
  wrapperStyle?: React.CSSProperties;
  defaultValue?: string;
  onSearch?: (v: string) => void;
  /**
   * replace container background color
   * @default Neutral1 #FFF
   * */
  defaultBgColor?: string;
  /**
   * replace default bg color
   * @default Neutral4 #F0F0F0
   * */
  defaultBorderColor?: string;
  /**
   * search delay time
   * @default 800
   * */
  delay?: number;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      wrapperSize = "standard",
      wrapperStyle,
      disabled,
      onChange,
      onFocus,
      onBlur,
      onKeyUp,
      onSearch,
      defaultBgColor,
      defaultBorderColor,
      delay = 800,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>();
    const onRefCallback = useCallback(
      (el: HTMLInputElement) => {
        if (inputRef && el) inputRef.current = el;
        if (ref && el) {
          if (typeof ref === "function") {
            ref(el);
            return;
          }
          ref.current = el;
        }
      },
      [inputRef, ref]
    );
    const [_input, setInput] = useState<string>(() => {
      if (typeof rest.value === "string") return rest.value;
      return rest.defaultValue || "";
    });
    const [_focused, setFocus] = useState<boolean>(false);
    const [_hover, setHover] = useState<boolean>(false);
    // const [_showClear, setShowClear] = useState<boolean>(false);

    const _showClear = useMemo(() => {
      if (!_input) return false;
      if (_focused || _hover) return true;
      return false;
    }, [_focused, _input, _hover]);

    // useEffect(() => {
    //   if (_focused) setShowClear(true);
    //   if (!_focused && _hover && !_input) setShowClear(false);
    //   if (!_focused && !_hover) setShowClear(false);
    // }, [_focused, _input, _hover]);

    const onClickSearch = useCallback(() => {
      if (disabled) {
        return;
      }
      if (onSearch) onSearch(_input);
    }, [_input, disabled, onSearch]);

    const handlerSearch = useRef(
      debounce((value: string) => {
        if (onSearch) onSearch(value);
      }, delay)
    ).current;

    const _onChange = useCallback(
      (e) => {
        if (!e) return;
        if (onChange) onChange(e);
        const value = e.target.value || "";
        setInput(value);
        if (onSearch && e.isTrusted && delay > 0) handlerSearch(value);
      },
      [onChange, onSearch, delay, handlerSearch]
    );

    const onClear = useCallback(
      (e: React.MouseEvent) => {
        if (disabled) {
          return;
        }
        const el = inputRef.current;
        const event = new Event("onChange", { bubbles: true });
        if (el) {
          el.value = "";
          el.dispatchEvent(event);
        }
        if (event.target) _onChange(event);
        setInput("");
        if (onSearch) onSearch("");
      },
      [_onChange, inputRef, disabled, onSearch]
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

    const _onKeyUp = useCallback(
      (e) => {
        if (disabled) {
          return;
        }
        if (onKeyUp) onKeyUp(e);
        if (isKeyEnter(e) && onSearch) {
          onSearch(_input);
        }
      },
      [_input, disabled, onKeyUp, onSearch]
    );

    return (
      <S.SearchLayout
        onMouseOver={setHover.bind(null, true)}
        onMouseLeave={setHover.bind(null, false)}
        style={wrapperStyle}
        defaultBgColor={defaultBgColor}
        defaultBorderColor={defaultBorderColor}
        size={wrapperSize}
        hasFocus={_focused}
      >
        <S.IconSearch onClick={onClickSearch} />
        <S.Input
          {...rest}
          ref={onRefCallback}
          onChange={_onChange}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onKeyUp={_onKeyUp}
          disabled={disabled}
        />
        {_showClear && <S.IconSearchClear onClick={onClear} />}
      </S.SearchLayout>
    );
  }
);

export default memo(SearchInput);
