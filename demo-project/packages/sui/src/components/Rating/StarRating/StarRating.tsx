import React, { useMemo } from "react";
import styled from "styled-components";
import { FlexRow } from "../../../styles/common";

let index = 0;
function getID() {
  index++;
  return `star-rating-gradient-${index}`;
}

export interface StarRatingProps {
  max: number;
  score?: number;
  /**
   * star size: width * height
   */
  size?: number;
  activeColor?: string;
  defaultColor?: string;
  wrapperStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

export function StarRating(props: StarRatingProps) {
  const { max, score, wrapperStyle, ...others } = props;
  const _max = useMemo(() => Math.floor(Math.max(max || 1, 1)), [max]);
  const _score = useMemo(
    () => Math.min(_max, Math.max(score || 0, 0)),
    [_max, score]
  );
  const ds = useMemo(
    () =>
      Array.from({ length: _max }).map((_, i) => {
        const cur = i + 1; // 1 2 3 4 5 ...
        if (_score <= 0) return 0;
        if (cur <= _score) return 100;
        return Math.max(_score - i, 0) * 100;
      }),
    [_max, _score]
  );
  return (
    <Wrapper style={wrapperStyle}>
      {ds.map((v, i) => (
        <StarRatingItem {...others} key={`${_score}${i}`} value={v} />
      ))}
    </Wrapper>
  );
}

export default React.memo(StarRating);

export interface StarRatingItemProps {
  value?: number;
  size?: number;
  activeColor?: string;
  defaultColor?: string;
  itemStyle?: React.CSSProperties;
}

function StarRatingItem({
  size = 14,
  value,
  defaultColor = "#D9D9D9",
  activeColor = "#F55523",
  itemStyle,
}: StarRatingItemProps) {
  const id = getID();
  return (
    <ItemWrapper style={itemStyle}>
      <svg
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id={id} x1="0" x2="100%" y1="0" y2="0">
            <stop offset="0%" stopColor={activeColor} />
            <stop offset={`${value}%`} stopColor={activeColor} />
            <stop offset={`${value}%`} stopColor={defaultColor} />
            <stop offset="100%" stopColor={defaultColor} />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.0009 1.47748e-07C7.1332 -8.56388e-05 7.26287 0.0371877 7.37526 0.107602C7.48765 0.178017 7.57826 0.278761 7.63682 0.398431L9.41513 4.03483L13.3932 4.61818C13.5241 4.63734 13.6469 4.69305 13.748 4.779C13.8491 4.86494 13.9243 4.9777 13.9652 5.10452C14.0061 5.23135 14.0111 5.36719 13.9794 5.49668C13.9477 5.62617 13.8808 5.74415 13.7863 5.8373L10.9081 8.66825L11.5875 12.664C11.6099 12.7954 11.5954 12.9306 11.5456 13.0542C11.4958 13.1779 11.4128 13.2849 11.3058 13.3634C11.1988 13.4418 11.0722 13.4885 10.9403 13.4981C10.8084 13.5078 10.6765 13.48 10.5594 13.418L7.0009 11.5307L3.44239 13.418C3.32539 13.4799 3.19356 13.5077 3.06177 13.498C2.92997 13.4884 2.80348 13.4418 2.69655 13.3635C2.58963 13.2852 2.50654 13.1782 2.45667 13.0548C2.4068 12.9314 2.39213 12.7964 2.41433 12.665L3.09466 8.6673L0.214588 5.8373C0.119688 5.74419 0.0525363 5.62614 0.0207422 5.49651C-0.0110511 5.36687 -0.00621598 5.23085 0.0347013 5.10385C0.0756185 4.97685 0.15098 4.86394 0.252248 4.77794C0.353516 4.69193 0.476642 4.63626 0.607672 4.61722L4.58572 4.03483L6.36498 0.398431C6.42354 0.278761 6.51414 0.178017 6.62653 0.107602C6.73892 0.0371877 6.86859 -8.56388e-05 7.0009 1.47748e-07Z"
          fill={`url(#${id})`}
        />
      </svg>
    </ItemWrapper>
  );
}

const Wrapper = styled.div`
  ${FlexRow}
  align-items: center;
`;
const ItemWrapper = styled.div`
  box-sizing: border-box;
  padding: 1px;
  &:not(:first-child) {
    margin-left: 2px;
  }
`;
