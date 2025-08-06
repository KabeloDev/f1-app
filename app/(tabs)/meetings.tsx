import { Meeting } from "@/types/meeting.type";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function MeetingsScreen() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const uniqueMeetingsMap = new Map<number, Meeting>();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('https://api.openf1.org/v1/meetings?year=2025');
        const data: Meeting[] = await response.json();

        if (!response.ok) {
          console.error('Error status code: ', response.status);
        }

        for (const meeting of data) {
          if (
            meeting.meeting_key &&
            !uniqueMeetingsMap.has(meeting.meeting_key)
          ) {
            uniqueMeetingsMap.set(meeting.meeting_key, meeting);
          }
        }

        const uniqueMeetings = Array.from(uniqueMeetingsMap.values());

        setMeetings(uniqueMeetings);

      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
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
            <View style={styles.driverCard}>
              {/* {item.headshot_url && (
                       <Image
                         source={{ uri: item.headshot_url }}
                         style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
                       />
                     )} */}
              <View>
                <Text style={styles.name}>
                  {item.country_name}
                </Text>
                <Text style={styles.team}>
                  {item.meeting_official_name}
                </Text>
                <Text style={styles.team}>
                  {item.year}
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
  body: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
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