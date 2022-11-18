import React, { forwardRef, useState, useMemo, useCallback } from "react";
import { useMeasure } from "react-use";
import styled, { css } from "styled-components";
import { Portal } from "../../Siblings";
import {
  Neutral1,
  Neutral4,
  Neutral13,
  Neutral2,
  Neutral6,
  Primary,
  shadowLevel1,
  Neutral9,
} from "../../../styles/colors";
import { AbsoluteFill, FlexCenter, FlexRow } from "../../../styles/common";
import { Body2CSS, CaptionCSS } from "../../../styles/fonts";
import { TooltipZIndex } from "../../../styles/zindex";
import { tabTooltipPortalID } from "../../Siblings/portalID";

interface TabButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Button contents
   */
  children?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  /**
   * Style type
   */
  tabType: "outlined" | "filled";
  /** tooltip */
  tooltip?: string;
  /**
   * @default tabTooltipPortalID "sui-tab-tooltips"
   */
  portalID?: string;
}

const padding = 8;

export const TabButton = forwardRef<HTMLDivElement, TabButtonProps>(
  (
    {
      children,
      tabType = "filled",
      tooltip,
      onMouseEnter,
      onMouseLeave,
      portalID = tabTooltipPortalID,
      ...rest
    },
    ref
  ) => {
    const [tooltipRef, { height, width }] = useMeasure();
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [_hover, setHover] = useState(false);
    const _onMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setHover(true);
        if (onMouseEnter) onMouseEnter(e);
      },
      [onMouseEnter]
    );
    const _onMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setHover(false);
        if (onMouseLeave) onMouseLeave(e);
      },
      [onMouseLeave]
    );
    const tooltipStyle = useMemo(() => {
      if (rect && width && height) {
        const gap = 4;
        const top = rect.top - height - padding * 2 - gap;
        const left = rect.left + rect.width / 2 - width / 2 - padding;
        return { top, left };
      }
      return {};
    }, [rect, width, height]);
    return (
      <Wrapper
        {...rest}
        onClick={rest.disabled ? undefined : rest.onClick}
        onMouseEnter={_onMouseEnter}
        onMouseLeave={_onMouseLeave}
        tabType={tabType}
        ref={ref}
      >
        <PositionDetectDom
          ref={(el) => {
            if (el) {
              const v = el.getBoundingClientRect();
              if (v.top !== rect?.top || v.left !== rect?.left) setRect(v);
            }
          }}
        />
        {!!tooltip && (
          <Portal id={portalID}>
            <TooltipContent
              ref={(el) => el && tooltipRef(el)}
              style={tooltipStyle}
              show={!!rect && _hover}
            >
              {tooltip}
            </TooltipContent>
          </Portal>
        )}
        {children}
      </Wrapper>
    );
  }
);

export default TabButton;

type WrapperProps = Pick<TabButtonProps, "active" | "disabled" | "tabType">;

const height = 32;

// fill transparent border color by fake element
const activeLeftBorder = css`
  &:not(:first-child)::before {
    content: "";
    width: 1px;
    position: absolute;
    left: -1px;
    top: -1px;
    height: ${height}px;
    background-color: ${Primary};
  }
`;
const PositionDetectDom = styled.div`
  ${AbsoluteFill}
  pointer-events: none;
`;
const TooltipContent = styled.div<{ show?: boolean }>`
  ${CaptionCSS}
  position: fixed;
  z-index: ${TooltipZIndex};
  left: 0;
  color: #fff;
  box-shadow: ${shadowLevel1};
  background-color: ${Neutral9};
  box-sizing: border-box;
  border-radius: 2px;
  padding: ${padding}px;
  max-width: 280px;
  opacity: 0;
  pointer-events: none;
  ${({ show }) =>
    !!show &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

const Wrapper = styled.div<WrapperProps>`
  ${FlexRow}
  ${FlexCenter}
  ${Body2CSS}
  box-sizing: border-box;
  background-color: ${Neutral2};
  border: 1px solid ${Neutral4};
  color: ${Neutral13};
  cursor: pointer;
  flex: none;
  height: ${height}px;
  padding: 0 12px;
  position: relative;
  min-width: 72px;
  user-select: none;
  width: max-content;
  &:not(:first-child) {
    border-left: none;
    &::before {
      content: "";
      width: 1px;
      position: absolute;
      left: -1px;
      top: -1px;
      height: ${height}px;
      background-color: transparent;
      transition: background-color 0.2s ease;
    }
  }
  &:first-child {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  &:last-child {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  &:hover {
    background-color: ${Neutral4};
  }
  transition: all 0.2s ease;
  ${({ disabled, active, tabType }) => {
    if (disabled)
      return css`
        color: ${Neutral6};
        cursor: not-allowed;
        &:hover {
          background-color: ${Neutral2};
        }
      `;
    if (active && tabType === "outlined")
      return css`
        ${activeLeftBorder}
        color: ${Primary};
        background-color: ${Neutral1};
        border-color: ${Primary};
        &:hover {
          background-color: ${Neutral1};
        }
      `;
    if (active && tabType === "filled")
      return css`
        ${activeLeftBorder}
        color: ${Neutral1};
        background-color: ${Primary};
        border-color: ${Primary};
        &:hover {
          background-color: ${Primary};
        }
      `;
    return undefined;
  }}
`;
