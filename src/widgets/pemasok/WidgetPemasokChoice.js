import _ from "lodash";
import { useEffect, useState } from "react";
import { ActivityIndicator, Appbar, DataTable, List, Portal, Provider, Searchbar } from "react-native-paper";
import { Modal, ScrollView } from "react-native";
import { ServicePemasokList } from "../../services/ServicePemasok";
import WidgetBaseLoader from "../base/WidgetBaseLoader";

const WidgetPemasokChoice = ({ onPress }) => {
    const [daftarPemasok, setDaftarPemasok] = useState([]);
    const [complete, setComplete] = useState(true);
    const [visible, setVisible] = useState(false);

    const pemasokList = () => {
        setComplete(false); const debounce = _.debounce(() => {
            ServicePemasokList()
                .then(({ results }) => {
                    setDaftarPemasok(results);
                })
                .catch((error) => console.log(error))
                .finally(() => setComplete(true));
        }, 500);
        debounce();
    };

    useEffect(() => {
        pemasokList();
    }, []);

    return (
        <>
            <Provider>
                <Portal>
                    <Modal
                        animationType="fade"
                        style={{ backgroundColor: "#ffffff" }}
                        visible={visible}
                    >
                        <Appbar.Header>
                            <Appbar.Action
                                icon="arrow-left"
                                onPress={() => setVisible(false)}
                            />
                            <Appbar.Content title="Choose Supplier" />
                        </Appbar.Header>
                        {complete && (
                            <ScrollView
                                contentContainerStyle={{
                                    paddingBottom: 24,
                                }}>
                                <Searchbar
                                    placeholder="Search"
                                    onChangeText={(text) => { }}
                                    onSubmitEditing={() => { }}
                                    style={{
                                        marginHorizontal: 16,
                                        marginVertical: 16,
                                    }}
                                />
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Supplier Code</DataTable.Title>
                                        <DataTable.Title>Supplier Name</DataTable.Title>
                                        <DataTable.Title numeric>Phone</DataTable.Title>
                                    </DataTable.Header>
                                    {daftarPemasok.map((pemasok, index) => (
                                        <DataTable.Row
                                            key={index}
                                            onPress={() => {
                                                _.debounce(() => {
                                                    onPress(pemasok);
                                                    setVisible(false);
                                                }, 100)();
                                            }}
                                        >
                                            <DataTable.Cell>{pemasok.kodePemasok}</DataTable.Cell>
                                            <DataTable.Cell>{pemasok.namaPemasok}</DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {pemasok.teleponPemasok}
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                            </ScrollView>
                        )}
                        <WidgetBaseLoader complete={complete} />
                    </Modal>
                </Portal>
                <List.Section style={{ paddingHorizontal: 16 }}>
                    <List.Item
                        title="Choose Supplier"
                        onPress={() => setVisible(true)}
                        left={() => (
                            <>
                                {!complete && <ActivityIndicator animating={!complete} />}
                                {complete && <List.Icon icon="account-search-outline" />}
                            </>
                        )}
                    >
                    </List.Item>
                </List.Section>
            </Provider>
        </>
    );
};

export default WidgetPemasokChoice;