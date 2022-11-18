import * as React from "react";
import { SVGProps } from "react";

const SvgIconMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 10 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.833 1.833h8.334V.167H.833v1.666Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconMinus;
