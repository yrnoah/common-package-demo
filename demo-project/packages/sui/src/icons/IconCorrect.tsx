import * as React from "react";
import { SVGProps } from "react";

const SvgIconCorrect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m.167 5 4.166 4.167 7.5-7.5L10.658.483 4.333 6.808 1.342 3.825.167 5Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconCorrect;
