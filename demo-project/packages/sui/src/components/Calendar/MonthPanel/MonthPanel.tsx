import React, { useMemo, useCallback } from "react";
import moment from "moment";
import { Checkbox } from "../../Checkbox";

import DateNavigator from "../DateNavigator/DateNavigator";
import * as S from "../styles.picker";

interface IMonthPanelProps {
  disabledMonth: (month: moment.Moment) => boolean;
  disabledYear: (month: moment.Moment) => boolean;
  value?: moment.Moment;
  onChange: (value: moment.Moment) => void;
  viewedYear: moment.Moment;
  onViewedYearChange: (newViewedYear: moment.Moment) => void;
}

const monthNames = moment.months();

function MonthItem({
  checked,
  checkable,
  text,
  onClick,
}: {
  checked: boolean;
  checkable: boolean;
  text: string;
  onClick: () => void;
  month: moment.Moment;
}) {
  return (
    <S.MPMonthItemWrapper disabled={!checkable && !checked} onClick={onClick}>
      <Checkbox disabled={!checkable && !checked} checked={checked} />
      <S.MPMonthTextContainer>{text}</S.MPMonthTextContainer>
    </S.MPMonthItemWrapper>
  );
}

interface IRawMonthPanelProps
  extends Pick<IMonthPanelProps, "disabledMonth" | "disabledYear"> {
  onChange: (month: moment.Moment) => void;
  value?: moment.Moment;
  viewedYear: moment.Moment;
  onViewedYearChange: (newViewedYear: moment.Moment) => void;
  onTitleClick?: () => void;
  wrapperStyle?: React.CSSProperties;
}

export default function RawMonthPanel({
  disabledMonth,
  value,
  onChange,
  disabledYear,
  viewedYear,
  onViewedYearChange,
  onTitleClick,
  wrapperStyle,
}: IRawMonthPanelProps) {
  const monthMoments = useMemo(
    () =>
      monthNames
        .map((_value, index) =>
          viewedYear.startOf("year").clone().add(index, "month")
        )
        .filter((value) => !disabledMonth(value)),
    [viewedYear, disabledMonth]
  );
  const months = useMemo(
    () =>
      monthMoments.map((month) => ({
        text: monthNames[month.month()],
        month,
        key: month.format("YYYY-MM-DD"),
        checked: !!value?.isSame(month, "month"),
        checkable: true,
      })),
    [monthMoments, value]
  );
  const nextDisabled = useMemo(
    () => disabledYear(viewedYear.clone().add(1, "year")),
    [viewedYear, disabledYear]
  );
  const previousDisabled = useMemo(
    () => disabledYear(viewedYear.clone().add(-1, "year")),
    [viewedYear, disabledYear]
  );

  const handlePreviousClick = useCallback(() => {
    onViewedYearChange(viewedYear.clone().add(-1, "year"));
  }, [onViewedYearChange, viewedYear]);

  const handleNextClick = useCallback(() => {
    onViewedYearChange(viewedYear.clone().add(1, "year"));
  }, [onViewedYearChange, viewedYear]);
  return (
    <>
      <DateNavigator
        title={viewedYear.format("YYYY")}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        nextDisabled={nextDisabled}
        previousDisabled={previousDisabled}
        onTitleClick={onTitleClick}
      />
      <S.MPMonthWrapper style={wrapperStyle}>
        {months.map(({ text, checked, month, checkable, key }) => (
          <MonthItem
            key={key}
            text={text}
            checked={checked}
            month={month}
            checkable={checkable}
            onClick={onChange.bind(null, month)}
          />
        ))}
      </S.MPMonthWrapper>
    </>
  );
}
