import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StarRating as RawStarRating } from "./StarRating";

export default {
  title: "Example/Rating/StarRating",
  component: RawStarRating,
} as ComponentMeta<typeof RawStarRating>;

const Template: ComponentStory<typeof RawStarRating> = (args) => (
  <RawStarRating {...args} />
);

export const StarRating = Template.bind({});
StarRating.args = {
  size: 30,
  score: 3.2,
  max: 5,
  activeColor: "#F55523",
  defaultColor: "#D9D9D9",
  wrapperStyle: {},
  itemStyle: {},
};
