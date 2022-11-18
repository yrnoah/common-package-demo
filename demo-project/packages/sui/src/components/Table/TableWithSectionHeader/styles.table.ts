import styled, { css } from "styled-components";

import {
  AlignConfig,
  FlexColumn,
  FlexRow,
  FlexCenter,
} from "../../../styles/common";
import { BodyCSS, Roboto } from "../../../styles/fonts";
import * as C from "../../../styles/colors";

export const HeaderHeight = 52;
export const ItemHeight = 56;
export const FooterHeight = 48;
export const TablePadding = 16;
export const StickyShadow =
  "0px 0px 0px rgba(255, 255, 255, 0.8), -2px 0 5px rgb(0, 0, 0, 0.08)";
export const StickyHeaderShadow = "-2px 0 5px rgb(0, 0, 0, 0.08)";
export const TableOutline = `1px solid ${C.Neutral4}`;

interface TableContainerProps {
  isSticky?: boolean;
}

export const TableContainer = styled.div<TableContainerProps>`
  width: 100%;
  box-sizing: border-box;
  position: ${({ isSticky }) => (isSticky ? "sticky" : "relative")};
  left: ${({ isSticky }) => (isSticky ? 0 : "unset")};
  border-left: ${TableOutline};
  border-right: ${TableOutline};
  border-bottom: ${TableOutline};
`;

export const Header = styled.div`
  ${FlexRow}
  align-items: center;
  justify-content: flex-start;
  height: ${HeaderHeight}px;
  background-color: ${C.PrimaryCream2};
  padding: 0 ${TablePadding}px;
  box-sizing: border-box;
  z-index: 1;
  flex: none;
  border-bottom: ${TableOutline};
  border-top: ${TableOutline};
  position: ${(p: { sticky?: boolean }) => (p.sticky ? "sticky" : "relative")};
  top: 0;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar:hover {
    background: ${C.PrimaryCream2};
    border-color: ${C.None};
    outline-color: ${C.None};
  }
`;

export const RowActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  background-color: ${C.Neutral2};
  align-items: center;
  padding: 0 22px;
  display: none;
  height: 100%;
`;

interface RowProps {
  bottomBorderLeft?: number | string;
  bottomBorderRight?: number | string;
  isSiblingHover?: boolean;
  isHover?: boolean;
}

export const CheckBoxWrapper = styled.div`
  max-width: 150px;
  ${FlexRow}
  align-items: center;
  padding: 8px;
`;

export const Row = styled.div<RowProps>`
  ${FlexRow}
  align-items: center;
  justify-content: flex-start;
  height: ${ItemHeight}px;
  padding: 0 ${TablePadding}px;
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: ${({ bottomBorderLeft }) => bottomBorderLeft || 0}px;
    right: ${({ bottomBorderRight }) => bottomBorderRight || 0}px;
    height: 1px;
    ${({ isSiblingHover }) => css`
      background-color: ${isSiblingHover ? C.Neutral2 : C.Neutral4};
    `}
  }

  &:hover {
    background-color: ${(p) => (p.isHover ? C.Neutral2 : C.None)};

    &::after {
      background-color: ${(p) => (p.isHover ? C.Neutral2 : C.Neutral4)};
    }

    ${RowActions} {
      display: flex;
    }
  }
`;

export const Footer = styled.div`
  flex: none;
  ${FlexRow}
  align-items: center;
  justify-content: flex-end;
  height: ${FooterHeight}px;
  min-width: 100%;
  user-select: none;
  color: ${C.Neutral};
