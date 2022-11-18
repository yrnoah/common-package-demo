import styled from "styled-components";
import {
  Neutral4,
  Neutral6,
  Neutral8,
  Neutral13,
} from "../../../styles/colors";
import { Button1CSS } from "../../../styles/fonts";
import { FlexCenter, FlexRow, normalizeButton } from "../../../styles/common";
import type { IconButtonProps } from "../typing";

export const ButtonWrapper = styled.button<IconButtonProps>`
  ${normalizeButton}
  ${Button1CSS}
  ${FlexRow}
  ${FlexCenter}
  user-select: none;
  padding: 8px;
  min-width: 32px;
  min-height: 32px;
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

function getBGColor(props: IconButtonProps) {
  if (props.disabled) return props.defaultBgColor || "transparent";
  return props.defaultBgColor || "transparent";
}

function getFontColor(props: IconButtonProps, hover?: boolean) {
  if (props.disabled) return Neutral6;
  if (hover) return Neutral13;
  return Neutral8;
}

function getBorderColor({ disabled }: IconButtonProps, hover?: boolean) {
  if (disabled) return Neutral4;
  if (hover) return Neutral6;
  return Neutral4;
}
