import React from "react";
import styled from "styled-components";
import * as I from "../../icons";
import { PrimaryLighter } from "../colors";
import { Body2CSS } from "../fonts";
export default {
  title: "Example/DesignSystem/Icons",
};

const components: any[] = [];
for (const i in I) {
  let name = i;
  name = name.replace("Icon", "");
  components.push({ Component: (I as any)[i], name });
}

const Template = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {components
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((i, index) => (
          <Item key={index}>
            <i.Component />
            <p>{i.name}</p>
          </Item>
        ))}
    </div>
  );
};

export const Icons = Template.bind({});

const Item = styled.div`
  ${Body2CSS}
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;

  color: ${PrimaryLighter};
  p {
    color: #000;
    margin: 0;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;
