import * as React from "react";
import { SVGProps } from "react";

const SvgIconArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.267 3.763a.881.881 0 0 0 0 1.263L8.802 8.5l-3.535 3.474a.881.881 0 0 0 0 1.263c.355.35.929.35 1.284 0l4.182-4.11a.881.881 0 0 0 0-1.263l-4.182-4.11a.927.927 0 0 0-1.284.008Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconArrowRight;
