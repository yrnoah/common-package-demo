import React, { useCallback, useMemo, useEffect, useState } from "react";
import styled from "styled-components";
import { useMeasure } from "react-use";
import { useIntl } from "react-intl";
import SuiLoading from "../../Loading";

import * as S from "./styles.table";
import { Neutral4, Neutral2 } from "../../../styles/colors";
import { BodyRegular } from "../../../styles/fonts";
import { FlexColumn } from "../../../styles/common";

import Pagination from "../Pagination";
import { Header } from "./Header";
import { TableItem } from "./RowItem";

import type { TSuiUnitType, TSuiTableColumns } from "./typings";

type rowKeyFunc = <T>(row: T) => string;

export const PaddingStyle: React.CSSProperties = {
  paddingLeft: 32,
  paddingRight: 32,
  boxSizing: "border-box",
};
export const VerticalLayoutTableHeaderStyle: React.CSSProperties = {
  height: 32,
  backgroundColor: Neutral2,
  borderTop: S.TableOutline,
  top: 0,
};
export const VerticalLayoutTableHeaderItemStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
};

export interface TSuiTableProps<T> {
  /** */
  columns: TSuiTableColumns[];
  /** */
  total?: number;
  /** */
  pageSize?: number;
  /** table content height, default is `unset` */
  scrollHeight?: number;
  /** */
  loading?: boolean;
  /** */
  ds: Array<T>;
  /** */
  onItemClick?: (data: T, index: number) => void;
  /** */
  curPage?: number;
  /** */
  onSetPage?: (v: number) => void;
  /** */
  onPageSizeChange?: (size: number) => void;
  /** */
  unitType?: TSuiUnitType;
  /**
   * set row item key, can be replace by other property of your row item, or make it by function like `rowKeyFunc = <T>(row: T) => string`
   * @default id
   */
  rowKey?: string | rowKeyFunc;
  /** */
  rowHeight?: number;
  /**
   * row bottom border margin left
   * @default 0
   */
  bottomBorderLeft?: number | string;
  /**
   * row bottom border margin right
   * @default 0
   */
  bottomBorderRight?: number | string;
  /** styles for table wrapper */
  wrapperStyle?: React.CSSProperties;
  /** Usually for update table, pass your reload function to it */
  listCallback?: (data: T) => void;
  /** disable table pagination and apply your self */
  disableFooter?: boolean;
  /** */
  currItemStyle?: React.CSSProperties;
  /** */
  currIndex?: number;
  /** */
  headerContainerStyle?: React.CSSProperties;
  /** */
  headerItemStyle?: React.CSSProperties;
  /** section header which will not sticky to top on scrolling */
  extraHeader?: React.ReactNode;
  /** replace none data text */
  noDataText?: string;
  /** container styles for none data & loading */
  noDataContainerStyles?: React.CSSProperties;
}

