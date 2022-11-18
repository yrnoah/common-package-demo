import styled, { css } from "styled-components";
import {
  Neutral7,
  Neutral6,
  Neutral8,
  Neutral1,
  Neutral4,
  Neutral2,
  Functional2Error,
  Neutral,
  Neutral3,
  Neutral13,
} from "../../../styles/colors";
import { OverlineCSS } from "../../../styles/fonts";
import { FlexRow } from "../../../styles/common";
import { IconCircleClose } from "../../../icons";

const focusStyle = css`
  border: 1px solid ${Neutral8};
  background-color: ${Neutral1};
`;

/* readOnly styles */
const readOnlyStyle = css`
  background-color: ${Neutral1};
  border: 1px dashed ${Neutral4};
  color: ${Neutral};
  &:hover {
    border: 1px dashed ${Neutral4};
    background-color: ${Neutral1};
  }
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

export const Container = styled.div<{
  focus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
}>`
  position: relative;
  ${FlexRow};
  border-radius: 2px;
  align-items: flex-start;
  transition: border 0.2s ease;
  box-sizing: border-box;
  border: 1px solid ${Neutral4};
  background-color: ${Neutral1};
  &:hover {
    border: 1px solid ${Neutral6};
    background-color: ${Neutral2};
  }

  /* focus styles */
  ${(props) =>
    props.focus &&
    css`
      ${focusStyle}
      &:hover {
        ${focusStyle}
      }
    `}

  /* readOnly styles */
  ${(props) =>
    props.readOnly &&
    css`
      ${readOnlyStyle}
    `}
  
  /* disabled styles */
  ${(props) =>
    props.disabled &&
    css`
      ${disableStyle}
    `}
  
  /* error styles */
  ${({ error, disabled, readOnly }) =>
    error && !disabled && !readOnly
      ? css`
          border: 1px solid ${Functional2Error};
          &:hover {
            border: 1px solid ${Functional2Error};
          }
          &:focus {
            border: 1px solid ${Functional2Error};
          }
        `
      : undefined}
`;

export const ClearBtn = styled(IconCircleClose)`
  width: 14px;
  height: 14px;
  margin-top: 8px;
  padding-right: 8px;
  color: ${Neutral6};
  cursor: pointer;
  &:hover {
    color: ${Neutral13};
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const BottomCount = styled.div`
  ${OverlineCSS};
  color: ${Neutral7};
  box-sizing: border-box;
  text-align: right;
  width: 30%;
  margin: 2px 0 8px 0;
  padding-bottom: 8px;
`;
