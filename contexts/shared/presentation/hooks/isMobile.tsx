import React from "react";

/**
 * Custom React hook to determine if the current viewport is mobile (<=600px).
 * @returns {boolean} True if the viewport width is 600px or less, otherwise false.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}
