import { useMemo, useCallback, useState } from "react";
import { useIntl } from "react-intl";
import useCopyToClip from "../../../hooks/useCopy";

import * as S from "./styles.table";
import { Neutral2 } from "../../../styles/colors";

import type { TSuiUnitType, TSuiTableColumns } from "./typings";

interface ISuiTableWithSectionsTableRowProps {
  column: TSuiTableColumns;
  rowData: any;
  unitType?: TSuiUnitType;
  isScrollRightBottom: boolean;
  isHorizontalScroll: boolean;
  listCallback?: (data: any) => void;
  isHover?: boolean;
  setRightClickCopy?: boolean;
}

export function TableItem({
  column,
  rowData,
  unitType,
  isScrollRightBottom,
  listCallback,
  isHorizontalScroll,
  isHover,
  setRightClickCopy = false,
}: ISuiTableWithSectionsTableRowProps) {
  const intl = useIntl();
  const content = useMemo(() => {
    let result = (rowData as any)[column.key] || "";
    if (column.render) {
      result =
        column.render((rowData as any)[column.key], rowData, listCallback) ||
        "";
    }
    if (column.format && unitType) {
      result = column.format(result, unitType) || "";
    }
    return typeof result === "string" ? (
      <S.TableText>{result || "-"}</S.TableText>
    ) : (
      result || "-"
    );
  }, [column, rowData, unitType, listCallback]);
  const showStickShadow = useMemo(
    () =>
      !isScrollRightBottom &&
      column.style &&
      isHorizontalScroll &&
      column.style.position === "sticky",
    [column.style, isHorizontalScroll, isScrollRightBottom]
  );
  const backgroundColor = useMemo(() => {
    if (column.style?.position === "sticky") {
      if (isHover) return Neutral2;
      return "#fff";
    }
    return undefined;
  }, [column.style?.position, isHover]);

  const { onCopyToClip } = useCopyToClip();
  const [currentObj, setCurrentObj] = useState<{
    innerText: string;
    x: number;
    y: number;
  }>({
    innerText: "",
    x: 0,
    y: 0,
  });
  const handleRightClick = useCallback(
    (e) => {
      if (e.buttons === 2 && setRightClickCopy) {
        e.preventDefault();
        e.stopPropagation();
        setCurrentObj({
          x: e.clientX,
          y: e.clientY,
          innerText: e.target.innerText,
        });
      }
    },
    [setRightClickCopy]
  );

  const onClickClip = useCallback(() => {
    onCopyToClip(currentObj.innerText);
  }, [currentObj.innerText, onCopyToClip]);

  const hiddenBgHandle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentObj({
      innerText: "",
      x: 0,
      y: 0,
    });
  }, []);

  const RightMenuNode = useMemo(() => {
    if (!setRightClickCopy) return null;
    return (
      <S.RightMenuWrapper
        onClick={hiddenBgHandle}
        onContextMenu={hiddenBgHandle}
        show={!!currentObj.innerText}
      >
        <S.RightMenuItem
          top={currentObj.y + 10}
          left={currentObj.x + 50}
          onClick={onClickClip}
        >
          {intl.formatMessage({ defaultMessage: "Copy" })}
        </S.RightMenuItem>
      </S.RightMenuWrapper>
    );
  }, [
    setRightClickCopy,
    hiddenBgHandle,
    currentObj.innerText,
    currentObj.y,
    currentObj.x,
    onClickClip,
    intl,
  ]);

  return (
    <S.TableItemWrapper
      key={column.key + rowData.id}
      style={{
        backgroundColor,
        ...(column.style || {}),
        width: column.width || "auto",
        minWidth: column.minWidth || "initial",
        position: isHorizontalScroll ? column.style?.position : "relative",
      }}
      flex={column.flex || (column.width ? "none" : 1)}
      align={column.align || "left"}
      showStickShadow={showStickShadow}
      onContextMenu={handleRightClick}
    >
      {RightMenuNode}
      {content}
    </S.TableItemWrapper>
  );
}
