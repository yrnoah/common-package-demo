import { forwardRef, useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import * as S from "./styles.pagination";
import IconArrowLeft from "../../../icons/IconArrowLeft";
import IconArrowRight from "../../../icons/IconArrowRight";
import PageSizePicker from "./PageSizePicker";

export interface PaginationProps {
  /** container styles */
  style?: React.CSSProperties;
  /**
   * Item 总数
   */
  totalSize?: number;
  /**
   * 每屏显示的 Item 数量（10/20/50/100）
   */
  pageSize: number;
  /**
   * 当前页
   */
  currentPage?: number;
  onSetPage?: (v: number) => void;
  onPageSizeChange?: (size: number) => void;
  options?: number[];
}

const pickerOptions = [10, 20, 50, 100];
const buttonStyles: React.CSSProperties = {
  width: 24,
  height: 24,
  padding: 0,
};
const btnLeftStyles = { ...buttonStyles, marginRight: 4 };
const btnRightStyles = { ...buttonStyles, marginLeft: 8, marginRight: 16 };

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      totalSize = 0,
      pageSize = 50,
      currentPage = 1,
      onSetPage,
      onPageSizeChange,
      options,
      style,
    },
    ref
  ) => {
    const intl = useIntl();
    const totalPage = Math.ceil(totalSize / pageSize);
    const PageSizeOption = useMemo(
      () =>
        (options || pickerOptions).map((page) => {
          return {
            name: intl.formatMessage(
              {
                defaultMessage: "{count} / Page",
              },
              { count: page }
            ),
            key: page,
          };
        }),
      [intl, options]
    );

    const onClickNextPage = useCallback(() => {
      if (currentPage < totalPage && onSetPage) onSetPage(currentPage + 1);
    }, [currentPage, onSetPage, totalPage]);

    const onClickPrePage = useCallback(() => {
      if (currentPage > 1 && onSetPage) onSetPage(currentPage - 1);
    }, [currentPage, onSetPage]);

    const onClickPage = useCallback(
      (page) => {
        if (currentPage !== page && onSetPage) onSetPage(page);
      },
      [currentPage, onSetPage]
    );

    const pageButtonsArray = useMemo(() => {
      return getPageButtons(totalPage, currentPage);
    }, [totalPage, currentPage]);

    const onSizeChange = useCallback(
      (v: number) => {
        if (onSetPage) onSetPage(1);
        if (onPageSizeChange) onPageSizeChange(v);
      },
      [onPageSizeChange, onSetPage]
    );

    return (
      <S.Container ref={ref} style={style}>
        <S.Text>
          {intl.formatMessage(
            {
              description: "eg: Total 1 item / Total 50 items",
              defaultMessage:
                "Total {count} {count, plural, =0 {item} =1 {item} other {items}}",
            },
            { count: totalSize }
          )}
        </S.Text>
        <S.PageButton
          disabled={currentPage === 1}
          onClick={onClickPrePage}
          style={btnLeftStyles}
          isArrow
        >
          <IconArrowLeft width={16} height={16} />
        </S.PageButton>
        {pageButtonsArray.map((v) => (
          <S.PageButton
            key={`${v.value}${v.text}`}
            selected={currentPage === v.value}
            onClick={onClickPage.bind(null, v.value)}
          >
            {v.text}
          </S.PageButton>
        ))}
        <S.PageButton
          disabled={currentPage === totalPage}
          onClick={onClickNextPage}
          style={btnRightStyles}
          isArrow
        >
          <IconArrowRight width={16} height={16} />
        </S.PageButton>
        <PageSizePicker
          options={PageSizeOption}
          onChange={onSizeChange}
          pageSize={pageSize}
        />
      </S.Container>
    );
  }
);

export default Pagination;

type TPageButton = {
  value: number;
  isDot: boolean;
  text: string | number;
};

function getPageButtons(totalPage: number, currentPage: number) {
  var result: TPageButton[] = [];
  if (totalPage <= 6) {
    result = result.concat(getPages(1, totalPage));
  }
  if (totalPage > 6) {
    if (currentPage <= 4) {
      result = result
        .concat(getPages(1, 5))
        .concat(dotItem(totalPage, currentPage, true))
        .concat(getPages(totalPage, totalPage));
    }
    if (currentPage >= 5 && currentPage < totalPage - 4) {
      result = result
        .concat(getPages(1, 1))
        .concat(dotItem(1, currentPage, false))
        .concat(getPages(currentPage - 2, currentPage + 2))
        .concat(dotItem(totalPage, currentPage, true))
        .concat(getPages(totalPage, totalPage));
    }
    if (currentPage > 5 && currentPage >= totalPage - 4) {
      result = result
        .concat(getPages(1, 1))
        .concat(dotItem(1, currentPage, false))
        .concat(getPages(totalPage - 5, totalPage));
    }
  }
  return result;
}

/**
 *
 * @param start
 * @param total
 * @returns
 */
function getPages(start: number, total: number) {
  let result: TPageButton[] = [];
  for (let i = start; i <= total; i++) {
    result.push({ value: i, isDot: false, text: i });
  }
  return result;
}

/**
 * dot Item
 * @param totalPage
 * @param currentPage
 * @param isMin
 * @returns
 */
function dotItem(totalPage: number, currentPage: number, isMin: boolean) {
  let result = [];
  let value = Math.max(totalPage, currentPage - 5);
  if (isMin) value = Math.min(totalPage, currentPage + 5);
  result.push({
    value,
    isDot: true,
    text: "•••",
  });
  return result;
}
