import styled, { css } from "styled-components";
import {
  Neutral5,
  PrimaryCream2,
  Neutral,
  Neutral6,
  Neutral7,
  shadow,
  shadow1,
} from "./colors";
import { Body2CSS } from "./fonts";

export const FlexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const FlexRow = css`
  display: flex;
  flex-direction: row;
`;

export const FlexCenter = css`
  align-items: center;
  justify-content: center;
`;

export const FlexBlank = styled.div`
  flex: 1;
`;

interface FlexRowWrapperProps {
  align?: string;
  horizontal?: string;
  flex?: number | string;
}

export const FlexRowWrapper = styled.div<FlexRowWrapperProps>`
  ${FlexRow}
  justify-content: ${({ align }) => align || "flex-start"};
  align-items: ${({ horizontal }) => horizontal || "flex-start"};
  flex: ${({ flex }) => flex || "none"};
`;

export const FlexColumnWrapper = styled.div<FlexRowWrapperProps>`
  ${FlexColumn}
  justify-content: ${({ align }) => align || "flex-start"};
  align-items: ${({ horizontal }) => horizontal || "flex-start"};
  flex: ${({ flex }) => flex || "none"};
`;

export const AbsoluteFill = css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const AlignConfig = {
  center: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  right: {
    alignItems: "center",
    justifyContent: "flex-end",
    textAlign: "right",
  },
  left: {
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
  },
};

export const ToolBar = styled.div<{ isSticky?: boolean; align?: string }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: ${({ align }) => align || "center"};
  position: ${({ isSticky }) => (isSticky ? "sticky" : "relative")};
  top: ${({ isSticky }) => (isSticky ? "0" : "unset")};
  flex: none;
  padding: 8px 32px 0 32px;
  box-sizing: border-box;
  background-color: ${PrimaryCream2};
`;

export const Ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FlexContent = styled.div`
  ${FlexColumn}
  ${FlexCenter}
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const Row = styled.div`
  ${FlexRow}
`;

export const Triangle = css`
  width: 0;
  height: 0;
  border-width: 0 4px 5px 4px;
  border-top: 0 solid transparent;
  border-style: solid;
  border-color: transparent transparent #000;
`;

export const BoxShadow = css`
  box-shadow: ${shadow};
`;

export const DividerLine = styled.div`
  height: 1px;
  margin: 4px 0;
  background-color: ${Neutral5};
`;

export const InputCSS = css`
  ${Body2CSS}
  height: 32px;
  ${FlexRow}
  align-items: center;
  outline: none;
  box-sizing: border-box;
  padding: 0 8px;
  color: ${Neutral};
  transition: all 0.2s ease;

  &::placeholder {
    ${Body2CSS}
    color: ${Neutral6};
  }

  &:disabled {
    color: ${Neutral7};
    cursor: not-allowed;
  }
`;

export const TooltipStyle: React.CSSProperties = {
  left: "2px",
  top: "-2px",
};

export const NotRequireTooltipStyle: React.CSSProperties = {
  top: "-2px",
};

export const BoxShadow1 = css`
  box-shadow: ${shadow1};
`;

export const normalizeButton = css`
  border: none;
  outline: none;
  flex: none;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
`;
