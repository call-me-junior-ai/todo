import { useCallback, useState, useEffect } from 'react';

// Custom hook to determine if the device has a smaller screen width than a breakpoint value
export const useResponsiveDisplay = (breakpoint: number = 768): boolean => {
  const [isSmallerDevice, setIsSmallerDevice] = useState<boolean>(window.innerWidth < breakpoint);

  // Listener for resize events, useCallback ensures stability of the function reference
  const checkScreenSize = useCallback(() => {
    setIsSmallerDevice(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    // Add the event listener on mount
    window.addEventListener('resize', checkScreenSize);

    // Remove the event listener on unmount to avoid potential memory leaks
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };

    // The dependency array includes the stable handler
  }, [checkScreenSize]);

  return isSmallerDevice;
};
