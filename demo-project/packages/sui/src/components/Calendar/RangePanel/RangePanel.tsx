import { useIntl } from "react-intl";
import * as S from "../styles.picker";

import { RangeCalendar } from "../DatePanel";
import type { IRangeCalendarProps } from "../DatePanel";

function formatDate(value: moment.Moment | undefined) {
  return value ? value.format("MMM D, YYYY") : "";
}

export default function RangePanel(props: IRangeCalendarProps) {
  const intl = useIntl();
  return (
    <>
      <S.RPFromToWrapper>
        <S.RPFromToContainer>
          <S.RPDateLabel>
            {intl.formatMessage({ defaultMessage: "From" })}
          </S.RPDateLabel>
          <S.RPDateValue>{formatDate(props.value?.[0])}</S.RPDateValue>
        </S.RPFromToContainer>
        <S.RPFromToContainer>
          <S.RPDateLabel>
            {intl.formatMessage({ defaultMessage: "To" })}
          </S.RPDateLabel>
          <S.RPDateValue>{formatDate(props.value?.[1])}</S.RPDateValue>
        </S.RPFromToContainer>
      </S.RPFromToWrapper>
      <RangeCalendar {...props} />
    </>
  );
}
