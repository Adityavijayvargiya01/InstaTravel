import countries from "world-countries";

const countriesFormatted = countries.map((item) => ({
  value: item.cca2,
  label: item.name.common,
  flag: `https://hatscripts.github.io/circle-flags/flags/${item.cca2.toLowerCase()}.svg`,
  latLang: item.latlng,
  region: item.region,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;

  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value);
  };

  return {
    getAllCountries,
    getCountryByValue,
  };
};
