import styled from "styled-components";
import {
  Neutral6,
  Neutral8,
  Neutral13,
  Secondary,
} from "../../../styles/colors";
import { Button2CSS } from "../../../styles/fonts";
import { FlexRow, FlexCenter, normalizeButton } from "../../../styles/common";
import type { TextButtonProps } from "../typing";

export const ButtonWrapper = styled.a<TextButtonProps>`
  ${normalizeButton}
  ${Button2CSS}
  display: inline-block;
  user-select: none;
  padding: 4px 0;
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
    color: ${(p) => getFontColor(p, true)};

    svg {
      color: ${(p) => getFontColor(p, true)};
    }
  }
`;

export const Content = styled.div`
  ${FlexRow}
  ${FlexCenter}
`;

function getBGColor(props: TextButtonProps) {
  if (props.disabled) return props.defaultBgColor || "transparent";
  return props.defaultBgColor || "transparent";
}

function getFontColor(props: TextButtonProps, hover?: boolean) {
  if (props.disabled) return Neutral6;
  if (hover) return Neutral13;
  return props.isLink ? Secondary : Neutral8;
}
