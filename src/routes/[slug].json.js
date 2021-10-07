import data from './data.json';
export function get({params}) {
  const { slug } = params;

  let countries = data.сountries;
  let city;
  for (let country of countries) {
  
    city = country.сities.find(function(_city, index) {
      if (_city.slug == slug) return true;
    });
    if (typeof(city) != 'undefined') break;
  }
  
  return {
    body: city,
  };
};