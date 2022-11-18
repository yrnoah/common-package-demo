import { useState, useCallback, memo, useRef, useEffect } from "react";
import { useIntl } from "react-intl";
import { Dropdown } from "../../../Dropdown/Dropdown";
import * as S from "./styles.picker";

export type TOption = {
  key: number;
  name: string;
};

export interface PageSizePickerProps {
  /**
   * trigger wrapper styles
   */
  style?: React.CSSProperties;
  /**
   * data source for options (key: number; name: string;).
   */
  options: TOption[];
  /**
   * return select page size (number)
   */
  onChange?: (v: number) => void;
  /**
   * 10 | 20 | 50 | 100
   */
  pageSize: number;
}

function setOptionsWidth(
  callback: React.Dispatch<React.SetStateAction<number>>,
  node?: HTMLDivElement | null
) {
  if (!node) return;
  const { width } = node.getBoundingClientRect();
  if (width) callback(width);
}

function PageSizePicker(props: PageSizePickerProps) {
  const { onChange, options, pageSize = 10, style } = props;
  const [width, setWidth] = useState(93);
  const [visible, setVisible] = useState(false);
  const intl = useIntl();
  const toggleVisible = useCallback(() => {
    setVisible((v) => !v);
  }, []);
  const onVisibleChange = useCallback((v?: boolean) => {
    setVisible(!!v);
  }, []);
  // initial options width
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOptionsWidth(setWidth, ref.current);
  }, [ref]);
  const onSelect = useCallback(
    (v: number) => {
      setVisible(false);
      if (onChange) onChange(v);
      setTimeout(() => {
        setOptionsWidth(setWidth, ref.current);
      }, 100);
    },
    [onChange, ref]
  );

  return (
    <Dropdown
      style={style}
      visible={visible}
      onVisibleChange={onVisibleChange}
      position="top"
      overlay={
        <Overlay
          options={options}
          pageSize={pageSize}
          onChange={onSelect}
          width={width}
        />
      }
    >
      <S.Trigger onClick={toggleVisible} ref={ref}>
        <S.Text>
          {intl.formatMessage(
            {
              defaultMessage: "{pageSize} / Page",
            },
            { pageSize }
          )}
        </S.Text>
        <S.StatusIcon $active={visible} />
      </S.Trigger>
    </Dropdown>
  );
}

export default PageSizePicker;

const Overlay = memo(RawOverlay);

interface IOptionsProps extends PageSizePickerProps {
  width: number;
}

function RawOverlay({ options, pageSize, onChange, width }: IOptionsProps) {
  return (
    <S.Options style={{ width }}>
      {!!options &&
        options.map((v: TOption) => (
          <S.Option
            key={v.key}
            active={pageSize === v.key}
            onClickCapture={() => onChange && onChange(v.key)}
          >
            {v.name}
          </S.Option>
        ))}
    </S.Options>
  );
}
