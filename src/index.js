import './css/styles.css';

import debounce from 'lodash.debounce';
// console.log(debounce);

import Notiflix from 'notiflix';
// console.log(Notiflix);

import { fetchCountries } from './fetchCountries';
// console.log(fetchCountries);

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const ulCountry = document.querySelector(".country-list");
const divCountryInfo = document.querySelector(".country-info");


input.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(event) {
  event.preventDefault();
  const nameCountry = event.target.value.trim();
  
  ulCountry.innerHTML = "";
  divCountryInfo.innerHTML = "";

  if (!nameCountry) {
    return;
  };
  
  fetchCountries(nameCountry).then(response => {
    if (response.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    };
    
    if (response.length >= 2 && response.length <= 10) {
      ulCountry.innerHTML = createMarkupUl(response);
      return;
    };
    
    if (response.length === 1) {
      divCountryInfo.innerHTML = createMarkupDiv(response);
      return;
    };
   
  }).catch(() => {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  });
  
};


function createMarkupUl(countries) {
  // console.log(countries);
  return countries.map(country =>
    `<li>
      <img src="${country.flags.svg}" alt="${country.name.common}flag" width="100" height="50" />
      <p>${country.name.official}</p>
    </li>`).join("");
};


function createMarkupDiv(countries) {
  // console.log(countries);
  return countries.map(country =>
    `<li>
      <img src="${country.flags.svg}" alt="${country.name.common} flag" width="200" height="100" />
      <h1>${country.name.official}</h1>
    </li>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${Object.values(country.languages)}</p>`).join("");
};


Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
});




