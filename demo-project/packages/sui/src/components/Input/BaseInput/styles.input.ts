import styled, { css } from "styled-components";
import {
  Functional2Error,
  Neutral1,
  Neutral2,
  Neutral,
  Neutral3,
  Neutral4,
  Neutral6,
  Neutral8,
} from "../../../styles/colors";
import { Body2CSS } from "../../../styles/fonts";

export interface IBaseInputProps {
  error?: boolean;
  disableBorder?: boolean;
  focus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isForm?: boolean;
}

export const disableStyle = css`
  background-color: ${Neutral3};
  border: 1px solid ${Neutral3};
  color: ${Neutral6};
  -webkit-text-fill-color: ${Neutral6};
  cursor: not-allowed;

  &:hover {
    border: 1px solid ${Neutral3};
    background-color: ${Neutral3};
  }
`;

export const readOnlyStyle = css`
  background-color: ${Neutral1};
  border: 1px dashed ${Neutral4};
  color: ${Neutral};

  &:hover {
    border: 1px dashed ${Neutral4};
    background-color: ${Neutral1};
  }
`;

export const errorStyle = css`
  border: 1px solid ${Functional2Error};
  &:hover {
    border: 1px solid ${Functional2Error};
  }
  &:focus {
    border: 1px solid ${Functional2Error};
  }
`;

export const focusStyle = css`
  border: 1px solid ${Neutral8};
  background-color: ${Neutral1};
`;

export const commonInputStyle = css<IBaseInputProps>`
  height: 32px;
  box-sizing: border-box;
  color: ${Neutral};
  border-radius: 2px;
  transition: all 0.2s ease;
  border: 1px solid ${Neutral4};
  background-color: ${Neutral1};

  &:hover {
    border: 1px solid ${Neutral6};
    background-color: ${Neutral2};
  }

  /* focus styles */
  &:focus {
    ${focusStyle}
  }

  ${({ focus, disabled, readOnly }) =>
    focus && !disabled && !readOnly
      ? css`
          ${focusStyle}
          &:hover {
            ${focusStyle}
          }
        `
      : undefined}

  /* error styles */
  ${({ error, disabled, readOnly }) =>
    error && !disabled && !readOnly ? errorStyle : undefined}
  
  /* readOnly styles */
  ${({ readOnly, isForm }) => (readOnly && isForm ? readOnlyStyle : undefined)}

  /* disabled styles */
  &:disabled {
    ${disableStyle}
  }

  ${({ disabled }) => (disabled ? disableStyle : undefined)}
`;

export const BaseInput = styled.input<IBaseInputProps>`
  /* reset */

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    appearance: textfield;
  }

  outline: none;

  /* styles */
  ${Body2CSS}
  padding: 0 8px;

  &::placeholder {
    ${Body2CSS}
    color: ${Neutral6};
  }

  ${commonInputStyle}
`;
