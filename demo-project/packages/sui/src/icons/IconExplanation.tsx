import * as React from "react";
import { SVGProps } from "react";

const SvgIconExplanation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.4 9.6h1.2V8.4H5.4v1.2ZM6 0C2.688 0 0 2.688 0 6s2.688 6 6 6 6-2.688 6-6-2.688-6-6-6Zm0 10.8A4.806 4.806 0 0 1 1.2 6c0-2.646 2.154-4.8 4.8-4.8s4.8 2.154 4.8 4.8-2.154 4.8-4.8 4.8Zm0-8.4a2.4 2.4 0 0 0-2.4 2.4h1.2c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 1.2-1.8 1.05-1.8 3h1.2c0-1.35 1.8-1.5 1.8-3A2.4 2.4 0 0 0 6 2.4Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconExplanation;
