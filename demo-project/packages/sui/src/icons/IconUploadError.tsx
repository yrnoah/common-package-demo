import * as React from "react";
import { SVGProps } from "react";

const SvgIconUploadError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 15a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3.58l.283.283a1 1 0 0 0 1.414 0l2.586-2.586a1 1 0 0 1 1.414 0l2.587 2.587a1 1 0 0 0 1.413 0L14.99 8.42 16 9.43V15Zm0-8.41-.302-.302a1 1 0 0 0-1.415 0l-2.586 2.593a1 1 0 0 1-1.415.001L7.697 6.297a1 1 0 0 0-1.414 0L3.7 8.88a1 1 0 0 1-1.418-.003L2 8.59V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3.59Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconUploadError;
