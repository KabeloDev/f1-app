import { StyleSheet, Text, View } from "react-native";

export default function CarDataScreen () {
    return <View>
        <Text style={styles.body}>Car data screen</Text>
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