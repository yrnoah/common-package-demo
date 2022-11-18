import * as React from "react";
import { SVGProps } from "react";

const SvgIconSearchClear = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 1C4.129 1 1 4.129 1 8C1 11.871 4.129 15 8 15C11.871 15 15 11.871 15 8C15 4.129 11.871 1 8 1ZM11.01 11.01C10.737 11.283 10.296 11.283 10.023 11.01L8 8.987L5.977 11.01C5.704 11.283 5.263 11.283 4.99 11.01C4.717 10.737 4.717 10.296 4.99 10.023L7.013 8L4.99 5.977C4.717 5.704 4.717 5.263 4.99 4.99C5.263 4.717 5.704 4.717 5.977 4.99L8 7.013L10.023 4.99C10.296 4.717 10.737 4.717 11.01 4.99C11.283 5.263 11.283 5.704 11.01 5.977L8.987 8L11.01 10.023C11.276 10.289 11.276 10.737 11.01 11.01Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconSearchClear;
