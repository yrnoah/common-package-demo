import styled from "styled-components";
import {
  Neutral3,
  Neutral6,
  Primary,
  PrimaryDarker,
} from "../../../styles/colors";
import { Button1CSS } from "../../../styles/fonts";
import { FlexCenter, FlexRow, normalizeButton } from "../../../styles/common";
import * as constants from "../constants";
import type { PrimaryButtonProps } from "../typing";

export const ButtonWrapper = styled.button<PrimaryButtonProps>`
  ${normalizeButton}
  ${Button1CSS}
  ${FlexRow}
  ${FlexCenter}
  user-select: none;
  padding: 0 ${constants.buttonPadding}px;
  min-width: ${constants.buttonMinWidth}px;
  height: ${constants.buttonHeight}px;
  border-radius: 2px;
  color: ${(p) => getFontColor(p)};
  background-color: ${(p) => getBGColor(p)};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  svg {
    color: ${(p) => getFontColor(p)};
    transition: all 0.2s ease;
  }

  &:hover {
    color: ${(p) => getFontColor(p)};
    background-color: ${(p) => getBGColor(p, true)};
  }
`;

function getBGColor(props: PrimaryButtonProps, hover?: boolean) {
  if (props.disabled) return Neutral3;
  if (hover) return PrimaryDarker;
  return Primary;
}

function getFontColor(props: PrimaryButtonProps) {
  if (props.disabled) return Neutral6;
  return "#fff";
}
