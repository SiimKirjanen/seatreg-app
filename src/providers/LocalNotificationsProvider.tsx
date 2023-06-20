import React, { useEffect } from 'react';

import { notificationsPusher } from '../service/notification';

interface ILocalNotificationsContext {}

export const LocalNotificationsContext = React.createContext<ILocalNotificationsContext>(null);
const DELAY = 5000;

const LocalNotificationsProvider = ({ children }) => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        notificationsPusher();
      } catch (e) {
        console.log(e.message);
      }
    }, DELAY);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <LocalNotificationsContext.Provider value={{}}>{children}</LocalNotificationsContext.Provider>
  );
};

export default LocalNotificationsProvider;
