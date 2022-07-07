import { useWindowSize, WindowSizes } from '../../hooks/responsive';
import './Catalog.css';
import useBeers from '../../hooks/useBeers';

const limit = 30;

const Catalog = () => {
  const beers = useBeers(limit);
  const windowSize = useWindowSize();

  return (
    <div className={`catalog${windowSize === WindowSizes.mobile ? ' catalog--mobile' : ''}`}>
      {!beers.length &&
        <div className="loader">
          Loading...
        </div>
      }
      {
        beers.map(({ id, image_url, name, description }) => {
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
