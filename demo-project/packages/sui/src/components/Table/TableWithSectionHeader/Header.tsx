import React, { useCallback } from "react";

import {
  Header as SHeader,
  TableHeaderItem,
  HeaderDes,
  StickyHeaderShadow,
} from "./styles.table";
import { PrimaryCream2, Neutral4 } from "../../../styles/colors";
import Tooltip from "../../Tooltip";

import type { TSuiUnitType, TSuiTableColumns } from "./typings";

export interface ISuiTableWithSectionsHeaderProps {
  columns: TSuiTableColumns[];
  width: number | string;
  /** minute or hour */
  unitType?: TSuiUnitType;
  /** fix sticky column styles, if not true, there will be some styles applied to the item */
  isScrollRightBottom?: boolean;
  /** fix sticky column styles, if true, there will be some styles applied to the item */
  hasData?: boolean;
  /** fix sticky column styles, if true, there will be some styles applied to the item */
  isHorizontalScroll: boolean;
  /** custom styles to header container */
  containerStyle?: React.CSSProperties;
  /** custom styles to header item */
  itemStyle?: React.CSSProperties;
}

const HeaderComponent = ({
  columns,
  width,
  isScrollRightBottom,
  hasData,
  isHorizontalScroll,
  containerStyle,
  itemStyle,
}: ISuiTableWithSectionsHeaderProps) => {
  const getStyle = useCallback(
    (v: TSuiTableColumns) => {
      const isSticky = v.style?.position === "sticky" && isHorizontalScroll;
      return {
        ...(v.style || {}),
        width: v.width || "auto",
        minWidth: v.minWidth || "initial",
        height: v.titleComponent || isSticky ? "100%" : "auto",
        backgroundColor: isSticky ? PrimaryCream2 : undefined,
        borderBottom:
          isSticky && !isScrollRightBottom && hasData
            ? `1px solid ${Neutral4}`
            : undefined,
        boxShadow:
          isSticky && !isScrollRightBottom && hasData
            ? StickyHeaderShadow
            : undefined,
        ...(itemStyle || {}),
      };
    },
    [isHorizontalScroll, isScrollRightBottom, hasData, itemStyle]
  );
  return (
    <>
      <SHeader
        style={{
          width,
          ...(containerStyle || {}),
        }}
        sticky
      >
        {columns.map((v) => (
          <TableHeaderItem
            key={v.key}
            style={getStyle(v)}
            flex={v.flex || (v.width ? "none" : 1)}
            align={v.align || "left"}
          >
            {!v.titleComponent && v.title}
            {!!v.titleComponent && (
              <v.titleComponent
                text={v.title}
                callback={v.titleAction}
                defaultSort={v.defaultSort}
              />
            )}
            {!!v.explanation && (
              <Tooltip
                text={v.explanation}
                style={v.explanationStyle}
                wrapperStyle={{ marginLeft: 4 }}
              />
            )}
            {!!v.headerDes && <HeaderDes>{v.headerDes}</HeaderDes>}
          </TableHeaderItem>
        ))}
      </SHeader>
    </>
  );
};

export const Header = React.memo(HeaderComponent);
