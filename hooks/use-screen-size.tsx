"use client";

import * as React from "react";

// Screen breakpoints
export const BREAKPOINTS = {
  MOBILE: 640, // sm
  SMALL_TABLET: 768, // md - added for the in-between size
  TABLET: 1024, // lg
  DESKTOP: 1280, // xl
};

export type ScreenSize = "mobile" | "small-tablet" | "tablet" | "desktop";

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState<ScreenSize | undefined>(undefined);

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.MOBILE) {
        setScreenSize("mobile");
      } else if (width < BREAKPOINTS.SMALL_TABLET) {
        setScreenSize("small-tablet");
      } else if (width < BREAKPOINTS.TABLET) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Set initial size
    updateScreenSize();

    // Add event listener
    window.addEventListener("resize", updateScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return {
    screenSize,
    isMobile: screenSize === "mobile",
    isSmallTablet: screenSize === "small-tablet",
    isTablet: screenSize === "tablet",
    isDesktop: screenSize === "desktop",
    isMobileOrSmallTablet: screenSize === "mobile" || screenSize === "small-tablet",
  };
}
