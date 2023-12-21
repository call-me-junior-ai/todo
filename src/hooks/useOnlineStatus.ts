import { useState, useEffect } from "react";

/**
 * Hook that checks if a user is currently online.
 * @returns {boolean} Whether or not the user is online.
 */
export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners when the component unmounts or the dependencies of the useEffect change
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // Empty dependency array ensures this effect runs only once (like componentDidMount)

  return isOnline;
};
