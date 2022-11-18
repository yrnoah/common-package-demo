import React from "react";
import styled from "styled-components";
import { Primary } from "../../styles/colors";
import { FlexCenter, FlexRow } from "../../styles/common";
import { Body2CSS } from "../../styles/fonts";
import IconCheck from "../../icons/IconCheck";

const Steps = [1, 2, 3];

interface StepStatusProps {
  ds?: number[];
  active?: number;
}

export const StepStatus = React.memo<StepStatusProps>(
  ({ ds = Steps, active = -1 }) => (
    <StepStatusWrapper>
      {ds.map((v) => (
        <StepItem key={v} active={active >= v}>
          {active > v ? <IconCheck width={16} height={16} /> : v}
        </StepItem>
      ))}
    </StepStatusWrapper>
  )
);

const StepStatusWrapper = styled.div`
  ${FlexRow}
  align-items: center;
  user-select: none;
  margin-bottom: 14px;
`;

const StepItem = styled.div<{ active: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  ${Body2CSS}
  color: #fff;
  background-color: ${Primary};
  position: relative;
  ${FlexRow}
  ${FlexCenter}
  line-height: 25px;
  opacity: ${({ active }) => (active ? 1 : 0.4)};

  &:not(:first-child) {
    margin-left: 54px;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 46px;
      height: 2px;
      border-radius: 2px;
      left: -50px;
      top: 50%;
      margin-top: -0.5px;
      background-color: ${Primary};
    }
  }
`;
