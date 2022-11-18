import * as React from "react";
import { SVGProps } from "react";

const SvgIconAdd = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 16c.631 0 1.143-.512 1.143-1.143V9.143h5.714a1.143 1.143 0 1 0 0-2.286H9.143V1.143a1.143 1.143 0 0 0-2.286 0v5.714H1.143a1.143 1.143 0 0 0 0 2.286h5.714v5.714C6.857 15.488 7.37 16 8 16Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconAdd;