export default function Table<T>({
  columns,
  total,
  pageSize,
  scrollHeight,
  loading,
  ds,
  onItemClick,
  curPage,
  onSetPage,
  onPageSizeChange,
  unitType,
  rowKey,
  rowHeight,
  bottomBorderLeft,
  bottomBorderRight,
  wrapperStyle,
  listCallback,
  disableFooter,
  currItemStyle,
  currIndex,
  headerContainerStyle,
  headerItemStyle,
  extraHeader,
  noDataText,
  noDataContainerStyles,
}: TSuiTableProps<T>) {
  const { onScroll, isScrollRightBottom, scrollTop } = useScrollDetect();

  const ItemHeight = useMemo(() => {
    if (rowHeight && rowHeight > 0) return rowHeight;
    return S.ItemHeight;
  }, [rowHeight]);
  const refValue = React.useRef(null);
  const [ref, { width }] = useMeasure();
  const [extraHeaderRef, { height: extraHeight }] = useMeasure();
  const borderTop = useMemo(() => {
    if (!scrollTop) return extraHeight;
    return Math.max(extraHeight - scrollTop, 0);
  }, [scrollTop, extraHeight]);
  useEffect(() => {
    if (refValue.current) ref(refValue.current as unknown as HTMLElement);
  }, [ref, refValue, width]);
  const columnWidth = useMemo(
    () =>
      columns.reduce((pre, cur) => {
        let value = 0;
        if (typeof cur.width === "number") value = cur.width;
        if (typeof cur.width !== "number" && cur.minWidth) value = cur.minWidth;
        if (!value) value = 50;
        return pre + value;
      }, 0) +
      S.TablePadding * 2,
    [columns]
  );
  const isHorizontalScroll = useMemo(
    () => columnWidth > width,
    [columnWidth, width]
  );
  const totalWidth = useMemo(() => {
    return isHorizontalScroll ? columnWidth : "auto";
  }, [columnWidth, isHorizontalScroll]);

  const isNone = useMemo(() => !ds.length && !loading, [ds.length, loading]);
  const isLoading = useMemo(() => !ds.length && loading, [ds.length, loading]);
  const showPagination =
    !!total && !disableFooter && !!onSetPage && !!curPage && !!onPageSizeChange;
  return (
    <>
      <HorizontalTableWrapper style={wrapperStyle || PaddingStyle}>
        <S.HorizontalScrollWrapper
          ref={refValue}
          onScroll={onScroll}
          style={{
            maxHeight: scrollHeight ? scrollHeight + ItemHeight : "unset",
          }}
        >
          {!!extraHeader && (
            <ExtraContainer ref={(i) => !!i && extraHeaderRef(i)}>
              {extraHeader}
            </ExtraContainer>
          )}
          <Header
            columns={columns}
            width={totalWidth}
            unitType={unitType}
            isScrollRightBottom={isScrollRightBottom}
            hasData={!!ds.length}
            isHorizontalScroll={isHorizontalScroll}
            containerStyle={headerContainerStyle}
            itemStyle={headerItemStyle}
          />
          <S.TableContainer
            style={{
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "none",
              height: isNone || isLoading ? "100%" : undefined,
            }}
            isSticky={isNone || isLoading}
          >
            {isNone && (
              <NoneData text={noDataText} style={noDataContainerStyles} />
            )}
            {isLoading && <Loading style={noDataContainerStyles} />}
            <TableBody
              columns={columns}
              scrollHeight={scrollHeight}
              width={totalWidth}
              ds={ds}
              unitType={unitType}
              rowKey={rowKey}
              itemHeight={ItemHeight}
              bottomBorderLeft={bottomBorderLeft}
              bottomBorderRight={bottomBorderRight}
              onItemClick={onItemClick}
              listCallback={listCallback}
              isScrollRightBottom={isScrollRightBottom}
              isHorizontalScroll={isHorizontalScroll}
              currItemStyle={currItemStyle}
              currIndex={currIndex}
            />
          </S.TableContainer>
        </S.HorizontalScrollWrapper>
        <Border style={{ left: 32, top: borderTop }} />
        <Border style={{ right: 32, top: borderTop }} />
      </HorizontalTableWrapper>
      {showPagination && (
        <Pagination
          onSetPage={onSetPage}
          totalSize={total || 0}
          currentPage={curPage}
          pageSize={pageSize || 50}
          onPageSizeChange={onPageSizeChange}
        />
      )}
      {!showPagination && !disableFooter && (
        <div style={{ height: 48, borderTop: `1px solid ${Neutral4}` }} />
      )}
    </>
  );
}

const NoneData = React.memo(
  ({ text, style }: { text?: string; style?: React.CSSProperties }) => {
    const intl = useIntl();
    return (
      <S.FunctionWrapper style={style}>
        <BodyRegular style={{ color: "#000" }}>
          {text ||
            intl.formatMessage({
              defaultMessage: "There’s no data yet.",
            })}
        </BodyRegular>
      </S.FunctionWrapper>
    );
  }
);

const Loading = React.memo(({ style }: { style?: React.CSSProperties }) => (
  <S.FunctionWrapper style={style}>
    <SuiLoading loading size={20} />
  </S.FunctionWrapper>
));

interface TableBodyProps<T> {
  columns: TSuiTableColumns[];
  total?: number;
  pageSize?: number;
  ds: Array<T>;
  scrollHeight?: number;
  width: number | string;
  unitType?: TSuiUnitType;
  rowKey?: string | rowKeyFunc;
  itemHeight: number;
  bottomBorderLeft?: number | string;
  bottomBorderRight?: number | string;
  onItemClick?: (data: T, index: number) => void;
  listCallback?: (data: T) => void;
  isScrollRightBottom: boolean;
  isHorizontalScroll: boolean;
  currItemStyle?: React.CSSProperties;
  currIndex?: number | null;
}

