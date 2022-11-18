export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  prefixEl?: React.ReactNode;
  suffixEl?: React.ReactNode;
  defaultBgColor?: string;
  active?: boolean;
}

export type PrimaryButtonProps = Omit<ButtonProps, "defaultBgColor">;

export interface TextButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  loading?: boolean;
  prefixEl?: React.ReactNode;
  suffixEl?: React.ReactNode;
  defaultBgColor?: string;
  isLink?: boolean;
}

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  defaultBgColor?: string;
  tooltip?: string;
}
