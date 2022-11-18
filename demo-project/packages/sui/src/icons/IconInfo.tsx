import * as React from "react";
import { SVGProps } from "react";

const SvgIconInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 2c-4.416 0-8 3.584-8 8s3.584 8 8 8 8-3.584 8-8-3.584-8-8-8Zm0 8.8c-.44 0-.8-.36-.8-.8V6.8c0-.44.36-.8.8-.8.44 0 .8.36.8.8V10c0 .44-.36.8-.8.8Zm.8 3.2H9.2v-1.6h1.6V14Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconInfo;
