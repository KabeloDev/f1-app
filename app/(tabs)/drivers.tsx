import { StyleSheet, Text, View } from "react-native";

export default function DriversScreen () {
    return <View style={styles.body}>
        <Text>Drivers screen</Text>
    </View>
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
});