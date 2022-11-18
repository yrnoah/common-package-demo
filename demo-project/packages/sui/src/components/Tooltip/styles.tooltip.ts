import styled, { css } from "styled-components";
import { Neutral8 } from "../../styles/colors";
import { CaptionCSS } from "../../styles/fonts";
import { TooltipZIndex } from "../../styles/zindex";
import { IconExplanation } from "../../icons";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: none;
  width: max-content;
  align-items: center;
  box-sizing: border-box;

  &:hover {
    > div {
      opacity: 1;
    }
  }
`;

export const IconExplain = styled(IconExplanation)`
  width: 12px;
  height: 12px;
  color: ${Neutral8};
  position: relative;
  border: 1px solid transparent;
  box-sizing: border-box;
`;

interface TextWrapperProps {
  isMobile?: boolean;
  size?: "sm" | "md" | "lg";
}

export const DesText = styled.div`
  ${CaptionCSS}
  color: #fff;
  background-color: ${Neutral8};
  box-sizing: border-box;
  padding: 8px;
  border-radius: 2px;
  letter-spacing: 0.01em;
  position: relative;
  text-align: left;
  overflow: visible;
`;

function getMaxWidth(props: TextWrapperProps) {
  if (props.isMobile) return "90vw";
  if (props.size === "lg") return "328px";
  if (props.size === "md") return "280px";
  return "328px";
}

export const TextWrapper = styled.div<TextWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  max-width: ${(p) => getMaxWidth(p)};
  word-wrap: break-word;
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: flex-start;
  ${({ isMobile }) =>
    isMobile
      ? css`
          align-items: flex-start;
        `
      : undefined}
  justify-content: flex-start;
  opacity: 1;
  pointer-events: none;
  z-index: ${TooltipZIndex};
`;

export const TableText = styled.p`
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
