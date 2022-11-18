import * as React from "react";
import { SVGProps } from "react";

const SvgIconWarn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.68 17h12.64c1.293 0 2.099-1.375 1.452-2.47l-6.32-10.709c-.646-1.095-2.258-1.095-2.904 0l-6.32 10.71C1.58 15.624 2.388 17 3.68 17ZM10 11.238a.834.834 0 0 1-.84-.823V8.768c0-.452.378-.823.84-.823.462 0 .84.37.84.823v1.647a.834.834 0 0 1-.84.823Zm.84 3.293H9.16v-1.647h1.68v1.646Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgIconWarn;
