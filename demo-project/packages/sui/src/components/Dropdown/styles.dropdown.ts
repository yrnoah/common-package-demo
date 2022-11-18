import styled, { css } from "styled-components";
import {
  Primary,
  PrimaryLightest2,
  Neutral1,
  Neutral2,
  Neutral3,
  Neutral7,
  Neutral13,
  shadowLevel1,
  Neutral4,
  Secondary,
  Neutral6,
  None,
} from "../../styles/colors";
import { Body2CSS, Caption3CSS } from "../../styles/fonts";
import { FlexRow } from "../../styles/common";
import { gridWidths } from "../Form/constants";
import IconCorrect from "../../icons/IconCorrect";
import IconLocation from "../../icons/IconLocation";
import IconArrowDown from "../../icons/IconArrowDown";

export const width = gridWidths["3-1-lg"];
export const optionHeight = 36;
export const headerHeight = 24;
export const optionMargin = 4;
export const SearchBarHeight = 64;

export const OptionsWrapper = styled.div`
  background-color: ${Neutral1};
  box-shadow: ${shadowLevel1};
  border-radius: 2px;
  box-sizing: border-box;
  width: ${width}px;
  min-height: ${optionHeight}px;
  margin-top: ${optionMargin}px;
  max-height: 336px;
  overflow: auto;
`;
export const Option = styled.div<{ active?: boolean; isTitle?: boolean }>`
  ${(p) =>
    p.isTitle
      ? css`
          ${Caption3CSS}
          color: ${Neutral7};
          text-transform: uppercase;
          background-color: ${Neutral3};
        `
      : css`
          ${Body2CSS}
          color: ${p.active ? Primary : Neutral13};
          background-color: ${p.active ? PrimaryLightest2 : Neutral1};
          &:hover {
            background-color: ${p.active ? PrimaryLightest2 : Neutral2};
          }
        `}
  ${FlexRow}
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  cursor: ${(p) => (p.isTitle ? "auto" : "pointer")};
  min-height: ${(p) => (p.isTitle ? headerHeight : optionHeight)}px;
  padding: 10px 36px 10px 16px;
  position: relative;
  margin-bottom: 4px;
  user-select: none;
  &:last-child {
    margin-bottom: 8px;
  }
  &:first-child {
    margin-top: 8px;
  }
`;
export const ActiveIcon = styled(IconCorrect)`
  position: absolute;
  right: 12px;
  top: 10px;
  width: 16px;
  height: 16px;
  pointer-events: none;
`;

export const Icon = styled(IconLocation)`
  width: 16px;
  height: 16px;
`;
export const StatusIcon = styled(IconArrowDown)<{ $active?: boolean }>`
  width: 16px;
  height: 16px;
  transform: ${(p) => (p.$active ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
`;

export const SearchBar = styled.div`
  ${FlexRow}
  align-items: center;
  overflow: hidden;
  height: ${SearchBarHeight}px;
  background-color: #fff;
  border-bottom: 1px solid ${Neutral4};

  /* Solving the  transition flicker problem caused by safari 1px */
  border-top: 1px solid ${None};
  box-sizing: border-box;
  padding: 12px 16px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const CancelButton = styled.div`
  color: ${Secondary};
  ${Body2CSS}
  ${FlexRow}
  align-items: center;
  box-sizing: border-box;
  margin-left: 8px;
  padding: 0 8px;
  height: 100%;
  cursor: pointer;
`;

export const HighlightText = styled.span`
  color: ${Neutral13};
`;
export const FilteredText = styled.span`
  color: ${Neutral7};
`;

export const NoResult = styled.div`
  height: 112px;
  padding: 10px 16px;
  font-size: 14px;
  line-height: 16px;
  color: ${Neutral6};
`;
