import { Image, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const WidgetBaseLogo = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: "https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Online-Shopping-icon.png",
                }}
            />
            <Text variant="titleMedium">Mobile SISFO Purchasing</Text>
            <Text variant="bodySmall">By Ridwan {new Date().getFullYear()}</Text>
        </View>
    );
};

export default WidgetBaseLogo;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    image: {
        resizeMode: "center",
        width: 160,
        height: 160,
        alignSelf: "center",
    },
});