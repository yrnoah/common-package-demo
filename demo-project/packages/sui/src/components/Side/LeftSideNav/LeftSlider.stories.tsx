import { useCallback } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import BaseSide from "./LeftSlider";

export default {
  title: "Example/Side",
  component: BaseSide,
} as ComponentMeta<typeof BaseSide>;

// 这里的title转换成适配国际化；
const SideList = {
  options: [
    {
      menu: {
        title: "Overview",
        key: "Overview",
        isSelected: true,
        to: "/overview",
      },
      isSpread: false,
      subMenus: [],
    },
    {
      menu: {
        title: "Usage Management",
        key: "Usage Management",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "Walk-in Usage",
          key: "Walk-in Usage",
          isSelected: false,
          to: "/22_usage",
          isShowRedDot: true,
        },
        {
          title: "Booking Usage",
          key: "Booking Usage",
          isSelected: false,
          to: "/22_management",
          isShowRedDot: true,
        },
        {
          title: "Manage Bookings",
          key: "Manage Bookings",
          isSelected: false,
          to: "/22_management",
        },
        {
          title: "User Rating Data",
          key: "User Rating Data",
          isSelected: false,
          to: "/22_management",
          isShowRedDot: true,
        },
        {
          title: "Rating Users",
          key: "Rating Users",
          isSelected: false,
          to: "/22_management",
          isShowRedDot: true,
        },
      ],
    },
    {
      menu: {
        title: "Supply Management",
        key: "Supply Management",
        isSelected: false,
        to: "/supply",
        isShowRedDot: true,
      },
      isSpread: false,
      subMenus: [],
    },
    {
      menu: {
        title: "SFB Management",
        key: "SFB Management",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_SFB",
          key: "22_SFB",
          isSelected: false,
          to: "/22_sfb",
        },
      ],
    },
    {
      menu: {
        title: "Promo Management",
        key: "Promo Management",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_Promo",
          key: "22_Promo",
          isSelected: false,
          to: "/22_promo",
        },
      ],
    },
    {
      menu: {
        title: "Marketing Management",
        key: "Marketing Management",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_Marketing",
          key: "22_Marketing",
          isSelected: false,
          to: "/22_marketing",
        },
      ],
    },
    {
      menu: {
        title: "Refund Management",
        key: "Refund Management",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_Refund",
          key: "22_Refund",
          isSelected: false,
          to: "/22_refund",
        },
      ],
    },
    {
      menu: {
        title: "Space Configuration",
        key: "Space Configuration08",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_Space",
          key: "22_Space",
          isSelected: false,
          to: "/ss_space",
        },
      ],
    },
    {
      menu: {
        title: "lScanner Managementeft",
        key: "Scanner Management",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_lScanner",
          key: "22_lScanner",
          isSelected: false,
          to: "/22_lscanner",
        },
      ],
    },
    {
      menu: {
        title: "left_1010",
        key: "left_1010",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_left_1010",
          key: "22_left_1010",
          isSelected: false,
          to: "/22_left_1010",
        },
      ],
    },
    {
      menu: {
        title: "left_1011",
        key: "left_1011",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_left_1011",
          key: "22_left_1011",
          isSelected: false,
          to: "/22_left_1011",
        },
      ],
    },
    {
      menu: {
        title: "App Open Data",
        key: "App Open Data",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_App Open",
          key: "22_App Open",
          isSelected: false,
          to: "",
        },
      ],
    },
    {
      menu: {
        title: "leftUser & Role",
        key: "User & Role",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_leftUser",
          key: "22_leftUser",
          isSelected: false,
          to: "",
        },
      ],
    },
    {
      menu: {
        title: "left_1014",
        key: "left_1014",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_left_1014",
          key: "22_left_1014",
          isSelected: false,
          to: "",
        },
      ],
    },
    {
      menu: {
        title: "left_1015",
        key: "left_1015",
        isSelected: false,
        to: "",
      },
      isSpread: false,
      subMenus: [
        {
          title: "22_left_1015",
          key: "22_left_1015",
          isSelected: false,
          to: "",
        },
      ],
    },
  ],
};
const Template: ComponentStory<typeof BaseSide> = (args) => {
  const onChange = useCallback((option) => {
    console.log("onChange: ", option);
  }, []);

  return <BaseSide {...args} onChange={onChange} />;
};

export const LeftSlider = Template.bind({});
LeftSlider.args = {
  options: SideList.options,
  wrapperStyle: { backgroundColor: "#2C2C2C" },
  headStyle: { backgroundColor: "#040303" },
  // 传入的时候需要国际化
  portalTitle: "Admin Portal",
  portalFooterTitle: "REinvent",
};
