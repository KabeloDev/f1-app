import { StyleSheet, Text, View } from "react-native";

export default function NotificationsScreen () {
    return <View style={styles.body}>
        <Text>No notifications at the moment</Text>
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