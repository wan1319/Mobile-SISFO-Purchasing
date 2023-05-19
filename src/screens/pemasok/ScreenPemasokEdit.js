import { useEffect, useState } from "react";
import { ServicePemasokEdit } from "../../services/ServicePemasok";
import { ScrollView, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ScreenPemasokEdit = ({ navigation, route }) => {
    const [complete, setComplete] = useState(false);
    const [pemasok, setPemasok] = useState({});

    const handleInput = (name, value) => {
        setPemasok((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        const time = setTimeout(() => {
            setPemasok(route.params.pemasok);
            setComplete(true);
        }, 1000);

        return () => clearTimeout(time);
    }, [route.params.pemasok]);

    const handleServicePemasokEdit = () => {
        ServicePemasokEdit(pemasok.kodePemasok, pemasok)
            .then((response) => {
                navigation.goBack();
            })
            .catch(() => { });
    };

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction
                    disabled={!complete}
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title="Edit Pemasok" />
            </Appbar.Header>
            {complete && (
                <ScrollView style={{ marginVertical: 24, marginHorizontal: 24 }}>
                    <View style={{ gap: 24 }}>
                        <TextInput
                            value={pemasok.kodePemasok || ""}
                            onChangeText={(text) => handleInput("kodePemasok", text)}
                            mode="outlined"
                            label="Kode Pemasok"
                            disabled
                        />

                        <TextInput
                            value={pemasok.namaPemasok || ""}
                            onChangeText={(text) => handleInput("namaPemasok", text)}
                            mode="outlined"
                            label="Nama Pemasok"
                        />

                        <TextInput
                            value={pemasok.teleponPemasok || ""}
                            onChangeText={(text) => handleInput("teleponPemasok", text)}
                            mode="outlined"
                            label="Telepon Pemasok"
                        />

                        <TextInput
                            value={pemasok.alamatPemasok || ""}
                            onChangeText={(text) => handleInput("alamatPemasok", text)}
                            mode="outlined"
                            label="Alamat Pemasok"
                        />
                        <Button onPress={handleServicePemasokEdit} mode="contained">
                            Save Changes
                        </Button>
                    </View>
                </ScrollView>
            )}
            <WidgetBaseLoader complete={complete} />
        </SafeAreaProvider>
    );
};

export default ScreenPemasokEdit;