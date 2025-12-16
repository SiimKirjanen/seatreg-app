import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';

import { NotificationBell } from './src/components/NotificationBell';
import { SEATREG_GREEN } from './src/constants';
import { PageNames } from './src/enum';
import AddTokenPage from './src/pages/AddToken';
import Bookings from './src/pages/Bookings';
import HomePage from './src/pages/Home';
import AppContextProvider from './src/providers/AppContextProvider';
import LocalNotificationsProvider from './src/providers/LocalNotificationsProvider';

import './polyfills';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ToastProvider
      duration={3000}
      placement="bottom"
      successColor={SEATREG_GREEN}
      offsetBottom={70}>
      <AppContextProvider>
        <LocalNotificationsProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={PageNames.Home}>
              <Stack.Screen
                name={PageNames.Home}
                component={HomePage}
                options={{
                  headerRight: () => <NotificationBell />,
                }}
              />
              <Stack.Screen
                name={PageNames.AddToken}
                component={AddTokenPage}
                options={{
                  headerRight: () => <NotificationBell />,
                }}
              />
              <Stack.Screen
                name={PageNames.Bookings}
                component={Bookings}
                options={{
                  headerRight: () => <NotificationBell />,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LocalNotificationsProvider>
      </AppContextProvider>
    </ToastProvider>
  );
}

export default App;
