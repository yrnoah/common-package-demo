import { useCallback, useEffect, useMemo, useState } from "react";
import { useMeasure } from "react-use";
import styled from "styled-components";
import { Portal } from "../Siblings";
import {
  TDropdownPosition,
  useDropdownPosition,
} from "../../hooks/useDropdownPosition";
import { useDetectOut } from "../../hooks/useDetectOut";
import useCurrent from "../../hooks/useCurrent";
import { SuiDropdownZIndex } from "../../styles/zindex";
import { dropdownPortalID } from "../Siblings/portalID";

export const SuiDropdownPortalID = dropdownPortalID;

export interface ISuiDropdownProps {
  /**
   * trigger component
   */
  children?: React.ReactNode;
  /**
   * dropdown component
   */
  overlay?: React.ReactNode;
  /**
   * trigger wrapper styles
   */
  style?: React.CSSProperties;
  /**
   * dropdown wrapper styles
   */
  overlayContainerStyle?: React.CSSProperties;
  /**
   * @default undefined = auto
   * dropdown position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top" | "bottom" | undefined = auto
   */
  position?: TDropdownPosition;
  /**
   * dropdown visible
   */
  visible?: boolean;
  /**
   * dropdown visible onChange callback
   */
  onVisibleChange?: (v?: boolean) => void;
  /**
   * disable the auto dismiss when user click or scroll outside
   */
  disableAutoDismiss?: boolean;
  /**
   * disable dropdown enter & leave default animation
   */
  disableAnimation?: boolean;
  /**
   * ID of the dom element, which will be insert the dropdown items
   * @default SuiDropdownPortalID (`sui-dropdown-overlay`)
   */
  parentNodeID?: string;
}

export function Dropdown(props: ISuiDropdownProps) {
  const {
    overlayContainerStyle,
    visible,
    onVisibleChange,
    disableAnimation,
    parentNodeID = SuiDropdownPortalID,
  } = props;
  const [overlayRef, { height: overlayHeight, width: overlayWidth }] =
    useMeasure();
  const onVisibleCallbackRef = useCurrent(onVisibleChange);
  const [_visible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible((curVisible) => {
      if (curVisible !== visible) return visible;
      return curVisible;
    });
  }, [visible]);
  useEffect(() => {
    if (onVisibleCallbackRef.current) onVisibleCallbackRef.current(_visible);
  }, [_visible, onVisibleCallbackRef]);
  const initd = !!overlayHeight && !!overlayWidth;
  const { ref, top, left, onHoverUpdateRect } = useDropdownPosition(
    overlayHeight,
    overlayWidth,
    32,
    false,
    props.position
  );
  const onDismissWhenClickOrScroll = useCallback(() => setVisible(false), []);
  const { onIn, onOut } = useDetectOut(
    onDismissWhenClickOrScroll,
    !props.disableAutoDismiss,
    onHoverUpdateRect
  );
  const _overlayContainerStyle: React.CSSProperties = useMemo(() => {
    const opacity = initd && _visible ? 1 : 0;
    const pointerEvents = initd && _visible ? "auto" : "none";
    let _top = _visible ? top : top * 0.9;
    if (disableAnimation) _top = top;
    return {
      transition: disableAnimation ? "none" : undefined,
      pointerEvents,
      opacity,
      ...(overlayContainerStyle || {}),
      zIndex: _visible ? overlayContainerStyle?.zIndex : -1,
      top: _top,
      left,
    };
  }, [overlayContainerStyle, initd, top, left, _visible, disableAnimation]);
  const _onMouseEnter = useCallback(() => {
    onHoverUpdateRect();
    onIn();
  }, [onIn, onHoverUpdateRect]);
  return (
    <>
      <Wrapper
        ref={ref}
        style={props.style}
        onMouseEnter={_onMouseEnter}
        onMouseLeave={onOut}
      >
        {props.children}
      </Wrapper>
      {!!props.overlay && (
        <Portal id={parentNodeID}>
          <OverlayWrapper
            style={_overlayContainerStyle}
            ref={(el) => el && overlayRef(el)}
            onMouseEnter={_onMouseEnter}
            onMouseLeave={onOut}
          >
            {props.overlay}
          </OverlayWrapper>
        </Portal>
      )}
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: none;
  width: max-content;
  align-items: center;
  box-sizing: border-box;
`;

const OverlayWrapper = styled.div`
  position: fixed;
  z-index: ${SuiDropdownZIndex};
  width: max-content;
  box-sizing: border-box;
  max-height: 80vh;
  transition: top 0.2s ease, opacity 0.2s ease;
`;
