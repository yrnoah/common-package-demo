import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useCurrent } from "../../hooks";
import { Portal } from "../Siblings";
import * as S from "./styles.tooltip";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  children?: React.ReactNode;
  topOffset?: number;
  leftOffset?: number;
  size?: number;
  direction?: "top" | "bottom";
  horizontalDirection?: "left" | "right";
  defaultContentHeight?: number;
  iconStyles?: React.CSSProperties;
  isMobile?: boolean;
  tooltipSize?: "sm" | "md" | "lg";
  wrapperStyle?: React.CSSProperties;
  /** if set, show state will always follow the value */
  persistShow?: boolean;
  parentNodeId?: string;
}

const DefaultContentHeight = 30;
const DefaultGap = 4;

const Tooltip = ({
  text,
  children,
  topOffset = 0,
  leftOffset = 0,
  size,
  direction = "top",
  horizontalDirection,
  iconStyles,
  defaultContentHeight,
  style,
  isMobile,
  tooltipSize = "md",
  wrapperStyle,
  persistShow,
  parentNodeId,
  ...rest
}: TooltipProps) => {
  const hasPersistValue = persistShow === true || persistShow === false;
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState<number>(0);
  const [show, setShow] = useState(!!persistShow);
  useEffect(() => {
    if (persistShow === true || persistShow === false) setShow(persistShow);
  }, [persistShow]);
  const [isPositionRight, setPositionRight] = useState(false);
  const [, setPositionLeft] = useState(false);
  const [contentHeight, setContentHeight] = useState(
    defaultContentHeight || DefaultContentHeight
  );
  const [contentWidth, setContentWidth] = useState(0);
  const onUpdateContentSize = useCallback((w, h) => {
    setContentHeight(h);
    setContentWidth(w);
  }, []);
  const contentStyle = useMemo(() => {
    const opacity = contentWidth ? 1 : 0;
    if (style) return { ...style, top, left, opacity };
    return { top, left, opacity };
  }, [style, top, left, contentWidth]);
  const iconStyle = useMemo(() => {
    if (size)
      return iconStyles
        ? { ...iconStyles, width: size, height: size }
        : { width: size, height: size };
    return iconStyles;
  }, [size, iconStyles]);
  const ref = React.useRef<HTMLDivElement>(null);
  const updateRect = useCallback(
    (data: DOMRect) => {
      // default center
      const defaultLeft = data.left + data.width / 2 - contentWidth / 2;
      let shouldPositionRight = horizontalDirection === "right";
      let shouldPositionLeft = horizontalDirection === "left";
      if (
        data.left + contentWidth - leftOffset - window.innerWidth > 0 &&
        contentWidth > 0
      ) {
        shouldPositionRight = true;
      }
      if (defaultLeft < 0 && !shouldPositionRight) {
        shouldPositionLeft = true;
      }
      setPositionRight(shouldPositionRight);
      setPositionLeft(shouldPositionLeft);
      // is position center (default)
      let toLeft = defaultLeft;
      // is position left
      if (shouldPositionLeft) toLeft = data.left;
      // is position right
      if (shouldPositionRight) toLeft = data.left + data.width - contentWidth;
      if (isMobile) toLeft = Math.max(defaultLeft, 1);
      // is after item
      let toTop = data.bottom + topOffset + DefaultGap;
      // is before item
      if (direction === "top")
        toTop = data.top - contentHeight + topOffset - DefaultGap;
      if (leftOffset) toLeft = toLeft + leftOffset;
      setTop(toTop);
      setLeft(toLeft);
    },
    [
      contentWidth,
      leftOffset,
      topOffset,
      direction,
      horizontalDirection,
      contentHeight,
      isMobile,
    ]
  );
  const onHover = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (!e) return;
      if (rest.onMouseOver)
        rest.onMouseOver(e as React.MouseEvent<HTMLDivElement>);
      if (rest.onTouchCancel)
        rest.onTouchCancel(e as React.TouchEvent<HTMLDivElement>);
      if (ref.current) updateRect(ref.current.getBoundingClientRect());
      if (!hasPersistValue) setShow(true);
    },
    [rest, updateRect, hasPersistValue]
  );
  const onMouseLeave = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (!e) return;
      if (!hasPersistValue) setShow(false);
      if (rest.onMouseLeave)
        rest.onMouseLeave(e as React.MouseEvent<HTMLDivElement>);
      if (rest.onTouchEnd)
        rest.onTouchEnd(e as React.TouchEvent<HTMLDivElement>);
    },
    [rest, hasPersistValue]
  );
  const onMouseOut = useCallback(() => {
    if (!hasPersistValue) setShow(false);
  }, [hasPersistValue]);
  useLayoutEffect(() => {
    if (ref.current) updateRect(ref.current.getBoundingClientRect());
  }, [ref, updateRect, contentWidth, ref.current?.clientWidth]);
  return (
    <>
      <S.Wrapper
        ref={ref}
        {...rest}
        style={wrapperStyle}
        onMouseOver={onHover}
        onTouchStart={onHover}
        onTouchCancel={onMouseLeave}
        onMouseLeave={onMouseLeave}
        onMouseOut={onMouseOut}
      >
        {!!children ? children : <S.IconExplain style={iconStyle} />}
      </S.Wrapper>
      {!!text && (
        <Portal id={parentNodeId}>
          {show && (
            <TooltipContent
              text={text}
              style={contentStyle}
              direction={direction}
              updateSize={onUpdateContentSize}
              isPositionRight={isPositionRight}
              isMobile={isMobile}
              size={tooltipSize}
            />
          )}
        </Portal>
      )}
    </>
  );
};

interface ContentProps {
  text?: React.ReactNode;
  style?: React.CSSProperties;
  direction?: "top" | "bottom";
  updateSize?: (width: number, height: number) => void;
  isPositionRight?: boolean;
  isMobile?: boolean;
  iconLeft?: number;
  size?: "sm" | "md" | "lg";
}

const TooltipContent = React.memo(
  ({ text, style, direction, updateSize, isMobile, size }: ContentProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [initd, setInitd] = useState(false);
    const initdRef = useCurrent(initd);
    React.useEffect(() => {
      if (!ref.current) return;
      if (!updateSize || !ref.current.clientWidth) return;
      if (initdRef.current) return;
      updateSize(ref.current.clientWidth, ref.current.clientHeight);
      setInitd(true);
    }, [direction, ref.current?.clientWidth, updateSize, initdRef]);
    return (
      <S.TextWrapper
        style={initd ? style : { opacity: 0 }}
        isMobile={isMobile}
        size={size}
      >
        <S.DesText ref={ref} style={{ width: style?.width || "unset" }}>
          {text}
        </S.DesText>
      </S.TextWrapper>
    );
  }
);

export default Tooltip;

export function renderTooltip({ text, ...rest }: TooltipProps) {
  return (
    <Tooltip {...rest} text={text}>
      <S.TableText>{text}</S.TableText>
    </Tooltip>
  );
}

export function displayTooltip(v: string, length = 20, config?: TooltipProps) {
  if (v.length > length) {
    return renderTooltip({
      ...(config || {}),
      text: v,
      direction: "top",
    });
  }
  return v;
}
