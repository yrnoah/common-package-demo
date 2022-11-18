import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  memo,
  Fragment,
} from "react";
import { useIntl } from "react-intl";
import { Dropdown, ISuiDropdownProps } from "../Dropdown";
import Button from "../../Buttons/Button";
import type { ButtonProps } from "../../Buttons/typing";
import Toast from "../../Toast";
import { toObject } from "../../../utils/index";
import { useCurrent } from "../../../hooks";
import * as S from "../styles.dropdown";

export type ISwitchCity = {
  code: string;
  name: string;
  timeZone: string;
  minimumCharge: number;
  currency: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  longitude: number;
  selected: boolean;
  /**
   * "POLYGON ((103.60605945532438 1.2688286389499062, 103.61017932837126 1.3210003686712395, 103.65549793188688 1.4006287768665915, 103.67884387915251 1.43632340105235, 103.72416248266813 1.461034738160092, 103.75986804907438 1.4459333974907616, 103.79969348852751 1.4761359773127198, 103.82853259985563 1.4747631416122269, 103.85874500219938 1.4637804255875624, 103.87659778540251 1.441814832554725, 103.90681018774626 1.4225947646704737, 103.93427600805876 1.429459093122212, 103.97547473852751 1.4212218965261856, 103.99058093969938 1.4239676319978174, 104.00568714087126 1.4239676319978174, 104.02491321509001 1.43632340105235, 104.04688587134001 1.4459333974907616, 104.06336536352751 1.4390691184562936, 104.08533801977751 1.4225947646704737, 104.09083118384001 1.403374536668754, 104.08259143774626 1.3745438991744008, 104.07572498266813 1.356696186766388, 104.09220447485563 1.3264920667198725, 104.02216663305876 1.2386234696149796, 103.83814563696501 1.182331105408807, 103.71454944555876 1.1603630408862995, 103.60605945532438 1.2084179559862682, 103.59507312719938 1.2372504991285078, 103.60605945532438 1.2688286389499062))"
   */
  boundary: string;
};

export type ISwitchRegion = {
  countryCode: string;
  /**
   * I18N name
   */
  name: string;
  /**
   * CNY / KRW / AUD ...
   */
  currency: string;
  /**
   * ¥ / ₩ / $ ...
   */
  currencySign: string;
  subdivisions: ISwitchCity[] | null;
};

export type TGetPortalRegionResp = {
  defaultRegion: ISwitchCity;
  countryList: ISwitchRegion[];
};

export interface ISuiRegionDropdownProps
  extends Pick<
    ISuiDropdownProps,
    | "style"
    | "overlayContainerStyle"
    | "position"
    | "disableAutoDismiss"
    | "disableAnimation"
  > {
  /**
   * default city code: SG-SIN / CN-PEK / CN-SHA ...
   */
  defaultValue?: string;
  /**
   * data source for component, if provided, the component will not trigger load request
   */
  ds?: ISwitchRegion[];
  service?: () => Promise<TGetPortalRegionResp>;
  onChange?: (value: ISwitchCity) => void;
  /**
   * disable toast error
   */
  disableError?: boolean;
  triggerProps?: ButtonProps;
}

export function RegionDropdown(props: ISuiRegionDropdownProps) {
  const {
    defaultValue,
    onChange,
    ds,
    service,
    disableError,
    triggerProps,
    ...rest
  } = props;
  const intl = useIntl();
  const callbackRef = useCurrent(onChange);
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => setVisible((v) => !v), []);
  // sync state from auto dismiss
  const onVisibleChange = useCallback((v?: boolean) => setVisible(!!v), []);
  const [regions, setRegions] = useState<ISwitchRegion[]>(ds || []);
  const cityMap = useMemo((): Record<string, ISwitchCity> => {
    // toObject(regions, (i: ISwitchRegion) => i.countryCode)
    let subdivisions: ISwitchCity[] = [];
    regions.forEach((v) => {
      if (v.subdivisions) subdivisions = [...subdivisions, ...v.subdivisions];
    });
    if (subdivisions.length)
      return toObject(subdivisions, (i: ISwitchCity) => i.code);
    return {};
  }, [regions]);
  const [selected, setSelected] = useState<string>(defaultValue || "");
  const onSelect = useCallback(
    (v: ISwitchCity) => {
      setVisible(false);
      setSelected(v.code);
      if (callbackRef.current) callbackRef.current(v);
    },
    [callbackRef]
  );
  const buttonLabel = useMemo(() => {
    if (selected && cityMap[selected]) return cityMap[selected].name;
    if (selected) return selected;
    return intl.formatMessage({ defaultMessage: "Select" });
  }, [cityMap, selected, intl]);
  // load data source
  useEffect(() => {
    // if provided ds, the component will not trigger load request
    if (!service || !!(ds && ds.length)) return;
    const load = async () => {
      try {
        const resp = await service();
        if (resp.countryList) setRegions(resp.countryList);
        if (resp.defaultRegion) {
          // if has default value, check and find default region from data source;
          if (defaultValue) {
            let _defaultRegion: ISwitchCity | null = null;
            for (const region of resp.countryList) {
              const target = (region.subdivisions || []).find(
                (v) => v.code === defaultValue
              );
              if (target) {
                _defaultRegion = target;
                break;
              }
            }
            if (_defaultRegion) {
              if (callbackRef.current) callbackRef.current(_defaultRegion);
              return;
            }
          }
          setSelected(resp.defaultRegion.code);
          if (callbackRef.current) callbackRef.current(resp.defaultRegion);
        }
        if (!disableError && !(resp.countryList && resp.countryList.length)) {
          Toast.error({
            content: intl.formatMessage({
              defaultMessage: "There is no data yet.",
            }),
          });
        }
      } catch (e) {
        if (disableError) return;
        let content = intl.formatMessage({ defaultMessage: "Unknown error" });
        if ((e as any).message) content = (e as any).message;
        if ((e as any).error && !(e as any).message) content = (e as any).error;
        Toast.error({ content });
      }
    };
    load();
  }, [service, ds, intl, disableError, callbackRef, defaultValue]);
  if (!(regions && regions.length)) return null;
  return (
    <Dropdown
      {...rest}
      visible={visible}
      onVisibleChange={onVisibleChange}
      overlay={<Overlay ds={regions} selected={selected} onSelect={onSelect} />}
    >
      <Button
        prefixEl={<S.Icon />}
        suffixEl={<S.StatusIcon $active={visible} />}
        {...triggerProps}
        onClick={toggleVisible}
      >
        {buttonLabel}
      </Button>
    </Dropdown>
  );
}

interface ISuiOverlayProps {
  ds?: ISwitchRegion[];
  selected?: string;
  onSelect?: (value: ISwitchCity) => void;
}

const Overlay = memo(({ ds, selected, onSelect }: ISuiOverlayProps) => {
  const onClick = useCallback(
    (v: ISwitchCity) => {
      if (!onSelect) return;
      onSelect(v);
    },
    [onSelect]
  );
  return (
    <S.OptionsWrapper>
      {!!ds &&
        ds.map((v) => (
          <Fragment key={v.countryCode}>
            <S.Option isTitle>{v.name}</S.Option>
            {!!v.subdivisions &&
              v.subdivisions.map((city) => (
                <S.Option
                  key={city.code}
                  active={selected === city.code}
                  onClickCapture={onClick.bind(null, city)}
                >
                  {city.name}
                  {selected === city.code && <S.ActiveIcon />}
                </S.Option>
              ))}
          </Fragment>
        ))}
    </S.OptionsWrapper>
  );
});
