import * as React from "react";
import { SVGProps } from "react";

const SvgIconCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.623 2c.421 0 .763.342.763.763V3.93h5.228V2.763a.763.763 0 0 1 1.526 0V3.93h2.132c.954 0 1.728.774 1.728 1.728v10.614c0 .954-.774 1.728-1.728 1.728H3.728A1.728 1.728 0 0 1 2 16.272V5.658c0-.954.774-1.728 1.728-1.728H5.86V2.763c0-.421.341-.763.763-.763Zm5.991 3.456v.684a.763.763 0 0 0 1.526 0v-.684h2.132c.111 0 .202.09.202.202v2.131H3.526V5.658c0-.112.09-.202.202-.202H5.86v.684a.763.763 0 0 0 1.526 0v-.684h5.228Zm3.86 3.86v6.956c0 .111-.09.202-.202.202H3.728a.202.202 0 0 1-.202-.202V9.316h12.948Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconCalendar;
