import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/pages/Home';
import AddTokenPage from './src/pages/AddToken';
import Bookings from './src/pages/Bookings';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="AddToken" component={AddTokenPage} />
        <Stack.Screen name="Bookings" component={Bookings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;