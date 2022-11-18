import * as React from "react";
import { SVGProps } from "react";

const SvgIconClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.13 3.07a.75.75 0 1 0-1.06 1.06L4.938 6l-1.87 1.87A.75.75 0 1 0 4.13 8.93L6 7.061l1.869 1.87a.75.75 0 1 0 1.06-1.061L7.06 6l1.87-1.87a.75.75 0 0 0-1.061-1.06l-1.87 1.87L4.13 3.07Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconClose;
