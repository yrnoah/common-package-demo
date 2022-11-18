import { useEffect, useState } from "react";
import styled from "styled-components";
// styles
import { AbsoluteFill, FlexCenter, FlexColumn } from "../../../styles/common";
import { None } from "../../../styles/colors";
import { fadeIn } from "../../../styles/keyframes";
// constants & utils
import { modalPortalID } from "../portalID";
import { attachProps } from "../../../utils";
// components
import Portal from "../Portal";
// typing
import type { ISuiModalProps } from "./typings";

export const SuiModalPortalID = modalPortalID;
export const defaultDuration = 200;

/**
 * @example
 * export function DemoModal() {
 *   const [open, setOpen] = useState(true);
 *   return (
 *     <Modal open={open} onBGClick={setOpen.bind(null, false)}>
 *       <>111</>
 *     </Modal>
 *   );
 * }
 */
export function Modal({
  open,
  children,
  onBGClick,
  disableBG,
  portalID = SuiModalPortalID,
  duration = defaultDuration,
  style,
  backgroundStyle,
}: ISuiModalProps) {
  // const scrollRef = useRef<HTMLDivElement>(null);
  const { _open, enter, leave } = useModalEffect(!!open, duration);
  if (!_open || !children) return null;
  return (
    <Portal id={portalID}>
      <ModalWrapper
        enter={enter}
        leave={leave}
        // ref={scrollRef}
        duration={duration}
        style={style}
      >
        {!disableBG && (
          <ModalBG
            enter={enter}
            leave={leave}
            onClick={onBGClick}
            duration={duration}
            style={backgroundStyle}
          />
        )}
        {attachProps(children, { enter, leave })}
      </ModalWrapper>
    </Portal>
  );
}

export function useModalEffect(open: boolean, duration = defaultDuration) {
  const [_open, _setOpen] = useState(open);
  const [_enter, _setEnter] = useState(false);
  const [_leave, _setLeave] = useState(false);
  useEffect(() => {
    if (open) _setOpen(true);
    if (!open) _setLeave(true);
  }, [open]);
  useEffect(() => {
    if (_open) _setEnter(true);
    if (!_open) _setEnter(false);
  }, [_open]);
  useEffect(() => {
    // leave
    if (_leave) {
      const timer = window.setTimeout(() => {
        _setOpen(false);
        _setLeave(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [_leave, duration]);
  useEffect(() => {
    // clear
    return () => {
      _setLeave(false);
      _setOpen(false);
    };
  }, []);
  return {
    enter: _enter,
    leave: _leave,
    _open,
  };
}

interface AnimProps {
  enter?: boolean;
  leave?: boolean;
  duration?: number;
}

function getAnimBG(p: AnimProps) {
  if (p.leave) return None;
  if (p.enter) return "rgba(0, 0, 0, 0.4)";
  return None;
}

function getAnimOpacity(p: AnimProps) {
  if (p.leave) return 0;
  if (p.enter) return 1;
  return 0;
}

export const ModalWrapper = styled.div<AnimProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  ${FlexColumn}
  ${FlexCenter}
  opacity: ${(p) => getAnimOpacity(p)};
  animation: ${(p) => p.duration}ms ${fadeIn} ease;
  transition: opacity ${(p) => p.duration}ms ease;
`;

export const ModalBG = styled.div<AnimProps>`
  ${AbsoluteFill}
  background-color: ${(p) => getAnimBG(p)};
  transition: background-color ${(p) => p.duration}ms ease;
  touch-action: none;
`;
