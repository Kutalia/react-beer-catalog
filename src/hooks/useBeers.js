import { useEffect, useState } from 'react';

import dummyBeer from './dummyData.json';

const useDummyData = process.env.REACT_APP_DUMMY_DATA === "true";
const endpoint = 'https://api.punkapi.com/v2/beers/random';
const statuses = {
  ALL_LOADED: 'all_loaded',
  LOADED: 'loaded',
  ERROR: 'error',
};

const fetchBeer = async (cache, limit) => {
  try {
    const response = await fetch(endpoint);
    const data = (await response.json())[0];

    if (!cache[data.id]) {
      cache[data.id] = data;

      if (Object.values(cache).length === limit) {
        console.log('FINISHED LOADING ALL BEERS', cache);
        return {
          status: statuses.ALL_LOADED,
          data: cache,
        };
      } else {
        console.log('BEER SUCCESSFULLY LOADED', data)
        return {
          status: statuses.LOADED,
          data,
        };
      }
    } else {
      console.warn('NON UNIQUE BEER DETECTED!', data);
      return (await fetchBeer(cache, limit)) ;
    }
  } catch (error) {
    console.error('ERROR LOADING BEER');
    return {
      status: statuses.ERROR,
      data: error,
    };
  }
}

const useBeers = (limit) => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const cache = {};

    let i = 0;

    for (i; i < limit; i++) {
      if (useDummyData) {
        const id = dummyBeer.id + i;
        cache[id] = { ...dummyBeer, id };
      } else {
        fetchBeer(cache, limit).then(({ status, data }) => {
          if (status === statuses.ALL_LOADED) {
            setBeers(Object.values(data));
          }
        });
      }
    }

    if (useDummyData) {
      setBeers(Object.values(cache));
    }
  }, [limit]);

  return beers;
};

export default useBeers;
