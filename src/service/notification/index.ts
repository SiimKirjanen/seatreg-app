import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { IBooking, IConnection, IStoredBooking } from '../../interface';
import { getDateStringForBE } from '../../utils/time';
import { getStoredApiTokenData, updateConnection } from '../storage';

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

  connectionData.forEach(async (connection: IConnection) => {
    if (connection.localNotifications) {
      const freshBookings: IBooking[] = await fetchRegistrationBookings(connection);
      const freshBookingsIds: IStoredBooking[] = freshBookings.map(({ booking_id }) => {
        return { booking_id };
      });
      const storedBookings = connection.bookings || [];
      const newBookings = freshBookings.filter(
        (x: IBooking) => !storedBookings.some((y: IStoredBooking) => x.booking_id === y.booking_id)
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

      updateConnection({
        ...connection,
        bookings: freshBookingsIds,
      });
    }
  });
}
