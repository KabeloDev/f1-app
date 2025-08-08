import { auth, db } from "@/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const defaultProfileImage =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const profileImages = [
  "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_hybrid",
  "https://static.vecteezy.com/system/resources/previews/014/194/215/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
  "https://img.freepik.com/premium-vector/avatar-teenager-icon-cartoon-style-faceless-men-isolated-white-background_98402-77340.jpg?w=360",
  "https://static.vecteezy.com/system/resources/previews/014/342/474/non_2x/anonymous-profile-icon-cartoon-style-vector.jpg",
  "https://static.vecteezy.com/system/resources/previews/014/194/198/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
];

export default function ProfileScreen() {
  const handleSignOut = () => {
    auth.signOut;
    router.replace('/auth/auth');
  }

  const [userData, setUserData] = useState({
    userId: "",
    username: "",
    firstname: "",
    lastname: "",
    dob: new Date(),
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            userId: user.uid,
            username: data.username || "",
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            dob: data.dob ? data.dob.toDate() : new Date(),
            avatar: data.avatar || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), {
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        dob: Timestamp.fromDate(userData.dob),
        avatar: userData.avatar,
      });
      alert("Profile updated!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/profile.jpg')}
        style={styles.reactLogo}
      />

      <Image
        source={{ uri: userData.avatar || defaultProfileImage }}
        style={styles.avatar}
      />

      <FlatList
        data={profileImages}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              setUserData(function (prevData) {
                return {
                  userId: prevData.userId,
                  username: prevData.username,
                  firstname: prevData.firstname,
                  lastname: prevData.lastname,
                  dob: prevData.dob,
                  avatar: item
                };
              })
            }
          >
            <Image
              source={{ uri: item }}
              style={[
                styles.avatarOption,
                userData.avatar === item && styles.avatarSelected
              ]}
            />
          </TouchableOpacity>
        )}
        style={{ marginVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      />


      <View style={styles.profileForm}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={userData.username}
          onChangeText={(text) =>
            setUserData(function (prevData) {
              return {
                userId: prevData.userId,
                username: text,
                firstname: prevData.firstname,
                lastname: prevData.lastname,
                dob: prevData.dob,
                avatar: prevData.avatar
              };
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={userData.firstname}
          onChangeText={(text) =>
            setUserData(function (prevData) {
              return {
                userId: prevData.userId,
                username: prevData.username,
                firstname: text,
                lastname: prevData.lastname,
                dob: prevData.dob,
                avatar: prevData.avatar
              };
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={userData.lastname}
          onChangeText={(text) =>
            setUserData(function (prevData) {
              return {
                userId: prevData.userId,
                username: prevData.username,
                firstname: prevData.firstname,
                lastname: text,
                dob: prevData.dob,
                avatar: prevData.avatar
              };
            })
          }
        />
      </View>

      <Text style={styles.dobText}>Select your date of birth</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View style={{ flexDirection: 'row' }}>
          <Ionicons style={{ marginRight: 10 }} size={50} name="calendar" />
          <Text style={styles.dobText}>
            {userData.dob.toDateString()}
          </Text>
        </View>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={userData.dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setUserData(function (prevData) {
                return {
                  userId: prevData.userId,
                  username: prevData.username,
                  firstname: prevData.firstname,
                  lastname: prevData.lastname,
                  dob: selectedDate,
                  avatar: prevData.avatar
                };
              });
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSignOut()}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  avatar: { width: 100, height: 100, borderRadius: 50, alignSelf: "center", marginTop: 250 },
  avatarOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "transparent",
    marginLeft: 10,
  },
  avatarSelected: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  dobText: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginVertical: 5,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    width: '90%',
    marginVertical: 10,
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
    marginLeft: 20
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  reactLogo: {
    height: 350,
    width: 450,
    bottom: 550,
    left: 0,
    position: 'absolute',
  },
  profileForm: {
    marginTop: -50
  }
});
