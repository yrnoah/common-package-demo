import styled, { css } from "styled-components";
import { Functional2Error, Neutral7, Neutral6 } from "../../styles/colors";
import { Caption1CSS } from "../../styles/fonts";

export const InfoBlock = styled.div<{ error?: boolean; disabled?: boolean }>`
  box-sizing: border-box;
  padding-bottom: 12px;
  margin-top: 2px;
  margin-bottom: 8px;
  width: 100%;
  ${Caption1CSS}
  color: ${({ error }) => (error ? Functional2Error : Neutral7)};
  ${({ disabled }) =>
    disabled
      ? css`
          color: ${Neutral6};
        `
      : undefined}
`;
