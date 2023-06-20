import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState, useContext } from 'react';
import { Platform } from 'react-native';

import { AppContext } from './AppContextProvider';
import { IBooking, IConnection, IStoredBooking } from '../interface';
import { ACTION_TYPE } from '../reducers/AppContextReducer';
import { updateConnection } from '../service/storage';
import { getDateStringForBE } from '../utils/time';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log('existingStatus ', existingStatus);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      console.log('Requesting permissions');
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

async function scheduleNotification(title, body) {
  console.log('Scheduling notification');
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data: 'goes here' },
    },
    trigger: null,
  });
}

interface ILocalNotificationsContext {
  registrationBookings: Map<string, string[]>;
  setRegistrationBookings: Function;
  notifications: any;
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
            //console.log(connection);
            const freshBookings: IBooking[] = await fetchRegistrationBookings(connection);
            const freshBookingsIds: IStoredBooking[] = freshBookings.map(({ booking_id }) => {
              return { booking_id };
            });
            const storedBookings = connection.bookings || [];
            const newBookings = freshBookings.filter(
              (x: IBooking) =>
                !storedBookings.some((y: IStoredBooking) => x.booking_id === y.booking_id)
            );
            console.log(newBookings);

            console.log('fresh bookings', freshBookings.length);
            console.log('stored bookings', storedBookings.length);
            console.log('new bookings', newBookings.length);

            if (storedBookings.length && newBookings.length) {
              if (newBookings.length <= 1) {
                newBookings.forEach((booking) => {
                  console.log('New booking', booking.first_name);
                  scheduleNotification('New booking', booking.first_name);
                });
              } else if (newBookings.length >= 2) {
                console.log(`You got ${newBookings.length} bookings`);
                scheduleNotification(`You got ${newBookings.length} bookings`, '');
              }
            } else {
              console.log('Nothing to notify');
            }

            dispatch({
              type: ACTION_TYPE.CHANGE_BOOKINGS,
              payload: {
                ...connection,
                bookings: freshBookingsIds,
              },
            });

            updateConnection({
              ...connection,
              bookings: freshBookingsIds,
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
  }, [connectionData]);

  return (
    <LocalNotificationsContext.Provider
      value={{ registrationBookings, setRegistrationBookings, notifications: Notifications }}>
      {children}
    </LocalNotificationsContext.Provider>
  );
};

export default LocalNotificationsProvider;
