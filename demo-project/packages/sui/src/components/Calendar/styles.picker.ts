import styled, { css } from "styled-components";
import IconCalendarSVG from "../../icons/IconCalendar";
import IconArrowLeft from "../../icons/IconArrowLeft";
import IconArrowRight from "../../icons/IconArrowRight";
import { IconClearAll } from "../../icons";
import * as C from "../../styles/colors";
import { Subtitle1CSS, Body2CSS, Caption1CSS } from "../../styles/fonts";

const PressedColor = (v: boolean) =>
  v ? C.PrimaryLightest : C.PrimaryLightest2;

export const Wrapper = styled.div`
  height: 32px;
  border-radius: 2px;
  position: relative;
  z-index: 3;
  user-select: none;
`;

const PickerBorder = (v: boolean) => (v ? C.None : C.Neutral4);

interface PickerBtnProps {
  pressed: boolean;
  defaultBgColor?: string;
}

export const PickerButton = styled(Wrapper)<PickerBtnProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 0 6px;
  cursor: pointer;
  color: ${(p) => (p.pressed ? C.Primary : C.Neutral8)};
  border-color: ${(p) => PickerBorder(p.pressed)};
  border-width: 1px;
  border-style: solid;
  background-color: ${({ defaultBgColor }) => defaultBgColor || "#fff"};
  transition: all 0.2s ease;
  margin-right: 8px;

  &:hover {
    color: ${C.Primary};
    border-color: ${C.None};
    background-color: ${(p) => PressedColor(p.pressed)};

    svg {
      fill: ${C.Primary};
    }
  }
`;

export const IconCalendar = styled(IconCalendarSVG)`
  width: 20px;
  height: 20px;
  fill: ${C.Neutral8};
  margin-right: 8px;
`;

export const IconClear = styled(IconClearAll)`
  width: 16px;
  height: 16px;
  color: ${C.Neutral8};
  &:hover {
    color: ${C.Neutral13};
  }
`;

export const Selections = styled.div<{ isShow: boolean }>`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 36px;
  background-color: #fff;
  box-sizing: border-box;
  user-select: none;
  border-radius: 2px;
  border: 1px solid ${C.Neutral4};
  box-shadow: ${C.shadow};
  transition: all 0.2s ease;
  opacity: ${(p) => (p.isShow ? 1 : 0)};
  transform: translateY(${(p) => (p.isShow ? 0 : "-20%")});
  pointer-events: ${(p) => (p.isShow ? "auto" : "none")};
`;

export const SelectionsWrapper = styled.div`
  width: 180px;
  padding: 16px 0 8px 0;
  box-sizing: border-box;
`;

interface OptionProps {
  isActive?: boolean;
  isCustom?: boolean;
}

export const Option = styled.div<OptionProps>`
  width: 149px;
  height: 36px;
  color: ${C.Neutral};
  background-color: ${(p) => (p.isActive ? C.Neutral3 : "#fff")};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(p) => (p.isCustom ? "space-between" : "flex-start")};
  box-sizing: border-box;
  padding: 0 8px;
  margin: 0 16px 8px 16px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${C.Neutral2};
  }

  &::after {
    content: ">";
    display: ${(p) => (p.isCustom ? "block" : "none")};
    transform: scale(0.6, 1);
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${C.Neutral4};
  margin: 16px 0;
`;

export const DaysContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const WeekdayItem = styled.div`
  ${Caption1CSS}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 2px;
  flex: 1 0 12.2857%;
  height: 40px;
  color: ${C.Neutral7};
  user-select: none;
  position: relative;
  margin-bottom: 8px;
  margin-left: 4px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    left: -4px;
    bottom: 0;
    right: 0;
    height: 1px;
    background-color: ${C.Neutral4};
  }

  &:nth-child(7n + 1) {
    margin-left: 0;
    &::after {
      left: 0;
    }
  }
