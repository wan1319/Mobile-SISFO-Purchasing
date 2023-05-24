import _ from "lodash";
import { useEffect, useState } from "react";
import { ServicePembelianList } from "../../services/ServicePembelian";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Appbar, DataTable, Searchbar } from "react-native-paper";
import { ScrollView } from "react-native";
import { ServiceBaseHumanCurrency, ServiceBaseHumanDate } from "../../services/ServiceBase";
import WidgetBaseFABCreate from "../../widgets/base/WidgetBaseFABCreate";
import WidgetBaseLoader from "../../widgets/base/WidgetBaseLoader";

const ScreenPembelianList = ({ navigation }) => {
    const [daftarPembelian, setDaftarPembelian] = useState([]);
    const [query, setQuery] = useState();
    const [complete, setComplete] = useState(false);
    const [pagination, setPagination] = useState({});

    const pembelianList = _.debounce((page, terms) => {
        setComplete(false);
        ServicePembelianList(page ? page : 1, terms ? terms : "")
            .then(({ results, pagination }) => {
                setPagination(pagination);
                setDaftarPembelian(results);
            })
            .catch((error) => console.log(error))
            .finally(() => setComplete(true));
    }, 500);

    const paginate = (page) => {
        pembelianList(page, query);
    };

    const search = (e) => {
        pembelianList(1, e.nativeEvent.text)
    };

    const refresh = () => {
        setQuery("");
        pembelianList(1, "");
    };

    const pembeliatCreate = _.debounce(() => {
        navigation.navigate("ScreenPembeliancreate")
    }, 500);

    useEffect(() => {
        pembelianList();
    }, []);

    return (
        <>
            <SafeAreaProvider style={{ flex: 1 }}>
                <Appbar.Header>
                    <Appbar.Action
                        icon="menu"
                        onPress={navigation.toggleDrawer}
                    />
                    <Appbar.Content title="Pembelian" />
                    <Appbar.Action
                        icon="refresh"
                        onPress={refresh}
                    />
                    <Appbar.Action
                        icon="arrow-right"
                        disabled={_.isNull(pagination?.prev)}
                        onPress={() => paginate(pagination?.prev)}
                    />
                    <Appbar.Action
                        icon="arrow-left"
                        disabled={_.isNull(pagination?.next)}
                        onPress={() => paginate(pagination?.next)}
                    />
                </Appbar.Header>
                <ScrollView style={{ paddingBottom: 24 }}>
                    <Searchbar
                        placeholder="Search"
                        value={query || ""}
                        onChangeText={(text) => setQuery(text)}
                        onSubmitEditing={search}
                        style={{ marginTop: 16, marginHorizontal: 16 }}
                    />
                    <DataTable>
                        <DataTable.Title>Invoice</DataTable.Title>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title numeric>Total</DataTable.Title>
                    </DataTable>

                    {complete && daftarPembelian.map((pembelian, index) => (
                        <DataTable.Row>
                            <DataTable.Cell>{pembelian.faktur}</DataTable.Cell>
                            <DataTable.Cell>{ServiceBaseHumanDate(pembelian.tanggal)}</DataTable.Cell>
                            <DataTable.Cell>{ServiceBaseHumanCurrency(pembelian.total)}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </ScrollView>

                <WidgetBaseFABCreate action={() => pembeliatCreate()} />
                <WidgetBaseLoader complete={complete}/>
            </SafeAreaProvider>
        </>
    );
};


export default ScreenPembelianList;