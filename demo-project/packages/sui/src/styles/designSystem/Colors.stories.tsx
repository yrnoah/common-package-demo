import React from "react";
import * as C from "../colors";
export default {
  title: "Example/DesignSystem/Colors",
};

const Template = () => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: "#ebebeb",
    }}
  >
    {Object.keys(C).map((name) => (
      <Dot color={(C as any)[name]} name={name} />
    ))}
  </div>
);

export const Colors = Template.bind({});

const Dot = React.memo(({ color, name }: { color: string; name: string }) => (
  <div
    style={{
      width: 200,
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: name.match("shadow") ? "#fff" : color,
        boxShadow: name.match("shadow") ? color : undefined,
        marginRight: 8,
        display: "inline-block",
      }}
    />
    <span>{name}</span>
  </div>
));
