type RegionItem = {
  name: string;
  shortCode?: string;
  code?: string;
};

type TRegionsData = {
  countryName: string;
  countryShortCode: string;
  regions: Array<RegionItem>;
};
