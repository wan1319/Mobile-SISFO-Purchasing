import { TextInput, Button, Appbar } from "react-native-paper";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import SchemaPemasok from "../../schema/SchemaPemasok";
import { SafeAreaProvider } from "react-native-safe-area-context";
import _ from "lodash";
import { ServicePemasokCreate } from "../../services/ServicePemasok";

const ScreenPemasokCreate = ({ navigation }) => {
    const [pemasok, setPemasok] = useState(SchemaPemasok);
    const [complete, setComplete] = useState(false);

    const handleChange = (name, value) => {
        setPemasok((values) => ({ ...values, [name]: value }));
    };

    const pemasokCreate = () => {
        setComplete(false);
        const debounce = _.debounce(() => {
            ServicePemasokCreate(pemasok)
                .then(() => {
                    navigation.goBack();
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => setComplete(true));
        }, 500);
        debounce();
    };

    useEffect(() => {
        setComplete(false);
        const debounce = _.debounce(() => setComplete(true), 1000);
        debounce();
    }, []);

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Create Pemasok" />
            </Appbar.Header>
            {complete && (
                <ScrollView style={{
                    marginVertical: 24,
                    marginHorizontal: 24,
                }}>
                    <View style={{ gap: 24 }}>
                        <TextInput
                            mode="outlined"
                            value={pemasok.kodePemasok || ""}
                            onChange={(text) => handleChange("kodePemasok", text)}
                            label="Kode Pemasok"
                        />
                        <TextInput
                            mode="outlined"
                            value={pemasok.namaPemasok || ""}
                            onChange={(text) => handleChange("namaPemasok", text)}
                            label="Nama Pemasok"
                        />
                        <TextInput
                            mode="outlined"
                            value={pemasok.alamatPemasok || ""}
                            onChange={(text) => handleChange("alamatPemasok", text)}
                            label="Alamat Pemasok"
                        />
                        <TextInput
                            mode="outlined"
                            value={pemasok.teleponPemasok || ""}
                            onChange={(text) => handleChange("teleponPemasok", parseInt(text))}
                            label="Nomor Telepon Pemasok"
                            keyboardType="numeric"
                        />
                        <Button mode="contained" onPress={() => (pemasokCreate)}>
                            Simpan
                        </Button>
                    </View>
                </ScrollView>
            )}

        </SafeAreaProvider>
    );
};

export default ScreenPemasokCreate;