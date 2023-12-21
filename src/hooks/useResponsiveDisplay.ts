import { useEffect, useState } from "react";

/**
 * A custom React hook to determine if the current device is a smaller device
 * based on the screen width.
 * @param {number} [breakpoint=768] - The breakpoint in pixels at which a device is considered "smaller".
 * @returns {boolean} - A boolean value indicating whether the current device is a smaller device.
 */
export const useResponsiveDisplay = (breakpoint: number = 768): boolean => {
  const [isSmallerDevice, setIsSmallerDevice] = useState<boolean>(window.innerWidth < breakpoint);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallerDevice(window.innerWidth < breakpoint);
    };

    checkScreenSize(); // Check size initially in case the window size has changed between render and effect execution

    window.addEventListener("resize", checkScreenSize);

    // Clean up to remove the event listener to prevent memory leaks
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [breakpoint]); // Dependencies to re-run the effect if the breakpoint changes, ensures responsiveness

  return isSmallerDevice;
};
