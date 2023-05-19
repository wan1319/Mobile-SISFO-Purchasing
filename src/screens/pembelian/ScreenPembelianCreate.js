import { useEffect, useMemo, useState } from "react";
import { Appbar, Button, DataTable, Divider, List, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, View, ScrollView, Alert } from "react-native";
import _ from "lodash";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ServiceBaseFileSharing, ServiceBaseHumanDate, ServiceBaseIsDuplicateArray, ServiceBaseRandomID } from "../../services/ServiceBase";
import WidgetPemasokChoice from "../../widgets/pemasok/WidgetPemasokChoice";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice";
import { ServicePembelianCreate, ServicePembelianShare } from "../../services/ServicePembelian";

const ScreenPembelianCreate = ({ navigation }) => {
    const [pembelian, setPembelian] = useState({});
    const [daftarItemBeli, setDaftarItemBeli] = useState([]);
    const [pemasok, setPemasok] = useState({});
    const [complete, setComplete] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleInput = (name, value) => {
        if (name === "tanggal") setShowDatePicker(false);
        setPembelian((values) => ({ ...values, [name]: value }));
    };

    const handleInputItemBeli = (index, value, item) => {
        setDaftarItemBeli((values) => {
            const qty = parseInt(value);
            const items = [...values];

            if (qty === 0) {
                items.splice(index, 1);
            } else {
                items[index].jumlahBeli = qty;
                items[index].subtotal = item.jumlahBeli * item.hargaBeli;
            }
            return items;
        });
    }

    const randomFaktur = () => {
        handleInput("faktur", ServiceBaseRandomID("BUY"));
    };

    const addPemasok = (pemasok) => {
        const debounce = _.debounce(() => setPemasok(pemasok), 100);
        debounce();
    };

    const update = (item) => {
        const debounce = _.debounce(() => {
            setDaftarItemBeli((values) => {
                const items = [...values];
                const b = items.find((value) => value.kodeBarang === item.kodeBarang);
                const i = items.findIndex(
                    (value) => value.kodeBarang === item.kodeBarang
                );

                b.jumlahBeli = b.jumlahBeli + 1;
                b.subtotal = b.jumlahBeli * b.hargaBeli;
                items[i] = b;
                return items;
            });
        }, 100);

        debounce();
    };

    const add = (item) => {
        const debounce = _.debounce(() => {
            const payload = {
                kodeBarang: item.kodeBarang,
                namaBarang: item.namaBarang,
                hargaBeli: item.hargaBeli,
                jumlahBeli: 1,
                subtotal: 1 * item.hargaBeli,
            };

            setDaftarItemBeli((values) => [...values, payload]);
        }, 100);

        debounce();
    };

    const addOrUpdate = (item) => {
        const isDuplicate = ServiceBaseIsDuplicateArray(
            daftarItemBeli,
            item.kodeBarang,
            "kodeBarang"
        );

        if (isDuplicate) {
            update(item);
        } else {
            add(item);
        }
    };

    const calculateSubtotal = useMemo(() => {
        const total = _.sumBy(daftarItemBeli, "subtotal");
        handleInput("total", total);
        return total;
    }, [daftarItemBeli]);

    const calculateBayar = useMemo(() => {
        const kembalian = pembelian.dibayar - calculateSubtotal;
        handleInput("kembali", kembalian);
        return kembalian;
    }, [pembelian.dibayar, daftarItemBeli]);

    const askShare = () => {
        const actions = [
            {
                text: "Yes",
                onPress: pembelianShare,
            },
            {
                text: "Cancel",
                onPress: () => { },
                style: "cancel",
            },
        ];
        Alert.alert("Share faktur?", null, actions);
    };

    const pembelianShare = () => {
        setComplete(false);

        const debounce = _.debounce(() => {
            ServicePembelianShare(pembelian.faktur)
                .then(async (blob) => {
                    ServiceBaseFileSharing("FAKTUR", blob);
                })
                .catch((error) => console.log(error))
                .finally(() => setComplete(true));
        }, 500);

        debounce();
    };

    const pembelianCreate = () => {
        setComplete(false);

        const debounce = _.debounce(() => {
            pembelian.kodePemasok = pemasok.kodePemasok;

            const payload = {
                ...pembelian,
                items: [...daftarItemBeli],
            };

            ServicePembelianCreate(payload)
                .then((data) => {
                    askShare();
                })
                .catch((error) => console.log(error))
                .finally(() => setComplete(true));
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
                            label="Invoice Number"
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
                    <WidgetPemasokChoice onPress={addPemasok} />

                    {pemasok.kodePemasok && (
                        <List.Item
                            title={pemasok.namaPemasok}
                            description={pemasok.teleponPemasok}
                        />
                    )}

                    <Divider />
                    <WidgetBarangChoice onPress={addOrUpdate} />
                    {daftarItemBeli.map((barang, index) => (
                        <List.Item
                            key={index}
                            title={`${barang.namaBarang} #${barang.kodeBarang}`}
                            description={`${barang.hargaBeli}`}
                            right={(props) => (
                                <>
                                    <TextInput
                                        mode="outlined"
                                        value={`${barang.jumlahBeli || ""}`}
                                        onChangeText={(text) => handleInputItemBeli(index, text, barang)}
                                    />
                                </>
                            )}
                        />
                    ))}
                    <Divider />
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Title>Purchase Amount</DataTable.Title>
                            <DataTable.Cell numeric>
                                {daftarItemBeli.length || 0}
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Total</DataTable.Title>
                            <DataTable.Cell numeric>{pembelian.total || 0}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Title>Change</DataTable.Title>
                            <DataTable.Cell numeric>{pembelian.kembali || 0}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                    <Divider />
                    <View style={{ marginHorizontal: 16, gap: 16, marginVertical: 24 }}>
                        <TextInput
                            value={`${pembelian.dibayar || ""}`}
                            label="Paid"
                            error={calculateBayar < 0}
                            onChangeText={(text) => handleInput("dibayar", parseInt(text))}
                        />
                        <Button onPress={pembelianCreate} mode="contained">
                            Save
                        </Button>
                    </View>
                </ScrollView>
            )}
        </SafeAreaProvider>
    );
};

export default ScreenPembelianCreate;