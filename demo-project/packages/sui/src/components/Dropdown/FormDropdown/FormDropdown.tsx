import { forwardRef, memo } from "react";
import styled from "styled-components";
import DropdownBox, {
  ISuiDropdownBoxProps,
  TSuiDropdownBoxOption,
} from "../DropdownBox";
import Label from "../../Label";
import { Neutral4, Neutral5 } from "../../../styles/colors";

export type TSuiFormDropdownOption = TSuiDropdownBoxOption;

export interface ISuiFormDropdownProps
  extends ISuiDropdownBoxProps<TSuiFormDropdownOption> {
  /**
   * Dropdown field style
   */
  wrapperStyle?: React.CSSProperties;
  /** label for dropdown filed  */
  label?: string;
  name?: string;
  required?: boolean;
  maxLength?: number; // max value string length
  style?: React.CSSProperties; // container styles
  labelTextStyle?: React.CSSProperties;
  rightDes?: React.ReactNode;
  showCount?: boolean;
  explanation?: React.ReactNode;
  explanationStyle?: React.CSSProperties; // tooltip wrapper style
  explanationIconSize?: number;
  /** help text for dropdown filed  */
  helpText?: string;
}

const FormDropdown = forwardRef<HTMLDivElement, ISuiFormDropdownProps>(
  ({ wrapperStyle, ...rest }, ref) => {
    return (
      <Wrapper style={wrapperStyle} ref={ref}>
        <Label
          label={rest.label}
          name={rest.name}
          required={rest.required}
          maxLength={rest.maxLength}
          style={rest.style}
          labelTextStyle={rest.labelTextStyle}
          rightDes={rest.rightDes}
          showCount={rest.showCount}
          explanation={rest.explanation}
          explanationStyle={rest.explanationStyle}
          explanationIconSize={rest.explanationIconSize}
        />
        <DropdownBox
          style={{ marginTop: 2, marginBottom: 2 }}
          borderColor={rest.viewMode ? Neutral4 : Neutral5}
          {...rest}
        />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  position: relative;
`;

export default memo(FormDropdown);
