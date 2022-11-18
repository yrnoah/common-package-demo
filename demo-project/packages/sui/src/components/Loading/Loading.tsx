import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import IconLoading from "../../icons/IconLoading";

interface LoadingProps {
  loading: boolean;
  style?: React.CSSProperties;
  size?: number;
  color?: string;
  isFull?: boolean;
}

const Loading = React.memo(
  ({ loading, style, size, color, isFull }: LoadingProps) => {
    const iconStyle = useMemo(() => {
      const width = size || 15;
      const height = size || 15;
      return { color, width, height };
    }, [size, color]);
    if (loading === false) return null;
    if (style || isFull) {
      return (
        <Wrapper style={style}>
          <AnimLoading style={iconStyle} />
        </Wrapper>
      );
    }
    return <AnimLoading style={iconStyle} />;
  }
);

export default Loading;

const Wrapper = styled.div`
  min-height: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const spin = keyframes`
  to { transform:rotate(360deg) }
`;

const AnimLoading = styled(IconLoading)`
  animation: 1s ${spin} linear infinite;
  color: #000;
`;
