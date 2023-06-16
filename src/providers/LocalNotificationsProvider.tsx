import React, { useEffect, useState } from 'react';

interface ILocalNotificationsContext {
  registrationBookings: Map<string, string[]>;
  setRegistrationBookings: Function;
}

export const LocalNotificationsContext = React.createContext<ILocalNotificationsContext>(null);
const DELAY = 5000;

const LocalNotificationsProvider = ({ children }) => {
  const [registrationBookings, setRegistrationBookings] = useState(new Map());

  useEffect(() => {
    const interval = setInterval(() => {}, DELAY);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <LocalNotificationsContext.Provider value={{ registrationBookings, setRegistrationBookings }}>
      {children}
    </LocalNotificationsContext.Provider>
  );
};

export default LocalNotificationsProvider;
