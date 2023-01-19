fetchCountries.js
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


// async function fetchCountries(name) {
//     const BASE_URL = "https://restcountries.com/v3.1";
//   const properties = ["name", "capital", "population", "flags", "languages"];

//   try {
// const response = await fetch(`${BASE_URL}/name/${name}?fields=${properties.join(',')}`);
//    if (!response.ok) {
//         throw new Error(response.statusText)
//   };
//   return await response.json();
//   } catch (error) {
//     console.log(error);
//   };

// };


export { fetchCountries };