import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const classRooms = ["101", "102", "201", "202", "301", "302"];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>FIAP</Text>
        <Text style={styles.title}>Escolha uma sala</Text>
        <Text style={styles.subtitle}>
          Selecione para visualizar o mapa
        </Text>
      </View>

      {/* Lista de salas */}
      <View style={styles.grid}>
        {classRooms.map((room) => (
          <TouchableOpacity
            key={room}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/classRoom',
                params: { classRoomNumber: room }
              })
            }
          >
            <Text style={styles.cardText}>Sala {room}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    padding: 20,
  },

  header: {
    marginTop: 40,
    marginBottom: 30,
  },

  logo: {
    color: "#E83D84",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: 70
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#aaa",
    marginTop: 4,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  card: {
    width: "47%",
    backgroundColor: "#1A1A22",
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A35",

    // glow FIAP
    shadowColor: "#E83D84",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});