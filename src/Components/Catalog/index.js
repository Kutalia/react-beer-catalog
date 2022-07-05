import { useState, useEffect, useMemo } from 'react';

import './Catalog.css';
import dummyBeer from './dummyData.json';

const limit = 30;

const Catalog = () => {
  const [beers, setBeers] = useState({});

  useEffect(() => {
    const cache = {};

    let i = 0;
    // pulling 30 potentially non-unique beers
    // if we want to guarantee uniqueness, async IIFE function in incrementing loop could be used
    for (i; i < limit; i++) {
      // fetch('https://api.punkapi.com/v2/beers/random')
      //   .then(response => response.json())
      //   .then((resp) => {
      //     const data = resp[0];
      //     if (!cache[data.id]) {
      //       cache[data.id] = data;
      //     }

      //     // approached limit
      //     if (cache.length === 30) {
      //       setBeers(cache);
      //     }
      //   }
      //   );
      cache[dummyBeer.id + i] = dummyBeer;
    }
    setBeers(cache);
  }, []);

  // useMemo compares object reference, so it will work correctly on each `beers` update
  const beersArr = useMemo(() => Object.values(beers), [beers]);

  return (
    <div className="catalog">
      {
        beersArr.map(({ id, image_url }) => {
          return (
            <div key={id} className="beer">
              <div className="beer__thumbnail">
                <img src={image_url || process.env.PUBLIC_URL + 'uylurwune.jpg'} />
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Catalog;
