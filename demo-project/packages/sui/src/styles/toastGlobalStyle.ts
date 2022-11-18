import { createGlobalStyle, css } from "styled-components";
import { ToastZIndex } from "./zindex";
const FadeEffect = css`
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
`;

export const ToastGlobalStyle = createGlobalStyle<{ leftOffset?: number }>`
.sui {
  position: fixed;
  z-index: ${ToastZIndex};
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  top: 8px;
  left: 0;
  text-align: center;
  pointer-events: none;
  &-notice {
    margin-top: 10px;
    border-radius: 2px;
    width: auto;
    position: relative;
    text-align: center;
    .sui-content {
      margin-left: ${({ leftOffset }) => (leftOffset ? leftOffset + "px" : 0)};
    }
  }

 

  &-fade-appear,
  &-fade-enter {
    opacity: 0;
    ${FadeEffect}
    animation-play-state: paused;
  }

  &-fade-leave {
    ${FadeEffect}
    animation-play-state: paused;
  }

  &-fade-appear&-fade-appear-active,
  &-fade-enter&-fade-enter-active {
    animation-name: rcNotificationFadeIn;
    animation-play-state: running;
  }

  &-fade-leave&-fade-leave-active {
    animation-name: rcDialogFadeOut;
    animation-play-state: running;
  }

  @keyframes rcNotificationFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes rcDialogFadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
`;
