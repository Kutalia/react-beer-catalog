import { useEffect, useState } from 'react';
const endpoint = 'https://api.punkapi.com/v2/beers/random';
const fetchBeer = async (cache, limit) => {
  const response = await fetch(endpoint);
  const data = (await response.json())[0];
  if (!cache[data.id]) {
    cache[data.id] = data;
    console.log('BEER SUCCESSFULLY LOADED');
    return data;
  }
  console.warn('NON UNIQUE BEER DETECTED!');
  return (await fetchBeer(cache, limit));
}
const useBeers = (limit) => {
  const [beers, setBeers] = useState([]);
  useEffect(() => {
    const cache = {};
    Promise.all([...Array(limit)].map(() => fetchBeer(cache, limit)))
      .then(setBeers)
      .catch(error => console.log(error.message))
  }, [limit]);
  return beers;
};
export default useBeers;