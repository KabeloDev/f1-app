import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AppStartsScreen() {
    return <View style={styles.body}>
        <Image
            source={require('@/assets/images/appstart.jpg')}
            style={styles.reactLogo}
            blurRadius={2}
        />
        <Text style={styles.welcomeText}>
            Welcome! The race is about to start — get ready to jump in, take control, and have some fun. 
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/auth/auth')}>
            <Text style={styles.text}>Get Started</Text>
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
    reactLogo: {
        height: 1000,
        width: 450,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    button: {
        width: '90%',
        marginVertical: 15,
        backgroundColor: '#db0000ff',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#5C6BC0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 100,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: '600',
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
        marginTop: 150
    }
});