import * as React from "react";
import { SVGProps } from "react";

const SvgIconDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.25 10.25a.75.75 0 0 0-.75.75v1.5h-9V11A.75.75 0 0 0 2 11v1.5c0 .825.675 1.5 1.5 1.5h9c.825 0 1.5-.675 1.5-1.5V11a.75.75 0 0 0-.75-.75Zm-2.03-2.47a.748.748 0 0 0-1.057-1.06L8.75 8.127V2.75a.75.75 0 0 0-1.5 0v5.377L5.837 6.72a.748.748 0 0 0-1.058 1.06l2.69 2.69a.75.75 0 0 0 1.061 0l2.69-2.69Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconDownload;
