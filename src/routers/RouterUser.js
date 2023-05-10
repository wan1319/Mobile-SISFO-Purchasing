import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenUserLogin from "../screens/user/ScreenUserLogin";
import ScreenUserRegister from "../screens/user/ScreenUserRegister";

const Stack = createNativeStackNavigator();

export const RouterUserNotAuthenticated = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ScreenUserLogin" component={ScreenUserLogin}/>
            <Stack.Screen name="ScreenUserRegister" component={ScreenUserRegister} />
        </Stack.Navigator>
    );
};
