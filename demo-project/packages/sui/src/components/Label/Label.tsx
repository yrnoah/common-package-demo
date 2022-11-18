import React, { memo, useMemo } from "react";
import Tooltip from "../Tooltip";

import { Label, TopInfo, Counts } from "./styles.label";
import { FlexBlank } from "../../styles/common";

export interface LabelProps {
  name?: string; // htmlFor
  label?: string; // content
  required?: boolean;
  active?: boolean; // hover or focus
  value?: string | number; // value of form element to count value string length
  maxLength?: number; // max value string length
  style?: React.CSSProperties; // container styles
  labelTextStyle?: React.CSSProperties;
  isSubtitle?: boolean;
  rightDes?: React.ReactNode;
  showCount?: boolean;
  isMobile?: boolean;
  error?: boolean;
  // tooltip config
  explanation?: React.ReactNode;
  explanationStyle?: React.CSSProperties; // tooltip wrapper style
  explanationIconSize?: number;
}

const LabelItem = ({
  label,
  name,
  required,
  active,
  maxLength,
  value,
  isSubtitle,
  rightDes,
  style,
  showCount,
  isMobile,
  error,
  labelTextStyle,
  // tooltip config
  explanation,
  explanationStyle,
  explanationIconSize,
}: LabelProps) => {
  const currentLength = useMemo(() => {
    if (!value || !maxLength) return 0;
    if (typeof value === "string") return Math.min(value.length, maxLength);
    if (typeof value === "number")
      return Math.min(`${value}`.length, maxLength);
  }, [value, maxLength]);
  const _showCounts = useMemo(() => {
    if (showCount === false || !maxLength) return false;
    if (!!value && !!maxLength) return true;
    return !!showCount;
  }, [value, maxLength, showCount]);
  if (!label && !maxLength) return null;
  return (
    <TopInfo style={style}>
      {!!label && (
        <Label
          htmlFor={name}
          required={required}
          isSubtitle={isSubtitle}
          error={!!error}
          style={labelTextStyle}
          active={active}
        >
          {label}
        </Label>
      )}
      {!!explanation && (
        <Tooltip
          text={explanation}
          style={explanationStyle}
          size={explanationIconSize}
          isMobile={isMobile}
          direction="top"
        />
      )}
      <FlexBlank />
      {_showCounts && (
        <Counts>
          {currentLength} / {maxLength}
        </Counts>
      )}
      {!!rightDes && typeof rightDes === "string" && (
        <Counts>{rightDes}</Counts>
      )}
      {!!rightDes && typeof rightDes !== "string" && rightDes}
    </TopInfo>
  );
};
export default memo(LabelItem);
