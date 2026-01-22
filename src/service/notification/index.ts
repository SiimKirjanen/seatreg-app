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
import { translate } from '../translation';

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
      alert(
        translate(
          'Failed to get permissions for push notification!',
          'pushPermissionFailed'
        )
      );
    }
  } else {
    alert( 
      translate(
        'Must use physical device for Push Notifications',
        'pushPhysicalDeviceRequired'
    ));
  }
}

export async function registerForWebNotificationsAsync() {
  if (Platform.OS !== 'web') return;

  if (!('Notification' in window)) {
    alert(
       translate(
        'This browser does not support notifications',
        'notificationsNotSupported'
      )
    );
    return;
  }

  if (Notification.permission === 'default') {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert(
        translate(
          'Failed to get permissions for web notifications',
          'webNotificationPermissionFailed'
        )
      );
    }
  }
}

async function scheduleNotification(title: string, body = '') {

  if(Platform.OS === 'web') {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
    return;
  }

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
                translate(
                  'Name: %s',
                  'bookingName',
                  `${booking.first_name} ${booking.last_name}`
                ),
                translate(
                  'Room: %s',
                  'bookingRoom',
                  booking.room_name
                ),
                translate(
                  'Seat: %s',
                  'bookingSeat',
                  booking.seat_nr
                )
              ];

              if (booking.calendar_date) {
                bookingInfo.push(
                  translate(
                    'Calendar date: %s',
                    'bookingCalendarDate',
                    getDateString(
                      new Date(booking.calendar_date).getTime() / 1000
                    )
                  )
                );
              }

              scheduleNotification(
                translate(
                  '%s got a new booking',
                  'newBookingsSingle',
                  connection.registrationName
                ),
                bookingInfo.join('\n')
              );
            });
          } else if (newBookings.length >= 2) {
            scheduleNotification(
              translate(
                '%s got %s new bookings',
                'newBookingsMultiple',
                connection.registrationName,
                newBookings.length
              )
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
      const faileCount = connection.requestFailCounter || 0;
      const alerts = [
        {
          text: translate(
            '%s had %s continuous request failures. Turning off booking notifications.',
            'bookingNotificationsDisabledDueToFailures',
            connection.registrationName,
            faileCount
          ),
          date: getDateString(Date.now() / 1000),
        },
        ...globalConfig.alerts.slice(0, 30),
      ];

      if (faileCount > NOTIFICATION_FAIL_COUNT) {
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
        updateConnection({
          ...connection,
          requestFailCounter: connection.requestFailCounter + 1,
        });
      }
    }
  }
}
