import { useEffect, useState, useMemo } from 'react';

import dummyBeer from './dummyData.json';

const useDummyData = process.env.REACT_APP_DUMMY_DATA === "true";

const useBeers = (limit) => {
  const [beers, setBeers] = useState({});

  useEffect(() => {
    const cache = {};

    let i = 0;
    let loadedItemsCount = 0;
    // pulling 30 potentially non-unique beers without blocking
    // if we want to guarantee uniqueness, async IIFE function in incrementing loop could be used
    for (i; i < limit; i++) {
      if (useDummyData) {
        const id = dummyBeer.id + i;
        cache[id] = { ...dummyBeer, id };
      } else {
        fetch('https://api.punkapi.com/v2/beers/random')
          // using "unsafe" variable is a desired effect
          /*eslint no-loop-func: "off"*/
          .then(response => response.json())
          .then((resp) => {
            const data = resp[0];
            loadedItemsCount++;

            if (!cache[data.id]) {
              cache[data.id] = data;
            }

            // approached limit
            // better than calling Object.values().length evey time
            if (loadedItemsCount === 30) {
              setBeers(cache);
            }
          }
          );
      }
    }

    if (useDummyData) {
      setBeers(cache);
    }
  }, []);

  // useMemo compares object reference, so it will work correctly on each `beers` update
  const beersArr = useMemo(() => Object.values(beers), [beers]);

  return beersArr;
};

export default useBeers;
