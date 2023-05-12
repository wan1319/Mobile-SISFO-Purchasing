import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenBarangList from "../screens/barang/ScreenBarangList";

const Stack = createNativeStackNavigator();

export const RouterBarangAuthenticated = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ScreenBarangList" component={ScreenBarangList} />
        </Stack.Navigator>
    );
};