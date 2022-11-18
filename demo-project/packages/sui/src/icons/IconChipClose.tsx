import * as React from "react";
import { SVGProps } from "react";

const SvgIconChipClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.403 1.688a.643.643 0 1 1 .909.91L6.909 6l3.403 3.403a.643.643 0 1 1-.91.909L6 6.909l-3.403 3.403a.643.643 0 1 1-.909-.91L5.091 6 1.688 2.597a.643.643 0 0 1 .91-.909L6 5.091l3.403-3.403Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconChipClose;
