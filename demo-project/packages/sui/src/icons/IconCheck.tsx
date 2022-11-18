import * as React from "react";
import { SVGProps } from "react";

const SvgIconCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 10.78 3.22 8l-.947.94L6 12.667l8-8-.94-.94L6 10.78Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconCheck;
