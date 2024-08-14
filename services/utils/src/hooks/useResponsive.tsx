import { useLayoutEffect, useMemo, useState } from "react";
import { DisplaySize, type TDisplaySize } from "../enums/displaySize";

/**
 * Hook for standardizing the display size of the application
 * The screen sizes can be
 * - Desktop M: 1440px and above
 * - Desktop S: 1024px and above
 * - Tablet: 768px and above
 * - Mobile: anything below 768px, returned as 425px
 */
export const useResponsive = (): TDisplaySize => {
  const [currentDisplaySize, setCurrentDisplaySize] = useState<TDisplaySize>(DisplaySize.DESKTOP_M);

  const determineDisplaySize = (width: number) => {
    if (width >= DisplaySize.DESKTOP_M) {
      return DisplaySize.DESKTOP_M;
    }

    if (width >= DisplaySize.DESKTOP_S) {
      return DisplaySize.DESKTOP_S;
    }

    if (width >= DisplaySize.TABLET) {
      return DisplaySize.TABLET;
    }

    return DisplaySize.MOBILE;
  };

  const resizeHandler = () => {
    const displaySize = determineDisplaySize(window.innerWidth);
    setCurrentDisplaySize(displaySize);
  };

  useLayoutEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return useMemo(() => {
    return currentDisplaySize;
  }, [currentDisplaySize]);
};
