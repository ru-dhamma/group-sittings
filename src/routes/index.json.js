import data from './data.json';
export function get() {
  let countries = data.сountries;
  return {
    body: countries,
  };
};