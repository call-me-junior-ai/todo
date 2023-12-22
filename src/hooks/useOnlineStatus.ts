import { useEffect, useState } from 'react';

export const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  const handleOnline = () => {
    setOnlineStatus(true);
  };

  const handleOffline = () => {
    setOnlineStatus(false);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return onlineStatus;
};
