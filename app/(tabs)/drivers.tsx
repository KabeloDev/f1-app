import { fetchDrivers } from '@/types/driver.type';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default function DriversScreen() {
  
  const {data: drivers, isPending, error} = useQuery ({
    queryKey: ["drivers"],
    queryFn: fetchDrivers
  });



  const carImages: Record<string, any> = {
    'Max VERSTAPPEN': require('@/assets/images/cars/verstappen.avif'),
    'Logan SARGEANT': require('@/assets/images/cars/sargeant.jpg'),
    'Lando NORRIS': require('@/assets/images/cars/norris.png'),
    'Pierre GASLY': require('@/assets/images/cars/gasly.jpg'),
    'Sergio PEREZ': require('@/assets/images/cars/perez.jpg'),
    'Fernando ALONSO': require('@/assets/images/cars/alonso.jpg'),
    'Charles LECLERC': require('@/assets/images/cars/leclerc.jpg'),
    'Kevin MAGNUSSEN': require('@/assets/images/cars/magnussen.jpeg'),
    'Nyck DE VRIES': require('@/assets/images/cars/de vries.avif'),
    'Yuki TSUNODA': require('@/assets/images/cars/tsunoda.jpg'),
    'ZHOU Guanyu': require('@/assets/images/cars/guanyu.jpg'),
    'Nico HULKENBERG': require('@/assets/images/cars/hulkenberg.jpg'),
    'Esteban OCON': require('@/assets/images/cars/ocon.jpg'),
    'Lewis HAMILTON': require('@/assets/images/cars/hamilton.jpg'),
    'Carlos SAINZ': require('@/assets/images/cars/sainz.jpg'),
    'George RUSSELL': require('@/assets/images/cars/russel.jpg'),
    'Oscar PIASTRI': require('@/assets/images/cars/piastri.jpg'),
    'Alexander ALBON': require('@/assets/images/cars/albon.jpg'),
    'Valtteri BOTTAS': require('@/assets/images/cars/bottas.jpg'),
    'Lance STROLL': require('@/assets/images/cars/stroll.webp'),
    'Daniel RICCIARDO': require('@/assets/images/cars/ricciardo.jpg'),
    'Gabriel BORTOLETO': require('@/assets/images/cars/bortoleto.webp'),
    'Isack HADJAR': require('@/assets/images/cars/hadjar.jpg'),
    'Jack DOOHAN': require('@/assets/images/cars/doohan.jpg'),
    'Andrea Kimi ANTONELLI': require('@/assets/images/cars/antonelli.jpg'),
    'Liam LAWSON': require('@/assets/images/cars/lawson.webp'),
    'Oliver BEARMAN': require('@/assets/images/cars/bearman.webp'),
  };

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
     return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        source={require('@/assets/images/f1.webp')}
        style={styles.reactLogo}
      />
      <View style={{marginTop: 350}}>
        <FlatList
          data={drivers}
          keyExtractor={(item, index) =>
            item.driver_number?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.driverCard}>
              {item.headshot_url && (
                <Image
                  source={{ uri: item.headshot_url }}
                  style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                />
              )}
              <View>
                <Text style={styles.name}>
                  {item.full_name || `${item.first_name} ${item.last_name}`}
                </Text>
                <Text style={styles.team}>
                  {item.team_name} {item.driver_number}
                </Text>
                <Text style={styles.team}>
                  {item.country_code}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Image
                  source={carImages[item.full_name ?? ''] || require('@/assets/images/meetings-logo.jpg')}
                  style={{ width: 180, height: 100, borderRadius: 15 }}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 50
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  team: { fontSize: 14, color: 'gray' },
  reactLogo: {
    height: 400,
    width: 450,
    bottom: 500,
    left: 0,
    position: 'absolute',
  },
});
