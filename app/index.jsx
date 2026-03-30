import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();
  const [selectedFloor, setSelectedFloor] = useState(1);

  const changeFloor = (direction) => {
    setSelectedFloor((prev) => {
      if (direction === 'next') {
        if (prev === 7) return 10;
        if (prev < 7) return prev + 1;
        return prev;
      }
      if (direction === 'prev') {
        if (prev === 10) return 7;
        if (prev > 1) return prev - 1;
        return prev;
      }
    });
  };

  const navigateToClassRoom = (roomNumber) => {
    router.push({
      pathname: '/classRoom',
      params: { classRoomNumber: `${selectedFloor}${roomNumber}` }
    });
  };

  const RoomButton = ({ number, isWideLeft, isWideRight }) => (
    <TouchableOpacity
      style={[
        styles.roomBase,
        isWideLeft ? styles.roomWideLeft : isWideRight ? styles.roomWideRight : styles.roomStandard
      ]}
      onPress={() => navigateToClassRoom(number)}
      activeOpacity={0.8}
    >
      <Text style={styles.roomText}>{number}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain" 
          />
          <Text style={styles.title}>Olá! Seja bem vindo(a)</Text>
          <Text style={styles.subtitle}>Selecione a sala que deseja reservar</Text>
        </View>

        <View style={styles.contentWrapper}>
            <View style={styles.mapContainer}>
                
                <View style={styles.leftColumn}>
                    <View style={styles.spacerTop} />
                    <RoomButton number="01" />
                    <RoomButton number="02" />
                    <RoomButton number="03" />
                    <RoomButton number="04" />
                    <RoomButton number="05" isWideLeft />
                </View>

                <View style={styles.centerColumn}>
                    <View style={styles.spacerTop} />
                    <View style={styles.topMeetingRoom} />
                    <View style={styles.spacerCenterGap} />
                    <View style={styles.centralPatio} />
                </View>

                <View style={styles.rightColumn}>
                    <View style={styles.spacerTop} />
                    <RoomButton number="10" />
                    <RoomButton number="09" />
                    <RoomButton number="08" />
                    <RoomButton number="07" />
                    <RoomButton number="06" isWideRight />
                </View>

            </View>

            <View style={styles.floorSelectorContainer}>
              <Text style={styles.floorLabel}>Andar</Text>
              <View style={styles.floorSelector}>
                <TouchableOpacity onPress={() => changeFloor('prev')}>
                  <Text style={styles.arrow}>◀</Text>
                </TouchableOpacity>
                <Text style={styles.floorNumber}>{selectedFloor}</Text>
                <TouchableOpacity onPress={() => changeFloor('next')}>
                  <Text style={styles.arrow}>▶</Text>
                </TouchableOpacity>
              </View>
            </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#0B0B0F' },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    paddingHorizontal: 24, 
    paddingTop: 30, 
    paddingBottom: 24 
  },
  
  header: { alignSelf: 'stretch', alignItems: 'center' },
  logo: { width: 140, height: 50, alignSelf: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#aaa', fontWeight: '400', textAlign: 'center' },

  contentWrapper: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },

  mapContainer: {
    width: '80%', 
    aspectRatio: 0.5, 
    backgroundColor: '#9f9f9f15', 
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },

  leftColumn:   { width: '25%', flexDirection: 'column' },
  centerColumn: { width: '31.25%', flexDirection: 'column' },
  rightColumn:  { width: '25%', flexDirection: 'column' },

  spacerTop: { height: '17.647%', width: '100%' },

  roomBase: {
    backgroundColor: '#1A1A22',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A35', 
    shadowColor: "#E83D84",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  
  roomStandard: { height: '17.647%', width: '100%' },
  roomWideLeft: { height: '11.765%', width: '137.5%', alignSelf: 'flex-start' },
  roomWideRight: { height: '11.765%', width: '137.5%', alignSelf: 'flex-end' },

  topMeetingRoom: {
      height: '8.823%',
      width: '100%',
      backgroundColor: '#1A1A22',
      borderWidth: 1,
      borderColor: '#2A2A35',
  },
  spacerCenterGap: { height: '8.823%', width: '100%' },
  centralPatio: {
      height: '48%', 
      width: '100%',
      backgroundColor: '#1A1A22',
      borderWidth: 1,
      borderColor: '#2A2A35',
  },

  roomText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },

  floorSelectorContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  floorLabel: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  floorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
  },
  arrow: { fontSize: 26, color: '#E83D84', paddingHorizontal: 18 }, 
  floorNumber: { fontSize: 26, fontWeight: 'bold', color: '#fff', minWidth: 40, textAlign: 'center' },
});