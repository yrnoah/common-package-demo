import styled, { css } from "styled-components";
import {
  None,
  Neutral1,
  Neutral2,
  Neutral5,
  Neutral4,
  Neutral6,
  Neutral7,
  Neutral13,
  Primary,
} from "../../../styles/colors";
import { Body2CSS } from "../../../styles/fonts";

export const Container = styled.div`
  ${Body2CSS}
  width: 100%;
  height: 48px;
  background-color: ${Neutral1};
  border-top: 1px solid ${Neutral4};
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  user-select: none;
`;

export const Text = styled.p`
  ${Body2CSS}
  flex: none;
  color: ${Neutral7};
  margin-right: 16px;
`;

interface TPageButtonProps {
  selected?: boolean;
  disabled?: boolean;
  isArrow?: boolean;
}

export const PageButton = styled.button<TPageButtonProps>`
  ${Body2CSS}
  min-width: 24px;
  height: 24px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border-radius: 2px;
  padding: 0 4px;
  border: ${(p) => getBorder(p)};
  color: ${(p) => getFontColor(p)};
  background-color: ${None};
  margin-left: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: ${(p) => getBorder(p, true)};
    background-color: ${(p) => (p.selected ? None : Neutral2)};
    transition: all 0.2s ease;
    & + button {
      transition: all 0.2s ease;
    }

    ${({ isArrow }) =>
      isArrow
        ? css`
            background-color: ${None};
          `
        : undefined}
  }
`;

function getBorder(props: TPageButtonProps, hover?: boolean) {
  if (props.disabled) return `1px solid ${None}`;
  if (props.selected) return `1px solid ${Primary}`;
  if (hover) return `1px solid ${Neutral6}`;
  return `1px solid ${None}`;
}

function getFontColor(props: TPageButtonProps) {
  if (props.disabled) return Neutral5;
  if (props.selected) return Primary;
  return Neutral13;
}
