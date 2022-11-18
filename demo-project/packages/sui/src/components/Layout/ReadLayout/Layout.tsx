import React from "react";
import styled from "styled-components";
import { FlexRow } from "../../../styles/common";

// design: https://www.figma.com/file/RF8IWdBs6aqTUAMWONDn97/Switch-Portal-DS-V1.0?node-id=2410%3A5091

interface ReadPageLayoutProps {
  children?: React.ReactNode;
  contentWrapperStyles?: React.CSSProperties;
  leftWrapperStyles?: React.CSSProperties;
  rightWrapperStyles?: React.CSSProperties;
}
export function Layout(props: ReadPageLayoutProps) {
  const {
    children,
    leftWrapperStyles,
    rightWrapperStyles,
    contentWrapperStyles,
  } = props;
  if (!children) return <></>;
  if (!Array.isArray(children)) return <>{children}</>;
  const [header, leftContent, ...others] = children;
  return (
    <>
      {header}
      <ContentWrapper style={contentWrapperStyles}>
        <ContentFixedLeft style={leftWrapperStyles}>
          {leftContent}
        </ContentFixedLeft>
        {!!others && (
          <ContentRight style={rightWrapperStyles}>{others}</ContentRight>
        )}
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  ${FlexRow}
  flex: 1;
  max-width: 1392px;
  align-items: flex-start;
`;
const ContentFixedLeft = styled.div`
  width: 392px;
  flex: none;
`;
const ContentRight = styled.div`
  flex: 1;
  min-width: 680px;
  max-width: 1000px;
`;
