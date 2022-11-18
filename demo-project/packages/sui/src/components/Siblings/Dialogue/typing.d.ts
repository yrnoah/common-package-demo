import React from "react";
import type { ISuiModalProps } from "../Modal/typings";

export interface ISuiDialogueProps extends Omit<ISuiModalProps, "children"> {
  /** dialogue title */
  title?: React.ReactNode;
  /** dialogue subtitle */
  subTitle?: React.ReactNode;
  /** dialogue cancel button text */
  cancelText?: string;
  /** dialogue confirm button text */
  okText?: string;
  /** loading for confirm action */
  okLoading?: boolean;
  /** dialog wrapper style */
  style?: React.CSSProperties;
  /** modal wrapper Style */
  modalWrapperStyle?: React.CSSProperties;

  /** Cancel click callback */
  handleCancel: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;

  /** Cancel OK callback */
  handleOk: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
    dismissCallback?: () => void
  ) => void;
  handleOk: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => void;
}
