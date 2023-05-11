import _ from "lodash";
import { useEffect, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";
import { ServiceUserRegister } from "../../services/ServiceUser";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

const ScreenUserRegister = ({ navigation }) => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [complete, setComplete] = useState(false);

    const handleChange = (name, value) => {
        setUser((values) => ({ ...values, [name]: value }));
    };

    const userRegister = () => {
        setComplete(false);
        const debounce = _.debounce(() => {
            ServiceUserRegister(user)
                .then((data) => {
                    console.log(data);
                    Alert.alert("Success", "Register Success. Please Login")
                    navigation.goBack();
                })
                .catch((error) => {
                    console.log("There's an error", error);
                })
                .finally(() => {
                    setComplete(true);
                });
        }, 500);
        debounce();
    }

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
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 16,
                    }}>
                        <TextInput
                            style={{ flex: 1 }}
                            label="First Name"
                            mode="outlined"
                            value={user.firstName}
                            onChangeText={(text) => handleChange("firstName", text)}
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            label="Last Name"
                            mode="outlined"
                            value={user.lastName}
                            onChangeText={(text) => handleChange("lastName", text)}
                        />
                    </View>
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
                        onChangeText={(text) => handleChange("password", text)}
                        secureTextEntry={true}
                    />
                    <Button mode="contained" onPress={() => userRegister()}>Register</Button>
                    <Button
                        onPress={() => {
                            navigation.goBack();
                        }}
                        mode="outlined">
                        Login
                    </Button>
                </ScrollView>
            )}
            <WidgetBaseLoader complete={complete} />
        </SafeAreaView>
    );
};

export default ScreenUserRegister;