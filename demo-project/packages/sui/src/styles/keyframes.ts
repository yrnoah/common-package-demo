import { keyframes } from "styled-components";

/** @example  styled.div`animation: 200ms ${fadeIn} ease;` */
export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
export const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;
export const faSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(359deg); }
`;
