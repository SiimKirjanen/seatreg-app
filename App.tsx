import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';

import { SEATREG_GREEN } from './src/constants';
import AppContextProvider from './src/context/AppContextProvider';
import AddTokenPage from './src/pages/AddToken';
import Bookings from './src/pages/Bookings';
import HomePage from './src/pages/Home';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ToastProvider
      duration={3000}
      placement="bottom"
      successColor={SEATREG_GREEN}
      offsetBottom={80}>
      <AppContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="AddToken" component={AddTokenPage} />
            <Stack.Screen name="Bookings" component={Bookings} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextProvider>
    </ToastProvider>
  );
}

export default App;
