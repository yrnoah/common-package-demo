import styled from "styled-components";
import { FlexCenter, FlexRow } from "../../../../styles/common";
import { Body2CSS } from "../../../../styles/fonts";
import { IconArrowDown } from "../../../../icons";
import {
  Neutral1,
  Neutral2,
  Neutral3,
  Neutral4,
  Neutral6,
  Neutral13,
  shadowLevel1,
} from "../../../../styles/colors";

export const optionHeight = 36;
export const optionMargin = 4;

export const Options = styled.div`
  width: 100%;
  background-color: ${Neutral1};
  box-shadow: ${shadowLevel1};
  border-radius: 2px;
  box-sizing: border-box;
  min-height: ${optionHeight}px;
  margin-top: ${optionMargin}px;
  max-height: 40vh;
  overflow: auto;
`;

export const Option = styled.div<{ active?: boolean }>`
  ${FlexRow}
  ${FlexCenter}
  ${Body2CSS}
  padding: 8px;
  flex-wrap: wrap;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  min-height: ${optionHeight}px;
  position: relative;
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 8px;
  }
  &:first-child {
    margin-top: 8px;
  }
  &:hover {
    background-color: ${Neutral3};
  }
`;

export const StatusIcon = styled(IconArrowDown)<{ $active?: boolean }>`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  transform: ${(p) => (p.$active ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease;
`;

export const Trigger = styled.div`
  position: relative;
  border: 1px solid ${Neutral4};
  border-radius: 2px;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${Neutral6};
    background-color: ${Neutral2};
  }
`;

export const Text = styled.p`
  ${Body2CSS}
  padding: 0 4px 0 8px;
  color: ${Neutral13};
  cursor: pointer;
`;
