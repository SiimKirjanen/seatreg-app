import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from './AppContextProvider';
import { IConnection } from '../interface';
import { getRegistrationBookings } from '../service/storage';
import { getConnectionKey } from '../utils/strings';

interface ILocalNotificationsContext {
  registrationBookings: Map<string, string[]>;
  setRegistrationBookings: Function;
}

export const LocalNotificationsContext = React.createContext<ILocalNotificationsContext>(null);
const DELAY = 5000;

const LocalNotificationsProvider = ({ children }) => {
  const [registrationBookings, setRegistrationBookings] = useState(new Map());
  const {
    state: { connectionData },
  } = useContext(AppContext);

  const fetchRegistrationBookings = async (connection: IConnection) => {
    return ['test1', 'test2', 'test3'];
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const bookingsMap = await getRegistrationBookings();

        connectionData.forEach(async (connection: IConnection) => {
          if (connection.localNotifications) {
            const storedBookings = bookingsMap.get(getConnectionKey(connection));
            const currentBookings = await fetchRegistrationBookings(connection);

            if (storedBookings && currentBookings) {
              const newBookings = currentBookings.filter(
                (x: string) => !storedBookings.includes(x)
              );

              newBookings.forEach((newBooking) => {
                alert('Got new booking ' + newBooking);
              });
            }
          }
        });
      } catch (e) {}
    }, DELAY);

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
