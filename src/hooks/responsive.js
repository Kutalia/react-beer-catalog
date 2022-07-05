import { useState, useLayoutEffect } from 'react';

const breakpoint = 770;

export const WindowSizes = {
  mobile: 'MOBILE',
  desktop: 'DESKTOP',
}

export const useWindowSize = () => {
  const [size, setSize] = useState(WindowSizes.mobile);

  useLayoutEffect(() => {
    function listener() {
      setSize(window.innerWidth > breakpoint ? WindowSizes.desktop : WindowSizes.mobile);
    }

    window.addEventListener('resize', listener);

    listener();

    return () => window.removeEventListener('resize', listener);
  }, []);

  return size;
};
