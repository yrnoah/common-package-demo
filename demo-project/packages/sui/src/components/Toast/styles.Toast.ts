import styled from "styled-components";
import {
  Functional2Success,
  Functional2Error,
  Functional2Warning,
  Functional2Info,
  Functional1Success,
  Functional1Error,
  Functional1Warning,
  Functional1Info,
} from "../../styles/colors";
import { Body2CSS } from "../../styles/fonts";
import { BoxShadow } from "../../styles/common";
import SvgIconNotificationSuccess from "../../icons/IconNotificationSuccess";
import SvgIconNotificationFailed from "../../icons/IconNotificationFailed";
import SvgIconInfo from "../../icons/IconInfo";
import SvgIconWarn from "../../icons/IconWarn";

const ToastBackgrounds = {
  success: Functional1Success,
  error: Functional1Error,
  info: Functional1Info,
  warn: Functional1Warning,
};

export const ContentWrapper = styled.div<{
  $type: NotificationType;
}>`
  ${Body2CSS};
  ${BoxShadow};
  display: inline-flex;
  flex-direction: row;
  padding: 10px 12px;
  background: ${({ $type }) => ToastBackgrounds[$type]};
  & > svg {
    margin-right: 10px;
  }
`;

export const SuccessIcon = styled(SvgIconNotificationSuccess)`
  width: 16px;
  height: 16px;
  color: ${Functional2Success};
`;

export const ErrorIcon = styled(SvgIconNotificationFailed)`
  width: 16px;
  height: 14px;
  color: ${Functional2Error};
`;

export const IconWarn = styled(SvgIconWarn)`
  width: 16px;
  height: 16px;
  color: ${Functional2Warning};
`;
export const IconInfo = styled(SvgIconInfo)`
  width: 16px;
  height: 16px;
  color: ${Functional2Info};
`;