`;

interface IBtn {
  disabled?: boolean;
  active?: boolean;
  defaultNoBorder?: boolean;
}

function getColor(p: IBtn, isHover?: boolean) {
  if (p.disabled) return C.Neutral5;
  if (p.active) return C.Primary;
  if (isHover) return C.PrimaryLighter;
  return C.Neutral;
}

function getBorderColor(p: IBtn, isHover?: boolean) {
  if (p.disabled) return C.None;
  if (p.active) return C.Primary;
  if (isHover) return C.PrimaryLighter;
  if (p.defaultNoBorder) return C.None;
  return C.Neutral4;
}

export const SwitchPageButton = styled.div<IBtn>`
  width: 24px;
  height: 24px;
  ${FlexRow}
  ${FlexCenter}
  ${BodyCSS}
  color: ${(p: IBtn) => getColor(p)};
  border-style: solid;
  border-width: 1px;
  border-color: ${(p: IBtn) => getBorderColor(p)};
  border-radius: 2px;
  opacity: ${(p: IBtn) => (p.disabled ? 1 : 1)};
  cursor: ${(p: IBtn) => (p.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  > span {
    font-size: 18px;
    transform: scale(0.7, 1.1);
  }

  &:hover {
    color: ${(p: IBtn) => getColor(p, true)};
    border-color: ${(p: IBtn) => getBorderColor(p, true)};
  }
`;

interface ItemProps {
  flex: number | string;
  align: "center" | "left" | "right";
  bold?: boolean;
  showStickShadow?: boolean;
}

export const TableItemWrapper = styled.div<ItemProps>`
  ${FlexRow}
  ${Roboto}
  font-size: 14px;
  box-sizing: border-box;
  flex: ${(p) => p.flex};
  align-items: ${(p) => AlignConfig[p.align].alignItems};
  justify-content: ${(p) => AlignConfig[p.align].justifyContent};
  text-align: ${(p) => AlignConfig[p.align].textAlign};
  color: ${C.Neutral};
  overflow: hidden;
  position: relative;
  padding: 0 16px;
  ${(p) =>
    p.showStickShadow &&
    css`
      box-shadow: ${StickyShadow};
    `}

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-left: 26px;
    padding-right: 0;
  }
`;

export const TableText = styled.p`
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableHeaderItem = styled(TableItemWrapper)`
  ${Roboto}
  font-weight: ${(p: ItemProps) => (p.bold ? "bold" : "normal")};
  font-size: ${(p: ItemProps) => (p.bold ? 14 : 12)}px;
  letter-spacing: 0.01em;
  color: ${C.Neutral8};
  overflow: visible;
`;

export const HeaderDes = styled.span`
  ${Roboto}
  position: absolute;
  top: 17px;
  color: ${C.Neutral7};
  font-size: 10px;
  letter-spacing: 0.01em;
`;

export const BodyContainer = styled.div`
  position: relative;
`;

export const FunctionWrapper = styled.div`
  height: 120px;
  ${FlexColumn}
  ${FlexCenter}
  position: relative;
`;

export const HorizontalScrollWrapper = styled.div`
  overflow: auto;
  ${FlexColumn}
  position: relative;
  border: ${TableOutline};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom: none;
`;

export const TableBorderShadow = styled.div`
  position: absolute;
  bottom: 12px;
  top: ${HeaderHeight}px;
  width: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  pointer-events: none;
`;

export const TableLeftShadow = styled(TableBorderShadow)`
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
`;

export const TableRightShadow = styled(TableBorderShadow)`
  right: 16px;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
`;

export const HorizontalTableWrapper = styled.div<{ isFullView?: boolean }>`
  ${FlexColumn}
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  ${({ isFullView }) =>
    isFullView
      ? css`
          flex: 1;
          ${HorizontalScrollWrapper} {
            flex: 1;
          }
        `
      : undefined}
`;

export const RightMenuWrapper = styled.div<{ show?: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  overflow: hidden;
  display: ${(p) => (p.show ? "block" : "none")};
  background-color: yellow;
  background-color: transparent;
  z-index: 12;
  left: 0;
  top: 0;

  & + p {
    background-color: ${(p) => (p.show ? C.PrimaryLightest : undefined)};
  }
`;

export const RightMenuItem = styled.div<{ top?: number; left?: number }>`
  cursor: pointer;
  background: ${C.Neutral1};
  border: 1px solid ${C.Neutral4};
  color: ${C.Neutral8};
  box-sizing: border-box;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16), 0 0 5px rgba(0, 0, 0, 0.05),
    6px 10px 10px rgba(0, 0, 0, 0.03);
  border-radius: 2px;
  display: flex;
  position: absolute;
  z-index: 13;
  padding: 10px 20px;
  top: ${(p) => `${p.top}px`};
  left: ${(p) => `${p.left}px`};

  &:hover {
    background: ${C.Neutral2};
    border: 1px solid ${C.Neutral6};
    color: ${C.Neutral13};
  }
`;
