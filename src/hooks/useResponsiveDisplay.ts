import { useState, useEffect } from "react";

/**
 * A custom React hook that returns boolean indicating whether the window is smaller than the given breakpoint width.
 * @param {number} [breakpoint=768] - The breakpoint width in pixels below which the window is considered "smaller".
 * @returns {boolean} - A boolean value indicating if current window width is less than breakpoint.
 */
export const useResponsiveDisplay = (breakpoint: number = 768): boolean => {
  const [isSmallerDevice, setIsSmallerDevice] = useState<boolean>(window.innerWidth < breakpoint);

  useEffect(() => {
    const checkBreakpoint = () => setIsSmallerDevice(window.innerWidth < breakpoint);

    // Listener to check for the window resize events.
    window.addEventListener('resize', checkBreakpoint);

    // Remove event listener on cleanup.
    return () => {
      window.removeEventListener('resize', checkBreakpoint);
    };
  }, [breakpoint]); // Dependency on the breakpoint to ensure the correct value is used.

  return isSmallerDevice;
};
