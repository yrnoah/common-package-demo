import styled, { css } from "styled-components";
import {
  Neutral6,
  Neutral1,
  Neutral4,
  Neutral2,
  Neutral,
  None,
  Neutral3,
} from "../../../styles/colors";
import { Body2CSS } from "../../../styles/fonts";

export const Wrapper = styled.div`
  position: relative;
`;

/* disabled styles */
const disableStyle = css`
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

const defaultUIStyle = css`
  border-radius: 2px;
  transition: all 0.2s ease;
  border: 1px solid ${Neutral4};
  background-color: ${Neutral1};
  &:hover {
    border: 1px solid ${Neutral6};
    background-color: ${Neutral2};
  }
`;

export const AreaInput = styled.textarea<{
  disabled?: boolean;
  readOnly?: boolean;
  defaultUI?: boolean;
}>`
  ${Body2CSS}
  resize: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px;
  color: ${Neutral};
  background-color: ${None};
  outline: none;
  border: none;

  &::placeholder {
    color: ${Neutral6};
  }

  /* disabled styles */
  ${(props) =>
    props.disabled &&
    css`
      ${disableStyle}
    `}

  ${(props) =>
    props.defaultUI &&
    css`
      ${defaultUIStyle};
    `}
`;
