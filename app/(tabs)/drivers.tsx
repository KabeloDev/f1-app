import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Driver = {
  driver_number?: number;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  team_name?: string;
  country_code?: string,
  headshot_url?: string;
};

export default function DriversScreen() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('https://api.openf1.org/v1/drivers');
        const data: Driver[] = await response.json();
        const uniqueDriversMap = new Map<number, Driver>();

        for (const driver of data) {
          if (
            driver.driver_number &&
            driver.headshot_url &&
            !uniqueDriversMap.has(driver.driver_number)
          ) {
            uniqueDriversMap.set(driver.driver_number, driver);
          }
        }

        const uniqueDrivers = Array.from(uniqueDriversMap.values());

        setDrivers(uniqueDrivers);

      } catch (error) {
        console.error('Failed to fetch drivers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
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
    padding: 16,
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
