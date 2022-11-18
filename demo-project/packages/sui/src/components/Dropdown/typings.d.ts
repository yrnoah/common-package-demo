export type TSuiDropdownOption = {
  /** @description key value for selection */
  key: string;
  /** I18N name */
  name: string;
  /** if set true, option will apply title styles */
  isTitle?: boolean;
  /** option contain styles */
  styles?: React.CSSProperties;
};