`;

export const DateItem = styled.div`
  ${Body2CSS}
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex: 1 0 12.2857%;
  height: 40px;
  color: ${C.Neutral};
  user-select: none;
  cursor: pointer;
  border: 1px solid ${C.None};
  margin-bottom: 4px;
  margin-left: 4px;
  position: relative;

  &:nth-child(7n + 1) {
    margin-left: 0;
  }

  &.dc-date-item-today {
    color: ${C.Primary};

    &::after {
      content: "";
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${C.Primary};
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: 10px;
      margin-left: -2px;
    }
  }

  &.day:hover {
    border: 1px solid ${C.Neutral6};
  }

  &.range:hover {
    color: ${C.Primary};
    background-color: ${C.PrimaryLightest2};
  }

  &.dc-date-item-disabled {
    color: ${C.Neutral5};
    background-color: #fff;
    cursor: not-allowed;
    &:hover {
      border: 1px solid ${C.None};
    }
  }

  &.dc-date-item-hovered {
    color: ${C.Primary};
    background-color: ${C.PrimaryLightest2};
  }

  &.dc-date-item-selected {
    color: #fff;
    background-color: ${C.Primary};

    &:hover {
      border: 1px solid ${C.Primary};
    }

    &.dc-date-item-today {
      &::after {
        background-color: #fff;
      }
    }

    &.range {
      color: ${C.Primary};
      background-color: ${C.PrimaryLightest2};
      &.dc-date-item-today {
        &::after {
          background-color: ${C.Primary};
        }
      }
    }

    &.day {
      border-radius: 2px;
    }

    &.highlight-start {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    &.highlight-end {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  &.highlight {
    background-color: ${C.PrimaryLightest};
    border-radius: 2px;
  }

  &.range.highlight-start {
    background-color: ${C.PrimaryLightest};
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  &.range.highlight-end {
    background-color: ${C.PrimaryLightest};
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`;

export const DNContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const DNTitle = styled.div`
  ${Subtitle1CSS}
  color: ${C.Neutral};
  user-select: none;
`;

export const DNTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DNBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 53px;
  justify-content: space-between;
`;

export const DNToday = styled.div`
  ${Body2CSS}
  color: ${C.Primary};
  cursor: pointer;
  user-select: none;
`;

const DNArrowBtnCSS = css<{ disabled?: boolean }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${C.Neutral13};
  ${({ disabled }) =>
    disabled &&
    css`
      color: ${C.Neutral5};
      cursor: not-allowed;
    `}
`;

export const DNArrowLeftBtn = styled(IconArrowLeft)<{ disabled?: boolean }>`
  ${DNArrowBtnCSS}
`;
export const DNArrowRightBtn = styled(IconArrowRight)<{ disabled?: boolean }>`
  ${DNArrowBtnCSS}
`;

export const DPPPickerContainer = styled.div`
  margin-top: 24px;
  min-height: 280px;
`;

export const DPTBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

export const DPTTypeBtn = styled.button<{ $active?: boolean }>`
  outline: none;
  text-align: center;
  flex: 1 0 20%;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  color: ${C.Neutral4};
  padding: 6px 0;
  border: 1px solid ${C.Neutral4};
  border-right: 0;
  background-color: #fff;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right: 1px solid ${C.Neutral4};
  }

  &:hover {
    background-color: ${C.Primary};
    color: #fff;
    border-color: ${C.Primary};
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: ${C.Primary};
      color: #fff;
      border-color: ${C.Primary};
    `}
`;

export const DPPanelWrapper = styled.div`
  padding: 24px;
  width: 370px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  overflow: hidden;
`;

export const DPTriggerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;
export const DPTriggerText = styled.div`
  color: ${C.Neutral};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  margin-left: 8px;
`;
export const DPTriggerIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    display: block;
  }
`;
export const MPMonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  padding-top: 24px;
  padding-left: 10px;
  flex: 1;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-sizing: border-box;
  border-top: 1px solid ${C.Neutral4};
  border-bottom: 1px solid ${C.Neutral4};
`;

export const YPYearWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  border-top: 1px solid ${C.Neutral4};
  padding-top: 18px;
`;

export const MPMonthItemWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};
`;

export const MPMonthTextContainer = styled.div`
  ${Body2CSS}
  margin-left: 15px;
  color: ${C.Neutral};
  user-select: none;
`;

export const RPFromToWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;
export const RPFromToContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(50% - 8px);
`;
export const RPDateLabel = styled.div`
  ${Caption1CSS}
  color: ${C.Neutral8};
  margin-bottom: 6px;
  user-select: none;
`;
export const RPDateValue = styled.div`
  ${Body2CSS}
  background: #fff;
  border: 1px solid #c9ced6;
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0 12px;
  height: 36px;
  display: flex;
  align-items: center;
  color: ${C.Neutral};
`;
interface YPYearItemProps {
  $active?: boolean;
  disabled?: boolean;
  $isCur?: boolean;
}
export const YPYearItem = styled.div<YPYearItemProps>`
  ${Body2CSS}
  width: 96px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${C.Neutral};
  border-radius: 2px;
  border: 1px solid ${C.None};
  margin-bottom: 8px;
  position: relative;
  cursor: pointer;
  user-select: none;

  &:hover {
    border: 1px solid ${C.Neutral6};
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: ${C.PrimaryLightest};
      color: ${C.Primary};
      &:hover {
        border: 1px solid ${C.Primary};
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${C.Neutral5};
      cursor: not-allowed;
      &:hover {
        border: 1px solid ${C.None};
      }
    `}

  ${({ $isCur }) =>
    $isCur &&
    css`
      color: ${C.Primary};

      &::after {
        content: "";
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${C.Primary};
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: 10px;
        margin-left: -2px;
      }
    `}
`;

export const CalendarWrapper = styled.div`
  flex: 1;
  box-sizing: border-box;
  border-left: 1px solid ${C.Neutral4};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CalendarSelections = styled.div<{ justifyContent?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  border-bottom: 1px solid ${C.Neutral4};
  background-color: ${C.PrimaryCream};
`;

export const CalendarOption = styled.div`
  width: 50px;
  height: 100%;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p: { isAct: boolean }) => (p.isAct ? C.Primary : C.Neutral)};
  box-sizing: border-box;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -0.5px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${(p: { isAct: boolean }) => (p.isAct ? C.Primary : C.None)};
  }

  &:hover {
    color: ${C.PrimaryLighter};
  }

  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const CalendarPanel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const CalendarAction = styled.div`
  width: 100%;
  height: ${(p: { size: number }) => p.size || 72}px;
  flex: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 24px;
`;

export const CalendarActionButton = styled.div`
  cursor: pointer;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16.5px;
  transition: all 0.2s ease;

  &:hover {
    color: ${C.Primary};
  }
`;
