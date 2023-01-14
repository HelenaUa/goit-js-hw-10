// fetchCountries.js
function fetchCountries(name) {
    const BASE_URL = "https://restcountries.com/v3.1";
    const properties = ["name", "capital", "population", "flags", "languages"];
    
  return fetch(`${BASE_URL}/name/${name}?fields=${properties.join(',')}`).then(response => {
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
    })
};

export { fetchCountries };