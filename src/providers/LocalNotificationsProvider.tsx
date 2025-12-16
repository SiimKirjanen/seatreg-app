import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';

import { NOTIFICATIONS_PUSH_INTERVAL } from '../constants';
import { AppContext } from '../context/AppContext';
import { notificationsPusher } from '../service/notification';

const BACKGROUND_FETCH_TASK = 'background-fetch';

interface ILocalNotificationsContext {}

if (Platform.OS !== 'web') {
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
      await notificationsPusher();
    } catch (e) {
      console.log(e.message);
    }

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });
}

export const LocalNotificationsContext = React.createContext<ILocalNotificationsContext>(null);

const LocalNotificationsProvider = ({ children }) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const interval = setInterval(async () => {
      notificationsPusher(dispatch);
    }, NOTIFICATIONS_PUSH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') return;

    async function registerBackgroundFetchAsync() {
      return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: NOTIFICATIONS_PUSH_INTERVAL / 1000,
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
      }); 
    }

    registerBackgroundFetchAsync();

    return () => {
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    };
  }, []);

  return (
    <LocalNotificationsContext.Provider value={{}}>{children}</LocalNotificationsContext.Provider>
  );
};

export default LocalNotificationsProvider;
