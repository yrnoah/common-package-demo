import styled, { css } from "styled-components";

export const Roboto = css`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
`;

export const RobotoLight = css`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

export const RobotoMedium = css`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
`;

export const RobotoBold = css`
  font-family: "Roboto", sans-serif;
  font-weight: 600;
`;

export const HeaderH1CSS = css`
  ${RobotoLight}
  font-size: 54px;
  line-height: 63px;
  letter-spacing: -0.03em;
`;

export const HeaderH1 = styled.h1`
  ${HeaderH1CSS}
`;

export const HeaderH2CSS = css`
  ${Roboto}
  line-height: 47px;
  font-weight: normal;
  font-size: 40px;
`;

export const HeaderH2 = styled.h2`
  ${HeaderH2CSS}
`;

export const HeaderH3CSS = css`
  ${RobotoMedium}
  font-size: 32px;
  line-height: 37px;
`;

export const HeaderH3 = styled.h3`
  ${HeaderH3CSS}
`;

/**
 * @example Portal: Page Header Title
 * @example Email: Head Line / Subject Line
 */
export const HeaderH4CSS = css`
  ${RobotoMedium}
  font-size: 24px;
  line-height: 28px;
`;

export const HeaderH4 = styled.h4`
  ${HeaderH4CSS}
`;

/** @example Section Title (Main Content) */
export const HeaderH5CSS = css`
  ${Roboto}
  font-size: 20px;
  line-height: 23px;
`;

export const HeaderH5 = styled.h5`
  ${HeaderH5CSS}
`;

export const Subtitle = css`
  ${RobotoBold}
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.01em;
`;

/**
 * @example Portal: Dialogue Title
 * @example Email: Body Text (Key Info Only)
 */
export const Subtitle1CSS = css`
  ${Subtitle}
  font-size: 16px;
  line-height: 19px;
`;

export const Subtitle2CSS = css`
  ${Subtitle}
`;

export const SubtitleText = styled.p`
  ${Subtitle}
`;

export const Subtitle1 = styled(SubtitleText)`
  font-size: 16px;
  line-height: 19px;
`;

export const Subtitle2 = styled(SubtitleText)``;

export const BodyCSS = css`
  ${Roboto}
  font-size: 14px;
  line-height: 16px;
`;

/**
 * @example Email:
 * General Body Text;
 * Text Button / Links;
 * Helper Text
 */
export const Body1CSS = css`
  ${BodyCSS}
  font-size: 16px;
  line-height: 19px;
`;

/**
 * @example Portal:
 * Dropdown Menu Text;
 * General Body Text;
 * Modal Body Text;
 * Search Box Input / Hint Text;
 * Side Nav Item (Normal State);
 * Text Field Input Text;
 * ...
 * @example Email:
 * Small Title / Label
 */
export const Body2CSS = css`
  ${BodyCSS}
`;

export const Body3CSS = css`
  ${BodyCSS}
  ${RobotoLight}
`;

export const Body4CSS = css`
  ${BodyCSS}
  ${RobotoBold}
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.01em;
`;

export const BodyRegular = styled.p`
  ${BodyCSS}
  flex: none;
`;

export const Body1 = styled(BodyRegular)`
  font-size: 16px;
  line-height: 19px;
`;

export const Body2 = styled(BodyRegular)``;

export const Body3 = styled(BodyRegular)`
  font-weight: 300;
`;

export const Body4 = styled(BodyRegular)`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.01em;
`;

export const BodyRegularSpan = styled.span`
  ${Roboto}
  font-size: 14px;
`;

/**
 * @example Email:
 * Primary / Secondary Buttons;
 * Text Button / Links
 */
export const Button1CSS = css`
  ${RobotoBold}
  font-size: 14px;
  line-height: 16px;
`;
/**
 * @description Text Link Only
 * @example
 * Anchor Item Text (Normal);
 * Bread Crumb;
 * Chip Text;
 * Date Picker Panel Text (Normal/Disabled);
 * Dropdown Menu Text (Normal);
 * Side Nav Item (Normal);
 * Tab Text (Normal);
 * Text Buttons /  Links;
 * Pagination Number(Normal);
 * ...
 */
export const Button2CSS = css`
  ${Roboto}
  font-size: 14px;
  line-height: 16px;
`;

export const CaptionCSS = css`
  ${Roboto}
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.01em;
`;

/**
 * @example Portal:
 * Bylines;
 * Caption Text;
 * Error Message;
 * Helper Text;
 * Text Field Label;
 * Tool Tip Text;
 * Text Buttons / Links;
 * ...
 * @example Email:
 * Footer Text;
 * Helper Text;
 * Captions;
 */
export const Caption1CSS = css`
  ${CaptionCSS}
`;

/**
 * @example Portal:
 * Text Buttons / Links
 * @example Email:
 * Text Button / Links
 */
export const Caption2CSS = css`
  ${CaptionCSS}
  font-size: 8px;
  line-height: 9px;
`;

/**
 * @description All caps
 * @example Dropdown Menu Section Title
 */
export const Caption3CSS = css`
  ${Roboto}
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
`;

export const CaptionText = styled.p`
  ${CaptionCSS}
`;

export const Caption2 = styled(CaptionText)`
  font-size: 8px;
  line-height: 9px;
`;

export const CaptionSpan = styled.span`
  ${Roboto}
  font-size: 12px;
  letter-spacing: 0.01em;
`;

export const OverlineCSS = css`
  ${Roboto}
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.01em;
`;
/** @example Character Counter (Text Field) */
export const Overline1CSS = css`
  ${Roboto}
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.01em;
`;

export const Overline2CSS = css`
  ${RobotoBold}
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.01em;
`;

export const Overline = styled.p`
  ${Roboto}
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.01em;
`;
