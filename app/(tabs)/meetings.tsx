import { fetchMeetings } from "@/types/meeting.type";
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function MeetingsScreen() {
  const {data: meetings, isPending, error} = useQuery({
    queryKey: ["meetings"],
    queryFn: fetchMeetings
  });

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

  const locationImages: Record<string, any> = {
    'Bahrain': require('@/assets/images/countries/bahrain.webp'),
    'Australia': require('@/assets/images/countries/australia.png'),
    'China': require('@/assets/images/countries/china.png'),
    'Japan': require('@/assets/images/countries/japan.png'),
    'Saudi Arabia': require('@/assets/images/countries/saudi arabia.png'),
    'United States': require('@/assets/images/countries/usa.png'),
    'Italy': require('@/assets/images/countries/italy.png'),
    'Monaco': require('@/assets/images/countries/monaco.png'),
    'Spain': require('@/assets/images/countries/spain.png'),
    'Canada': require('@/assets/images/countries/canada.png'),
    'Austria': require('@/assets/images/countries/austria.png'),
    'United Kingdom': require('@/assets/images/countries/uk.png'),
    'Belgium': require('@/assets/images/countries/belgium.png'),
    'Hungary': require('@/assets/images/countries/hungary.png'),
  };

  const trackImages: Record<string, any> = {
    'Bahrain': require('@/assets/images/tracks/bahrain.png'),
    'Australia': require('@/assets/images/tracks/australia.png'),
    'China': require('@/assets/images/tracks/china.png'),
    'Japan': require('@/assets/images/tracks/japan.png'),
    'Saudi Arabia': require('@/assets/images/tracks/saudi.webp'),
    'United States': require('@/assets/images/tracks/usa.png'),
    'Italy': require('@/assets/images/tracks/italy.png'),
    'Monaco': require('@/assets/images/tracks/monaco.png'),
    'Spain': require('@/assets/images/tracks/spain.png'),
    'Canada': require('@/assets/images/tracks/canada.png'),
    'Austria': require('@/assets/images/tracks/austria.png'),
    'United Kingdom': require('@/assets/images/tracks/uk.png'),
    'Belgium': require('@/assets/images/tracks/belgium.png'),
    'Hungary': require('@/assets/images/tracks/hungary.png'),
  };


  return (
    <View>
      <Image
        source={require('@/assets/images/meetings.jpg')}
        style={styles.reactLogo}
      />
      <View style={{ marginTop: 350 }}>
        <FlatList
          data={meetings}
          keyExtractor={(item, index) =>
            item.meeting_key?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.meetingCard}>
              <View>
                <Text style={styles.name}>
                  {item.country_name}
                </Text>
                <Text style={styles.team}>
                  {item.meeting_official_name}
                </Text>
                <Text style={styles.team}>
                  {new Date(item.date_start!).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
                <Image
                  source={locationImages[item.country_name ?? ''] || require('@/assets/images/meetings-logo.jpg')}
                  style={{ width: 100, height: 50, borderRadius: 5, marginRight: 12, marginTop: 10}}
                />
                <Image
                  source={trackImages[item.country_name ?? ''] || require('@/assets/images/meetings-logo.jpg')}
                  style={{ width: 150, height: 150, marginTop: 10, marginLeft: 100, marginBottom: 20,  }}
                  resizeMode="contain"
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
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  meetingCard: {
    padding: 15,
    height: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 50,
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