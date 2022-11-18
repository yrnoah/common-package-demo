import styled from "styled-components";
import {
  None,
  Neutral1,
  Neutral7,
  Neutral8,
  Neutral9,
  Neutral10,
  Neutral11,
  Primary,
} from "../../../styles/colors";
import IconLogo from "../../../icons/IconLogo";
import IconArrowDown from "../../../icons/IconArrowDown";
import { Body2CSS, Caption1CSS, Subtitle } from "../../../styles/fonts";

export interface ItemProps {
  isSelected: boolean;
  /**
   * 二级列表
   */
  onItemClick?: () => void;
}

export const Side = styled.div`
  width: 200px;
  height: 100vh;
  background-color: ${Neutral10};
  color: ${Neutral1};
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SideHeader = styled.div`
  width: 100%;
  height: 144px;
  background-color: ${Neutral11};
  color: ${Neutral1};
  top: 0;
  display: flex;
  align-items: center;
  flex: none;
`;

export const Logo = styled(IconLogo)`
  width: 80px;
  height: 20px;
  margin-left: 16px;
`;

export const HeaderText = styled.div`
  ${Body2CSS}
  background-color: ${Neutral11};
  color: ${Neutral7};
  position: relative;
  margin-top: 2px;
  margin-left: 16px;
  user-select: none;
`;

export const LeftWrapper = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const LeftListWrap = styled.div`
  width: 100%;
  padding-top: 8px;
  flex: 1;
`;

export const LinkWrap = styled.link`
  text-decoration: underline;
`;

export const LeftSliderItem = styled.div<ItemProps>`
  ${(p) => setFont(p.isSelected)}
  width: 100%;
  height: 40px;
  color: ${Neutral1};
  align-items: center;
  margin-bottom: 4px;
  box-sizing: border-box;
  user-select: none;
  line-height: 40px;
  background-color: ${(p) => setItemBackgroundColor(p.isSelected)};
  &:hover {
    background-color: ${(p) => (p.isSelected ? Neutral8 : Neutral9)};
  }
`;

export const TextItem = styled.div`
  width: 100%;
  float: left;
  cursor: "pointer";
  box-sizing: border-box;
`;

export const SideFooter = styled.div`
  ${Caption1CSS}
  width: 100%;
  height: 14px;
  color: ${Neutral7};
  text-align: center;
  margin-bottom: 24px;
  margin-top: 20px;
  user-select: none;
`;

export const StatusIcon = styled(IconArrowDown)<{ $active?: boolean }>`
  width: 16px;
  height: 16px;
  right: 0;
  position: absolute;
  margin-right: 16px;
  margin-top: 12px;
  transform: ${(p) => (p.$active ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.1s ease;
`;

export const Badge = styled.span`
  width: 4px;
  height: 4px;
  background-color: ${Primary};
  border-radius: 2px;
  margin-left: 2px;
  margin-top: 12px;
  display: inline-block;
  position: absolute;
`;

function setFont(isSelected: boolean) {
  if (isSelected === true) return Subtitle;
  return Body2CSS;
}

function setItemBackgroundColor(isSelected: boolean) {
  if (isSelected === true) return Neutral8;
  return None;
}
