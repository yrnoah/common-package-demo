import * as React from "react";
import { SVGProps } from "react";

const SvgIconCircleClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 0C3.129 0 0 3.129 0 7s3.129 7 7 7 7-3.129 7-7-3.129-7-7-7Zm3.01 10.01a.697.697 0 0 1-.987 0L7 7.987 4.977 10.01a.697.697 0 1 1-.987-.987L6.013 7 3.99 4.977a.697.697 0 1 1 .987-.987L7 6.013 9.023 3.99a.697.697 0 1 1 .987.987L7.987 7l2.023 2.023a.71.71 0 0 1 0 .987Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconCircleClose;
