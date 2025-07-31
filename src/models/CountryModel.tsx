
export interface CountryModel {
  name: {
    common: string
  },
  capital: string,
  region: string,
  subregion: string,
  altSpellings: string[],
  latlng: number[],
  flag: string,
  flags: {
    png: string,
    svg: string
  },
  idd: {
    root: string,
    suffixes: string[]
  },
  currencies: object,
  callingcode: string,
  callingcodeList: string[],
  currency: string
  currencyList: string[]
}