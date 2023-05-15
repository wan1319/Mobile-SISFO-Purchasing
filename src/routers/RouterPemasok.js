import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenPemasokCreate from "../screens/pemasok/ScreenPemasokCreate";

const Stack = createNativeStackNavigator();

export const RouterPemasokAuthenticated = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="ScreenPemasokCreate"
          component={ScreenPemasokCreate}
        />
      </Stack.Navigator>
    );
  };