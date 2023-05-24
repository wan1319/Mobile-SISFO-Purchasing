import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenPembelianCreate from "../screens/pembelian/ScreenPembelianCreate";
import ScreenPembelianList from "../screens/pembelian/ScreenPembelianList";

const Stack = createNativeStackNavigator();

export const RouterPembelianAuthenticated = ({ navigation }) => {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ScreenPembelianList" component={ScreenPembelianList} />
            <Stack.Screen name="ScreenPembelianCreate" component={ScreenPembelianCreate} />
        </Stack.Navigator>
    );
};