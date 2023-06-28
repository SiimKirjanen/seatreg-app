import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { NOTIFICATION_FAIL_COUNT, SEATREG_GREEN } from '../../constants';
import { IBooking, IConnection, IGlobalConfig, IStoredBooking } from '../../interface';
import { getDateString, getDateStringForBE } from '../../utils/time';
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
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get permissions for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

async function scheduleNotification(title, body = '') {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      color: SEATREG_GREEN,
    },
    trigger: null,
  });
}

const fetchRegistrationBookings = async (connection: IConnection) => {
  const url = `${connection.siteUrl}/wp-json/seatreg/v1/bookings?api_token=${encodeURIComponent(
    connection.apiToken
  )}&calendar_date=${encodeURIComponent(getDateStringForBE(new Date()))}`;

  const response = await fetch(url);
  const responseData: IBookingResponse = await response.json();

  return responseData.bookings;
};

export async function notificationsPusher() {
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
              scheduleNotification(
                `${connection.registrationName} got new booking`,
                `Name: ${booking.first_name} ${booking.last_name} \nRoom: ${booking.room_name} \nSeat: ${booking.seat_nr}`
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

      if (faileCount > NOTIFICATION_FAIL_COUNT) {
        console.log('Too many failed counts');
        updateConnection({
          ...connection,
          localNotifications: false,
          requestFailCounter: 0,
        });
        setGlobalConfig({
          ...globalConfig,
          alerts: [
            {
              text: `${connection.registrationName} had ${faileCount} continuous request failures . Turning off booking notifications`,
              date: getDateString(Date.now() / 1000),
            },
            ...globalConfig.alerts,
          ],
        });
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
