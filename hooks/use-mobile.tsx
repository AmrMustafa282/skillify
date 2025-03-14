import * as React from "react";

const TABLIT_BREAKPOINT = 1200;

export function useIsMobile() {
  const [isTablit, setIsTablit] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLIT_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsTablit(window.innerWidth < TABLIT_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsTablit(window.innerWidth < TABLIT_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTablit;
}
