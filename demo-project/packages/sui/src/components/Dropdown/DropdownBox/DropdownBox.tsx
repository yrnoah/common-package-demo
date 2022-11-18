import { useState, useMemo, useEffect, useCallback, memo } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import * as ReactWaypoint from "react-waypoint";
import { Dropdown, ISuiDropdownProps } from "../Dropdown";
import {
  BaseInput,
  errorStyle,
  readOnlyStyle,
  disableStyle,
  SearchInput,
} from "../../Input";
import { toObject } from "../../../utils/index";
import { useCurrent } from "../../../hooks";
import { gridWidths } from "../../Form/constants";
import { InfoBlock } from "../../Form/styles.form";
import {
  Neutral13,
  Neutral7,
  Neutral6,
  Neutral3,
  Neutral2,
  Neutral4,
} from "../../../styles/colors";
import * as S from "../styles.dropdown";
// typing
import type { TFormColType } from "../../Form/typings";
import type { TSuiDropdownOption } from "../typings";

const { Waypoint } = ReactWaypoint;

export type TSuiDropdownBoxOption = TSuiDropdownOption;
/**
 * dropdown "position"
 * consider with the design that options' width is equal to trigger's, currently will not pick "position" from ISuiDropdownProps as props
 */
export interface ISuiDropdownBoxProps<T extends TSuiDropdownBoxOption>
  extends Pick<
    ISuiDropdownProps,
    | "style"
    | "overlayContainerStyle"
    | "disableAutoDismiss"
    | "disableAnimation"
  > {
  /**
   * default selected, key of one option
   */
  defaultValue?: string;
  /**
   * default label text
   */
  defaultLabel?: string;
  /** the key of selected option */
  selected?: string;
  /**
   * data source for options.
   * TSuiDropdownBoxOption: T extends { key: string; name: string; isTitle?: boolean; }
   */
  ds?: T[];
  /** param v: T extends TSuiDropdownBoxOption */
  onChange?: (v: T) => void;
  /**
   * follow design grid system
   * @default 3-1-lg (233px)
   */
  colType?: TFormColType;
  /**
   * control view mode style
   * @default false
   */
  viewMode?: boolean;
  /**
   * control disabled style
   * @default false
   */
  disabled?: boolean;
  /** error message  */
  error?: string;
  /** HTML Attributes for trigger's div wrapper, prepare for later need */
  // triggerWrapperAttributes?: React.HTMLAttributes<HTMLDivElement>;
  /** input Attributes for trigger's input element, which display selected value, prepare for later need */
  // triggerInputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
  /** display search bar  */
  canSearch?: boolean;
  /** placeholder for search input  */
  placeholder?: string;
  /** default value for search input  */
  defaultKeyword?: string;
  /** callback of search input  */
  onSearch?: (keyword: string) => void;
  /** scroll event callback for options */
  onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
  /** callback of scroll to bottom */
  onScrollToBottom?: (e: ReactWaypoint.Waypoint.CallbackArgs) => void;
  /**
   * placeholder element when scroll to bottom
   * @default <div />
   */
  scrollToBottomPlaceholder?: React.ReactNode;
  /** add styles to search cancel button */
  searchBarCancelButtonStyles?: React.CSSProperties;
  /** add styles to search input container */
  searchInputStyles?: React.CSSProperties;
  /** add styles to option item, which can also be done with the styles in data source item */
  optionsStyles?: React.CSSProperties;
  /** add styles to title option item, which can also be done with the styles in data source item */
  titleOptionsStyles?: React.CSSProperties;
  /**
   * set to display or not display the title options when searching
   * @default false
   */
  shouldSearchIncludeTitle?: boolean;
  /**
   * input border color
   * @default Neutral4
   */
  borderColor?: string;
  /**
   * help text
   */
  helpText?: string;
}

