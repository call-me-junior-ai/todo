import { useEffect, useState } from 'react';

const useOnlineStatus = (): boolean => {
    const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

    useEffect(() => {
        const setOnline = () => setOnlineStatus(true);
        const setOffline = () => setOnlineStatus(false);

        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, []);

    return onlineStatus;
};

export { useOnlineStatus };

