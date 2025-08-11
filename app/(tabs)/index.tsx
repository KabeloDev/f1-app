import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const messages = [
    "Open F1, your trackside companion now.",
    "Live race results at your fingertips.",
    "Exclusive behind-the-scenes F1 today.",
    "Follow top teams and drivers worldwide."
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
      <Text style={styles.raceHeading}>
        Upcoming Race
      </Text>
      <View style={styles.raceBody}>
        <Text style={styles.raceText}>
          DUTCH GRAND PRIX
        </Text>
        <Image
          source={require('@/assets/images/countries/dutch.webp')}
          style={styles.raceFlag}
        />
      </View>
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    height: 250,
    width: 400,
    elevation: 10,
  },
  titleContainer: {
    fontSize: 25,
    color: '#555555ff',
    padding: 20,
    marginBottom: 140,
  },
  raceHeading: {
    fontSize: 25,
    color: '#555555ff',
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  raceText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#555555ff',
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end"
  },
  raceBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    height: 100,
    width: 400,
    elevation: 10,
    padding: 20
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
    bottom: 10,
    left: 100,
    position: 'absolute',
  },
  raceFlag: {
    height: 50,
    width: 100,
    bottom: 25,
    left: 250,
    position: 'absolute',
    borderRadius: 20,
  }
});
