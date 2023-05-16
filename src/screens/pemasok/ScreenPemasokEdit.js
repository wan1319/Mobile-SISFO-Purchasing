import { useEffect, useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import {
    ServicePemasokDelete,
    ServicePemasokEdit,
} from "../../services/ServicePemasok";
import { Alert, SafeAreaView, View } from "react-native";
import _ from "lodash";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";
import { ScrollView } from "react-native-gesture-handler";

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
        }, 500);

        return () => clearTimeout(time);
    }, [route.params.pemasok]);

    const handlePemasokEdit = () => {
        ServicePemasokEdit(pemasok.kodePemasok, pemasok)
            .then(() => {
            })
            .catch(() => { });
    };

    // const handleServicePemasokDelete = () => {
    //     Alert.alert("Konfirmasi", "Yakin ingin menghapus?", [
    //         {
    //             text: "Yakin",
    //             onPress: () => {
    //                 ServicePemasokDelete(pemasok.kodePemasok)
    //                     .then(() => {
    //                         Alert.alert("Berhasil", "Barang berhasil dihapus!");
    //                         navigation.goBack();
    //                     })
    //                     .catch(() => { });
    //             },
    //         },
    //         {
    //             text: "Batal",
    //             style: "cancel",
    //         },
    //     ]);
    // };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Edit Pemasok" />
            </Appbar.Header>

            {complete && (
                <ScrollView
                    style={{
                        marginVertical: 24,
                        marginHorizontal: 24,
                    }}>
                    <View style={{ gap: 24 }}>
                        <TextInput
                            mode="outlined"
                            value={pemasok.kodePemasok || ""}
                            onChangeText={(text) => handleInput("kodePemasok", text)}
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
                            value={pemasok.alamatPemasok || ""}
                            onChangeText={(text) => handleInput("alamatPemasok", text)}
                            mode="outlined"
                            label="Alamat Pemasok"
                        />
                        <TextInput
                            value={`${pemasok.teleponPemasok || ""}`}
                            onChangeText={(text) => handleInput("teleponPemasok", parseInt(text))}
                            mode="outlined"
                            label="Telepon Pemasok"
                            keyboardType="numeric"
                        />
                        <Button onPress={handlePemasokEdit} mode="contained">
                            Simpan Perubahan
                        </Button>
                    </View>
                </ScrollView>
            )}
            <WidgetBaseLoader complete={complete} />
        </SafeAreaView>
    );
};

export default ScreenPemasokEdit;