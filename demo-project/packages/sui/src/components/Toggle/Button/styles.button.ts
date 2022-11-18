import styled from "styled-components";
import { Button1CSS } from "../../../styles/fonts";
import { FlexCenter, FlexRow, normalizeButton } from "../../../styles/common";
import * as constants from "../constants";
import type { PillButtonProps } from "../typing";
import {
  Neutral2,
  Neutral3,
  Neutral4,
  Neutral6,
  Neutral8,
  Neutral13,
  Primary,
  PrimaryCream2,
} from "../../../styles/colors";

export const PillButtonWrapper = styled.button<PillButtonProps>`
  ${normalizeButton}
  ${Button1CSS}
  ${FlexRow}
  ${FlexCenter}
  user-select: none;
  padding: 0 ${constants.buttonPadding}px;
  height: ${constants.buttonHeight}px;
  border-radius: 2px;
  color: ${(p) => getFontColor(p)};
  background-color: ${(p) => getBGColor(p)};
  border: 1px solid ${(p) => getBorderColor(p)};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    color: ${(p) => getFontColor(p, true)};
    background-color: ${(p) => getBGColor(p, true)};
    border: 1px solid ${(p) => getBorderColor(p, true)};
  }
`;

function getBGColor(props: PillButtonProps, hover?: boolean) {
  if (props.disabled) return Neutral3;
  if (props.selected) return PrimaryCream2;
  if (hover) return Neutral3;
  return Neutral2;
}

function getFontColor(props: PillButtonProps, hover?: boolean) {
  if (props.disabled) return Neutral6;
  if (props.selected) return Primary;
  if (hover) return Neutral13;
  return Neutral8;
}

function getBorderColor(props: PillButtonProps, hover?: boolean) {
  if (props.disabled) return Neutral3;
  if (props.selected) return Primary;
  if (hover) return Neutral6;
  return Neutral4;
}
