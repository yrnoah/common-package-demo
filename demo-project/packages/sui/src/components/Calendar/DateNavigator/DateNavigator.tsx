import React from "react";
import { useIntl } from "react-intl";

import { Primary, Neutral5 } from "../../../styles/colors";
import { FlexRowWrapper, FlexBlank } from "../../../styles/common";
import Tooltip from "../../Tooltip";
import * as S from "../styles.picker";

interface IDateNavigatorProps {
  title: string;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onTitleClick?: () => void;
  onClickResetToToday?: () => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  hasTodayButton?: boolean;
  isTodayDisabled?: boolean;
  /** clear date function, if not passed the clear button will not display */
  onClearDate?: () => void;
}

export default function DateNavigator({
  title,
  onPreviousClick,
  onNextClick,
  previousDisabled,
  nextDisabled,
  onTitleClick,
  onClickResetToToday,
  hasTodayButton,
  isTodayDisabled,
  onClearDate,
}: IDateNavigatorProps) {
  const intl = useIntl();
  return (
    <S.DNContainer>
      <S.DNTitleContainer>
        <S.DNArrowLeftBtn
          disabled={previousDisabled}
          style={{ marginRight: 8 }}
          onClick={previousDisabled ? undefined : onPreviousClick}
        />
        <S.DNTitle
          style={{
            position: "relative",
            top: 1,
            cursor: onTitleClick ? "pointer" : "auto",
          }}
          onClick={onTitleClick}
        >
          {title}
        </S.DNTitle>
        <S.DNArrowRightBtn
          disabled={nextDisabled}
          style={{ marginLeft: 8 }}
          onClick={nextDisabled ? undefined : onNextClick}
        />
      </S.DNTitleContainer>
      <FlexBlank />
      {hasTodayButton && (
        <S.DNToday
          onClick={isTodayDisabled ? undefined : onClickResetToToday}
          style={{
            cursor: isTodayDisabled ? "not-allowed" : "pointer",
            color: isTodayDisabled ? Neutral5 : Primary,
            marginRight: !!onClearDate ? 12 : undefined,
          }}
        >
          {intl.formatMessage({ defaultMessage: "Today" })}
        </S.DNToday>
      )}
      {!!onClearDate && (
        <Tooltip text={intl.formatMessage({ defaultMessage: "Clear All" })}>
          <FlexRowWrapper
            style={{
              width: 32,
              height: 32,
              cursor: "pointer",
            }}
            align="center"
            horizontal="center"
            onClick={onClearDate}
          >
            <S.IconClear />
          </FlexRowWrapper>
        </Tooltip>
      )}
    </S.DNContainer>
  );
}
