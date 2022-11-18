import React from "react";
import styled from "styled-components";
import * as F from "../fonts";
export default {
  title: "Example/DesignSystem/Fonts",
};

const Template = () => (
  <div>
    {Object.keys(F).map((name) =>
      name.match("CSS") ? <Font css={(F as any)[name]}>{name}</Font> : null
    )}
  </div>
);

export const Fonts = Template.bind({});

const Font = styled.div<{ css: any }>`
  ${(p) => p.css}
  margin-bottom: 8px;
`;
