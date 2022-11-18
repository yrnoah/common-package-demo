import * as React from "react";
import { SVGProps } from "react";

const SvgIconArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.468 6.267 7.996 9.802 4.523 6.267a.88.88 0 0 0-1.261 0 .92.92 0 0 0 0 1.284l4.107 4.182a.88.88 0 0 0 1.262 0l4.107-4.182a.92.92 0 0 0 0-1.284.899.899 0 0 0-1.27 0Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconArrowDown;
