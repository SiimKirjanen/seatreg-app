import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import React, { useContext, useEffect } from 'react';
import { Platform } from 'react-native';

import { NOTIFICATIONS_PUSH_INTERVAL } from '../constants';
import { AppContext } from '../context/AppContext';
import { notificationsPusher } from '../service/notification';

const BACKGROUND_NOTIFICATIONS_TASK = 'background-notifications';
// Task name used by expo-background-fetch before the SDK 57 upgrade
const LEGACY_BACKGROUND_FETCH_TASK = 'background-fetch';

interface ILocalNotificationsContext {}

if (Platform.OS !== 'web') {
  TaskManager.defineTask(BACKGROUND_NOTIFICATIONS_TASK, async () => {
    try {
      await notificationsPusher();
    } catch (e) {
      console.log(e.message);

      return BackgroundTask.BackgroundTaskResult.Failed;
    }

    return BackgroundTask.BackgroundTaskResult.Success;
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

    async function registerBackgroundTaskAsync() {
      try {
        if (await TaskManager.isTaskRegisteredAsync(LEGACY_BACKGROUND_FETCH_TASK)) {
          await TaskManager.unregisterTaskAsync(LEGACY_BACKGROUND_FETCH_TASK);
        }
      } catch (e) {
        console.log(e.message);
      }

      return BackgroundTask.registerTaskAsync(BACKGROUND_NOTIFICATIONS_TASK, {
        minimumInterval: 15, // minutes, the minimum the OS allows
      });
    }

    // Fails in Expo Go on iOS and when the user has disabled background refresh
    registerBackgroundTaskAsync().catch((e) => console.log(e.message));

    return () => {
      BackgroundTask.unregisterTaskAsync(BACKGROUND_NOTIFICATIONS_TASK);
    };
  }, []);

  return (
    <LocalNotificationsContext.Provider value={{}}>{children}</LocalNotificationsContext.Provider>
  );
};

export default LocalNotificationsProvider;
