import { useEffect, useState } from "react";
import { Appbar, Divider, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, View, ScrollView } from "react-native";
import _, { debounce, set, values } from "lodash";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ServiceBaseHumanDate, ServiceBaseRandomID } from "../../services/ServiceBase";

const ScreenPembelianCreate = ({ navigation }) => {
    const [pembelian, setPembelian] = useState({});
    const [daftarItemBeli, setDaftarItemBeli] = useState([]);
    const [pemasok, setPemasok] = useState({});
    const [complete, setComplete] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleInput = (name, value) => {
        if(name === "tanggal") setShowDatePicker(false);
        setPembelian((values) => ({ ...values, [name]: value }));
    };

    useEffect(() => {
        const debounce = _.debounce(() => {
            setComplete(true);
        }, 500);

        debounce();
    }, []);

    const randomFaktur = () => {
        handleInput("faktur", ServiceBaseRandomID("BUY"));
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Create Transaction" />
                <Appbar.Action icon="trash-can-outline" onPress={() => { }} />
            </Appbar.Header>
            {complete && (
                <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                    <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
                        <TextInput
                            mode="outlined"
                            value={pembelian.faktur}
                            onChange={(text) => handleInput("faktur", text)}
                            label="Nomor Faktur"
                            editable={false}
                            right={<TextInput.Icon onPress={() => randomFaktur()} icon="reload" />}
                        />
                        <TextInput
                            mode="outlined"
                            label="Date"
                            editable={false}
                            value={`${ServiceBaseHumanDate(pembelian.tanggal) || ""}`}
                            right={<TextInput.Icon onPress={() => setShowDatePicker(true)} icon="calendar" />}
                        />
                    </View>
                    <Divider />
                    {showDatePicker && (
                        <DateTimePicker
                            value={pembelian.tanggal || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, value) => handleInput("tanggal", value)}
                        /> 
                    )}
                </ScrollView>
            )}
        </SafeAreaProvider>
    );
};

export default ScreenPembelianCreate;