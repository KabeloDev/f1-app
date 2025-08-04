import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const messages = [
    "Welcome to F1! Your ultimate trackside companion.",
    "Stay updated with live race results.",
    "Get behind-the-scenes F1 insights.",
    "Follow your favorite teams and drivers.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/f1-car.jpg')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.background}>
        <View style={styles.body}>
          <Text style={styles.titleContainer}>
            {messages[index]}
          </Text>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1D3D47'
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 400,
    elevation: 50,
  },
  titleContainer: {
    fontSize: 25,
    color: '#1D3D47',
    padding: 50
  },
  reactLogo: {
    height: 400,
    width: 450,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
