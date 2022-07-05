import { useState, useEffect, useMemo } from 'react';

import { useWindowSize, WindowSizes } from '../../hooks/responsive';
import './Catalog.css';
import dummyBeer from './dummyData.json';

const limit = 30;
const useDummyData = process.env.REACT_APP_DUMMY_DATA === "true";

const Catalog = () => {
  const [beers, setBeers] = useState({});
  const windowSize = useWindowSize();

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

  return (
    <div className={`catalog${windowSize === WindowSizes.mobile ? ' catalog--mobile' : ''}`}>
      {!beersArr.length &&
        <div className="loader">
          Loading...
        </div>
      }
      {
        beersArr.map(({ id, image_url, name, description }) => {
          return (
            <div key={id} className="beer">
              <div className="beer__thumbnail">
                <img alt={name + '-beer-thumbnail'} src={image_url || process.env.PUBLIC_URL + 'uylurwune.jpg'} />
              </div>

              <div>
                <p className="beer__name">{name}</p>
                <p className="beer__description">{description}</p>
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Catalog;
