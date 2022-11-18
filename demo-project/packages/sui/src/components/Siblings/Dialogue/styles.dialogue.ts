import styled from "styled-components";
import { Neutral1, Neutral13, Neutral8, shadow1 } from "../../../styles/colors";
import { FlexRow } from "../../../styles/common";
import { Subtitle1CSS, CaptionCSS } from "../../../styles/fonts";

export const Wrapper = styled.div`
  width: 320px;
  background-color: ${Neutral1};
  border-radius: 2px;
  box-shadow: ${shadow1};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled.div`
  ${Subtitle1CSS}
  text-align: center;
  color: ${Neutral13};
  padding: 32px 24px 0;
  box-sizing: border-box;
`;

export const SubTitle = styled.div`
  ${CaptionCSS}
  text-align: center;
  color: ${Neutral8};
  padding: 8px 24px 0;
`;

export const BottomBtnWrapper = styled.div`
  ${FlexRow};
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 32px;
`;
