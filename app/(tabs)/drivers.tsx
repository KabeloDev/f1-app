import { StyleSheet, Text, View } from "react-native";

export default function DriversScreen () {
    return <View>
        <Text style={styles.body}>Driver screen</Text>
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