function TableBody<T>({
  columns,
  width,
  ds,
  unitType,
  rowKey,
  itemHeight,
  bottomBorderLeft,
  bottomBorderRight,
  onItemClick,
  listCallback,
  isScrollRightBottom,
  isHorizontalScroll,
  currItemStyle,
  currIndex,
}: TableBodyProps<T>) {
  const [hoverIndex, setIndex] = useState<number | null>(null);
  const [currItemIndex, setCurrItemIndex] = useState(currIndex);
  const onSetIndex = useCallback((v) => setIndex(v), [setIndex]);
  const onRowClick = useCallback(
    (data, _index) => {
      setCurrItemIndex(_index);
      if (onItemClick) onItemClick(data, _index);
    },
    [onItemClick, setCurrItemIndex]
  );
  const rowStyle = useMemo(() => {
    const result: React.CSSProperties = {
      height: itemHeight,
      cursor: onItemClick ? "pointer" : "auto",
    };
    return result;
  }, [itemHeight, onItemClick]);

  const getKey = useCallback(
    (data: T) => {
      let key = "";
      if (!rowKey) key = (data as any).id;
      if (typeof rowKey === "string") key = (data as any)[rowKey];
      if (rowKey && typeof rowKey !== "string") key = rowKey(data);
      return key;
    },
    [rowKey]
  );

  return (
    <S.BodyContainer style={{ width }}>
      {ds.map((rowData, rowIndex) => {
        let key = "";
        key = getKey(rowData);
        return (
          <S.Row
            key={key}
            style={{
              ...rowStyle,
              ...(currItemStyle && currItemIndex === rowIndex
                ? currItemStyle
                : {}),
            }}
            bottomBorderLeft={bottomBorderLeft}
            bottomBorderRight={bottomBorderRight}
            onMouseEnter={onSetIndex.bind(null, rowIndex)}
            onMouseLeave={onSetIndex.bind(null, null)}
            isSiblingHover={!!onItemClick && hoverIndex === rowIndex + 1}
            isHover={!!onItemClick && hoverIndex === rowIndex}
            onClick={onRowClick.bind(null, rowData, rowIndex)}
          >
            {columns.map((v) => (
              <TableItem
                key={v.key + key}
                column={v}
                rowData={rowData}
                unitType={unitType}
                isScrollRightBottom={isScrollRightBottom}
                isHorizontalScroll={isHorizontalScroll}
                listCallback={listCallback}
                isHover={!!onItemClick && hoverIndex === rowIndex}
                setRightClickCopy={v.setRightClickCopy}
              />
            ))}
          </S.Row>
        );
      })}
    </S.BodyContainer>
  );
}
const HorizontalTableWrapper = styled.div`
  ${FlexColumn}
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  ${S.HorizontalScrollWrapper} {
    flex: 1;
    border: none;
  }
`;

const ExtraContainer = styled.div`
  flex: none;
  width: 100%;
  position: sticky;
  left: 0;
  overflow: hidden;
`;

const Border = styled.div`
  position: absolute;
  width: 1px;
  bottom: 0;
  background-color: ${Neutral4};
  z-index: 2;
  will-change: top;
`;

function useScrollDetect() {
  const [isScrollRightBottom, setScrollToRightBottom] = useState(false);
  const [_scrollTop, setScrollTop] = useState(0);
  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!(e && e.target)) return;
      const { target } = e;
      const { scrollWidth, scrollLeft, clientWidth, scrollTop } =
        target as HTMLDivElement;
      setScrollTop(scrollTop);
      const curIsScrollToRightBottom = scrollWidth - scrollLeft === clientWidth;
      if (curIsScrollToRightBottom !== isScrollRightBottom)
        setScrollToRightBottom(curIsScrollToRightBottom);
    },
    [isScrollRightBottom]
  );
  return {
    onScroll,
    isScrollRightBottom,
    scrollTop: _scrollTop,
  };
}
