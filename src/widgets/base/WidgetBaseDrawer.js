import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { RouterUserAuthenticated, RouterUserNotAuthenticated } from "../../routers/RouterUser";
import { useHookUserAuthenticationInterface } from "../../hooks/HookUser";
import { ContextUserAuthentication } from "../../context/ContextUser";
import { Text } from "react-native";
import WidgetBaseSidebar from "./WidgetBaseSidebar";
import { RouterBarangAuthenticated } from "../../routers/RouterBarang";
import { RouterPemasokAuthenticated } from "../../routers/RouterPemasok";
import { RouterPembelianAuthenticated } from "../../routers/RouterPembelian";

const Drawer = createDrawerNavigator();


export default function WidgetBaseDrawer() {
    const [isAuthenticated, setIsAuthenticated] =
        useHookUserAuthenticationInterface();

    return (
        <ContextUserAuthentication.Provider
            value={[isAuthenticated, setIsAuthenticated]}>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{ headerShown: false }}
                    drawerContent={(props) => <WidgetBaseSidebar {...props} />}
                    initialRouteName="Home">
                    {!isAuthenticated && (
                        <>
                            <Drawer.Screen
                                options={{
                                    drawerLabel: "Login",
                                }}
                                name="RouterUser"
                                component={RouterUserNotAuthenticated}
                            />
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <Drawer.Screen
                                options={{
                                    drawerLabel: "Item",
                                }}
                                name="RouterBarang"
                                component={RouterBarangAuthenticated}
                            />
                            <Drawer.Screen
                                options={{
                                    drawerLabel: "Supplier",
                                }}
                                name="RouterPemasok"
                                component={RouterPemasokAuthenticated}
                            />
                            <Drawer.Screen
                                options={{
                                    drawerLabel: "Purchasing",
                                }}
                                name="RouterPembelian"
                                component={RouterPembelianAuthenticated}
                            />
                            <Drawer.Screen
                                options={{
                                    drawerLabel: "Settings",
                                }}
                                name="RouterUser"
                                component={RouterUserAuthenticated}
                            />
                            
                        </>
                    )}
                </Drawer.Navigator>
            </NavigationContainer>
        </ContextUserAuthentication.Provider>
    );
}
