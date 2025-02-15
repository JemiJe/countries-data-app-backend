export type AvailableCountries = Array<{
  countryCode: string;
  name: string;
}>;

export type CountryInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Array<{
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: any;
  }>;
};

export type CountryPopulation = {
  error: boolean;
  msg: string;
  data: Array<{
    country: string;
    code: string;
    iso3: string;
    populationCounts: Array<{
      year: number;
      value: number;
    }>;
  }>;
};

export type CountryFlag = {
  error: boolean;
  msg: string;
  data: Array<{
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
  }>;
};
