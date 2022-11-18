import * as React from "react";
import { SVGProps } from "react";

const SvgIconPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.143 8.857H8.857v4.286A.86.86 0 0 1 8 14a.86.86 0 0 1-.857-.857V8.857H2.857A.86.86 0 0 1 2 8a.86.86 0 0 1 .857-.857h4.286V2.857A.86.86 0 0 1 8 2a.86.86 0 0 1 .857.857v4.286h4.286A.86.86 0 0 1 14 8a.86.86 0 0 1-.857.857Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconPlus;
