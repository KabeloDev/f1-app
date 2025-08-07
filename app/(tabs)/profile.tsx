import { auth } from "@/FirebaseConfig";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen () {

    const handleSignOut = () => {
      auth.signOut;
      router.replace('/auth/auth');
    }

    return <View style={styles.body}>
        <Text>Profile screen</Text>
        <TouchableOpacity onPress={() => handleSignOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
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