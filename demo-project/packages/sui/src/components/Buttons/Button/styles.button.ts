import styled from "styled-components";
import { Neutral4, Neutral6, Neutral8, Primary } from "../../../styles/colors";
import { Button1CSS } from "../../../styles/fonts";
import { FlexCenter, FlexRow, normalizeButton } from "../../../styles/common";
import * as constants from "../constants";
import type { ButtonProps } from "../typing";

export const ButtonWrapper = styled.button<ButtonProps>`
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
  border: 1px solid ${(p) => getBorderColor(p)};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  svg {
    color: ${(p) => getFontColor(p)};
    transition: all 0.2s ease;
  }

  &:hover {
    color: ${(p) => getFontColor(p, true)};
    border: 1px solid ${(p) => getBorderColor(p, true)};

    svg {
      color: ${(p) => getFontColor(p, true)};
    }
  }
`;

function getBGColor(props: ButtonProps) {
  if (props.disabled) return props.defaultBgColor || "#fff";
  return props.defaultBgColor || "#fff";
}

function getFontColor(props: ButtonProps, hover?: boolean) {
  if (props.disabled) return Neutral6;
  if (hover || props.active) return Primary;
  return Neutral8;
}

function getBorderColor({ disabled, active }: ButtonProps, hover?: boolean) {
  if (disabled) return Neutral4;
  if (hover || active) return Primary;
  return Neutral4;
}
