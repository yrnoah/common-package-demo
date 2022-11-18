export type IAccessToken = {
  accessToken: string;
  tokenType?: string;
  authorities?: string[];
  brandInPortal?: string;
  forceChangePassword?: boolean; // true 需要修改密码 false 不需要修改密码
  accountId?: string;
};

export type IUserCountry = {
  code: string;
  currency: string;
  countryCode: string;
  name: string;
  timeZone: string;
  boundary: string;
};

export type IUserCountries = {
  countryCode: string;
  name: string;
  subdivisions: Array<IUserCountry>;
};

export type GetUserCountriesResp = {
  defaultRegion: IUserCountry;
  countryList: Array<IUserCountries>;
};

export type IUserItem = {
  id: number;
  name: string;
};

export type ICity = {
  code: string;
  name: string;
  timeZone: string;
  currency: string;
  minimumCharge: number;
};

export type ICountry = {
  countryCode: string;
  name: string;
  subdivisions: ICity[] | null;
  currencySign: string;
  currency: string;
};

export type ICountryCode = {
  countryCode: string;
  countryFlag: string;
  countryIndex: string;
  countryName: string;
  phoneCode: string;
};
