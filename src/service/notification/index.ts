import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { NOTIFICATION_FAIL_COUNT, SEATREG_REQUIRED_API_VERSION } from '../../constants';
import { IBooking, IConnection, IGlobalConfig, IStoredBooking } from '../../interface';
import { ACTION_TYPE } from '../../reducers/AppContextReducer';
import { getDateString } from '../../utils/time';
import {
  getGlobalConfig,
  getStoredApiTokenData,
  setGlobalConfig,
  updateConnection,
} from '../storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface IBookingResponse {
  options: RegistrationOptions;
  message: string;
  bookings: IBooking[];
}

export async function registerForPushNotificationsAsync() {
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
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get permissions for push notification!');
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
}

async function scheduleNotification(title: string, body = '') {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
}

const fetchRegistrationBookings = async (connection: IConnection) => {
  const url = `${
    connection.siteUrl
  }/wp-json/seatreg/v1/notification-bookings?api_token=${encodeURIComponent(
    connection.apiToken
  )}&seatreg_api=${encodeURIComponent(SEATREG_REQUIRED_API_VERSION)}`;

  const response = await fetch(url);
  const responseData: IBookingResponse = await response.json();

  return responseData.bookings;
};

export async function notificationsPusher(dispatch = null) {
  const connectionData = await getStoredApiTokenData();
  const globalConfig: IGlobalConfig = await getGlobalConfig();

  for (let i = 0; i < connectionData.length; i++) {
    const connection: IConnection = connectionData[i];

    try {
      if (connection.localNotifications) {
        console.log('start');
        const freshBookings: IBooking[] = await fetchRegistrationBookings(connection);
        const freshBookingsIds: IStoredBooking[] = freshBookings.map(({ booking_id }) => {
          return { booking_id };
        });
        const storedBookings = connection.bookings || [];
        const newBookings = freshBookings.filter(
          (x: IBooking) =>
            !storedBookings.some((y: IStoredBooking) => x.booking_id === y.booking_id)
        );
        /*
        console.log('fresh bookings', freshBookings.length);
        console.log('stored bookings', storedBookings.length);
        console.log('new bookings', newBookings.length);
        */
        if (storedBookings.length && newBookings.length) {
          if (newBookings.length <= 1) {
            newBookings.forEach((booking) => {
              const bookingInfo = [
                `Name: ${booking.first_name} ${booking.last_name}`,
                `Room: ${booking.room_name}`,
                `Seat: ${booking.seat_nr}`,
              ];

              if (booking.calendar_date) {
                bookingInfo.push(
                  `Calendar date: ${getDateString(
                    new Date(booking.calendar_date).getTime() / 1000
                  )}`
                );
              }

              scheduleNotification(
                `${connection.registrationName} got new booking`,
                bookingInfo.join('\n')
              );
            });
          } else if (newBookings.length >= 2) {
            scheduleNotification(
              `${connection.registrationName} got ${newBookings.length} new bookings`
            );
          }
        }

        updateConnection({
          ...connection,
          bookings: freshBookingsIds,
          requestFailCounter: 0,
        });
      }
    } catch (e) {
      console.log('Getting bookings failed');
      const faileCount = connection.requestFailCounter || 0;
      const alerts = [
        {
          text: `${connection.registrationName} had ${faileCount} continuous request failures . Turning off booking notifications`,
          date: getDateString(Date.now() / 1000),
        },
        ...globalConfig.alerts.slice(0, 30),
      ];

      if (faileCount > NOTIFICATION_FAIL_COUNT) {
        console.log('Too many failed counts');

        updateConnection({
          ...connection,
          localNotifications: false,
          requestFailCounter: 0,
        });

        setGlobalConfig({
          ...globalConfig,
          alerts,
        });

        if (dispatch) {
          dispatch({
            type: ACTION_TYPE.SET_GLOBAL_CONFIG,
            payload: {
              ...globalConfig,
              alerts,
            },
          });
          dispatch({
            type: ACTION_TYPE.CHANGE_CONNECTION_OPTIONS,
            payload: {
              ...connection,
              localNotifications: false,
            },
          });
        }
      } else {
        console.log('Updating failed count! ', faileCount);
        updateConnection({
          ...connection,
          requestFailCounter: connection.requestFailCounter + 1,
        });
      }
    }
  }
}
