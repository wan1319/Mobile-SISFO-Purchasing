import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ServiceUserLogin } from "../../services/ServiceUser";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { ContextUserAuthentication } from "../../context/ContextUser";

const ScreenUserLogin = ({ navigation }) => {
    const [, setIsAuthenticated] = useContext(ContextUserAuthentication);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [complete, setComplete] = useState(false);

    const handleChange = (name, value) => {
        setUser((values) => ({ ...values, [name]: value }));
    };

    const userLogin = () => {
        setComplete(false);
        const debounce = _.debounce(() => {
            ServiceUserLogin(user)
                .then(async (token) => {
                    await AsyncStorage.setItem("@token", token);
                    Alert.alert("Berhasil", "Anda sudah berhasil Login");
                    setIsAuthenticated(true);
                    navigation.navigate("RouterBarang");
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    setComplete(true);
                });
        }, 500);
        debounce();
    };

    useEffect(() => {
        setComplete(false);
        const debounce = _.debounce(() => {
            setComplete(true);
        }, 500);
        debounce();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {complete && (
                <ScrollView
                    contentContainerStyle={{
                        gap: 16,
                        marginHorizontal: 40,
                        justifyContent: "center",
                        height: "100%",
                    }}>
                    <WidgetBaseLogo />
                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={user.email}
                        onChangeText={(text) => handleChange("email", text)}
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        value={user.password}
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange("password", text)}
                    />
                    <Button onPress={userLogin} mode="contained">Login</Button>
                    <Button
                        onPress={() => {
                            navigation.navigate("ScreenUserRegister");
                        }}
                        mode="outlined">
                        Register
                    </Button>
                </ScrollView>
            )}
            <WidgetBaseLoader complete={complete} />
        </SafeAreaView>
    );
};

export default ScreenUserLogin;