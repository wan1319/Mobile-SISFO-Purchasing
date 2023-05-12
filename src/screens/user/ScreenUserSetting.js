import { useContext, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Appbar, List } from "react-native-paper";
import { ContextUserAuthentication } from "../../context/ContextUser";

const ScreenUserSetting = ({ navigation }) => {
    const [complete, setComplete] = useState(false);
    const [, setIsAuthenticated] = useContext(ContextUserAuthentication);

    return(
        <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <List.Item
          onPress={() => {
            setIsAuthenticated(false);
            navigation.navigate("RouterUser", { screen: "ScreenUserLogin" });
          }}
          title="Logout"
          description="Logout app"
          left={(props) => <List.Icon {...props} icon="logout-variant" />}
        />
      </ScrollView>
    </SafeAreaView>
    );
};

export default ScreenUserSetting;