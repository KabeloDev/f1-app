import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const messages = [
    "Open F1, your trackside companion.",
    "Live race results at your fingertips.",
    "Exclusive behind-the-scenes F1.",
    "Follow top teams and drivers."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/f1-car.jpg')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.body}>
        <Text style={styles.titleContainer}>
          {messages[index]}
        </Text>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 100,
    height: 400,
    width: 400,
    elevation: 10,
  },
  titleContainer: {
    fontSize: 25,
    color: '#555555ff',
    padding: 50,
    marginBottom: 50,
  },
  reactLogo: {
    height: 400,
    width: 450,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  logo: {
    height: 150,
    width: 150,
    bottom: 0,
    left: 100,
    position: 'absolute',
  }
});
