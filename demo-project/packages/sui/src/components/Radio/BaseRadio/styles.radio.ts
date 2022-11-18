import styled from "styled-components";
import { FlexRow, FlexCenter } from "../../../styles/common";
import {
  Neutral,
  Neutral8,
  Primary,
  None,
  Neutral6,
  PrimaryDarker,
} from "../../../styles/colors";
import { Body2CSS } from "../../../styles/fonts";

interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  hover?: boolean;
  readOnly?: boolean;
}

function getBorderColor(p: RadioProps) {
  if (p.checked) {
    if (p.disabled) return Neutral6;
    if (p.readOnly) return Neutral;
    if (p.hover) return PrimaryDarker;
    return Primary;
  }
  if (!p.checked) {
    if (p.disabled || p.readOnly) return Neutral6;
    if (p.hover) return Neutral;
    return Neutral8;
  }
  return Neutral8;
}

function getBGColor(p: RadioProps) {
  if (p.checked) {
    if (p.disabled) return Neutral6;
    if (p.readOnly) return Neutral;
    if (p.hover) return PrimaryDarker;
    return Primary;
  }
  return None;
}

export const DotWrapper = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  ${FlexRow}
  ${FlexCenter}
  transition: all 0.2s ease;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-sizing: border-box;
    transform: scale(0.5);
    transition: all 0.2s ease;
  }
`;

export const Wrapper = styled.div<RadioProps>`
  ${FlexRow}
  align-items: center;
  cursor: ${(p) => (p.disabled || p.readOnly ? "not-allowed" : "pointer")};
  ${Body2CSS}
  color: ${Neutral};
  user-select: none;
  box-sizing: border-box;

  ${DotWrapper} {
    border-color: ${(p) => getBorderColor(p)};
    &::after {
      background-color: ${(p) => getBGColor(p)};
    }
  }
`;

export const Text = styled.p`
  margin: 0;
  ${Body2CSS}
  color: ${Neutral};
  margin-left: 6px;
`;
