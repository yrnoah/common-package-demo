import styled, { css } from "styled-components";
import { FlexRow, FlexCenter, AbsoluteFill } from "../../../styles/common";
import {
  Neutral,
  Neutral8,
  Primary,
  None,
  Neutral6,
  PrimaryDarker,
} from "../../../styles/colors";

import CorrectSVG from "../../../icons/IconCorrect";
import IndeterminateSVG from "../../../icons/IconMinus";
import type { CheckboxProps } from "../typing";

function getBorderColor(p: CheckboxProps, hover?: boolean) {
  if (p.checked) {
    if (p.disabled) return Neutral6;
    if (p.readOnly) return Neutral;
    if (hover) return PrimaryDarker;
    return Primary;
  }
  if (!p.checked) {
    if (p.disabled) return Neutral6;
    if (p.readOnly) return Neutral6;
    if (hover) return Neutral;
    return Neutral8;
  }
  return Neutral8;
}

function getBGColor(p: CheckboxProps, hover?: boolean) {
  if (p.checked) {
    if (p.disabled) return Neutral6;
    if (p.readOnly) return Neutral;
    if (hover) return PrimaryDarker;
    return Primary;
  }
  if (!p.checked) return "#fff";
  return None;
}
// function getTextColor(p: CheckboxProps) {
//   if (p.checked) {
//     if (p.disabled) return Neutral6;
//   }
//   if (!p.checked) {
//     if (p.disabled || p.readOnly) return Neutral6;
//   }
//   return Neutral;
// }

export const InnerBox = styled.div`
  ${AbsoluteFill}
  pointer-events: none;
  box-sizing: border-box;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${(p: CheckboxProps) => getBorderColor(p)};
  background-color: ${(p: CheckboxProps) => getBGColor(p)};
  border-style: solid;
  ${FlexRow}
  ${FlexCenter}
  transition: all 0.2s ease;
`;

const IconStyle = css`
  width: 90%;
  height: 90%;
  color: #fff;
  pointer-events: none;
`;

export const IconCorrect = styled(CorrectSVG)`
  ${IconStyle}
`;

export const IconIndeterminate = styled(IndeterminateSVG)`
  ${IconStyle}
`;

export const Container = styled.div<CheckboxProps>`
  position: relative;
  flex: none;
  ${FlexRow}
  ${FlexCenter}
  width: 16px;
  height: 16px;

  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;

    &:disabled,
    &[readonly="readonly"],
    &[readonly] {
      cursor: not-allowed;
    }
  }

  &:hover {
    ${InnerBox} {
      border-color: ${(p: CheckboxProps) => getBorderColor(p, true)};
      background-color: ${(p: CheckboxProps) => getBGColor(p, true)};
    }
  }
`;