export interface ISuiDropdownBoxOverlayProps<T extends TSuiDropdownBoxOption>
  extends Pick<
    ISuiDropdownBoxProps<T>,
    | "ds"
    | "onChange"
    | "colType"
    | "selected"
    | "canSearch"
    | "placeholder"
    | "onSearch"
    | "onScroll"
    | "onScrollToBottom"
    | "scrollToBottomPlaceholder"
    | "searchBarCancelButtonStyles"
    | "searchInputStyles"
    | "shouldSearchIncludeTitle"
    | "optionsStyles"
    | "titleOptionsStyles"
  > {
  keyword: string;
  onCancel: () => void;
}

export function DropdownBox<T extends TSuiDropdownBoxOption>(
  props: ISuiDropdownBoxProps<T>
) {
  const {
    defaultValue,
    selected,
    onChange,
    ds,
    colType = "3-1-lg",
    viewMode,
    disabled,
    error,
    defaultLabel,
    canSearch,
    placeholder,
    defaultKeyword,
    onSearch,
    onScroll,
    onScrollToBottom,
    scrollToBottomPlaceholder,
    searchBarCancelButtonStyles,
    searchInputStyles,
    shouldSearchIncludeTitle = false,
    optionsStyles,
    titleOptionsStyles,
    borderColor = Neutral4,
    helpText,
    // triggerWrapperAttributes,
    // triggerInputAttributes,
    ...rest
  } = props;
  const intl = useIntl();
  const callbackRef = useCurrent(onChange);
  const [visible, setVisible] = useState(false);
  const [keyword, setKeyword] = useState(defaultKeyword || "");
  const onSearchInput = useCallback(
    (v: string) => {
      if (onSearch) onSearch(v);
      setKeyword(v);
    },
    [onSearch]
  );
  const onSearchCancel = useCallback(() => {
    setVisible(false);
    setKeyword("");
  }, []);
  useEffect(() => {
    if (disabled || viewMode) setVisible(false);
  }, [disabled, viewMode]);
  const toggleVisible = useCallback(() => {
    if (viewMode || disabled) return;
    setVisible((v) => !v);
  }, [viewMode, disabled]);
  // sync state from auto dismiss
  const onVisibleChange = useCallback(
    (v?: boolean) => {
      if (viewMode || disabled) return;
      setVisible(!!v);
    },
    [disabled, viewMode]
  );
  const [_selected, setSelected] = useState<string>(
    selected || defaultValue || ""
  );
  // sync _selected value from props;
  useEffect(() => {
    setSelected(selected || "");
  }, [selected]);
  const dsDict = useMemo(() => {
    if (!ds || !Array.isArray(ds)) return {};
    return toObject(ds, (i: T) => i.key);
  }, [ds]);
  const onSelect = useCallback(
    (v) => {
      setVisible(false);
      setSelected(v.key);
      if (callbackRef.current) callbackRef.current(v);
    },
    [callbackRef]
  );
  const buttonLabel = useMemo(() => {
    if (dsDict[_selected]) return dsDict[_selected].name;
    if (_selected) return _selected;
    return defaultLabel || intl.formatMessage({ defaultMessage: "Select" });
  }, [_selected, intl, dsDict, defaultLabel]);
  const triggerWidth = gridWidths[colType] || "auto";
  const _ds = useMemo(() => {
    if (keyword && !!ds)
      return ds.filter((v) => {
        if (v.isTitle) return !!shouldSearchIncludeTitle;
        return v.name
          .toLocaleLowerCase()
          .match(keyword.toLocaleLowerCase().replace(/(.)(?=.)/g, "$1"));
      });
    return ds;
  }, [ds, keyword, shouldSearchIncludeTitle]);

  const InfoBlockView = () => {
    if (viewMode) return undefined;
    if (!!error && !disabled) return <InfoBlock error>{error}</InfoBlock>;
    else if (!!helpText)
      return <InfoBlock disabled={disabled}>{helpText}</InfoBlock>;
    else return undefined;
  };

  return (
    <Dropdown
      {...rest}
      visible={visible}
      onVisibleChange={onVisibleChange}
      overlay={
        <Overlay
          ds={_ds}
          selected={_selected}
          onChange={onSelect}
          colType={colType}
          canSearch={canSearch}
          placeholder={placeholder}
          keyword={keyword}
          onSearch={onSearchInput}
          onCancel={onSearchCancel}
          onScroll={onScroll}
          onScrollToBottom={onScrollToBottom}
          scrollToBottomPlaceholder={scrollToBottomPlaceholder}
          searchBarCancelButtonStyles={searchBarCancelButtonStyles}
          searchInputStyles={searchInputStyles}
          optionsStyles={optionsStyles}
          titleOptionsStyles={titleOptionsStyles}
        />
      }
    >
      <TriggerWrapper
        // {...(triggerWrapperAttributes || {})}
        style={{ width: triggerWidth }}
        onClick={toggleVisible}
        viewMode={viewMode}
        disabled={disabled}
        error={!!error}
        borderColor={borderColor}
      >
        <BaseInput
          // {...triggerInputAttributes}
          value={buttonLabel}
          readOnly
          disabled={disabled}
          style={{ width: "100%" }}
          type="text"
        />
        {(!viewMode || disabled) && <S.StatusIcon $active={visible} />}
        {/* error */}
        {/**
         * Usually, a function dropdown box won't have error messages.
         * So here just put it with a absolute position layout, and please control bottom margin with your own style config.
         * Feel free to refactor wrapper if you need.
         */}
        {InfoBlockView()}
      </TriggerWrapper>
    </Dropdown>
  );
}

