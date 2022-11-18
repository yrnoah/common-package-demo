import styled from "styled-components";
import {
  None,
  Neutral4,
  Neutral6,
  Neutral8,
  Neutral13,
  Primary,
} from "../../../styles/colors";
import { normalizeButton } from "../../../styles/common";
import { Body2CSS, Subtitle2CSS } from "../../../styles/fonts";
import type { TextProps } from "../typing";

export const TextWrapper = styled.button<TextProps>`
  ${normalizeButton}
  ${(p) => setFont(p)}
  user-select: none;
  padding: 0 8px;
  height: auto;
  background-color: ${None};
  color: ${(p) => getFontColor(p)};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: ${(p) => getFontColor(p, true)};
    background-color: ${None};
    border: none;
  }

  &:not(:last-child) {
    &::after {
      position: absolute;
      right: -0.5px;
      top: 6.25%;
      content: "";
      display: block;
      background-color: ${Neutral4};
      width: 1px;
      height: 87.5%;
    }
  }
`;

function setFont(props: TextProps) {
  if (props.disabled) return Body2CSS;
  if (props.selected) return Subtitle2CSS;
  return Body2CSS;
}

function getFontColor(props: TextProps, hover?: boolean) {
  if (props.disabled) return Neutral6;
  if (props.selected) return Primary;
  if (hover) return Neutral13;
  return Neutral8;
}
