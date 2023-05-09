import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import ScreenUserLogin from './src/screens/user/ScreenUserLogin';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="ScreenUserLogin" component={ScreenUserLogin}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