function RawOverlay<T extends TSuiDropdownBoxOption>({
  ds,
  selected,
  onChange,
  colType = "3-1-lg",
  canSearch,
  keyword,
  onSearch,
  placeholder,
  onCancel,
  onScroll,
  onScrollToBottom,
  scrollToBottomPlaceholder,
  searchBarCancelButtonStyles,
  searchInputStyles,
  optionsStyles,
  titleOptionsStyles,
}: ISuiDropdownBoxOverlayProps<T>) {
  const intl = useIntl();
  const onClick = useCallback(
    (v: T) => {
      if (!onChange) return;
      onChange(v);
    },
    [onChange]
  );
  const width = gridWidths[colType] || "auto";

  return (
    <S.OptionsWrapper style={{ width }} onScroll={onScroll}>
      {!!ds && !!canSearch && (
        <SearchBar
          keyword={keyword}
          onSearch={onSearch}
          placeholder={placeholder}
          onCancel={onCancel}
          buttonStyles={searchBarCancelButtonStyles}
          wrapperStyles={searchInputStyles}
        />
      )}
      {!!ds &&
        ds.map((v: T) => (
          <Option
            item={v}
            key={v.key}
            active={selected === v.key}
            onClick={v.isTitle ? undefined : onClick.bind(null, v)}
            keyword={keyword}
            styles={v.isTitle ? titleOptionsStyles : optionsStyles}
          />
        ))}
      {!ds?.length && (
        <S.NoResult>
          {intl.formatMessage({ defaultMessage: "No Results" })}
        </S.NoResult>
      )}
      {!!onScrollToBottom && (
        <Waypoint onEnter={onScrollToBottom}>
          <div>{scrollToBottomPlaceholder}</div>
        </Waypoint>
      )}
    </S.OptionsWrapper>
  );
}

const Overlay = memo(RawOverlay);

interface IDropdownBoxOptionItemProps<T extends TSuiDropdownBoxOption> {
  item: T;
  active?: boolean;
  onClick?: () => void;
  keyword?: string;
  styles?: React.CSSProperties;
}

