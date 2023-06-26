import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import React, { useEffect } from 'react';

import { notificationsPusher } from '../service/notification';

const BACKGROUND_FETCH_TASK = 'background-fetch';

interface ILocalNotificationsContext {}

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    await notificationsPusher();
  } catch (e) {
    console.log(e.message);
  }

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export const LocalNotificationsContext = React.createContext<ILocalNotificationsContext>(null);
const DELAY = 5000;

const LocalNotificationsProvider = ({ children }) => {
  useEffect(() => {
    const interval = setInterval(async () => {
      notificationsPusher();
    }, DELAY);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    async function registerBackgroundFetchAsync() {
      return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 1 * 60,
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
