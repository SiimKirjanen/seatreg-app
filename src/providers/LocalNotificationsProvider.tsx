import React, { useEffect, useState, useContext } from 'react';

import { AppContext } from './AppContextProvider';
import { IBooking, IConnection } from '../interface';
import { ACTION_TYPE } from '../reducers/AppContextReducer';
import { updateConnection } from '../service/storage';
import { getDateStringForBE } from '../utils/time';

interface ILocalNotificationsContext {
  registrationBookings: Map<string, string[]>;
  setRegistrationBookings: Function;
}

interface IBookingResponse {
  options: RegistrationOptions;
  message: string;
  bookings: IBooking[];
}

export const LocalNotificationsContext = React.createContext<ILocalNotificationsContext>(null);
const DELAY = 5000;

const LocalNotificationsProvider = ({ children }) => {
  const [registrationBookings, setRegistrationBookings] = useState(new Map());
  const {
    state: { connectionData },
    dispatch,
  } = useContext(AppContext);

  const fetchRegistrationBookings = async (connection: IConnection) => {
    const url = `${connection.siteUrl}/wp-json/seatreg/v1/bookings?api_token=${encodeURIComponent(
      connection.apiToken
    )}&calendar_date=${encodeURIComponent(getDateStringForBE(new Date()))}`;

    const response = await fetch(url);
    const responseData: IBookingResponse = await response.json();

    return responseData.bookings;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        connectionData.forEach(async (connection: IConnection) => {
          if (connection.localNotifications) {
            const freshBookings = await fetchRegistrationBookings(connection);
            const storedBookings = connection.bookings || [];
            const newBookings = freshBookings.filter(
              (x: IBooking) => !storedBookings.some((y: IBooking) => x.booking_id === y.booking_id)
            );

            if (newBookings.length === 0) {
              console.log('No new bookings!');
            } else if (newBookings.length < 2) {
              console.log('New bookings');
            } else {
              console.log(`You got ${newBookings.length} bookings`);
            }

            dispatch({
              type: ACTION_TYPE.CHANGE_BOOKINGS,
              payload: {
                ...connection,
                bookings: freshBookings,
              },
            });
            updateConnection({
              ...connection,
              bookings: newBookings,
            });
          }
        });
      } catch (e) {
        console.log(e.message);
      }
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
