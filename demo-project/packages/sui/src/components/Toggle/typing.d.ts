import React from "react";

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  selected?: boolean;
  defaultBgColor?: string;
}

export interface TextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  selected?: boolean;
}

export type Option = {
  key: string;
  title: string;
};

export interface TextToggleProps {
  /**
   * @param key string
   * @param title string, button text
   */
  options?: Option[];
  selectItem?: Option;
  onChange?: (item: Options) => void;
  containerStyles?: React.CSSProperties;
  buttonStyles?: React.CSSProperties;
}