function Option<T extends TSuiDropdownBoxOption>({
  item,
  active,
  onClick,
  keyword,
  styles,
}: IDropdownBoxOptionItemProps<T>) {
  const formatName = useMemo(() => {
    if (keyword && !item.isTitle) {
      const arr = item.name
        .toLocaleLowerCase()
        .split(keyword.toLocaleLowerCase().replace(/(.)(?=.)/g, "$1"));
      const formatArr: Array<{ text: string; highlight: boolean }> = [];
      let curIndex = 0;
      let preIsKeyword = false;
      arr.forEach((v) => {
        let toIndex = curIndex;
        if (!preIsKeyword && !!curIndex) {
          toIndex = curIndex + keyword.length;
          formatArr.push({
            text: item.name.slice(curIndex, toIndex),
            highlight: true,
          });
          curIndex = toIndex;
        }
        if (!v.length) {
          toIndex = curIndex + keyword.length;
          formatArr.push({
            text: item.name.slice(curIndex, toIndex),
            highlight: true,
          });
          preIsKeyword = true;
        }
        if (!!v.length) {
          preIsKeyword = false;
          toIndex = curIndex + v.length;
          formatArr.push({
            text: item.name.slice(curIndex, toIndex),
            highlight: false,
          });
        }
        curIndex = toIndex;
      });
      return formatArr
        .filter((v) => !!v.text)
        .map((v) => (
          <span
            style={{
              color: v.highlight ? Neutral13 : Neutral7,
              fontWeight: v.highlight ? 700 : 400,
            }}
          >
            {v.text}
          </span>
        ));
    }
    return item.name;
  }, [item, keyword]);
  return (
    <S.Option
      style={item.styles || styles}
      isTitle={item.isTitle}
      active={active}
      onClickCapture={onClick}
    >
      {formatName}
      {active && <S.ActiveIcon />}
    </S.Option>
  );
}

export interface ISearchBarProps {
  placeholder?: string;
  keyword?: string;
  onSearch?: (keyword: string) => void;
  onCancel: () => void;
  buttonStyles?: React.CSSProperties;
  wrapperStyles?: React.CSSProperties;
}

const searchInputStyles: React.CSSProperties = {
  width: "100%",
  borderRadius: 4,
  height: 40,
};

function SearchBar({
  placeholder,
  keyword,
  onSearch,
  onCancel,
  buttonStyles,
  wrapperStyles,
}: ISearchBarProps) {
  const intl = useIntl();
  const styles = useMemo(
    () => ({ ...searchInputStyles, ...(wrapperStyles || {}) }),
    [wrapperStyles]
  );
  return (
    <S.SearchBar>
      <SearchInput
        wrapperStyle={styles}
        defaultBgColor={Neutral2}
        defaultBorderColor={Neutral2}
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => {
          onSearch && onSearch(e.target.value);
        }}
      />
      {!!keyword && (
        <S.CancelButton onClick={onCancel} style={buttonStyles}>
          {intl.formatMessage({ defaultMessage: "Cancel" })}
        </S.CancelButton>
      )}
    </S.SearchBar>
  );
}

const TriggerWrapper = styled.div<{
  viewMode?: boolean;
  disabled?: boolean;
  error?: boolean;
  borderColor?: string;
}>`
  position: relative;
  user-select: ${(p) => {
    if (p.viewMode || p.disabled) return "auto";
    return "none";
  }};
  ${BaseInput} {
    padding-right: ${(p) => (p.viewMode && !p.disabled ? undefined : "32px")};
    user-select: ${(p) => {
      if (p.viewMode || p.disabled) return "auto";
      return "none";
    }};
    border: 1px solid ${(p) => p.borderColor};
    cursor: ${(p) => {
      if (p.disabled) return "not-allowed";
      return p.viewMode ? "auto" : "pointer";
    }};
    &:focus {
      border: 1px solid ${Neutral3};
    }
    &:hover {
      border: 1px solid ${Neutral6};
      background-color: ${Neutral2};
    }
    &:disabled {
      ${disableStyle}
    }

    ${(p) => (p.error && !p.disabled && !p.viewMode ? errorStyle : undefined)}
    ${(p) => (p.viewMode && !p.disabled ? readOnlyStyle : undefined)}
  }
  ${S.StatusIcon} {
    position: absolute;
    top: 50%;
    right: 8px;
    margin-top: -8px;
    pointer-events: none;
    color: ${(p) => (p.disabled ? Neutral6 : Neutral13)};
  }
  ${InfoBlock} {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    pointer-events: none;
  }
`;
