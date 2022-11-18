import styled, { css } from "styled-components";
import {
  Neutral1,
  Neutral2,
  Neutral4,
  Neutral6,
  Neutral8,
  Neutral13,
  Primary,
} from "../../../styles/colors";
import { Body2CSS } from "../../../styles/fonts";
import SvgIconSearchClear from "../../../icons/IconSearchClear";
import SvgIconSearch from "../../../icons/IconSearch";

interface SearchInputProps {
  hasFocus?: boolean;
  size?: string;
  defaultBgColor?: string;
  defaultBorderColor?: string;
}

export const SearchLayout = styled.div(
  ({
    hasFocus,
    size,
    defaultBgColor,
    defaultBorderColor,
  }: SearchInputProps) => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: ${size === "standard" ? 224 : 336}px;
    padding: 0 8px;
    height: 32px;
    border-radius: 2px;
    border: 1px solid ${hasFocus ? Neutral8 : defaultBorderColor || Neutral4};
    background-color: ${defaultBgColor || Neutral1};
    transition: all 0.2s ease;
    box-sizing: border-box;
    &:hover {
      background-color: ${hasFocus ? Neutral1 : Neutral2};
      border: 1px solid ${hasFocus ? Neutral8 : Neutral6};
    }
  `
);

export const Input = styled.input`
  ${Body2CSS};
  width: 100%;
  margin: 0 8px;
  border: none;
  color: ${Neutral13};
  caret-color: ${Primary};
  background-color: transparent;

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: ${Neutral6};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const IconSearch = styled(SvgIconSearch)`
  width: 16px;
  height: 16px;
  color: ${Neutral8};
  flex: none;
  cursor: pointer;
`;

export const IconSearchClear = styled(SvgIconSearchClear)`
  width: 16px;
  height: 16px;
  color: ${Neutral13};
  cursor: pointer;
  opacity: 0.3;
  flex: none;
  transition: all 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;
