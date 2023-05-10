import _ from "lodash";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Text, TextInput } from "react-native-paper";
import WidgetBaseLogo from "../../widgets/base/WidgetBaseLogo";

const ScreenUserRegister = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [complete, setComplete] = useState(false);

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
                        />
                        <TextInput
                            style={{ flex: 1 }}
                            label="Last Name"
                            mode="outlined"
                        />
                    </View>
                    <TextInput mode="outlined" label="Email" />
                    <TextInput mode="outlined" label="Password" />
                    <Button mode="contained">Register</Button>
                    <Button
                        onPress={() => {
                            navigation.goBack();
                        }}
                        mode="outlined">
                        Login
                    </Button>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default ScreenUserRegister;