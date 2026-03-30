import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Desk from "./components/desk/desk";

export default function MapaSala() {
  const router = useRouter();
  const { classRoomNumber } = useLocalSearchParams();
  const [selectedDesk, setSelectedDesk] = useState(null);

  const isReservationDisabled = selectedDesk === null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MAPA DA SALA</Text>
        <Text style={styles.subtitle}>Sala Nº {classRoomNumber}</Text>
      </View>

      {/* Quadro / Frente */}
      <View style={styles.board}>
        <Text style={styles.boardText}>QUADRO</Text>
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.classroomMap}>
          {/* Coluna A */}
          <View style={styles.column}>
            {[1, 2, 3, 4].map((row) => (
              <View key={`col1-row${row}`} style={styles.row}>
                {[1, 2, 3, 4].map((col) => (
                  <Desk
                    key={`A-${row}-${col}`}
                    deskId={`A${row}${col}`}
                    selectedDesk={selectedDesk}
                    setSelectedDesk={setSelectedDesk}
                  />
                ))}
              </View>
            ))}
          </View>

          {/* Corredor */}
          <View style={styles.aisle} />

          {/* Coluna B */}
          <View style={styles.column}>
            {[1, 2, 3, 4].map((row) => (
              <View key={`col2-row${row}`} style={styles.row}>
                {[1, 2, 3].map((col) => (
                  <Desk
                    key={`B-${row}-${col}`}
                    deskId={`B${row}${col}`}
                    selectedDesk={selectedDesk}
                    setSelectedDesk={setSelectedDesk}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Botão */}
      <TouchableOpacity
        style={[
          styles.reserveButton,
          isReservationDisabled && styles.reserveButtonDisabled,
        ]}
        disabled={isReservationDisabled}
        onPress={() =>
          router.push({
            pathname: "/studentInfo",
            params: { classRoomNumber, selectedDesk },
          })
        }
      >
        <Text style={styles.reserveText}>
          {isReservationDisabled
            ? "Selecione uma mesa"
            : `Reservar ${selectedDesk}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    padding: 16,
  },

  header: {
    marginBottom: 16,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#E83D84",
    fontSize: 16,
    marginTop: 4,
  },

  board: {
    backgroundColor: "#1A1A22",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E83D84",
  },

  boardText: {
    color: "#E83D84",
    fontWeight: "bold",
  },

  scrollContent: {
    flex: 1,
  },

  classroomMap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  column: {
    gap: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  aisle: {
    width: 30,
  },

  reserveButton: {
    backgroundColor: "#E83D84",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#E83D84",
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },

  reserveButtonDisabled: {
    backgroundColor: "#333",
    shadowOpacity: 0,
  },

  reserveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});