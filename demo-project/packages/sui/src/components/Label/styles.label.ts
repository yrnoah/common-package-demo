import styled, { css } from "styled-components";
import { Caption1CSS, OverlineCSS, Subtitle2CSS } from "../../styles/fonts";
import { FlexRow } from "../../styles/common";
import {
  Neutral8,
  Primary,
  Neutral7,
  Neutral,
  Functional2Error,
} from "../../styles/colors";

export const TopInfo = styled.div`
  ${FlexRow};
  align-items: center;
  margin-bottom: 4px;
`;

interface ILabel {
  required?: boolean;
  isSubtitle?: boolean;
  error?: boolean;
  active?: boolean;
}

export const Label = styled.label<ILabel>`
  display: block;
  ${(p) => (p.isSubtitle ? Subtitle2CSS : Caption1CSS)}
  color: ${(p) => (p.isSubtitle || p.active ? Neutral : Neutral8)};
  ${(p) =>
    p.error
      ? css`
          color: ${Functional2Error};
        `
      : undefined}
  margin-right: ${(p) => (p.required ? 10 : 2)}px;
  position: relative;
  flex: none;

  &::after {
    content: "*";
    display: ${(p) => (p.required ? "block" : "none")};
    position: absolute;
    top: 0;
    right: -8px;
    color: ${Primary};
    ${Caption1CSS}
  }
`;

export const Counts = styled.p<{ show?: boolean }>`
  ${OverlineCSS}
  flex: none;
  margin: 0;
  color: ${Neutral7};
`;
