export type TSuiUnitType = "Minute" | "Hour" | "";

export type TSuiTableColumns = {
  dataIndex: string;
  key: string;
  summaryKey?: string;
  summaryTitle?: string | JSX.Element;
  title?: string;
  titleAction?: (v?: T) => void;
  titleComponent?: MemoExoticComponent<() => Element>;
  defaultSort?: SortType;
  width?: number | string;
  minWidth?: number;
  flex?: number | string;
  align?: "center" | "left" | "right";
  render?: (
    v: string | boolean | number,
    rowData: T,
    listCallback?: (rowData: T) => void
  ) => any;
  renderRawData?: (v: string | boolean | number, rowData: T) => any;
  renderCallback?: (rowData: T, ...args: any) => any;
  format?: (v: T, type?: TSuiUnitType) => string;
  headerDes?: string;
  hasUnit?: boolean;
  hasCurrency?: boolean;
  style?: React.CSSProperties;
  explanation?: string;
  explanationStyle?: React.CSSProperties;
  setRightClickCopy?: boolean;
};
