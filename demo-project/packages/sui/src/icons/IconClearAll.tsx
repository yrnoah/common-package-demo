import * as React from "react";
import { SVGProps } from "react";

const SvgIconClearAll = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.667 7.364H10V2.273C10 1.573 9.4 1 8.667 1H7.333C6.6 1 6 1.573 6 2.273v5.09h-.667C3.493 7.364 2 8.79 2 10.547V15h12v-4.454c0-1.757-1.493-3.182-3.333-3.182ZM7.333 2.273h1.334v5.09H7.333v-5.09Zm5.334 11.454h-1.334v-1.909c0-.35-.3-.636-.666-.636-.367 0-.667.286-.667.636v1.91H8.667v-1.91c0-.35-.3-.636-.667-.636-.367 0-.667.286-.667.636v1.91H6v-1.91c0-.35-.3-.636-.667-.636-.366 0-.666.286-.666.636v1.91H3.333v-3.182c0-1.05.9-1.91 2-1.91h5.334c1.1 0 2 .86 2 1.91v3.181Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconClearAll;
