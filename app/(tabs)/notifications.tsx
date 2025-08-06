import { StyleSheet, Text, View } from "react-native";

export default function NotificationsScreen () {
    return <View style={styles.body}>
        <Text>Notifications screen</Text>
    </View>
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
});