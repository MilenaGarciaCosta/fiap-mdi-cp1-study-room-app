import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';


export default function Home() {
  const router = useRouter();
  const [classRoomNumber, setClassRoomNumber] = useState("000");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      
      {/* Botão com navegação para mapa da sala */}
      <TouchableOpacity style={styles.button} onPress={()=>{
        router.push({
          pathname: '/classRoom',
          params: {classRoomNumber}
        })
      }}>

        <Text style={styles.buttonText}>Sala 000</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
  button:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12 },
  buttonText:{ color: '#fff', fontSize: 16, fontWeight: '600' },
});